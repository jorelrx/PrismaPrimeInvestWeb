import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Hello World</h1>
      <Link href="/wallet">Wallet</Link>
    </div>
  );
}
