import test from "ava";
import Roller from "../src/roller";
import {
  createChannel,
  createMember,
  createMembers,
  parseOne,
  parseAll,
} from "./testUtils";

test("should roll one", (t) => {
  let member = createMember();
  let result = Roller.handleMessage({
    text: "!rollme",
    member,
  });
  let parsedResult = parseOne(result);
  t.is(member.displayName, parsedResult.name);
  t.true(result.includes("rolled"));
});

test("should roll all with just `!r`", (t) => {
  let channels = [createChannel("bingo", 10), createChannel("foobar", 4)];
  const msg = {
    text: "!r",
    member: createMember(),
    channels,
  };
  const resp = Roller.handleMessage(msg);
  let result = parseAll(resp);
  t.true(result.text.includes("```"));
  t.is(10, result.lines.length);
  t.true(result.lines.every((line) => Number.isInteger(line.value)));
});

test("command should not be case sensitive", (t) => {
  let channels = [createChannel("bingo", 10), createChannel("foobar", 4)];
  let commands = ["!r", "!R", "!rOlL", "!ROLLall"];
  for (let cmd of commands) {
    const msg = {
      text: cmd,
      member: createMember(),
      channels,
    };
    const resp = Roller.handleMessage(msg);
    let result = parseAll(resp);
    t.true(result.text.includes("```"));
    t.is(10, result.lines.length);
    t.true(result.lines.every((line) => Number.isInteger(line.value)));
  }
});

test("should roll all", (t) => {
  let channels = [createChannel("bingo", 10), createChannel("foobar", 4)];
  let result = parseAll(
    Roller.handleMessage({
      text: "!roll",
      member: createMember(),
      channels,
    })
  );
  t.true(result.text.includes("```"));
  t.is(10, result.lines.length);
  t.true(result.lines.every((line) => Number.isInteger(line.value)));
});

test("should sort rolls", (t) => {
  let channels = [createChannel("bingo", 10), createChannel("foobar", 4)];
  let result = parseAll(
    Roller.handleMessage({
      text: "!rollall",
      member: createMember(),
      channels,
    })
  );
  let { isValid } = result.lines.reduce(
    (acc, line) => {
      let isValid = acc.isValid && acc.lastValue >= line.value;
      return { lastValue: line.value, isValid };
    },
    { lastValue: 101, isValid: true }
  );
  t.true(isValid);
});

test("should split into parties", (t) => {
  let channels = [createChannel("bingo", 6), createChannel("foobar", 4)];
  let result = Roller.handleMessage({
    text: "!rollall",
    member: createMember(),
    channels,
  });
  t.is("", result.split("\n")[6]);
});

test("should not include bots", (t) => {
  let bot = createMember({ displayName: "bot", bot: true });
  let members = createMembers(5).set("bot", bot);
  let channels = [
    createChannel("bingo", 6, { members }),
    createChannel("foobar", 4),
  ];
  let result = parseAll(
    Roller.handleMessage({
      text: "!rollall",
      member: createMember(),
      channels,
    })
  );
  let botResults = result.lines.filter((line) => line.name === bot.displayName);
  t.is(0, botResults.length);
});

test("should not include offline or afk", (t) => {
  let offline = createMember({ displayName: "offline", status: "offline" });
  let idle = createMember({ displayName: "idle", status: "idle" });
  let dnd = createMember({ displayName: "dnd", status: "dnd" });
  let members = createMembers(5)
    .set("offline", offline)
    .set("idle", idle)
    .set("dnd", dnd);
  let channels = [createChannel("bingo", 0, { members })];
  let result = parseAll(
    Roller.handleMessage({
      text: "!rollall",
      member: createMember(),
      channels,
    })
  );
  t.is(5, result.lines.length);
  t.true(result.lines.every((line) => line.name !== offline.displayName));
  t.true(result.lines.every((line) => line.name !== idle.displayName));
  t.true(result.lines.every((line) => line.name !== dnd.displayName));
});

test("should respect die size args for group", (t) => {
  let channels = [createChannel("bingo", 6), createChannel("foobar", 4)];
  let result = parseAll(
    Roller.handleMessage({
      text: "!rollall 1",
      member: createMember(),
      channels,
    })
  );
  t.true(result.lines.every((line) => line.value <= 1));
});

test("should respect die size args for individual roll", (t) => {
  let maxValue = 0;
  let member = createMember();
  for (let i = 0; i < 100; i++) {
    let result = parseOne(Roller.handleMessage({ text: "!rollme 1", member }));
    t.log(result);
    maxValue = result.value > maxValue ? result.value : maxValue;
  }
  t.true(maxValue <= 1);
});

test("should roll only matching voice channel without `rollchannel`", (t) => {
  let channel = createChannel("bingo", 6);
  let result = parseAll(
    Roller.handleMessage({
      text: "!roll bingo",
      member: createMember(),
      channels: [channel],
    })
  );
  t.is(6, result.lines.length);
});

test("should roll only matching voice channel", (t) => {
  let channel = createChannel("bingo", 6);
  let result = parseAll(
    Roller.handleMessage({
      text: "!rollchannel bingo",
      member: createMember(),
      channels: [channel],
    })
  );
  t.is(6, result.lines.length);
});

test("should roll partially matching voice channel", (t) => {
  let channel = createChannel("bingo", 6);
  let result = parseAll(
    Roller.handleMessage({
      text: "!roll bin",
      member: createMember(),
      channels: [channel],
    })
  );
  t.is(6, result.lines.length);
});

test("should roll only matching voice channel and respect die size", (t) => {
  let channels = [createChannel("bingo", 6), createChannel("foobar", 4)];
  let result = parseAll(
    Roller.handleMessage({
      text: "!rollchannel 1 bingo",
      member: createMember(),
      channels,
    })
  );
  let result2 = parseAll(
    Roller.handleMessage({
      text: "!rollchannel foobar 1",
      member: createMember(),
      channels,
    })
  );
  t.is(6, result.lines.length);
  t.is(4, result2.lines.length);
});

test("rollchannel should require a channel name", (t) => {
  let channels = [createChannel("bingo", 6), createChannel("foobar", 4)];
  let result = parseAll(
    Roller.handleMessage({
      text: "!rollchannel",
      member: createMember(),
      channels,
    })
  );
  t.true(result.text.toLowerCase().includes("must"));
});

test("rollchannel should not be case sensitive", (t) => {
  let channels = [createChannel("bingo", 6), createChannel("foobar", 4)];
  let result = parseAll(
    Roller.handleMessage({
      text: "!rollchannel BiNgO",
      member: createMember(),
      channels,
    })
  );
  t.is(6, result.lines.length);
});

test("rollchannel should notify if there are no matching channels", (t) => {
  let channels = [createChannel("bingo", 6), createChannel("foobar", 4)];
  let result = parseAll(
    Roller.handleMessage({
      text: "!rollchannel bingpot",
      member: createMember(),
      channels,
    })
  );
  t.true(result.text.toLowerCase().includes("match"));
});
