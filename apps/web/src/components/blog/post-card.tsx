"use client";

import { useTRPC } from "~/trpc/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card } from "@spilwood/ui";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@spilwood/ui";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
  };
}

export function PostCard({ post }: PostCardProps) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending } = useMutation(
    trpc.post.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.post.list.queryKey(),
        });
        toast.success("Пост удалён");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold mb-2 overflow-wrap-anywhere">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 overflow-wrap-anywhere">
            {post.content}
          </p>
          <time
            dateTime={post.createdAt.toISOString()}
            className="text-sm text-muted-foreground"
          >
            {new Date(post.createdAt).toLocaleDateString("ru-RU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              disabled={isPending}
              aria-label="Удалить пост"
              className="shrink-0"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Удалить пост?</AlertDialogTitle>
              <AlertDialogDescription>
                Это действие нельзя отменить. Пост будет удалён навсегда.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deletePost({ id: post.id })}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}
