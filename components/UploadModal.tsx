import React, { useState } from 'react';
import uniqid from 'uniqid';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useUploadMoad from '@/hooks/useUploadModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { useUser } from '@supabase/auth-ui-react/dist/components/Auth/UserContext';

const UploadModal = () => {
  const { isOpen, onClose } = useUploadMoad();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Upload to supabase
    try {
      setIsLoading(true);
      const songFile = data.song?.[0];
      const imageFile = data.image?.[0];

      if (!songFile || !imageFile) {
        toast.error("Missing fields");
        return;
      }

      const id = uniqid();
      const {
        data: songsData,
        error: SongsError
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${data.title}-${id}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (SongsError) {
        setIsLoading(false);
        return toast.error('Failed to upload song');
      }

      const {
        data: imageData,
        error: imageError
      } = await supabaseClient
        .storage
        .from('images')
        .upload(`image-${data.title}-${id}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed to upload image');
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user?.id,
          title: data?.title,
          author: data?.author,
          song_path: songsData.path,
          image_path: imageData.path
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Song uploaded successfully');
      reset();
      onClose();
    } catch (error) {
      toast.error('Opps somting went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a Song"
      description="Upload an mp3 file"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          type='text'
          disabled={isLoading}
          placeholder="Song Title"
          {...register('title', { required: true })}
        />
        <Input
          id="author"
          type='text'
          disabled={isLoading}
          placeholder="Song Author"
          {...register('author', { required: true })}
        />
        <div>
          <div className='pb-1'>
            Select a song file
          </div>
          <Input
            id="song"
            type='file'
            disabled={isLoading}
            accept='.mp3'
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className='pb-1'>
            Select an Image
          </div>
          <Input
            id="image"
            type='file'
            disabled={isLoading}
            accept='image/*'
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type='submit'>Create</Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
