import Phaser from "phaser";

import HelloWorldScene from "./scenes/HelloWorldScene";
import GridEngine from "grid-engine";
import InitScene from "./scenes/InitScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "phaser-section",
  backgroundColor: "#839ac7",
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  },
  scene: [InitScene, HelloWorldScene],
};

export default new Phaser.Game(config);
