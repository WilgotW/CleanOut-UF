import Link from "next/link";

export default function about() {
  return (
    <div>
      <div className="text-sm sm:text-lg">About page</div>
      <Link href="/">
        <button>Go back to homepage</button>
      </Link>
    </div>
  );
}
