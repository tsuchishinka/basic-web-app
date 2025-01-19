import { useEffect, useRef, WheelEvent } from "react";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

const worldPos = {
  x: 0.85,
  y: 0.39,
};
let rate = 0.00005;

// eslint-disable-next-line
const displayLog = (name: string, value: any) => {
  console.log(`${name}: ${JSON.stringify(value)}`);
};

type Tile = {
  x: number;
  y: number;
  z: number;
};

type Position = {
  x: number;
  y: number;
};

const TILE_URL = "https://tile.openstreetmap.org";

let currentTiles: (Tile & {
  image: HTMLImageElement | undefined;
})[] = [];

let isMouseDown = false;

const mousePosition = {
  x: 0,
  y: 0,
};

const Map = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseDown = () => {
    isMouseDown = true;
  };

  const handleMouseUp = () => {
    isMouseDown = false;
  };

  const handleMouseMove = async (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (isMouseDown) {
      worldPos.x += (mousePosition.x - e.nativeEvent.offsetX) * rate;
      worldPos.y += (mousePosition.y - e.nativeEvent.offsetY) * rate;

      updateTiles();
      drawTiles();
    }
    mousePosition.x = e.nativeEvent.offsetX;
    mousePosition.y = e.nativeEvent.offsetY;
  };

  const handleWheel = async (e: WheelEvent<HTMLCanvasElement>) => {
    const diffZ = e.deltaY;
    let newRate = rate;
    if (diffZ > 0) {
      newRate *= 1.05;
    } else {
      newRate *= 0.95;
    }

    if (newRate === rate) {
      return;
    }

    worldPos.x = worldPos.x + (rate - newRate) * mousePosition.x;
    worldPos.y = worldPos.y + (rate - newRate) * mousePosition.y;
    rate = newRate;

    updateTiles();
    drawTiles();
  };

  const updateTiles = () => {
    displayLog("rate", rate);
    displayLog("worldPos", worldPos);
    const newTiles = calcNewTiles();

    requestTiles(newTiles);
    removeTile(newTiles);
  };

  const removeTile = (newTiles: Tile[]) => {
    const currentZLevel = calcTileZLevel();
    currentTiles = currentTiles.filter((tile) => {
      if (tile.z !== currentZLevel) {
        // 穴あき防止のため、zレベルが異なるものは残す
        return true;
      }
      return newTiles.some(({ x, y }) => {
        return tile.x === x && tile.y === y;
      });
    });

    // 子孫タイルを削除
    currentTiles = currentTiles.filter((tile) => {
      if (tile.z < currentZLevel - 1) {
        return false;
      }
      return true;
    });

    displayLog("currentTileSIze", currentTiles.length);
  };

  const drawTiles = () => {
    const ctx = canvasRef.current?.getContext("2d");
    ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (ctx) {
      for (const tile of currentTiles) {
        const image = tile.image;
        if (image === undefined) {
          continue;
        }
        const w1 = tile2World(tile.x, tile.y, tile.z);
        const w2 = tile2World(tile.x + 1, tile.y + 1, tile.z);
        const c1 = world2Canvas(w1);
        const c2 = world2Canvas(w2);
        const size = c2.x - c1.x;
        ctx.drawImage(image, c1.x, c1.y, size, size);
      }
    }
  };

  const calcNewTiles = () => {
    const tileZLevel = calcTileZLevel();
    const leftTopTile = world2Tile(worldPos, tileZLevel);
    const leftTopTilePos = tile2World(
      leftTopTile.x,
      leftTopTile.y,
      leftTopTile.z
    );
    const rightBottomPos = canvas2World({ x: CANVAS_WIDTH, y: CANVAS_HEIGHT });

    const tileSize = Math.pow(2, -tileZLevel);

    const newTiles: Tile[] = [];
    for (let y = 0; leftTopTilePos.y + y * tileSize <= rightBottomPos.y; y++) {
      for (
        let x = 0;
        leftTopTilePos.x + x * tileSize <= rightBottomPos.x;
        x++
      ) {
        newTiles.push({
          x: leftTopTile.x + x,
          y: leftTopTile.y + y,
          z: tileZLevel,
        });
      }
    }
    return newTiles;
  };

  const requestTiles = async (newTiles: Tile[]) => {
    for (const { x, y, z } of newTiles) {
      const maxTile = Math.pow(2, z) - 1;
      if (x < 0 || y < 0 || x > maxTile || y > maxTile) {
        continue;
      }
      if (currentTiles.find((t) => t.x === x && t.y === y && t.z === z)) {
        continue;
      }
      const image = document.createElement("img");
      image.src = `${TILE_URL}/${z}/${x}/${y}.png`;
      image.onload = () => {
        drawTiles();
      };
      currentTiles.push({
        x,
        y,
        z,
        image,
      });
    }
  };

  const calcTileZLevel = () => {
    let tileZLevel = 0;
    while (true) {
      const w1 = tile2World(0, 0, tileZLevel);
      const w2 = tile2World(1, 1, tileZLevel);
      const c1 = world2Canvas(w1);
      const c2 = world2Canvas(w2);
      const size = c2.x - c1.x;

      if (size < 256) {
        break;
      }
      tileZLevel++;
    }
    return tileZLevel;
  };

  const tile2World = (x: number, y: number, z: number) => {
    const tileLength = Math.pow(2, -z);
    return {
      x: x * tileLength,
      y: y * tileLength,
    };
  };

  const world2Tile = (pos: Position, z: number): Tile => {
    const tileLength = Math.pow(2, -z);
    return {
      x: Math.floor(pos.x / tileLength),
      y: Math.floor(pos.y / tileLength),
      z: z,
    };
  };

  const world2Canvas = (pos: Position): Position => {
    return {
      x: (pos.x - worldPos.x) / rate,
      y: (pos.y - worldPos.y) / rate,
    };
  };

  const canvas2World = (pos: Position) => {
    return {
      x: pos.x * rate + worldPos.x,
      y: pos.y * rate + worldPos.y,
    };
  };

  useEffect(() => {
    updateTiles();
    drawTiles();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        onMouseUp={handleMouseUp}
      />
    </>
  );
};

export { Map };
