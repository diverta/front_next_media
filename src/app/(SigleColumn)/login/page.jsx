"use client";

import { useUser } from "@/components/common/userContext";
import { login } from "@/components/common/fetchData";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {Breadcrumb, PageTitle} from "@/components/common";
import { getLabels } from "@/components/common/fetchData";


export default function Login() {
  const email = useRef("");
  const password = useRef("");
  const { user, loading, storeUser } = useUser();
  const router = useRouter();
  const contentDirectory = getLabels();
  const content = contentDirectory.login;

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await login(email.current.value, password.current.value);
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
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <div>You have already logged in.</div>
          ) : (
            <form className="c-form" onSubmit={handleLogin}>
              <div className="c-form-group">
                <label htmlFor="email" className="c-form-label">
                  メールアドレス
                </label>
                <input name="email" type="email" id="email" ref={email} />
              </div>
              <div className="c-form-group">
                <label htmlFor="password" className="c-form-label">
                  パスワード
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  ref={password}
                />
              </div>
              <div className="c-form-group">
                <button type="submit" className="c-button--primary u-width-100">
                  ログイン
                </button>
              </div>
              <div className="u-text-align-center u-mt-25">
                <Link href="/register" className="">
                  会員登録
                </Link>
                または
                <Link href="/mock/login/reminder/index.html" className="">
                  パスワードをお忘れの方
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
