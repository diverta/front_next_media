"use client";

import Link from "next/link";

export default function Pager({ page, pageInfo, searchParams }) {
  const isFirstPage = page === 1;
  const isLastPage = page === pageInfo.totalPageCnt;
  console.log("Idhar searchParams pagination me: ", searchParams);

  const navigateToPage = (page, label, className) => (
    <Link
      href={{
        pathname: "/article",
        query: {
          ...searchParams,
          page: page,
        },
      }}
      className={`c-pager__link ${className}`}
      key={page}
    >
      {label ? <span dangerouslySetInnerHTML={{ __html: label }} /> : page}
    </Link>
  );
  return (
    <ul className="c-pager">
      {!isFirstPage && (
        <>
          <li className="c-pager__item">{navigateToPage(1, "&laquo;")}</li>
          <li className="c-pager__item">
            {navigateToPage(page - 1, "&lsaquo;")}
          </li>
          {isLastPage && pageInfo.totalPageCnt != 2 && (
            <>
              <li className="c-pager__item">{navigateToPage(page - 2)}</li>
            </>
          )}
          <li className="c-pager__item">{navigateToPage(page - 1)}</li>
        </>
      )}

      <li className="c-pager__item">
        {navigateToPage(page, page, "is-current")}
      </li>

      {!isLastPage && (
        <>
          <li className="c-pager__item">{navigateToPage(page + 1)}</li>
          {isFirstPage && pageInfo.totalPageCnt != 2 && (
            <>
              <li className="c-pager__item">{navigateToPage(page + 2)}</li>
            </>
          )}
          <li className="c-pager__item">
            {navigateToPage(page + 1, "&rsaquo;")}
          </li>
          <li className="c-pager__item">
            {navigateToPage(page + 1, "&raquo;")}
          </li>
        </>
      )}
    </ul>
  );
}
