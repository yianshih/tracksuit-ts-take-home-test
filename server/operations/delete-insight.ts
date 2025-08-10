import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): void => {
  console.log(`Deleting insight`);

  input.db.sql<insightsTable.Row>`
    DELETE FROM insights
    WHERE id = ${input.id}
  `;
};
