# Installation

[Invite this bot](https://discordapp.com/oauth2/authorize?client_id=511278542969896962&scope=bot+applications.commands)
to your server.

# Usage

The bot has two slash commands: `/roll` (with `all`, `self`, and `channel` subcommands) and `/r`, a quick shorthand. Type one of these into any text room while the bot is online, and it will respond with results.

## /roll self [die_size]

Roll a single 100-sided (or `die_size`-sided) die for you, and respond with the results for everyone to see.

> `/roll self`  
> Rollbot [bot] **ccblaisdell** rolled **67**
>
> `/roll self die_size:6`  
> Rollbot [bot] **ccblaisdell** rolled **2**

## /roll all [die_size]

Roll dice for everyone in the room who is not offline, idle, or dnd. It will respond with
the results in descending order.

> `/roll all`  
> Rollbot [bot]
> ```
>  67: ccblaisdell
>  48: Someone else
>   1: unlucky schmuck
> ```

> `/roll all die_size:6`  
> Rollbot [bot]
> ```
>   6: ccblaisdell
>   3: Someone else
>   1: unlucky schmuck
> ```

## /roll channel channel:channel_name [die_size]

Roll dice for everyone in every channel that partially matches `channel_name`.

> `/roll channel channel:voice`  
> Rollbot [bot]
> ```
>  67: ccblaisdell
>  48: Someone else
>   1: unlucky schmuck
> ```

## /r [channel] [die_size]

Shorthand: rolls a specific channel if you name one, otherwise rolls everyone (same as `/roll all`).

> `/r`  
> Rollbot [bot]
> ```
>  67: ccblaisdell
>  48: Someone else
>   1: unlucky schmuck
> ```
>
> `/r channel:voice`  
> Rollbot [bot]
> ```
>  67: ccblaisdell
>  48: Someone else
>   1: unlucky schmuck
> ```
