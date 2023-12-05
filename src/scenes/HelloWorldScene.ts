import Phaser from "phaser";
import GridEngine, { Direction } from "grid-engine";
import map from "../assets/react-test.json";
import tiles from "../assets/gather-m.png";
import tiles2 from "../assets/gather-p.png";
import player from "../assets/characters.png";

export default class HelloWorldScene extends Phaser.Scene {
  private gridEngine!: GridEngine;
  name: any;
  constructor() {
    super("HelloWorldScene");
  }
  init(data: any) {
    console.log(data);
    this.name = data.name;
  }
  preload() {
    this.load.image("tiles", tiles);
    this.load.image("tiles2", tiles2);
    this.load.tilemapTiledJSON("map", map);
    this.load.spritesheet("player", player, {
      frameWidth: 52,
      frameHeight: 72,
    });
    this.load.spritesheet("object", tiles2, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create() {
    let zoom = 1;
    const gatTilemap = this.make.tilemap({ key: "map" });
    gatTilemap.addTilesetImage("gather-m", "tiles");
    gatTilemap.addTilesetImage("gather-p", "tiles2");
    let layer: any;
    for (let i = 0; i < gatTilemap.layers.length; i++) {
      layer = gatTilemap.createLayer(i, ["gather-m", "gather-p"], 0, 0);
      layer!.scale = 1;
    }
    gatTilemap.createFromObjects(
      "Object Layer 1",
      { key: "object", gid: 5196, frame: "120" },
      false
    );

    const playerSprite = this.add.sprite(0, 0, "player");
    playerSprite.scale = 0.6;

    const nameLabel = this.add.text(-10, -10, this.name);
    const container = this.add.container(0, 0, [playerSprite, nameLabel]);

    this.cameras.main.startFollow(container, true);
    this.cameras.main.setFollowOffset(
      -playerSprite.width,
      -playerSprite.height
    );

    this.cameras.main.setZoom(0.8);
    this.cameras.main.zoomTo(1);

    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: 6,
          startPosition: { x: 20, y: 20 },
          collision: {
            collisionGroup: ["cg1"],
          },
          container,
        },
      ],
    };
    this.gridEngine.create(gatTilemap, gridEngineConfig);
    this.gridEngine.setSpeed("player", 5);
    // let notions = document.getElementById("modal-section");

    this.gridEngine.positionChangeFinished().subscribe((value: any) => {
      if (
        gatTilemap.hasTileAt(
          value.enterTile.x,
          value.enterTile.y,
          "Tile Layer 2"
        )
      ) {
        // notions!.style.display = "block";
        console.log("현재 위치 : ", value.enterTile);
      } else {
        // notions!.style.display = "none";
      }
    });
    document.addEventListener("wheel", (e) => {
      if (e.deltaY > 0 && zoom > 0.8) {
        zoom -= 0.1;
      }
      if (e.deltaY < 0 && zoom < 3.2) {
        zoom += 0.1;
      }
      this.cameras.main.setZoom(zoom);
    });
  }
  public update() {
    const cursors = this.input.keyboard!.createCursorKeys();
    if (cursors.left.isDown) {
      this.gridEngine.move("player", Direction.LEFT);
    } else if (cursors.right.isDown) {
      this.gridEngine.move("player", Direction.RIGHT);
    } else if (cursors.up.isDown) {
      this.gridEngine.move("player", Direction.UP);
    } else if (cursors.down.isDown) {
      this.gridEngine.move("player", Direction.DOWN);
    }
  }
}

// function hasTrigger(tilemap: any, position: any) {
//   return tilemap.layers.some((layer: any) => {
//     const tile = tilemap.getTileAt(position.x, position.y, false, layer.name);
//     return tile?.properties?.trigger;
//   });
// }
