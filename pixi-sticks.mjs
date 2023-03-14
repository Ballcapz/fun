const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  background: "#1a99bb",
});
document.body.appendChild(app.view);

const gees = [];

const count = 20;

function initItem(path, baseScale = 0.1) {
  const item = PIXI.Sprite.from(path);
  item.anchor.set(0.5);

  item.scale.set(baseScale + Math.random() * 0.3);

  item.x = Math.random() * app.screen.width;
  item.y = Math.random() * app.screen.height;

  item.direction = Math.random() * Math.PI * 2;

  item.turningSpeed = Math.random() - 0.8;

  item.speed = 2 + Math.random() * 2;

  gees.push(item);

  app.stage.addChild(item);
}

for (let i = 0; i < count; i++) {
  initItem("1678172.png");
  initItem("oh-yeah.gif");
  initItem("cloud.png", 0.01);
}

const boundsPadding = 100;
const bounds = new PIXI.Rectangle(
  -boundsPadding,
  -boundsPadding,
  app.screen.width + boundsPadding * 2,
  app.screen.height + boundsPadding * 2
);

app.ticker.add(() => {
  // iterate through the dudes and update their position
  for (let i = 0; i < gees.length; i++) {
    const g = gees[i];
    g.direction += g.turningSpeed * 0.01;
    g.x += Math.sin(g.direction) * g.speed;
    g.y += Math.cos(g.direction) * g.speed;
    g.rotation = -g.direction - Math.PI / 2;

    // wrap the dudes by testing their bounds...
    if (g.x < bounds.x) {
      g.x += bounds.width;
    } else if (g.x > bounds.x + bounds.width) {
      g.x -= bounds.width;
    }

    if (g.y < bounds.y) {
      g.y += bounds.height;
    } else if (g.y > bounds.y + bounds.height) {
      g.y -= bounds.height;
    }
  }
});
