"use client";

import { useSessionStore } from "@/lib/stores/auth.store";
import { Button } from "@/ui/components/button";
import Image from "next/image";
import { useTransition } from "react";
import { signOutAction } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { Loading } from "@/ui/components/loading";

export default function TopNavigationAccount() {
  const status = useSessionStore((state) => state.status);
  const session = useSessionStore((state) => state.session);

  const [isPending, startTransition] = useTransition();
  const clearSession = useSessionStore((state) => state.clearSession);
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      const response = await signOutAction();
      if (response.isSuccess) {
        clearSession();
        router.push("/");
      }
    });
  };

  // Skeleton
  if (status === "loading") {
    return <></>;
  }

  return (
    <>
      {status === "authenticated" ? (
        <div className={"flex justify-center items-center gap-2"}>
          <Image
            src={session.pic}
            alt={""}
            className={"rounded-full"}
            width={48}
            height={48}
          />
          <p>{session.fullName}</p>|
          <div onClick={handleSignOut} className={"text-error cursor-pointer"}>
            {isPending ? (
              <Loading size={"xs"} color={"error"} text={""} />
            ) : (
              <span className={"text-error"}>خروج</span>
            )}
          </div>
        </div>
      ) : (
        <Button variant={"outlined"} href={"/signin"}>
          ورود به سایت
        </Button>
      )}
    </>
  );
}
