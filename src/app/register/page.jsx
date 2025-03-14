'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import postRegister from '@/fetch/postRegister';
import postLogin from '@/fetch/postLogin';
import { useUser } from '@/contexts/user';
import AlertError from '@/components/ui/AlertError';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Metadata from '@/components/common/Metadata';
import { METADATA } from '@/constants/config';

export default function Page() {
  const { storeUser } = useUser();
  const router = useRouter();
  const [alert, setAlert] = useState(false);

  const name1 = useRef('');
  const name2 = useRef('');
  const email = useRef('');
  const login_pwd = useRef('');

  const handleChange = () => {
    setAlert(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    await postRegister(
      name1.current.value,
      name2.current.value,
      email.current.value,
      login_pwd.current.value,
    );
    const user = await postLogin(email.current.value, login_pwd.current.value);

    if (!user) {
      setAlert(true);
      return;
    }

    setAlert(false);
    storeUser(user);
    router.push('/member/mypage');
  };

  return (
    <main className='l-container'>
      <Metadata title={METADATA.REGISTER} />
      <Breadcrumb paths={[{ label: '会員登録' }]} />
      <PageTitle title='会員登録' subTitle='Register' />
      <div className='l-container--small l-container--contents'>
        <form
          className='c-form'
          onSubmit={handleRegister}
          onChange={handleChange}
        >
          <div className='c-form-group u-text-align-center'>
            <p className='c-text--small'>
              <span className='c-form-label__required'>*</span>は必須項目です。
            </p>
          </div>
          {alert && (
            <AlertError message='エントリー内容を再度ご確認ください。' />
          )}
          <div className='c-form-group'>
            <label htmlFor='name1' className='c-form-label'>
              名前（姓）
            </label>
            <span className='c-form-label__required'>*</span>
            <input name='name1' type='text' id='name1' ref={name1} />
          </div>
          <div className='c-form-group'>
            <label htmlFor='name2' className='c-form-label'>
              名前（名）
            </label>
            <input name='name2' type='text' id='name2' ref={name2} />
          </div>
          <div className='c-form-group'>
            <label htmlFor='email' className='c-form-label'>
              メールアドレス
            </label>
            <input name='email' type='email' ref={email} />
          </div>
          <div className='c-form-group'>
            <div className='u-display-flex'>
              <div className='u-display-flex-grow-1'>
                <label htmlFor='login_pwd' className='c-form-label'>
                  パスワード
                </label>
                <span className='c-form-label__required u-ml-5'>*</span>
              </div>
              <p className='u-ma-0 c-text--small'>半角英数8文字以上</p>
            </div>
            <input
              name='login_pwd'
              type='password'
              id='login_pwd'
              ref={login_pwd}
            />
          </div>
          <div className='c-form-group'>
            <button type='submit' className='c-button--primary u-width-100'>
              登録
            </button>
          </div>
          <div className='c-form-group u-text-align-center'>
            すでに会員の方は
            <Link href='/login' className='nuxt-link-active'>
              ログイン
            </Link>
          </div>
          <p className='c-text--small u-mt-25'>
            続行することで<Link href='#'>利用規約</Link>及び
            <Link href='/privacy'>プライバシーポリシー</Link>
            に同意したこととなります。
          </p>
        </form>
      </div>
    </main>
  );
}
