'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import PageTitle from '@/components/common/PageTitle'
import Pager from '@/components/common/Pager'
import getContentList from '@/fetch/getContentList'
import CardList from '@/components/ui/CardList'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Article({ children }) {
    const searchParams = useSearchParams();

    const [params, setParams] = useState({});
    const [title, setTitle] = useState('');
    const [list, setList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    useEffect(() => {
        searchParams.get('topic') && setTitle('記事');
        searchParams.get('search') && setTitle('検索結果');
        searchParams.get('tag_id') && setTitle('タグ検索結果');
        title === '' && setTitle('記事');

        // changes the searchParams object to a plain object
        const params = searchParams.entries()
            .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});
        setParams(params);

        async function fetchData() {
            const { list, pageInfo } = await getContentList(params);
            setList(list);
            setPageInfo(pageInfo);
        };
        fetchData();
    }, [searchParams, title]);

    return (
        <>
            <Breadcrumb paths={[{ label: list?.[0]?.contents_type_ext_col_01 }]} />
            <PageTitle
                title={list?.[0]?.contents_type_ext_col_01}
                subTitle={list?.[0]?.contents_type_nm}
            />
            <div className="l-container--col-2 l-container--contents">
                <div className="l-container--col-2__main">
                    <section className="c-article__list">
                        <div className="c-heading__wrapper">
                            <h2 className="c-heading--lv2 u-display-flex-grow-1">
                                <span>{title}一覧</span>
                            </h2>
                            <div className="u-display-flex-shrink-0 u-text-align-right">
                                <a href="/article" className="c-button">
                                    View All
                                </a>
                            </div>
                        </div>
                        <CardList data={list} />
                        {Object.keys(pageInfo).length > 0 && (
                            <Pager
                                pageInfo={pageInfo}
                                searchParams={params}
                            />
                        )}
                    </section>
                </div>
                {children}
            </div>
        </>
    )
}
