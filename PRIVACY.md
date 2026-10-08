# Privacy Policy

_Effective: October 7, 2026_

This policy explains what data RollBot ("the bot") accesses, how it is used, and how long it is
kept. The bot's full source code is public at
<https://github.com/ccblaisdell/discord-roll-bot>, so you can verify everything described here.

## Data the bot accesses

When the bot is in your server, Discord provides it with the following information, which the
bot holds in memory while it is running:

- **Server information:** server name and ID, and the names and types of its channels.
- **Voice channel membership:** which members are currently in which voice channels.
- **Member information:** user IDs, display names, and whether an account is a bot.
- **Commands you run:** the slash command you used and its options (such as a channel name or
  die size).

## How the data is used

This data is used only to respond to commands: to find the members of the requested voice
channels, roll for them, and post their display names alongside the results. The bot skips
other bots when rolling for a group.

## What is stored

- **No database.** The bot does not save roll results, messages, or member information. Data
  held in memory is discarded when the bot restarts.
- **Server logs.** When the bot starts, it writes the names and IDs of the servers it is in to
  its process log on the host machine. These logs are used only to operate the bot.
- **Error reports.** If the bot hits an unexpected error, a report is sent to
  [Sentry](https://sentry.io), an error-monitoring service, to help fix the bug. A report
  contains technical details about the error (such as a stack trace) and may include
  information about the command that caused it.

## Sharing

The bot does not sell or share data with anyone. Beyond Discord itself, the only third parties
involved are the services that run the bot:
[DigitalOcean](https://www.digitalocean.com/legal/privacy-policy) (hosting) and
[Sentry](https://sentry.io/privacy/) (error reports).

## Your choices

- Server admins can remove the bot from a server at any time, which immediately stops it from
  receiving any data from that server.
- Since the bot keeps no stored record of members or rolls, there is no personal data to
  export or delete. If you want any log entries or error reports relating to your server
  removed, open an issue (see below).

## Children

The bot is meant for use on Discord, which requires users to meet its minimum age
requirements. The bot does not knowingly collect any data beyond what is described above.

## Changes

This policy may be updated from time to time. Changes are published in this file, and the
history is visible in the repository.

## Contact

Questions or requests about privacy can be raised by opening an issue at
<https://github.com/ccblaisdell/discord-roll-bot/issues>.
