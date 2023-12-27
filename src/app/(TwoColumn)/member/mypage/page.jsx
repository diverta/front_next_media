import { getServerSession } from "next-auth";
import { getMemberInfo } from "@/components/common/fetchData";

export default async function Mypage(){

    const session = await getServerSession();
    console.log("session");
    console.log(session);
    const data = await getMemberInfo();
    console.log(data);
    if(session){
        return (
            <div>
                {session?.user?.name}さん、こんにちは！ <br />
                {/* {data} */}
                <a href="/api/auth/signout">ログアウト</a>
            </div>
        )
    }
    return (
        <div>
            <a href="/api/auth/signin">ログイン</a>
        </div>
    )
}
