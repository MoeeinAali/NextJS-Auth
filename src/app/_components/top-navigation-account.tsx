"use client";

import { useSessionStore } from "@/app/stores/auth.store";

export default function TopNavigationAccount() {
  const status = useSessionStore((state) => state.status);

  return <>{status}</>;
}
