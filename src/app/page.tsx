import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="p-4  text-center">
      <h1 className="text-lg sm:text-2xl lg:text-4xl">Responsive Heading</h1>
      <p className="text-base sm:text-lg lg:text-xl">
        This text adjusts size based on screen width.
      </p>
      <Link href="/about">
        <button>Go to about page</button>
      </Link>
      <Link href="/review-form">
        <button>Write an review!</button>
      </Link>
    </div>
  );
}
