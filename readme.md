# Installation

[Invite this bot](https://discordapp.com/oauth2/authorize?client_id=511278542969896962&scope=bot) 
to your server.

# Usage

The bot has two commands, `!roll` and `!rollall`. Type one of these commands into your text
room while the bot is online, and it will respond with results.

## !roll [die_size]

Roll a single 100-sided (or `die_size`-sided) die for you, and respond with the results for everone to see.

> `!roll`  
> Rollbot [bot] **ccblaisdell** rolled **67**
>
> `!roll 6`  
> Rollbot [bot] **ccblaisdell** rolled **2**

## !rollall [die_size]

Roll dice for everyone in the room who is not offline, idle, or dnd. It will respond with
the results in descending order.

> `!rollall`  
> Rollbot [bot]
> ```
>  67: ccblaisdell
>  48: Someone else
>   1: unlucky schmuck
> ```

> `!rollall 6`  
> Rollbot [bot]
> ```
>   6: ccblaisdell
>   3: Someone else
>   1: unlucky schmuck
> ```
