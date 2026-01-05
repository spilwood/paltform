"use client";

import { useTRPC } from "~/trpc/react";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const trpc = useTRPC();
  const {
    data: user,
    isPending,
    error,
  } = useQuery(trpc.user.me.queryOptions());

  return {
    user,
    isLoading: isPending,
    error,
    isAuthenticated: !!user,
  };
}
