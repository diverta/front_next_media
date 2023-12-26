'use client'

export default function Pager({ page, pageInfo, searchParams }) {
  const isFirstPage = page === 1;
  const isLastPage = page === pageInfo.totalPageCnt;
  console.log("Idhar searchParams: ", searchParams);

  const navigateToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pageInfo.totalPageCnt) {
      window.location.href = `/article?page=${pageNumber}`;
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
          {isLastPage && pageInfo.totalPageCnt!=2 && (<>
            <li className="c-pager__item">
            <a className="c-pager__link" onClick={() => navigateToPage(page - 2)}>{page - 2}</a>
          </li>
          </>)}
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
          {isFirstPage && pageInfo.totalPageCnt!=2 && (<>
            <li className="c-pager__item">
            <a className="c-pager__link" onClick={() => navigateToPage(page + 2)}>{page + 2}</a>
          </li>
          </>)}
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
