import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";
import { queryClient } from "../../index.tsx";
import { useDeleteInsight } from "../../common/hooks/insights/delete-insight.ts";
import { QUERY_KEY } from "../../common/hooks/insights/get-insights.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
};

/**
 * TODO:
 * - Implement virtualized list for better performance
 * - Support filtering, sorting and pagination
 */

export const Insights = ({ insights, className }: InsightsProps) => {
  const { mutate } = useDeleteInsight({
    onSuccess: () => {
      // Refetch after deletion
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
    onError: () => {
      // TODO: Handle error case
    },
  });

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length ? (
          insights.map(({ id, text, createdAt, brand }) => (
            <div className={styles.insight} key={id}>
              <div className={styles["insight-meta"]}>
                <span>{brand}</span>
                <div className={styles["insight-meta-details"]}>
                  <span>{createdAt.toString()}</span>
                  <Trash2Icon
                    data-testid="insight-delete"
                    className={styles["insight-delete"]}
                    onClick={() => mutate(id)}
                  />
                </div>
              </div>
              <p className={styles["insight-content"]}>{text}</p>
            </div>
          ))
        ) : (
          <p>We have no insight!</p>
        )}
      </div>
    </div>
  );
};
