import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>TODO APPにようこそ</h1>
      <Link href="/todos">
        <a>クリックしてTODOを作成</a>
      </Link>
    </>
  );
}
