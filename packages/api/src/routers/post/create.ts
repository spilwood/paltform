import { z } from "zod/v4";
import { Post } from "@spilwood/db";
import { protectedProcedure } from "../../trpc";

export const create = protectedProcedure
  .input(
    z.object({
      title: z.string().min(1).max(256),
      content: z.string().min(1),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const [post] = await ctx.db
      .insert(Post)
      .values({
        title: input.title,
        content: input.content,
      })
      .returning();

    return post;
  });
