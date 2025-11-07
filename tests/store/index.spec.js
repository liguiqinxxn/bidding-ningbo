import { describe, it, expect } from "vitest";
import store from "@/store/index.ts";

describe("Store", () => {
  it("should have initial state", () => {
    expect(store.state.userInfo).toEqual({
      uid: "",
      level: "",
      logo: "",
      info: "",
      name: "",
    });
    expect(store.state.keyword).toBe("");
    expect(store.state.isFloating).toBe(false);
  });

  it("should mutate userInfo", () => {
    const newUserInfo = {
      uid: "123",
      level: "admin",
      logo: "logo.png",
      info: "Admin user",
      name: "Admin",
    };

    store.commit("setUserInfo", newUserInfo);
    expect(store.state.userInfo).toEqual(newUserInfo);
  });

  it("should mutate keyword", () => {
    store.commit("setKeyword", "test keyword");
    expect(store.state.keyword).toBe("test keyword");
  });

  it("should mutate isFloating", () => {
    store.commit("setIsFloating", true);
    expect(store.state.isFloating).toBe(true);
  });
});
