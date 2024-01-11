'use client';

import { useUser } from "@/components/common/userContext";

export default function Login() {
  const { user, loading } = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? <div>Loading...</div> :
        user ? <div>You have already logged in.</div> : (
          <form className="c-form">
            <div className="c-form-group">
              <label htmlFor="email" className="c-form-label">メールアドレス</label>
              <input name="email" type="email" id="email" />
            </div>
            <div className="c-form-group">
              <label htmlFor="password" className="c-form-label">パスワード</label>
              <input name="password" type="password" id="password" />
            </div>
            <div className="c-form-group">
              <button type="submit" className="c-button--primary u-width-100">ログイン</button>
            </div>
            <div className="u-text-align-center u-mt-25"><a href="/mock/member/regist/index.html" className="">会員登録</a>
              または<a href="/mock/login/reminder/index.html" className="">パスワードをお忘れの方</a>
            </div>
          </form>
        )}
    </main>
  )
}
