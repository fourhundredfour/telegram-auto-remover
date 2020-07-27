import { Bot } from "https://deno.land/x/telegram/mod.ts";
import { Update, User } from "https://deno.land/x/telegram/types.ts";

const token: string | undefined = Deno.env.get("TOKEN");
const chatId: string | undefined = Deno.env.get("CHAT_ID");

if (typeof token === "undefined" || typeof chatId === "undefined") {
  throw new Error(
    'Please add the Telegram Token and the Chat Id to the Environment-Variable "TOKEN"',
  );
}

const bot: Bot = new Bot(token);

bot.telegram.getUpdates({
  offset: 1,
  limit: 100,
  timeout: 0,
  allowedUpdates: ["message"],
}).then((updates: Update[]) => {
  updates.forEach((update: Update) => {
    if (!update.message?.new_chat_members) {
      return;
    }
    update.message.new_chat_members.forEach((user: User) => {
      bot.telegram.kickChatMember({
        chat_id: chatId,
        user_id: user.id,
        until_date: (+new Date()),
      });
    });
  });
});
