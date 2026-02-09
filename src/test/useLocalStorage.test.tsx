import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../hooks/useLocalStorage";

beforeEach(() => {
  localStorage.clear();
});

describe("useLocalStorage hook", () => {
  test("initializes with default value", () => {
    const { result } = renderHook(() => useLocalStorage("key", 123));
    expect(result.current[0]).toBe(123);
  });

  test("updates value and localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", 123));

    act(() => {
      result.current[1](456);
    });

    expect(result.current[0]).toBe(456);
    expect(localStorage.getItem("key")).toBe("456");
  });
});
