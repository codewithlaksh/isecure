import Head from "next/head";

export default function Home() {
  return (
      <>
          <Head>
              <title>Home - iSecure</title>
          </Head>
          <div className={"h-[80vh] flex flex-col items-center justify-center"}>
              <h1 className={"text-6xl text-center font-bold text-emerald-500"}>Welcome to iSecure!</h1>
              <p className={"text-lg font-semibold text-red-500 text-center"}>This is website is only for tutorial purposes only!!!</p>
          </div>
      </>
  )
}
