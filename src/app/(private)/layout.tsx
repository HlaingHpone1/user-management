import { auth } from '@/config/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session, 'SEVER LLLLL');

  if (!session) {
    redirect('/log-in'); // You handle the redirect
  }
  return <>{children}</>;
};

export default Layout;
