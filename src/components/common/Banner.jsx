import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  return (
    <aside>
      <ul className='l-container--contents-side c-banner__list'>
        <li className='c-banner__item'>
          <Link href='/'>
            <Image
              alt='dummy banner'
              src='/images/banner.png'
              width={240}
              height={240}
            />
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Banner;
