import https from "https";

export const registerTelegramWebhook = (
  telegramToken: string,
  componentId: string,
) => {
  return new Promise<void>((resolve, reject) => {
    const webhookUrl = `https://9a567ace9888.ngrok-free.app/telegram/${componentId}`;

    const data = JSON.stringify({ url: webhookUrl });

    const options = {
      hostname: "api.telegram.org",
      port: 443,
      path: `/bot${telegramToken}/setWebhook`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const result = JSON.parse(body);
          if (result.ok) {
            console.log(
              `Webhook for component ${componentId} registered successfully`,
            );
            resolve();
          } else {
            reject(
              new Error(
                `Failed to set Telegram webhook: ${result.description}`,
              ),
            );
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (err) => reject(err));
    req.write(data);
    req.end();
  });
};

export const sendTelegramMessage = async (chatId: string, text: string, telegramToken: string) => {
  const data = JSON.stringify({
    chat_id: chatId,
    text: text,
  });

  const options = {
    hostname: "api.telegram.org",
    port: 443,
    path: `/bot${telegramToken}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const result = JSON.parse(body);
          if (result.ok) {
            resolve(result);
          } else {
            reject(new Error(`Failed to send Telegram message: ${result.description}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (err) => reject(err));
    req.write(data);
    req.end();
  });
};
