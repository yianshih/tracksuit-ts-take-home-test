const { mockMutate, mockUseAddInsight, mockInvalidateQueries } = vi.hoisted(
  () => {
    const mockMutate = vi.fn();
    const mockUseAddInsight = vi.fn(() => ({ mutate: mockMutate }));
    const mockInvalidateQueries = vi.fn();
    return { mockMutate, mockUseAddInsight, mockInvalidateQueries };
  },
);

vi.mock("../../index.tsx", () => ({
  queryClient: {
    invalidateQueries: mockInvalidateQueries,
  },
}));

vi.mock("../../common/hooks/insights/add-insight.ts", () => ({
  useAddInsight: mockUseAddInsight,
}));

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { AddInsight } from ".//add-insight.tsx";

const mockOnClose = vi.fn();

describe("add insights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders add insight modal", () => {
    const { getByText } = render(<AddInsight open onClose={mockOnClose} />);
    expect(getByText("Add a new insight")).toBeTruthy();
  });

  it("triggers the submission", () => {
    const { getByText } = render(<AddInsight open onClose={mockOnClose} />);

    const submitButton = getByText("Add insight");

    fireEvent.click(submitButton);

    expect(mockMutate).toHaveBeenCalledTimes(1);
  });
});
