import https from 'https';

export const registerTelegramWebhook = (telegramToken: string, componentId: string) => {
  return new Promise<void>((resolve, reject) => {
    const webhookUrl = `https://your-server.com/telegram-webhook/${componentId}`;

    const data = JSON.stringify({ url: webhookUrl });

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${telegramToken}/setWebhook`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.ok) {
            console.log(`Webhook for component ${componentId} registered successfully`);
            resolve();
          } else {
            reject(new Error(`Failed to set Telegram webhook: ${result.description}`));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(data);
    req.end();
  });
};
