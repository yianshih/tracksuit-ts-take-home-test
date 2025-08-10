import {
  type DefaultError,
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { deleteInsight } from "../../api/insight.ts";

export const useDeleteInsight = (
  options?: UseMutationOptions<
    void,
    DefaultError,
    number
  >,
) => {
  return useMutation({
    mutationFn: (id: number) => deleteInsight(id),
    ...options,
  });
};
