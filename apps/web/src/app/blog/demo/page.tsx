import { Suspense } from "react";
import { PostList } from "~/components/blog/post-list";
import { CreatePostForm } from "~/components/blog/create-post-form";
import { Card, Skeleton } from "@spilwood/ui";
import { prefetch } from "~/trpc/server";
import { trpc } from "~/trpc/server";

export const metadata = {
  title: "Демо блога — Spilwood",
  description: "Пример работы с tRPC API",
};

function PostListSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6 mb-4" />
          <Skeleton className="h-4 w-32" />
        </Card>
      ))}
    </div>
  );
}

export default async function BlogDemoPage() {
  await prefetch(trpc.post.list.queryOptions());

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Демо блога</h1>
        <p className="text-muted-foreground">
          Пример работы с tRPC API для создания и отображения постов
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Создать пост</h2>
          <Card className="p-6">
            <CreatePostForm />
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Все посты</h2>
          <Suspense fallback={<PostListSkeleton />}>
            <PostList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
