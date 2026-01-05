import { z } from "zod/v4";
import { eq, Post } from "@spilwood/db";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";

export const update = protectedProcedure
  .input(
    z.object({
      id: z.string().uuid(),
      title: z.string().min(1).max(256).optional(),
      content: z.string().min(1).optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { id, ...data } = input;

    const existing = await ctx.db.query.Post.findFirst({
      where: eq(Post.id, id),
    });

    if (!existing) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Пост не найден",
      });
    }

    const [updated] = await ctx.db
      .update(Post)
      .set(data)
      .where(eq(Post.id, id))
      .returning();

    return updated;
  });
