'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import Menu from '@/components/common/Menu';
import PageTitle from '@/components/common/PageTitle';
import postMemberUpdate from '@/fetch/postMemberUpdate';
import getMemberMe from '@/fetch/getMemberMe';
import AlertError from '@/components/ui/AlertError';
import AlertSuccess from '@/components/ui/AlertSuccess';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Metadata from '@/components/common/Metadata';
import { METADATA } from '@/constants/config';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [memberInfo, setMemberInfo] = useState([]);

  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const memberInfoFunction = async () => {
      try {
        const info = await getMemberMe();
        console.log(info);
        if(info.errors.length){
          router.push('/login');
        }
        else {
          setMemberInfo(info.details);
        }
      } catch (error) {
        console.error('Error fetching member information', error);
      }
    };

    memberInfoFunction();
  }, []);

  const name1 = useRef('');
  const name2 = useRef('');
  const email = useRef('');
  const current_password = useRef('');
  const login_pwd = useRef('');

  const handleChange = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
    setAlertMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userStatus = await postMemberUpdate(
      name1.current.value,
      name2.current.value,
      email.current.value,
      current_password.current.value,
      login_pwd.current.value,
    );

    if (userStatus.messages) {
      setAlertMessage(userStatus.messages);
      setSuccessAlert(true);
    } else {
      setAlertMessage(userStatus.errors);
      setErrorAlert(true);
    }
  };

  return (
    <main className='l-container'>
      <Metadata title={METADATA.MEMBER_UPDATE} />
      <Breadcrumb paths={[{ label: '会員情報' }]} />
      <PageTitle title='会員情報' subTitle='Edit Profile' />
      <div className='l-container--col-2 l-container--contents'>
        <div className='l-container--col-2__main'>
          <form
            className='c-form'
            onSubmit={handleSubmit}
            onChange={handleChange}
          >
            {successAlert && <AlertSuccess message={alertMessage} />}
            {errorAlert && <AlertError errors={alertMessage} />}
            <div className='c-form-group'>
              <label htmlFor='name1' className='c-form-label'>
                名前（姓）
              </label>
              <span className='c-form-label__required'>*</span>
              {memberInfo && (
                <input
                  name='name1'
                  type='text'
                  id='name1'
                  defaultValue={memberInfo.name1}
                  ref={name1}
                />
              )}
            </div>
            <div className='c-form-group'>
              <label htmlFor='name2' className='c-form-label'>
                名前（名）
              </label>
              {memberInfo && (
                <input
                  name='name2'
                  type='text'
                  id='name2'
                  defaultValue={memberInfo.name2}
                  ref={name2}
                />
              )}
            </div>
            <div className='c-form-group'>
              <label htmlFor='email' className='c-form-label'>
                メールアドレス
              </label>
              {memberInfo && (
                <input
                  name='email'
                  type='email'
                  defaultValue={memberInfo.email}
                  ref={email}
                />
              )}
            </div>
            <div className='c-form-group'>
              <div className='u-display-flex'>
                <div className='u-display-flex-grow-1'>
                  <label htmlFor='current_password' className='c-form-label'>
                    現在のパスワード
                  </label>
                </div>
              </div>
              <input
                name='current_password'
                type='password'
                id='current_password'
                ref={current_password}
              />
            </div>
            <div className='c-form-group'>
              <div className='u-display-flex'>
                <div className='u-display-flex-grow-1'>
                  <label htmlFor='login_pwd' className='c-form-label'>
                    新しいパスワード
                  </label>
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
            <div className='c-form-group u-text-align-center'>
              <button type='submit' className='c-button--primary u-width-50'>
                更新する
              </button>
            </div>
            <div className='c-form-group u-text-align-center'>
              <Link href='/member/mypage' className=''>
                マイページへ戻る
              </Link>
            </div>
          </form>
        </div>
        <div className='l-container--col-2__side'>
          <Menu />
        </div>
      </div>
    </main>
  );
}
