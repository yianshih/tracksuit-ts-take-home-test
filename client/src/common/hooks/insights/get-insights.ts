import { useQuery } from "@tanstack/react-query";
import type { Insight } from "../../../schemas/insight.ts";
import { getInsights } from "../../api/insight.ts";

export const QUERY_KEY = ["getInsights"];

export const useGetInsights = () => {
  return useQuery<Insight[]>({
    queryKey: QUERY_KEY,
    initialData: [],
    queryFn: getInsights,
  });
};
