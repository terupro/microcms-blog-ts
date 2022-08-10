import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto my-8 max-w-prose">
      <div className="mx-6">
        <header className="border-b border-green-300 pb-8">
          <h1 className="text-center">
            <Link href="/">
              <a className=" text-5xl font-bold">TERUBLOG</a>
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
