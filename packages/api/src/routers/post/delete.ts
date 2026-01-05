import { z } from "zod/v4";
import { eq, Post } from "@spilwood/db";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";

export const deletePost = protectedProcedure
  .input(
    z.object({
      id: z.string().uuid(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const existing = await ctx.db.query.Post.findFirst({
      where: eq(Post.id, input.id),
    });

    if (!existing) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Пост не найден",
      });
    }

    await ctx.db.delete(Post).where(eq(Post.id, input.id));

    return { success: true };
  });
