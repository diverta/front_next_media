'use client'

import Pager from '@/components/common/Pager'
import { getContentList } from '@/components/common/fetchData'
import CardList from '@/components/ui/CardList'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getFeatureList } from "@/components/common/fetchData";

export default function Article({ children }) {
    const searchParams = useSearchParams();

    const [params, setParams] = useState({});
    const [title, setTitle] = useState('');
    const [list, setList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [features, setFeatures] = useState([]);
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
        getFeatureList().then(setFeatures);
    }, [searchParams, title]);

    return (
        <>
            {/* <Breadcrumb paths={[{ label: content.text }]} /> */}
            {/* TODO <PageTitle content={content} */}
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
                <div className="l-container--col-2__side">
                    {children}
                </div>
            </div>
        </>
    )
}
