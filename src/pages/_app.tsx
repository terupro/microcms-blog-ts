import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto my-8 max-w-prose">
      <Head>
        <title>TERUBLOG</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mx-4">
        <header className="border-b border-green-300 pb-8">
          <h1 className="text-center">
            <Link href="/">
              <a className="text-4xl font-bold sm:text-5xl">TERUBLOG</a>
            </Link>
          </h1>
        </header>
        <main className="mt-8">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default MyApp;
