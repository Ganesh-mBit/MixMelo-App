import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser
} from "@supabase/auth-helpers-react";

import { Subscription, UserDetails } from "@/types";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
}

const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any
};

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isUserLoading,
    supabaseClient: supabase
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUser = () => supabase.from('users').select('*').single();
  const getSubscription = () =>
    supabase
      .from('subscription')
      .select('*, prices(*,products(*))',)
      .in('status', ['trialing', 'active'])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUser(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === 'fulfilled') {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (subscriptionPromise.status === 'fulfilled') {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingData && !isUserLoading) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isUserLoading]);

  const value = {
    accessToken,
    user,
    userDetails,
    subscription,
    isLoading: isLoadingData || isUserLoading
  };

  return <UserContext.Provider {...props} value={value} />
};


export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser Hook must be used within MyUserContextProvider');
  }

  return context;
};