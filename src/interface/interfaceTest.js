import test from "ava";
import Roller from "./interface";
import sinon from "sinon";

test("should roll one", t => {
  const sendFn = sinon.spy();
  let member = createMember();
  let result = Roller.handleMessage("!roll", member, [], sendFn);
  let parsedResult = parseOne(result);
  t.true(sendFn.called);
  t.is(member.displayName, parsedResult.name);
  t.true(result.includes("rolled"));
});

test("should roll all", t => {
  const sendFn = sinon.spy();
  let members = createMembers(10);
  let result = Roller.handleMessage("!rollall", members[0], members, sendFn);
  t.true(sendFn.called);
  t.true(result.includes("```"));
});

test("should sort rolls", t => {
  let members = createMembers(10);
  let result = parseAll(
    Roller.handleMessage("!rollall", members[0], members, noOp)
  );
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
  let result = Roller.handleMessage("!rollall", members[0], members, noOp);
  t.is("", result.split("\n")[6]);
});

test("should not include bots", t => {
  let bot = createMember({ displayName: "bot", bot: true });
  let members = createMembers(3).concat(bot);
  let result = parseAll(
    Roller.handleMessage("!rollall", members[0], members, noOp)
  );
  let botResults = result.lines.filter(line => line.name === bot.displayName);
  t.is(0, botResults.length);
});

test("should not include offline or afk", t => {
  let offline = createMember({ displayName: "offline", status: "offline" });
  let idle = createMember({ displayName: "idle", status: "idle" });
  let dnd = createMember({ displayName: "dnd", status: "dnd" });
  let members = createMembers(5).concat([offline, idle, dnd]);
  let result = parseAll(
    Roller.handleMessage("!rollall", members[0], members, noOp)
  );
  t.is(5, result.lines.length);
});

test("should respect die size args for group", t => {
  let members = createMembers(10);
  let result = parseAll(
    Roller.handleMessage("!rollall 1", members[0], members, noOp)
  );
  t.true(result.lines.every(line => line.value <= 1));
});

test("should respect die size args for individual roll", t => {
  let maxValue = 0;
  let member = createMember();
  for (let i = 0; i < 100; i++) {
    let result = parseOne("!roll 1", member, [], noOp);
    maxValue = result.value > maxValue ? result.value : maxValue;
  }
  t.true(maxValue <= 1);
});

//

const noOp = () => {};

function createMember(memberAttrs = {}) {
  const { displayName = "grif", status = "online", bot = false } = memberAttrs;
  return {
    displayName,
    presence: {
      status
    },
    user: {
      bot
    }
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

function parseOne(text) {
  let split = text.split("**");
  let name = split[1];
  let value = parseInt(split[3]);
  return { name, value, text };
}

function parseAll(text) {
  let lines = text
    .split("\n")
    .filter(line => line.includes(":"))
    .map(line => {
      let [value, name] = line.split(":");
      return {
        text: line,
        value: parseInt(value.trim()),
        name: name.trim()
      };
    });
  return { lines, text };
}
