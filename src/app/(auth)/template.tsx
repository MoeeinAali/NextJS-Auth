import Logo from "@/ui/assets/logo.svg";
import { ReactNode } from "react";
import Image from "next/image";

type Props = {
  children: ReactNode;
};

export default function AuthTemplate({ children }: Props) {
  return (
    <div className="flex flex-col fixed left-1/2 -translate-x-1/2 xl:top-1/2 xl:-translate-y-1/2 fade-in items-center container  xl:max-w-[500px] self-stretch xl:bg-secondary-870 xl:p-8 xl:rounded-lg xl:shadow-xl xl:shadow-black/5">
      <Image
        src={Logo}
        width={300}
        height={87.52}
        alt=""
        className="mt-12 xl:mt-2 mb-24 xl:mb-5"
      />
      {children}
    </div>
  );
}
