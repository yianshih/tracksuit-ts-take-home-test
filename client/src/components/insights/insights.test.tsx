const { mockMutate, mockUseDeleteInsight, mockInvalidateQueries } = vi.hoisted(
  () => {
    const mockMutate = vi.fn();
    const mockUseDeleteInsight = vi.fn(() => ({ mutate: mockMutate }));
    const mockInvalidateQueries = vi.fn();
    return { mockMutate, mockUseDeleteInsight, mockInvalidateQueries };
  },
);

vi.mock("../../index.tsx", () => ({
  queryClient: {
    invalidateQueries: mockInvalidateQueries,
  },
}));

vi.mock("../../common/hooks/insights/delete-insight.ts", () => ({
  useDeleteInsight: mockUseDeleteInsight,
}));

import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Insights } from "./insights.tsx";
import type { Insight } from "../../schemas/insight.ts";

const TEST_INSIGHTS: Insight[] = [
  {
    id: 1,
    brand: 1,
    createdAt: new Date(),
    text: "Test insight",
  },
  { id: 2, brand: 2, createdAt: new Date(), text: "Another test insight" },
];

describe("insights", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders", () => {
    const { getByText } = render(<Insights insights={TEST_INSIGHTS} />);
    expect(getByText(TEST_INSIGHTS[0].text)).toBeTruthy();
  });

  it("triggers delete insight", async () => {
    const { findAllByTestId } = render(<Insights insights={TEST_INSIGHTS} />);
    const deleteButton = await findAllByTestId("insight-delete");

    expect(deleteButton.length).toBe(TEST_INSIGHTS.length);

    fireEvent.click(deleteButton[0]);
    expect(mockMutate).toHaveBeenCalledWith(TEST_INSIGHTS[0].id);
  });
});
