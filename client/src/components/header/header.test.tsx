const { mockUseAddInsight, mockInvalidateQueries } = vi.hoisted(() => {
  const mockMutate = vi.fn();
  const mockUseAddInsight = vi.fn(() => ({ mutate: mockMutate }));
  const mockInvalidateQueries = vi.fn();
  return { mockMutate, mockUseAddInsight, mockInvalidateQueries };
});

vi.mock("../../index.tsx", () => ({
  queryClient: {
    invalidateQueries: mockInvalidateQueries,
  },
}));

vi.mock("../../common/hooks/insights/add-insight.ts", () => ({
  useAddInsight: mockUseAddInsight,
}));

import { describe, expect, it, vi } from "vitest";
import { Header, HEADER_TEXT } from "./header.tsx";
import { render } from "@testing-library/react";

describe("header", () => {
  it("renders", () => {
    const { getByText } = render(<Header />);
    expect(getByText(HEADER_TEXT)).toBeTruthy();
  });
});
