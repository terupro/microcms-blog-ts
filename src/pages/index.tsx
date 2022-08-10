import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ComponentProps, FormEventHandler, useState } from "react";
import { client } from "src/libs/client";

// propsの型を定義
export type Blog = {
  title: string;
  body: string;
};
type Props = MicroCMSListResponse<Blog>;

// microCMSのデータをpropsに送る
export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Blog>({
    endpoint: "blog",
  });
  return {
    props: data,
  };
};

const Home: NextPage<Props> = (props) => {
  const [search, setSearch] = useState<MicroCMSListResponse<Blog>>();
  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    const q = e.currentTarget.query.value;
    // ここの処理はブラウザ側でも起こってしまうため、サーバー側で処理を行う
    // API Routes(簡易的にサーバー側の処理をかけるもの)に入力した値を渡す
    const data = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json: MicroCMSListResponse<Blog> = await data.json();
    setSearch(json);
  };

  const handleClick: ComponentProps<"button">["onClick"] = () => {
    setSearch(undefined);
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;
  return (
    <div>
      <form className="flex gap-x-2" onSubmit={handleSubmit}>
        <input type="text" name="query" className="border border-black px-2" />
        <button className="border border-black px-2">検索</button>
        <button
          onClick={handleClick}
          type="reset"
          className="border border-black px-2"
        >
          リセット
        </button>
      </form>
      <p className="mt-4 text-gray-500">{`${
        search ? "検索結果" : "記事の総数"
      }: ${totalCount}`}</p>
      <ul className="mt-4 space-y-4">
        {contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blog/${content.id}`}>
                <a className="text-xl underline hover:opacity-50">
                  {content.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
