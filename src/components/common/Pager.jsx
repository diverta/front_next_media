'use client'

export default function Pager({ page, pageInfo }) {
  const isFirstPage = page === 1;
  const isLastPage = page === pageInfo.totalPageCnt;

  const navigateToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pageInfo.totalPageCnt) {
      window.location.href = `/?page=${pageNumber}`;
    }
  };
  return (
    <ul className="c-pager">
      {!isFirstPage && (
        <>
          <li className="c-pager__item">
            <a className="c-pager__link" onClick={() => navigateToPage(1)}>&laquo;</a>
          </li>
          <li className="c-pager__item">
            <a className="c-pager__link" onClick={() => navigateToPage(page - 1)}>&lsaquo;</a>
          </li>
          <li className="c-pager__item">
            <a className="c-pager__link" onClick={() => navigateToPage(page - 1)}>{page - 1}</a>
          </li>
        </>
      )}

      <li className="c-pager__item">
        <a className="c-pager__link is-current" onClick={() => navigateToPage(page)}>{page}</a>
      </li>

      {!isLastPage && (
        <>
        <li className="c-pager__item">
            <a className="c-pager__link" onClick={() => navigateToPage(page + 1)}>{page + 1}</a>
          </li>
          <li className="c-pager__item">
            <a className="c-pager__link" onClick={() => navigateToPage(page + 1)}>&rsaquo;</a>
          </li>
          <li className="c-pager__item">
            <a className="c-pager__link" onClick={() => navigateToPage(pageInfo.totalPageCnt)}>&raquo;</a>
          </li>
        </>
      )}
    </ul>
  );
}
