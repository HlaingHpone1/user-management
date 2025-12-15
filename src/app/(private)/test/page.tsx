'use client';

import { Button } from '@/components/ui/button';
import { signOut, useSession } from '@/config/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';

const ClientSide = () => {
  const router = useRouter();

  const { data, isPending, error } = useSession();

  console.log({ data, isPending, error });

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/log-in');
          console.log('EEE');
        },
      },
    });
  };

  return (
    <div>
      ClientSide
      <Button onClick={handleSignOut}>Log Out</Button>
    </div>
  );
};

export default ClientSide;
