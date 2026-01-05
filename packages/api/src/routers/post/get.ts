import { z } from "zod/v4";
import { eq, Post } from "@spilwood/db";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../trpc";

export const get = publicProcedure
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .query(async ({ input, ctx }) => {
    const post = await ctx.db.query.Post.findFirst({
      where: eq(Post.id, input.id),
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Пост не найден",
      });
    }

    return post;
  });
