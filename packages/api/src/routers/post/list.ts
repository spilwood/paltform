import { desc, Post } from "@spilwood/db";
import { publicProcedure } from "../../trpc";

export const list = publicProcedure.query(async ({ ctx }) => {
  return await ctx.db.query.Post.findMany({
    orderBy: [desc(Post.createdAt)],
  });
});
