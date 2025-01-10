"use client";
import { IoIosArrowRoundBack } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";

export default function PageTitle() {
  const pathname = usePathname();
  const router = useRouter();

  const sanitizedRoute = pathname.split("/").filter((route) => route != "");
  // Current route would always be the last item after splitting the pathname by /
  const currentRoute = sanitizedRoute[sanitizedRoute.length - 1].split("-");

  const pageTitle = currentRoute
    .map((route) => route.charAt(0).toUpperCase() + route.slice(1))
    .join(" ");

  const backHandler = () => {
    router.back();
  };

  return (
    <div className="flex items-center gap-2 lg:gap-4 mt-6 mb-4">
      {sanitizedRoute.length > 1 && (
        <button onClick={backHandler}>
          <IoIosArrowRoundBack />
        </button>
      )}
      <h3 className="font-semibold text-gray-700">{pageTitle}</h3>
    </div>
  );
}
