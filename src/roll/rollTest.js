import test from "ava";
import * as Roll from "./index";
import { castDie } from "./utils";

test("should roll one", t => {
  const result = Roll.one(createMember());
  t.true(result.includes("**grif**"));
  t.true(result.includes("rolled"));
});

test("should roll group", t => {
  const member_1 = createMember({ displayName: "grif" });
  const member_2 = createMember({ displayName: "hop" });
  const member_3 = createMember({ displayName: "stu" });
  const result = Roll.group([member_1, member_2, member_3]);
  t.true(result.includes("```"));
  t.true(result.includes(": grif"));
  t.true(result.includes(": hop"));
  t.true(result.includes(": stu"));
});

test("should sort rolls", t => {
  let members = createMembers(5);
  let result = Roll.group(members);
  let values = result
    .split("\n")
    .filter(line => line.includes(":"))
    .map(line => line.split(":")[0]);
  t.true(
    values[0] >= values[1] &&
      values[1] >= values[2] &&
      values[2] >= values[3] &&
      values[3] >= values[4]
  );
});

test("should split into parties", t => {
  let members = createMembers(8);
  let result = Roll.group(members);
  t.is("", result.split("\n")[6]);
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
  t.is(0, botResults.length);
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
  t.is(0, filteredResults.length);
});

test("should respect die size args for group", t => {
  let members = createMembers(10);
  let result = Roll.group(members, 1);
  let values = result
    .split("\n")
    .filter(line => line.includes(":"))
    .map(line => line.trim().split(":")[0])
    .map(digit => parseInt(digit));
  t.true(values.every(value => value <= 1));
});

test("should respect die size args for individual roll", t => {
  let maxValue = 0;
  for (let i = 0; i < 100; i++) {
    let member = createMember();
    let result = Roll.one(member, 1);
    let value = parseInt(result.split("**")[3]);
    maxValue = value > maxValue ? value : maxValue;
  }
  t.true(maxValue <= 1);
});

test("should ignore bad arguments to castDie", t => {
  let value = castDie("blah");
  t.true(Number.isInteger(value));
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

function createMembers(n = 10) {
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
