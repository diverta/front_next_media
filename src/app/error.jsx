'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className='c-error'>
      <h2>Error</h2>
      <p>予期せぬエラーが発生しました。</p>
      <Link href='/' className='c-button'>
        TOP
      </Link>
    </main>
  );
}
