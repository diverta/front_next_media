"use client";

import { Breadcrumb, PageTitle } from "@/components/common";
import { getLabels } from "@/components/common/fetchData";
import Link from "next/link";
import { useRef } from "react";
import { register } from "@/components/common/fetchData";
import { useUser } from "@/components/common/userContext";
import { useRouter } from "next/navigation";

export default function Register() {
  const contentDirectory = getLabels();
  const content = contentDirectory.register;

  const name1 = useRef("");
  const name2 = useRef("");
  const email = useRef("");
  const login_pwd = useRef("");
  const { user, loading, storeUser } = useUser();
    const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log(name1.current.value);
    console.log(name2.current.value);
    console.log(email.current.value);
    console.log(login_pwd.current.value);

    const user = await register(
      name1.current.value,
      name2.current.value,
      email.current.value,
      login_pwd.current.value
    );
    console.log(user);

    if (user) {
        storeUser(user);
        router.push("member/mypage");
      }
  };

  return (
    <div>
      <Breadcrumb content={content} />
      <PageTitle content={content} />
      <div className="l-container--small l-container--contents">
        <div className="c-form-group u-text-align-center">
          <p className="c-text--small">
            <span className="c-form-label__required">*</span>は必須項目です。
          </p>
        </div>
        <form className="c-form" onSubmit={handleRegister}>
          <div className="c-form-group">
            <label htmlFor="name1" className="c-form-label">
              名前（姓）
            </label>{" "}
            <span className="c-form-label__required">*</span>
            <input name="name1" type="text" id="name1" ref={name1} />
          </div>
          <div className="c-form-group">
            <label htmlFor="name2" className="c-form-label">
              名前（名）
            </label>
            <input name="name2" type="text" id="name2" ref={name2} />
          </div>
          <div className="c-form-group">
            <label htmlFor="email" className="c-form-label">
              メールアドレス
            </label>
            <input name="email" type="email" ref={email} />
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
            <input
              name="login_pwd"
              type="password"
              id="login_pwd"
              ref={login_pwd}
            />
          </div>
          <div className="c-form-group">
            <button type="submit" className="c-button--primary u-width-100">
              登録
            </button>
          </div>
          <div className="c-form-group u-text-align-center">
            すでに会員の方は
            <Link href="/login" className="nuxt-link-active">
              ログイン
            </Link>
          </div>
          <p className="c-text--small u-mt-25">
            続行することで<Link href="#">利用規約</Link>及び
            <Link href="/privacy">プライバシーポリシー</Link>
            に同意したこととなります。
          </p>
        </form>
      </div>
    </div>
  );
}