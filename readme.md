# Installation

[Invite this bot](https://discordapp.com/oauth2/authorize?client_id=511278542969896962&scope=bot) 
to your server.

# Usage

The bot has three commands, `!roll`, `!rollself`, and `!rollchannel`. Type one of these commands into your text room while the bot is online, and it will respond with results.

## !rollself [die_size]

Roll a single 100-sided (or `die_size`-sided) die for you, and respond with the results for everone to see.

> `!rollself`  
> Rollbot [bot] **ccblaisdell** rolled **67**
>
> `!rollself 6`  
> Rollbot [bot] **ccblaisdell** rolled **2**

## !roll [die_size]

Roll dice for everyone in the room who is not offline, idle, or dnd. It will respond with
the results in descending order.

> `!roll`  
> Rollbot [bot]
> ```
>  67: ccblaisdell
>  48: Someone else
>   1: unlucky schmuck
> ```

> `!roll 6`  
> Rollbot [bot]
> ```
>   6: ccblaisdell
>   3: Someone else
>   1: unlucky schmuck
> ```

## !roll channel_name [die_size]

Roll dice for everyone in every channel that partially matches `channel_name`.

> `!roll voice`  
> Rollbot [bot]
> ```
>  67: ccblaisdell
>  48: Someone else
>   1: unlucky schmuck
> ```
