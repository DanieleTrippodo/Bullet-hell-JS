class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.player = new Player(this.width / 2, this.height - 50);
      this.bullets = [];
      this.enemies = [];
      this.isRunning = true;
      this.spawnEnemyInterval = 1000;
      this.lastEnemySpawn = 0;
  
      this.handleInput();
    }
  
    start() {
      this.gameLoop(0);
    }
  
    gameLoop = (timestamp) => {
      this.clearCanvas();
      this.update(timestamp);
      this.draw();
      if (this.isRunning) {
        requestAnimationFrame(this.gameLoop);
      }
    };
  
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  
    update(timestamp) {
      this.player.update();
      this.bullets = this.bullets.filter((bullet) => bullet.isVisible());
      this.bullets.forEach((bullet) => bullet.update());
      this.enemies.forEach((enemy) => enemy.update());
  
      if (timestamp - this.lastEnemySpawn > this.spawnEnemyInterval) {
        this.spawnEnemy();
        this.lastEnemySpawn = timestamp;
      }
  
      this.checkCollisions();
    }
  
    draw() {
      this.player.draw(this.ctx);
      this.bullets.forEach((bullet) => bullet.draw(this.ctx));
      this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    }
  
    handleInput() {
      window.addEventListener('keydown', (event) => {
        if (event.key === 'w') {
          this.player.moveUp();
        } else if (event.key === 'a') {
          this.player.moveLeft();
        } else if (event.key === 's') {
          this.player.moveDown();
        } else if (event.key === 'd') {
          this.player.moveRight();
        } else if (event.key === ' ') {
          this.bullets.push(new Bullet(this.player.x + this.player.width / 2, this.player.y));
        }
      });
    }
  
    spawnEnemy() {
      const x = Math.random() * (this.width - 40);
      const enemy = new Enemy(x, 0);
      this.enemies.push(enemy);
    }
  
    checkCollisions() {
      this.bullets.forEach((bullet) => {
        this.enemies.forEach((enemy, enemyIndex) => {
          if (bullet.collidesWith(enemy)) {
            this.enemies.splice(enemyIndex, 1);
          }
        });
      });
    }
  }
  
  class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 30;
      this.height = 30;
      this.speed = 8; // Aumentata la velocità del giocatore
    }
  
    moveLeft() {
      this.x = Math.max(0, this.x - this.speed);
    }
  
    moveRight() {
      this.x = Math.min(800 - this.width, this.x + this.speed);
    }
  
    moveUp() {
      this.y = Math.max(0, this.y - this.speed);
    }
  
    moveDown() {
      this.y = Math.min(600 - this.height, this.y + this.speed);
    }
  
    update() {
      // Eventuali aggiornamenti logici per il player
    }
  
    draw(ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  class Bullet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 5;
      this.height = 10;
      this.speed = 7;
    }
  
    update() {
      this.y -= this.speed;
    }
  
    isVisible() {
      return this.y + this.height > 0;
    }
  
    collidesWith(enemy) {
      return (
        this.x < enemy.x + enemy.width &&
        this.x + this.width > enemy.x &&
        this.y < enemy.y + enemy.height &&
        this.y + this.height > enemy.y
      );
    }
  
    draw(ctx) {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 30;
      this.height = 30;
      this.speed = 2;
    }
  
    update() {
      this.y += this.speed;
    }
  
    draw(ctx) {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  export default Game;
  