'use client';

import { useUser } from '@/contexts/user';
import postLogout from '@/fetch/postLogout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Menu = () => {
  const { storeUser } = useUser();
  const router = useRouter();
  const handleLogout = async (event) => {
    event.preventDefault();
    const user = await postLogout();
    storeUser(null);

    if (user == null) {
      router.push('/');
    }
  };
  return (
    <div>
      <h2 className='c-heading--lv3 is-sp'>会員メニュー</h2>
      <nav className='l-side__nav'>
        <ul className='l-side__nav__list'>
          <li className='l-side__nav__list__item'>
            <Link
              href='/member/mypage'
              className='c-button u-display-flex u-display-flex-justify-content-between u-width-100'
            >
              マイページトップ
            </Link>
          </li>
          <li className='l-side__nav__list__item'>
            <Link
              href='/member/edit'
              className='c-button u-display-flex u-display-flex-justify-content-between u-width-100'
            >
              会員情報の更新
            </Link>
          </li>
          <li className='l-side__nav__list__item'>
            <Link
              href='/member/delete'
              className='c-button u-display-flex u-display-flex-justify-content-between u-width-100'
            >
              退会
            </Link>
          </li>
          <li className='l-side__nav__list__item'>
            <button
              type='button'
              className='c-button u-display-flex u-display-flex-justify-content-between u-width-100'
              onClick={handleLogout}
            >
              <span>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='u-mr-5'
                >
                  <path
                    d='M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6'
                    stroke='white'
                    strokeWidth='1.33333'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                  <path
                    d='M10.6667 11.3333L14.0001 7.99996L10.6667 4.66663'
                    stroke='white'
                    strokeWidth='1.33333'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                  <path
                    d='M14 8H6'
                    stroke='white'
                    strokeWidth='1.33333'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <span className='u-ml-5 u-mr-5'>ログアウト</span>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
