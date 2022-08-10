import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
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
  return (
    <div>
      <p className="text-gray-500">{`記事の総数: ${props.totalCount}`}</p>
      <ul className="mt-4 space-y-4">
        {props.contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`blog/${content.id}`}>
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
