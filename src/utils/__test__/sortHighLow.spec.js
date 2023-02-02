import { describe, expect, it } from "vitest";

import { sortCP } from "../sortHighLow.js";

describe("sortCP", () => {
  it("transfrom data properly", () => {
    const test_case = {
      items: [
        {
          timestamp: "2023-02-01T15:48:27+08:00",
          carpark_data: [
            {
              carpark_info: [
                {
                  total_lots: "105",
                  lot_type: "C",
                  lots_available: "5",
                },
              ],
              carpark_number: "HE12",
              update_datetime: "2023-02-01T15:48:00",
            },
          ],
        },
      ],
    };
    const expected = {
      small: {
        // < 100
        highest: { lot_available: null, cp_number: [] },
        lowest: { lot_available: null, cp_number: [] },
      },
      medium: {
        // > 100 < 300
        highest: { lot_available: 5, cp_number: ["HE12"] },
        lowest: { lot_available: 5, cp_number: ["HE12"] },
      },
      big: {
        // > 300 < 400
        highest: { lot_available: null, cp_number: [] },
        lowest: { lot_available: null, cp_number: [] },
      },
      large: {
        // > 400
        highest: { lot_available: null, cp_number: [] },
        lowest: { lot_available: null, cp_number: [] },
      },
      refreshDate: new Date("2023-02-01T07:48:27.000Z"),
    };
    expect(sortCP(test_case)).toStrictEqual(expected);
  });
});

describe("sortCP", () => {
  it("to sum up total lots", () => {
    const test_case = {
      items: [
        {
          timestamp: "2023-02-01T15:48:27+08:00",
          carpark_data: [
            {
              carpark_info: [
                {
                  total_lots: "100",
                  lot_type: "C",
                  lots_available: "5",
                },
                {
                  total_lots: "100",
                  lot_type: "Y",
                  lots_available: "5",
                },
                {
                  total_lots: "100",
                  lot_type: "H",
                  lots_available: "5",
                },
              ],
              carpark_number: "HE12",
              update_datetime: "2023-02-01T15:48:00",
            },
          ],
        },
      ],
    };
    const expected = {
      small: {
        // < 100
        highest: { lot_available: null, cp_number: [] },
        lowest: { lot_available: null, cp_number: [] },
      },
      medium: {
        // > 100 < 300
        highest: { lot_available: null, cp_number: [] },
        lowest: { lot_available: null, cp_number: [] },
      },
      big: {
        // > 300 < 400
        highest: { lot_available: 15, cp_number: ["HE12"] },
        lowest: { lot_available: 15, cp_number: ["HE12"] },
      },
      large: {
        // > 400
        highest: { lot_available: null, cp_number: [] },
        lowest: { lot_available: null, cp_number: [] },
      },
      refreshDate: new Date("2023-02-01T07:48:27.000Z"),
    };
    expect(sortCP(test_case)).toStrictEqual(expected);
  });
});

describe("sortCP", () => {
  it("set highest and lowest carpark number", () => {
    const test_case = {
      items: [
        {
          timestamp: "2023-02-01T15:48:27+08:00",
          carpark_data: [
            {
              carpark_info: [
                {
                  total_lots: "105",
                  lot_type: "C",
                  lots_available: "5",
                },
              ],
              carpark_number: "LOWEST",
              update_datetime: "2023-02-01T15:48:00",
            },
            {
              carpark_info: [
                {
                  total_lots: "205",
                  lot_type: "C",
                  lots_available: "105",
                },
              ],
              carpark_number: "HE12",
              update_datetime: "2023-02-01T15:48:00",
            },
            {
              carpark_info: [
                {
                  total_lots: "299",
                  lot_type: "C",
                  lots_available: "299",
                },
              ],
              carpark_number: "HIGHEST",
              update_datetime: "2023-02-01T15:48:00",
            },
          ],
        },
      ],
    };
    const expected = {
      small: {
        // < 100
        highest: { lot_available: null, cp_number: [] },
        lowest: { lot_available: null, cp_number: [] },
      },
      medium: {
        // > 100 < 300
        highest: { lot_available: 299, cp_number: ["HIGHEST"] },
        lowest: { lot_available: 5, cp_number: ["LOWEST"] },
      },
      big: {
        // > 300 < 400
        highest: { lot_available: null, cp_number: [] },
        lowest: { lot_available: null, cp_number: [] },
      },
      large: {
        // > 400
        highest: { lot_available: null, cp_number: [] },
        lowest: { lot_available: null, cp_number: [] },
      },
      refreshDate: new Date("2023-02-01T07:48:27.000Z"),
    };
    expect(sortCP(test_case)).toStrictEqual(expected);
  });
});
