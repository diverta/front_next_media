'use client';

import { getServerSession } from "next-auth";
import { getMemberInfo } from "@/components/common/fetchData";
import { useCallback, useRef } from "react";

export default function Mypage() {

    const email = useRef('');
    const password = useRef('');

    const login = useCallback(
        async (event) => {
            console.log('EVENT', event)
            event.preventDefault();
            const credentials = {
                email: email.current.value,
                password: password.current.value
            };
            console.log(credentials);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/login`,
                {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                }
            );
            const userRef = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/profile`,
                {
                    method: "GET",
                    //   body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                }
            );
            const user = await res.json();
            const userRef2 = await userRef.json();
            console.log(user, userRef2);

            // TODO
            // Now you can fetch both user data then store it into Provider, then you can use it everywhere.
            // Besides, we should retrieve that user data for initial access with requesting Profile API.
            // (maybe layout.jsx is the best place to do that.)

            // If no error and we have user data, return it
            if (res.ok && user) {
                return user;
            }
            // Return null if user data could not be retrieved
            return null;
        },
        []
    );

    return (
        <form className="c-form" onSubmit={login}>
            <div className="c-form-group">
                <label htmlFor="email" className="c-form-label">メールアドレス</label>
                <input name="email" type="email" id="email" ref={email} />
            </div>
            <div className="c-form-group">
                <label htmlFor="password" className="c-form-label">パスワード</label>
                <input name="password" type="password" ref={password} />
            </div>
            <div className="c-form-group">
                <button type="submit" className="c-button--primary u-width-100">ログイン</button>
            </div>
        </form>
    )
}
