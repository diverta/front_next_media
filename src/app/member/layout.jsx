'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user';
import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';

export default function MemberLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useUser();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <main className='l-container'>
      {/* <Metadata title={METADATA.LOGIN} /> */}
      <Breadcrumb paths={[{ label: 'ログイン' }]} />
      <PageTitle title='ログイン' subTitle='Login' />
      <div className='l-container--small l-container--contents'>
        <div className='flex min-h-screen flex-col items-center justify-between p-24'>
            <div>Loading...</div>
        </div>
      </div>
    </main>
    );
  }

  // Don't render content if user is not authenticated
  // (will be redirected to login page)
  if (!user) {
    return null;
  }

  // Render children only if authenticated
  return <>{children}</>;
}
