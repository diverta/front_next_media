'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import postLogin from '@/fetch/postLogin';
import getProfile from '@/fetch/getProfile';
import { useUser } from '@/contexts/user';
import AlertError from '@/components/ui/AlertError';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Metadata from '@/components/common/Metadata';
import { METADATA } from '@/constants/config';

export default function Page() {
  const email = useRef('');
  const password = useRef('');
  const { user, loading, storeUser } = useUser();
  const router = useRouter();
  const [alert, setAlert] = useState(false);

  const handleChange = () => {
    setAlert(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await postLogin(email.current.value, password.current.value);
    const user = await getProfile();

    if (user) {
      setAlert(false);
      storeUser(user);
      router.push('/member/mypage');
    } else {
      setAlert(true);
    }
  };

  return (
    <main className='l-container'>
      <Metadata title={METADATA.LOGIN} />
      <Breadcrumb paths={[{ label: 'ログイン' }]} />

      <PageTitle title='ログイン' subTitle='Login' />
      <div className='l-container--small l-container--contents'>
        <div className='flex min-h-screen flex-col items-center justify-between p-24'>
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <div>You have already logged in.</div>
          ) : (
            <form
              className='c-form'
              onSubmit={handleLogin}
              onChange={handleChange}
            >
              {alert && (
                <AlertError message='メールアドレスまたはパスワードが間違っています。' />
              )}
              <div className='c-form-group'>
                <label htmlFor='email' className='c-form-label'>
                  メールアドレス
                </label>
                <input name='email' type='email' id='email' ref={email} />
              </div>
              <div className='c-form-group'>
                <label htmlFor='password' className='c-form-label'>
                  パスワード
                </label>
                <input
                  name='password'
                  type='password'
                  id='password'
                  ref={password}
                />
              </div>
              <div className='c-form-group'>
                <button type='submit' className='c-button--primary u-width-100'>
                  ログイン
                </button>
              </div>
              <div className='u-text-align-center u-mt-25'>
                <Link href='/register' className=''>
                  会員登録
                </Link>
                または
                <Link href='/reminder' className=''>
                  パスワードをお忘れの方
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
