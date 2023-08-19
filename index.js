const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 60748,
  username: 'WatcherBot',
});

function lookAtPlayer(player) {
  const { position } = player;
  const botPos = bot.entity.position;

  const deltaX = position.x - botPos.x;
  const deltaY = position.y - botPos.y;
  const deltaZ = position.z - botPos.z;

  const yaw = Math.atan2(deltaZ, deltaX);
  const pitch = Math.atan2(deltaY, Math.sqrt(deltaX * deltaX + deltaZ * deltaZ));

  bot.look(yaw, pitch);
}

bot.on('playerJoined', (player) => {
  console.log(`Player ${player.username} joined the game.`);
  setInterval(() => lookAtPlayer(player), 100);
});

bot.on('playerLeft', (player) => {
  console.log(`Player ${player.username} left the game.`);
});

bot.on('spawn', () => {
  console.log('Bot spawned.');
});
