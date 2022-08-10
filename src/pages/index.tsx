import { MicroCMSImage, MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ComponentProps, FormEventHandler, useState } from "react";
import { client } from "src/libs/client";
import dayjs from "dayjs";

// propsの型を定義
export type Blog = {
  title: string;
  body: string;
  thumbnail: MicroCMSImage;
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
    <div className="text-center">
      <form
        className="flex justify-center gap-2 text-sm sm:text-xl"
        onSubmit={handleSubmit}
      >
        <input type="text" name="query" className="border border-black px-2" />
        <button className="border border-black px-2 ">検索</button>
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
            <div
              key={content.id}
              className="block max-w-3xl  cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100"
            >
              <Link href={`/blog/${content.id}`}>
                <div>
                  <img src={content.thumbnail.url} alt="画像" />
                  <time dateTime={content.publishedAt} className="mt-2 block">
                    {dayjs(content.publishedAt).format("YYYY年MM月DD日")}
                  </time>
                  <a className="text-xl  hover:opacity-50 ">{content.title}</a>
                </div>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
