import {
  TelegramBot,
  UpdateType,
} from "https://deno.land/x/telegram_bot_api/mod.ts";

const token: string | undefined = Deno.env.get("TOKEN");
const chatId: string | undefined = Deno.env.get("CHAT_ID");
const filter = JSON.parse(
  new TextDecoder("utf-8").decode(await Deno.readFile("./filter.json")),
);

if (typeof token === "undefined" || typeof chatId === "undefined") {
  throw new Error(
    'Please add the Telegram Token and the Chat Id to the Environment-Variable "TOKEN"',
  );
}

const bot: TelegramBot = new TelegramBot(token);
bot.run({
  polling: {
    timeout: 30,
  },
});

bot.on(UpdateType.Message, async ({ message }) => {
  if (message.chat.id !== Number(chatId) || !message.new_chat_members) {
    return;
  }
  message.new_chat_members.forEach((user) => {
    filter.filteredWords.forEach((filteredWord: string) => {
      if (user.username?.includes(filteredWord)) {
        console.log(`User ${user.username} (${user.id}) was kicked.`);
        bot.kickChatMember({
          chat_id: chatId,
          user_id: user.id,
        });
      }
    });
  });
});

console.log("Bot is ready to kick.");
