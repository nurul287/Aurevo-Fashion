import { describe, expect, it } from "vitest";
import { quickRepliesForAssistant } from "../ai-chat-widget";

describe("quickRepliesForAssistant", () => {
  it("returns Yes/No for the multi-item question", () => {
    expect(
      quickRepliesForAssistant("Want anything else in this order?"),
    ).toEqual(["Yes", "No"]);
  });

  it("returns Skip for the optional email ask", () => {
    expect(
      quickRepliesForAssistant(
        "What's your email? (optional) — tap Skip if you'd rather not share.",
      ),
    ).toEqual(["Skip"]);
  });

  it("returns null for unrelated assistant replies", () => {
    expect(
      quickRepliesForAssistant("Size 42 is in stock at BDT 2,450."),
    ).toBeNull();
  });
});
