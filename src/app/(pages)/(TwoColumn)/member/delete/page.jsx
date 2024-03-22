"use client";

import Breadcrumb from '@/components/common/Breadcrumb'
import PageTitle from '@/components/common/PageTitle'
import {
  getLabels,
  getMemberInfo,
  deleteMember,
} from "@/components/common/fetchData";
import Menu from "@/components/common/Menu";
import Link from "next/link";
import { useUser } from "@/components/common/userContext";
import { useState, useEffect } from "react";
import AlertSuccess from "@/components/ui/AlertSuccess";

export default function Delete() {
  const contentDirectory = getLabels();
  const content = contentDirectory.deleteProfile;
  const [memberInfo, setMemberInfo] = useState([]);
  const { storeUser } = useUser();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const memberInfoFunction = async () => {
    try {
      const info = await getMemberInfo();
      setMemberInfo(info.details);
    } catch (error) {
      console.error("Error fetching member information", error);
    }
  };
  
    memberInfoFunction();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userStatus = await deleteMember();

    if (userStatus) {
      storeUser(null);
      setAlert(true);
    }
  };

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
          <div>
            <form className="c-form c-box" onSubmit={handleSubmit}>
              <div className="c-form-group">
                <dl>
                  <dt className="c-form-label">名前</dt>
                  {memberInfo && (
                    <dd>
                      {memberInfo.name1} {memberInfo.name2}
                    </dd>
                  )}
                </dl>
              </div>
              <div className="c-form-group">
                <dl>
                  <dt className="c-form-label">メールアドレス</dt>
                  {memberInfo && <dd>{memberInfo.email}</dd>}
                </dl>
              </div>
              {alert ? (
                <div>
                  <AlertSuccess message="退会が完了しました" />
                  <div className="c-form-group u-text-align-center">
                    <Link href="/" className="">
                      トップへ戻る
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="c-form-group u-text-align-center">
                    <p>
                      本当に退会してよろしいですか？<br></br>
                      退会の処理が完了すると自動的にログアウトします。
                    </p>
                  </div>
                  <div className="c-form-group u-text-align-center">
                    <button
                      type="submit"
                      className="c-button--primary u-width-50"
                    >
                      退会
                    </button>
                  </div>
                  <div className="c-form-group u-text-align-center">
                    <Link href="/member/mypage" className="">
                      マイページへ戻る
                    </Link>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        {!alert && <div className="l-container--col-2__side">
          <Menu />
        </div>}
      </div>
    </div>
  );
}
