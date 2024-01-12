"use client";

import { getMemberInfo } from "@/components/common/fetchData";
import { useCallback, useRef } from "react";
import { useUser } from "@/components/common/userContext";
import { logout } from "@/components/common/fetchData";
import { useRouter } from "next/navigation";

export default function Mypage() {
  const { user, storeUser } = useUser();
  const router = useRouter();
  console.log(user);

  const handleLogout = async (event) => {
    event.preventDefault();
    const user = await logout();
    console.log(user);
    storeUser(null);

    if (user == null) {
      // window.location.href = "/"
      router.push("/");
    }
  };

  return (
    <div>
      <p>Hello</p>
      <button
        type="button"
        onClick={handleLogout}
        className="c-button--primary u-width-100"
      >
        Logout
      </button>
    </div>
  );
}
