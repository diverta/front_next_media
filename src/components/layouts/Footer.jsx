import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='l-footer'>
      <div className='l-container--large'>
        <nav className='l-footer__nav'>
          <ul className='l-footer__nav__list -menu'>
            <li>
              <Link href='/privacy/'>プライバシーポリシー</Link>
            </li>
            <li>
              <Link href='#'>利用規約</Link>
            </li>
            <li>
              <Link href='/contact/'>お問い合わせ</Link>
            </li>
            <li>
              <Link href='/sitemap.xml'>サイトマップ</Link>
            </li>
          </ul>
          <ul className='l-footer__nav__list -sns'>
            <li>
              <Link
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeinejoin='round'
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='X'
              >
                <svg
                  width='19'
                  height='24'
                  viewBox='0 0 1200 1227'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'
                    fill='white'
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
              >
                <svg
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M17.5 2H7.5C4.73858 2 2.5 4.23858 2.5 7V17C2.5 19.7614 4.73858 22 7.5 22H17.5C20.2614 22 22.5 19.7614 22.5 17V7C22.5 4.23858 20.2614 2 17.5 2Z'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeinejoin='round'
                  />
                  <path
                    d='M16.5 11.3701C16.6234 12.2023 16.4813 13.0523 16.0938 13.7991C15.7063 14.5459 15.0931 15.1515 14.3416 15.5297C13.5901 15.908 12.7384 16.0397 11.9078 15.906C11.0771 15.7723 10.3098 15.3801 9.71484 14.7852C9.11991 14.1903 8.72773 13.4229 8.59406 12.5923C8.4604 11.7616 8.59206 10.91 8.97032 10.1584C9.34858 9.40691 9.95418 8.7938 10.701 8.4063C11.4478 8.0188 12.2978 7.87665 13.13 8.00006C13.9789 8.12594 14.7648 8.52152 15.3717 9.12836C15.9785 9.73521 16.3741 10.5211 16.5 11.3701Z'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeinejoin='round'
                  />
                  <path
                    d='M18 6.5H18.01'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeinejoin='round'
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link href='#' target='_blank' rel='noopener noreferrer'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 0.999999 11.75C0.988779 13.537 1.14277 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8572 8.1787 22.54 6.42Z'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeinejoin='round'
                  />
                  <path
                    d='M9.75 15.02L15.5 11.75L9.75 8.47998V15.02Z'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeinejoin='round'
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
        <p className='l-footer__copyright'>
          © 2023 CompanyName Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
