import {
  useSessionContext,
  useSupabaseClient
} from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import useAuthMOdal from "@/hooks/useAuthModal";
import Modal from "./Modal";

const AuthModal = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();
  const { isOpen, onClose } = useAuthMOdal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);


  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Welcom back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        providers={[]}
        magicLink
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
      />
    </Modal>
  )
}

export default AuthModal;