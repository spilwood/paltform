"use client";

import { useTRPC } from "~/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { PostCard } from "./post-card";

export function PostList() {
  const trpc = useTRPC();
  const { data: posts, isPending } = useQuery(trpc.post.list.queryOptions());

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Постов пока нет</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
