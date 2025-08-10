import { Insight } from "../../schemas/insight.ts";

// TODO: Add fetch utility function to reduce duplication

export const getInsights = async (): Promise<Insight[]> => {
  const response = await fetch(`/api/insights`);
  if (!response.ok) {
    throw new Error("Failed to fetch insights");
  }

  const json = await response.json() as Insight[];

  return json.map((item) => Insight.parse(item));
};

export const createInsight = async (
  insight: Omit<Insight, "id" | "createdAt">,
): Promise<Insight> => {
  const response = await fetch(`/api/insights/create`, {
    method: "POST",
    body: JSON.stringify(insight),
  });
  if (!response.ok) {
    throw new Error("Failed to create insight");
  }

  const json = await response.json() as Insight;

  return Insight.parse(json);
};

export const deleteInsight = async (id: number): Promise<void> => {
  const response = await fetch(`/api/insights/delete/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete insight");
  }
};
