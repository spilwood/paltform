import type { TRPCRouterRecord } from "@trpc/server";

import { create } from "./create";
import { deletePost } from "./delete";
import { get } from "./get";
import { list } from "./list";
import { update } from "./update";

export const postRouter = {
  list,
  get,
  create,
  update,
  delete: deletePost,
} satisfies TRPCRouterRecord;
