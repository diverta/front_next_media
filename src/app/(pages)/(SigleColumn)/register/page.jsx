"use client";

import Breadcrumb from "@/components/common/Breadcrumb";
import PageTitle from "@/components/common/PageTitle";
import { getLabels } from "@/components/common/fetchData";
import Link from "next/link";
import { useRef, useState } from "react";
import { register } from "@/components/common/fetchData";
import { useUser } from "@/components/common/userContext";
import { useRouter } from "next/navigation";
import AlertError from "@/components/ui/AlertError";

export default function Register() {
  const contentDirectory = getLabels();
  const content = contentDirectory.register;
  const { user, loading, storeUser } = useUser();
  const router = useRouter();
  const [alert, setAlert] = useState(false);

  const name1 = useRef("");
  const name2 = useRef("");
  const email = useRef("");
  const login_pwd = useRef("");

  const handleChange = () => {
    setAlert(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const user = await register(
      name1.current.value,
      name2.current.value,
      email.current.value,
      login_pwd.current.value
    );

    if (user) {
      setAlert(false);
      storeUser(user);
      router.push("member/mypage");
    } else {
      setAlert(true);
    }
  };

  return (
    <div className="l-container">
      <Breadcrumb paths={[{ label: content.text }]} />
      <PageTitle content={content} />
      <div className="l-container--small l-container--contents">
        <div className="c-form-group u-text-align-center">
          <p className="c-text--small">
            <span className="c-form-label__required">*</span>は必須項目です。
          </p>
        </div>
        <form className="c-form" onSubmit={handleRegister} onChange={handleChange}>
          <div className="c-form-group">
            <label htmlFor="name1" className="c-form-label">
              名前（姓）
            </label>
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
                </label>
                <span className="c-form-label__required u-ml-5">*</span>
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
      {alert && <AlertError message="エントリー内容を再度ご確認ください。" />}
      </div>
    </div>
  );
}
