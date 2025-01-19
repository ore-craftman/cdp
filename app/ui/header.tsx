import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 ">
      <Link href="/">
        <Image src={"/logo.webp"} alt="logo" width={150} height={80} />
      </Link>

      <div>
        <h4 className="text-primary  font-semibold">Admin</h4>
        <p className="text-gray-500 text-xs">Keymaster</p>
      </div>
    </header>
  );
}
