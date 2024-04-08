'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import dynamic from 'next/dynamic';

const LimitedPage = dynamic(() => import('@/app/member/limited/[id]/page'), {
  ssr: false,
});

export default function NotFound() {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  // for dynamic rendering on client-side for limited contents
  if (/^\/member\/limited\/\d+\/$/.test(pathname)) {
    return <LimitedPage />;
  }

  return (
    <div className='c-error'>
      <h2>404 Not Found</h2>
      <p>ページが見つかりませんでした</p>
      <Link href='/' className='c-button'>
        TOP
      </Link>
    </div>
  );
}
