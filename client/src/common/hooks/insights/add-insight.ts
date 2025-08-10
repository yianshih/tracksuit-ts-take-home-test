import {
  type DefaultError,
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { createInsight } from "../../../common/api/insight.ts";
import type { Insight } from "../../../schemas/insight.ts";

export const useAddInsight = (
  options: UseMutationOptions<
    Insight,
    DefaultError,
    Omit<Insight, "id" | "createdAt">
  >,
) => {
  return useMutation({
    mutationFn: createInsight,
    ...options,
  });
};
