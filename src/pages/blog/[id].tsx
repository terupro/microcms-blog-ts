import dayjs from "dayjs";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "src/libs/client";
import { Blog } from "src/pages";

// microCMSのデータをpropsに送る (context = url情報)
export const getStaticProps: GetStaticProps<{}, { id: string }> = async (
  context
) => {
  if (!context.params) {
    return { notFound: true };
  }
  const data = await client.getListDetail<Blog>({
    endpoint: "blog",
    contentId: context.params.id,
  });
  return {
    props: data,
  };
};

// getStaticPropsで静的に生成されるパスのリストを定義する
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList({ endpoint: "blog" });
  const ids = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths: ids,
    fallback: false,
  };
};

// propsの型を定義
type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">{props.title}</h1>
      <time dateTime={props.publishedAt} className="mt-4 block">
        {`投稿日: ${dayjs(props.publishedAt).format("YYYY年MM月DD日")}`}
      </time>
      <article
        className="prose mt-8"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
    </div>
  );
};

export default BlogId;
