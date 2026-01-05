"use client";

import { useTRPC } from "~/trpc/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Textarea, Label } from "@spilwood/ui";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function CreatePostForm() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, isPending } = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.post.list.queryKey(),
        });
        toast.success("Пост создан");
        setTitle("");
        setContent("");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Заполните все поля");
      return;
    }
    mutate({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Заголовок</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок…"
          disabled={isPending}
          autoComplete="off"
          className="text-base"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Содержание</Label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введите текст поста…"
          disabled={isPending}
          rows={5}
          className="text-base resize-none"
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isPending ? "Создание…" : "Создать пост"}
      </Button>
    </form>
  );
}
