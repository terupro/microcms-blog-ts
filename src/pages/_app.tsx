import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto max-w-prose">
      <header className="border-b border-green-300 py-8">
        <h1>
          <Link href="/">
            <a className="text-5xl font-bold">TERUBLOG</a>
          </Link>
        </h1>
      </header>
      <main className="mt-8">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
