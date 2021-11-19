require("dotenv").config();
const PREFIX = "$";

const { Client, Message } = require("discord.js");

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  partials: ["MESSAGE", "REACTION"],
});
// const webhookClient = new WebhookClient(
//   process.env.WEBHOOK_ID,
//   process.env.WEBHOOK_TOKEN
// );

client.on("ready", () => {
  // console.log(`${client.user.tag} has logged in`);
  console.log(`${client.user} has logged in`);
});

client.on("messageCreate", (messageCreate) => {
  if (messageCreate.author.bot) return;

  console.log(`[${messageCreate.author.tag}]: ${messageCreate.content}`);

  if (messageCreate.content === "hello") {
    messageCreate.reply("@everyone Hello!");
  }
});
//
client.on("messageCreate", async (messageCreate) => {
  if (messageCreate.author.bot) return;
  if (messageCreate.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = messageCreate.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (CMD_NAME === "kick") {
      if (!messageCreate.member.permissions.has("KICK_MEMBERS"))
        return messageCreate.reply(
          "You do not have permissions to use that command"305295568245358603
        );
      if (args.length === 0) return messageCreate.reply("Please provide an ID");
      const member = messageCreate.mentions.members.first();
      if (member) {
        member
          .kick()
          .then((member) => messageCreate.channel.send(`${member} was kicked.`))
          .catch((err) =>
            messageCreate.channel.send("I cannot kick that user :(")
          );
      } else {
        messageCreate.channel.send("That member was not found");
      }
    } else if (CMD_NAME === "ban") {
      if (!messageCreate.member.permissions.has("BAN_MEMBERS"))
        return messageCreate.reply(
          "You do not have permissions to use that command"
        );
      if (args.length === 0) return messageCreate.reply("Please provide an ID");
      try {
        const user = await messageCreate.guild.members.ban(args[0]);
        messageCreate.channel.send("User was banned successfully");
      } catch (err) {
        console.log(err);
        messageCreate.channel.send(
          "An error occured. Either I do not have permissions or the user was not found"
        );
      }
    } else if (CMD_NAME === "announce") {
      console.log(args);
      const msg = args.join(" ");
      console.log(msg);
      //   webhookClient(msg);
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
