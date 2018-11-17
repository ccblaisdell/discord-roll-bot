import test from "ava";
import Roller from "../src/roller";
import { createMember, createMembers, parseOne, parseAll } from "./testUtils";

test("should roll one", t => {
  let member = createMember();
  let result = Roller.handleMessage("!roll", member, []);
  let parsedResult = parseOne(result);
  t.is(member.displayName, parsedResult.name);
  t.true(result.includes("rolled"));
});

test("should roll all", t => {
  let members = createMembers(10);
  let result = Roller.handleMessage("!rollall", members[0], members);
  t.true(result.includes("```"));
});

test("should sort rolls", t => {
  let members = createMembers(10);
  let result = parseAll(Roller.handleMessage("!rollall", members[0], members));
  let { isValid } = result.lines.reduce(
    (acc, line) => {
      let isValid = acc.lastValue >= line.value;
      return { lastValue: line.value, isValid };
    },
    { lastValue: 101, isValid: true }
  );
  t.true(isValid);
});

test("should split into parties", t => {
  let members = createMembers(8);
  let result = Roller.handleMessage("!rollall", members[0], members);
  t.is("", result.split("\n")[6]);
});

test("should not include bots", t => {
  let bot = createMember({ displayName: "bot", bot: true });
  let members = createMembers(3).concat(bot);
  let result = parseAll(Roller.handleMessage("!rollall", members[0], members));
  let botResults = result.lines.filter(line => line.name === bot.displayName);
  t.is(0, botResults.length);
});

test("should not include offline or afk", t => {
  let offline = createMember({ displayName: "offline", status: "offline" });
  let idle = createMember({ displayName: "idle", status: "idle" });
  let dnd = createMember({ displayName: "dnd", status: "dnd" });
  let members = createMembers(5).concat([offline, idle, dnd]);
  let result = parseAll(Roller.handleMessage("!rollall", members[0], members));
  t.is(5, result.lines.length);
});

test("should respect die size args for group", t => {
  let members = createMembers(10);
  let result = parseAll(
    Roller.handleMessage("!rollall 1", members[0], members)
  );
  t.true(result.lines.every(line => line.value <= 1));
});

test("should respect die size args for individual roll", t => {
  let maxValue = 0;
  let member = createMember();
  for (let i = 0; i < 100; i++) {
    let result = parseOne("!roll 1", member, []);
    maxValue = result.value > maxValue ? result.value : maxValue;
  }
  t.true(maxValue <= 1);
});
