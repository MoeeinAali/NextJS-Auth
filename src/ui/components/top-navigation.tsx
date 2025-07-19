import Logo from "@/ui/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import TopNavigationAccount from "@/ui/components/top-navigation-account";

export default function TopNavigation() {
  return (
    <nav className="sticky -top-1  backdrop-blur-md  z-20 border-b bg-secondary-870 border-secondary-850">
      <div className="container mx-auto h-[70px] xl:h-[90px] flex items-center justify-between text-white lg:px-12">
        <div className={"flex items-center"}>
          <Link href={"/"}>
            <Image
              src={Logo}
              className="hidden xl:inline-block"
              width={200}
              height={150}
              alt=""
            />
          </Link>
          <ul className="hidden xl:flex items-center whitespace-nowrap gap-8 ms-20">
            <li>
              <Link
                className="text-secondary-300 animate-underline animate-target"
                href="/"
              >
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link
                className="text-secondary-300 animate-underline animate-target"
                href="/dashboard/courses"
              >
                درس‌ها
              </Link>
            </li>
          </ul>
        </div>
        <TopNavigationAccount />
      </div>
    </nav>
  );
}
