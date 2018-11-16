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

module.exports = {
  noOp,
  createMember,
  createMembers,
  parseOne,
  parseAll
};
