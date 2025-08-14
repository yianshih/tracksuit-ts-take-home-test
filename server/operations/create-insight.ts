import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  item: insightsTable.InsertItem;
};

export default (input: Input): Insight | undefined => {
  console.log(`Creating insight`, input.item);

  const { item } = input;

  const [row] = input.db.sql<insightsTable.Row>`
    INSERT INTO insights (brand, text, createdAt)
    VALUES (${item.brand}, ${item.text}, ${new Date().toISOString()})
    RETURNING *
  `;

  return row;
};
