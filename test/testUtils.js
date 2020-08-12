function createMember(memberAttrs = {}) {
  const {
    displayName = "grif",
    status = "online",
    bot = false,
    id = 1,
  } = memberAttrs;
  return {
    displayName,
    id,
    presence: {
      status,
    },
    user: {
      bot,
    },
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
    "ron",
    "token",
    "tacocat",
  ];
  return names.slice(0, n).map((displayName, idx) => {
    return createMember({ displayName, id: idx });
  });
}

function createChannel(name, numMembers = 10, opts = {}) {
  return {
    name,
    members: createMembers(numMembers),
    type: "voice",
    ...opts,
  };
}

// parse result text

function parseOne(text) {
  let split = text.split("**");
  let name = split[1];
  let value = parseInt(split[3]);
  return { name, value, text };
}

function parseAll(text) {
  let lines = text
    .split("\n")
    .filter((line) => line.includes(":"))
    .map((line) => {
      let [value, name] = line.split(":");
      return {
        text: line,
        value: parseInt(value.trim()),
        name: name.trim(),
      };
    });
  return { lines, text };
}

module.exports = {
  createChannel,
  createMember,
  createMembers,
  parseOne,
  parseAll,
};
