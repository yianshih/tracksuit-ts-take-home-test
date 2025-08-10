import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";
import type { InsertItem } from "$tables/insights.ts";

describe("creating insight to database", () => {
  describe("inserting into DB", () => {
    withDB((fixture) => {
      it("creates an insight", () => {
        const insight: InsertItem = {
          brand: 0,
          text: "New Insight",
          createdAt: new Date(),
        };
        const result = createInsight({ ...fixture, item: insight });
        expect(result).toEqual({
          ...insight,
          createdAt: insight.createdAt.toISOString(),
          id: expect.any(Number),
        });
      });
    });
  });
});
