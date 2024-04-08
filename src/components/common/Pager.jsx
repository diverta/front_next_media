import Link from 'next/link';

export default function Pager({ pageInfo, searchParams }) {
  const page = pageInfo.pageNo;
  const isFirstPage = `${page}` === '1';
  const isLastPage = page === pageInfo.totalPageCnt;

  const navigateToPage = (toPage, label) => {
    if (page === toPage) {
      return <div className='c-pager__link is-current'>{toPage}</div>;
    }
    return (
      <Link
        className='c-pager__link'
        href={{
          pathname: '/article',
          query: {
            ...searchParams,
            page: toPage,
          },
        }}
      >
        {label ?? toPage}
      </Link>
    );
  };

  return (
    <ul className='c-pager'>
      {!isFirstPage && (
        <>
          <li className='c-pager__item'>{navigateToPage(1, '«')}</li>
          <li className='c-pager__item'>{navigateToPage(page - 1, '‹')}</li>
          {isLastPage && pageInfo.totalPageCnt != 2 && (
            <li className='c-pager__item'>{navigateToPage(page - 2)}</li>
          )}
          <li className='c-pager__item'>{navigateToPage(page - 1)}</li>
        </>
      )}

      <li className='c-pager__item'>
        {navigateToPage(page, page, 'is-current')}
      </li>

      {!isLastPage && (
        <>
          <li className='c-pager__item'>{navigateToPage(page + 1)}</li>
          {isFirstPage && pageInfo.totalPageCnt != 2 && (
            <li className='c-pager__item'>{navigateToPage(page + 2)}</li>
          )}
          <li className='c-pager__item'>{navigateToPage(page + 1, '›')}</li>
          <li className='c-pager__item'>
            {navigateToPage(pageInfo.totalPageCnt, '»')}
          </li>
        </>
      )}
    </ul>
  );
}
