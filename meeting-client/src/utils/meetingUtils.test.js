import { getTimeTable } from "./meetingUtil";

describe("meetingUtils test", () => {
  it("getTimeTable should be return an array of 24 item", () => {
    expect(getTimeTable()).toHaveLength(24);
  });
});
