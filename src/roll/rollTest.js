import test from "ava";
import * as Roll from "./index";

test("should roll one", t => {
  const result = Roll.one(createMember());
  t.pass(result.includes("**grif**"));
  t.pass(result.includes("rolled"));
});

test("should roll group", t => {
  const member_1 = createMember({ displayName: "grif" });
  const member_2 = createMember({ displayName: "hop" });
  const member_3 = createMember({ displayName: "stu" });
  const result = Roll.group([member_1, member_2, member_3]);
  t.pass(result.includes("```"));
  t.pass(result.includes(": grif"));
  t.pass(result.includes(": hop"));
  t.pass(result.includes(": stu"));
});

test("should sort rolls", t => {
  let members = createMembers(5);
  let result = Roll.group(members);
  let values = result
    .split("\n")
    .filter(line => line.includes(":"))
    .map(line => line.split(":")[0]);
  t.pass(
    values[0] >= values[1] &&
      values[1] >= values[2] &&
      values[2] >= values[3] &&
      values[3] >= values[4]
  );
});

test("should split into parties", t => {
  let members = createMembers(8);
  let result = Roll.group(members);
  t.pass(result.split("\n")[6] === "");
});

test("should not include bots", t => {
  let members = createMembers(3);
  let bot = createMember({ displayName: "bot", user: { bot: true } });
  let result = Roll.group(members.concat(bot));
  let botResults = result
    .split("\n")
    .filter(line => line.includes(":"))
    .map(line => line.split(":")[1])
    .filter(name => name === bot.name);
  t.pass(botResults.length === 0);
});

test("should not include offline or afk", t => {
  let members = createMembers(3);
  let offline = createMember({
    displayName: "offline",
    presence: { status: "offline" }
  });
  let idle = createMember({
    displayName: "idle",
    presence: { status: "idle" }
  });
  let result = Roll.group(members.concat([offline, idle]));
  let filteredResults = result
    .split("\n")
    .filter(line => line.includes(":"))
    .map(line => line.split(":")[1])
    .filter(name => name === "offline" || name === "idle");
  t.pass(filteredResults.length === 0);
});

/*
 * HELPERS
 */

function createMember(overrides = {}) {
  return {
    displayName: "grif",
    presence: {
      status: "online"
    },
    user: {
      bot: false
    },
    ...overrides
  };
}

function createMembers(n) {
  const names = [
    "grif",
    "hop",
    "stu",
    "logan",
    "ging",
    "colby",
    "dicer",
    "farouk",
    "skizzie",
    "ron"
  ];
  return names.slice(0, n).map(displayName => {
    return createMember({ displayName });
  });
}
