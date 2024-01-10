'use client';

import Image from 'next/image';
import Link from "next/link";
import Search from '../ui/Search';
import { useEffect } from 'react';

const Header = (topPage=null) => {
  const headerClasses = topPage.topPage ? 'l-header is-top' : 'l-header';
  const dataJsAttribute = topPage.topPage ? 'header-scroll' : null;

  useEffect(() => {
    const header = document.querySelector('[data-js="header-scroll"]');

    if (header) {
      const handleScroll = () => {
        header.classList.toggle("-scrolled", window.scrollY > 100);
      };

      window.addEventListener("scroll", handleScroll);
      const toggleButton = document.querySelector(".l-header__nav__toggle");

      const handleToggleClick = () => {
        header.classList.toggle("is-open");
      };

      toggleButton.addEventListener("click", handleToggleClick);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        toggleButton.removeEventListener("click", handleToggleClick);
      };
    }
  }, []);

  return (

    <header className={headerClasses} data-js={dataJsAttribute}>
      <div className="l-header__inner">
        <div className="l-header__logo">
          <Link href="/">
            <Image
              src="/images/logo.png" alt="Company Name"
              fill
            />
          </Link>
        </div>
        <nav className="l-header__nav">
          <button type="button" className="l-header__nav__toggle">
            <div className="l-header__nav__toggle__icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <div className="l-header__nav__inner">
            <ul className="l-header__nav__list">
              <li className="l-header__nav__list__item"><Link href="/article?topic=food">FOOD</Link></li>
              <li className="l-header__nav__list__item"><Link href="/article?topic=shopping">SHOPPING</Link></li>
              <li className="l-header__nav__list__item"><Link href="/article?topic=sightseeing">SIGHTSEEING</Link></li>
              <li className="l-header__nav__list__item"><Link href="/article?topic=event">EVENT</Link></li>
              <li className="l-header__nav__list__item"><Link href="/article?topic=culture">CULTURE</Link></li>
            </ul>
            <Search />
            <div className="l-header__nav__options">
              {/* 未ログイン
              <Link href="/login/" className="l-header__nav__options__button u-display-flex u-display-flex-align-items-center">
              ログイン
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H10" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M6.66675 11.3333L10.0001 7.99996L6.66675 4.66663" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M10 8H2" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </Link>
              <Link href="/member/regist/" className="l-header__nav__options__button c-button -regist">会員登録</Link>
              */}
              
              {/* ログイン時 */}
              <p className="is-sp c-text--small u-mt-0">ようこそ！クロコさん</p>
              <Link href="/member/mypage/" className="l-header__nav__options__button c-button">マイページ</Link>
              <button
                type="button"
                className="-logout l-header__nav__options__button u-display-flex u-display-flex-align-items-center"
              >
                ログアウト
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6"
                    stroke="white"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.6667 11.3333L14.0001 7.99996L10.6667 4.66663"
                    stroke="white"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 8H6"
                    stroke="white"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>

  );
};

export default Header;