'use client'
import { useSession } from "next-auth/react";

const Mypage = () => {
    const { data: session} = useSession({ required: true,
        onUnauthenticated() {
            return { redirect: { destination: '/login', permanent: false } }
        }});
    console.log(session);   
    return (
        <div></div>
    )
}

export default Mypage;