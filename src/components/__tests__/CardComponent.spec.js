import { describe, expect, it } from "vitest";

import CardComponent from "../CardComponent.vue";
import { mount } from "@vue/test-utils";

describe("CardComponent", () => {
  it("renders properly", () => {
    const wrapper = mount(CardComponent, {
      props: {
        title: "Test",
        criterial: "this is a test",
        highestLots: "100",
        highestCPNumber: "['ABC']",
        lowestLots: "0",
        lowestCPNumber: "['DEF']",
      },
    });
    expect(wrapper.text()).toContain("Test");
    expect(wrapper.text()).toContain("this is a test");
    expect(wrapper.text()).toContain("100");
    expect(wrapper.text()).toContain("0");
    expect(wrapper.text()).toContain("ABC");
    expect(wrapper.text()).toContain("DEF");
  });
});
