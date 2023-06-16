import React, { useState } from 'react';
import useUploadMoad from '@/hooks/useUploadModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const UploadModal = () => {
  const { isOpen, onClose } = useUploadMoad();
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
        <Button>Create</Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
