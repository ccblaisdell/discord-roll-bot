const DIE_SIZE_OPTION = {
  name: "die_size",
  description: "Size of the die to roll (default 100)",
  type: "INTEGER",
  required: false,
};

const CHANNEL_NAME_OPTION = {
  name: "channel",
  description: "Voice channel name (partial match allowed)",
  type: "STRING",
  required: false,
};

module.exports = [
  {
    name: "roll",
    description: "Roll dice",
    options: [
      {
        name: "all",
        description: "Roll for everyone in every non-AFK voice channel",
        type: "SUB_COMMAND",
        options: [DIE_SIZE_OPTION],
      },
      {
        name: "self",
        description: "Roll a single die for yourself",
        type: "SUB_COMMAND",
        options: [DIE_SIZE_OPTION],
      },
      {
        name: "channel",
        description: "Roll for everyone in a matching voice channel",
        type: "SUB_COMMAND",
        options: [
          { ...CHANNEL_NAME_OPTION, required: true },
          DIE_SIZE_OPTION,
        ],
      },
    ],
  },
  {
    name: "r",
    description:
      "Quick roll: everyone, or just a channel if you name one",
    options: [CHANNEL_NAME_OPTION, DIE_SIZE_OPTION],
  },
];
