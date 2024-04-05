import Link from 'next/link';

const Breadcrumb = ({ paths }) => {
  return (
    <nav className='l-breadcrumb is-pc'>
      <div className='l-container--large'>
        <ul>
          <li>
            <Link href='/'>トップ</Link>
          </li>
          {paths.map(({ href, label }, idx) => (
            <li key={`${idx}_${label}`}>
              {href ? <Link href={href}>{label}</Link> : label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Breadcrumb;
