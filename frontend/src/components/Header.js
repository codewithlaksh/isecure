import Link from "next/link";

export default function Header(props) {
    const {
        user,
        logout
    } = props;
    return (
        <nav className={"p-3 bg-gray-100 flex items-center"}>
            <div className={"flex items-center"}>
                <span className={"p-2 rounded-[50%] bg-red-500 mr-2"}></span>
                <span className={"p-2 rounded-[50%] bg-orange-500 mr-2"}></span>
                <span className={"p-2 rounded-[50%] bg-emerald-500 mr-2"}></span>
            </div>
            <div className={"ml-auto"}>
                {!user.token && <><Link href={"/signup"} className={"font-semibold mr-4 text-emerald-500 hover:text-emerald-600"}>Signup</Link>
                    <Link href={"/login"} className={"font-semibold mr-4 text-emerald-500 hover:text-emerald-600"}>Login</Link></>}
                {user.token && <><Link href={"/"} className={"font-semibold mr-4 text-emerald-500 hover:text-emerald-600"}>Welcome - {user.user}</Link>
                    <button className={"font-semibold p-0 mr-4 text-emerald-500 hover:text-emerald-600 bg-transparent"} onClick={logout}>Logout</button></>}
            </div>
        </nav>
    )
}