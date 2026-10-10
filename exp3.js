
const { createClient } = require('redis');

async function main() {
  const pub = createClient();
  const sub = pub.duplicate();

  await pub.connect();
  await sub.connect();

  await sub.subscribe('notifications', (msg) => {
    console.log('Notification:', msg);
  });

  await pub.publish(
    'notifications',
    'You have received a new follow request!'
  );

  setTimeout(async () => {
    await sub.unsubscribe('notifications');
    await sub.quit();
    await pub.quit();
  }, 1000);
}

main();
