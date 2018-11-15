import test from "ava";
import * as Cmd from "./index";

test("should roll one", t => {
  const { command } = Cmd.parse("!roll");
  t.is("ROLL_ONE", command);
});

test("should roll one with die size", t => {
  const { command, args } = Cmd.parse("!roll 13");
  t.is("ROLL_ONE", command);
  t.is(13, args[0]);
});

test("should roll one, but smooshed die size will be ignored", t => {
  const { command, args } = Cmd.parse("!roll13");
  t.is("ROLL_ONE", command);
  t.is(undefined, args[0]);
});

test("should roll one with lots of trash at end of command", t => {
  const { command, args } = Cmd.parse("!roll blah blah ! asd/)*asdfdsaf lsjf;");
  t.is("ROLL_ONE", command);
  t.is(undefined, args[0]);
});

test("should roll one but ignore 0 die size", t => {
  const { command, args } = Cmd.parse("!roll 0");
  t.is("ROLL_ONE", command);
  t.is(undefined, args[0]);
});

test("should roll one but ignore negative die size", t => {
  const { command, args } = Cmd.parse("!roll -1");
  t.is("ROLL_ONE", command);
  t.is(undefined, args[0]);
});

test("should not roll one if line does not start with command", t => {
  const { command } = Cmd.parse(" !roll");
  t.is(undefined, command);
});

test("should roll all", t => {
  const { command } = Cmd.parse("!rollall");
  t.is("ROLL_ALL", command);
});

test("should roll all with die size", t => {
  const { command, args } = Cmd.parse("!rollall 13");
  t.is("ROLL_ALL", command);
  t.is(13, args[0]);
});

test("should roll all but ignore trash die size", t => {
  const { command, args } = Cmd.parse("!rollall thirteen");
  t.is("ROLL_ALL", command);
  t.is(undefined, args[0]);
});
