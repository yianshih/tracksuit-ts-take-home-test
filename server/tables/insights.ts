import type { Insight } from "$models/insight.ts";

export const createTable = `
  CREATE TABLE insights (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    brand INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    text TEXT NOT NULL
  )
`;

export type Row = Insight;

export type InsertItem = Omit<Row, "id">;

export const insertStatement = (item: InsertItem) =>
  `INSERT INTO insights (brand, createdAt, text) VALUES (${item.brand}, '${item.createdAt.toISOString()}', '${item.text}')`;
