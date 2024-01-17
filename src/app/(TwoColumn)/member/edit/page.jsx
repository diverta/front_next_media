"use client";

import { useUser } from "@/components/common/userContext";
import { getLabels } from "@/components/common/fetchData";
import { Breadcrumb, PageTitle } from "@/components/common";
import Menu from "@/components/common/Menu";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { getMemberInfo } from "@/components/common/fetchData";
import { updateMemberInfo } from "@/components/common/fetchData";
import { useRouter } from "next/navigation";

export default function Edit() {
  const { user, storeUser } = useUser();
  const contentDirectory = getLabels();
  const content = contentDirectory.editProfile;
  const [memberInfo, setMemberInfo] = useState([]);
  const router = useRouter();

  const memberInfoFunction = useCallback(async () => {
    try {
      const info = await getMemberInfo();
      //   console.log(info);
      setMemberInfo(info.details);
      console.log("Bhai", memberInfo.name1);
    } catch (error) {
      console.error("Error fetching member information", error);
    }
  }, []);

  useEffect(() => {
    memberInfoFunction();
  }, [memberInfoFunction]);

  const name1 = useRef("");
  const name2 = useRef("");
  const email = useRef("");
  const login_pwd = useRef("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name1.current.value);
    console.log(name2.current.value);
    console.log(email.current.value);
    console.log(login_pwd.current.value);

    const userInfo = await updateMemberInfo(
      name1.current.value,
      name2.current.value,
      email.current.value,
      login_pwd.current.value
    );
    console.log(userInfo);

    // if (user) {
    //     storeUser(user);
    //     router.push("member/mypage");
    //   }
  };

  return (
    <div className="l-container">
      <Breadcrumb content={content} />
      <PageTitle content={content} />
      <div className="l-container--col-2 l-container--contents">
        <div className="l-container--col-2__main">
          <div>
            <form className="c-form c-box" onSubmit={handleSubmit}>
              <div className="c-form-group">
                <label htmlFor="name1" className="c-form-label">
                  名前（姓）
                </label>{" "}
                <span className="c-form-label__required">*</span>
                {memberInfo && (
                  <input
                    name="name1"
                    type="text"
                    id="name1"
                    defaultValue={memberInfo.name1}
                    ref={name1}
                  />
                )}
              </div>
              <div className="c-form-group">
                <label htmlFor="name2" className="c-form-label">
                  名前（名）
                </label>
                {memberInfo && (
                  <input
                    name="name2"
                    type="text"
                    id="name2"
                    defaultValue={memberInfo.name2}
                    ref={name2}
                  />
                )}
              </div>
              <div className="c-form-group">
                <label htmlFor="email" className="c-form-label">
                  メールアドレス
                </label>
                {memberInfo && (
                  <input name="email" type="email" defaultValue={memberInfo.email} ref={email}/>
                )}
              </div>
              <div className="c-form-group">
                <div className="u-display-flex">
                  <div className="u-display-flex-grow-1">
                    <label htmlFor="login_pwd" className="c-form-label">
                      パスワード
                    </label>{" "}
                    <span className="c-form-label__required">*</span>
                  </div>
                  <p className="u-ma-0 c-text--small">半角英数8文字以上</p>
                </div>
                <input name="login_pwd" type="password" id="login_pwd" ref={login_pwd}/>
              </div>
              <div className="c-form-group u-text-align-center">
                <button type="submit" className="c-button--primary u-width-50">
                  更新する
                </button>
              </div>
              <div className="c-form-group u-text-align-center">
                <Link href="/member/mypage" className="">
                  マイページへ戻る
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="l-container--col-2__side">
          <Menu />
        </div>
      </div>
    </div>
  );
}
