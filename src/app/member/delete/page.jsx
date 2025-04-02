'use client';

import Breadcrumb from '@/components/common/Breadcrumb';
import Menu from '@/components/common/Menu';
import PageTitle from '@/components/common/PageTitle';
import postMemberDelete from '@/fetch/postMemberDelete';
import getMemberMe from '@/fetch/getMemberMe';
import { useUser } from '@/contexts/user';
import AlertSuccess from '@/components/ui/AlertSuccess';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Metadata from '@/components/common/Metadata';
import { METADATA } from '@/constants/config';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [memberInfo, setMemberInfo] = useState([]);
  const { storeUser } = useUser();
  const [alert, setAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const memberInfoFunction = async () => {
      try {
        const info = await getMemberMe();
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userStatus = await postMemberDelete();

    if (userStatus) {
      storeUser(null);
      setAlert(true);
    }
  };

  return (
    <main className='l-container'>
      <Metadata title={METADATA.MEMBER_DELETE} />
      <Breadcrumb paths={[{ label: '退会' }]} />
      <main>
        <PageTitle title='退会' subTitle='Unsubscribe' />
        <div className='l-container--col-2 l-container--contents'>
          <main className='l-container--col-2__main'>
            <form className='c-form' onSubmit={handleSubmit}>
              <div className='c-form-group'>
                <dl>
                  <dt className='c-form-label'>名前</dt>
                  {memberInfo && (
                    <dd>
                      {memberInfo.name1} {memberInfo.name2}
                    </dd>
                  )}
                </dl>
              </div>
              <div className='c-form-group'>
                <dl>
                  <dt className='c-form-label'>メールアドレス</dt>
                  {memberInfo && <dd>{memberInfo.email}</dd>}
                </dl>
              </div>
              {alert ? (
                <div>
                  <AlertSuccess message='退会が完了しました' />
                  <div className='c-form-group u-text-align-center'>
                    <Link href='/' className=''>
                      トップへ戻る
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div className='c-form-group u-text-align-center'>
                    <p>
                      本当に退会してよろしいですか？<br></br>
                      退会の処理が完了すると自動的にログアウトします。
                    </p>
                  </div>
                  <div className='c-form-group u-text-align-center'>
                    <button
                      type='submit'
                      className='c-button--primary u-width-50'
                    >
                      退会
                    </button>
                  </div>
                  <div className='c-form-group u-text-align-center'>
                    <Link href='/member/mypage' className=''>
                      マイページへ戻る
                    </Link>
                  </div>
                </div>
              )}
            </form>
          </main>
          {!alert && (
            <div className='l-container--col-2__side'>
              <Menu />
            </div>
          )}
        </div>
      </main>
    </main>
  );
}
