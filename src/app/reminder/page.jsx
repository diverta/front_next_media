'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import PageTitle from '@/components/common/PageTitle';
import postReset from '@/fetch/postReset';
import AlertSuccess from '@/components/ui/AlertSuccess';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import postReminder from '@/fetch/postReminder';
import Metadata from '@/components/common/Metadata';
import { METADATA } from '@/constants/config';

export default function Page() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  const mail = useRef('');
  const temp_pwd = useRef('');
  const login_pwd = useRef('');

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = () => {
    setAlert(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await postReminder(mail.current.value);
    if (response) {
      setAlert(true);
      setAlertMessage(response);
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    const response = await postReset(
      token,
      temp_pwd.current.value,
      login_pwd.current.value,
    );
    if (response) {
      setAlert(true);
      setAlertMessage(response);
    }
  };

  return (
    <main className='l-container'>
      <Metadata title={METADATA.REMINDER} />
      <Breadcrumb paths={[{ label: 'パスワード再発行' }]} />
      <PageTitle title='パスワード再発行' subTitle='Password Reset' />
      <div className='l-container--small l-container--contents'>
        <div>
          {alert && <AlertSuccess message={alertMessage} />}
          {token ? (
            <form className='c-form' onSubmit={handleReset}>
              <div className='c-form-group'>
                <label htmlFor='email' className='c-form-label'>
                  仮パスワード
                </label>
                <input
                  name='temp_password'
                  type='password'
                  id='temp_password'
                  ref={temp_pwd}
                />
              </div>
              <div className='c-form-group'>
                <label htmlFor='password' className='c-form-label'>
                  パスワード
                </label>
                <input
                  name='password'
                  type='password'
                  id='password'
                  ref={login_pwd}
                />
              </div>
              <div className='c-form-group'>
                <button className='c-button--primary u-width-100'>送信</button>
              </div>
              <div className='c-form-group u-text-align-center'>
                <Link href='/login' className='nuxt-link-active'>
                  ログイン
                </Link>
              </div>
            </form>
          ) : (
            <form
              className='c-form'
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <div className='c-form-group'>
                <p>パスワードリセットのメールを送信します。</p>
              </div>
              <div className='c-form-group'>
                <label htmlFor='email' className='c-form-label'>
                  メールアドレス
                </label>
                <input name='email' type='email' id='email' ref={mail} />
              </div>
              <div className='c-form-group'>
                <button className='c-button--primary u-width-100'>送信</button>
              </div>
              <div className='c-form-group u-text-align-center'>
                <Link href='/login' className='nuxt-link-active'>
                  ログイン
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
