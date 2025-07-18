import Logo from "@/app/_assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function TopNavigation() {
    return (
        <nav className="sticky -top-1  backdrop-blur-md  z-20 border-b bg-secondary-870 border-secondary-850">
            <div className="container mx-auto h-[70px] xl:h-[90px] flex items-center  text-white ps-4">
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
                            href="/signin"
                        >
                            صفحه ورود
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
