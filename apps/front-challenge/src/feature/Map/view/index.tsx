import { useEffect, useRef, WheelEvent } from "react";

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 800;

const offsetWorldPos = {
  x: 0,
  y: 0,
};
let zoom = 400;

// eslint-disable-next-line
const displayLog = (name: string, value: any) => {
  console.log(`${name}: ${JSON.stringify(value)}`);
};

let level = 2;

const imageCaches: {
  image: HTMLImageElement;
  urlInfo: URLInfo;
}[] = [];

const getTileLength = () => {
  return zoom / Math.pow(2, level);
};

const getTopLeftTileInfo = (): TileInfo => {
  const tileLength = getTileLength();
  const x = Math.floor(offsetWorldPos.x * Math.pow(2, level));
  const y = Math.floor(offsetWorldPos.y * Math.pow(2, level));

  const topLeftVertex = {
    x: x > 0 ? x * zoom : -x * zoom,
    y: y > 0 ? y * zoom : -y * zoom,
  };
  const bottomRightVertex = {
    x: topLeftVertex.x + tileLength - 1,
    y: topLeftVertex.y + tileLength - 1,
  };

  return {
    topLeftVertex,
    bottomRightVertex,
    urlInfo: {
      x: Math.max(Math.min(Math.pow(2, level) - 1, x), 0),
      y: Math.max(Math.min(Math.pow(2, level) - 1, y), 0),
      z: level,
    },
  };
};

type TilePos = {
  topLeftVertex: {
    x: number;
    y: number;
  };
  bottomRightVertex: {
    x: number;
    y: number;
  };
};

type TileInfo = TilePos & {
  urlInfo: URLInfo;
};

type Tile = TileInfo & {
  image: HTMLImageElement | undefined;
};

type URLInfo = {
  x: number;
  y: number;
  z: number;
};

const isEqualURLInfo = (url1: URLInfo, url2: URLInfo) => {
  return url1.x === url2.x && url1.y === url2.y && url1.z === url2.z;
};

let isRequesting = false;
const TILE_URL = "https://tile.openstreetmap.org";

const fetchImage = async (urlInfo: URLInfo) => {
  const x = urlInfo.x;
  const y = urlInfo.y;
  const z = urlInfo.z;

  if (isRequesting) {
    return;
  }
  isRequesting = true;
  const img = document.createElement("img");
  try {
    img.src = `${TILE_URL}/${z}/${x}/${y}.png`;
    await img.decode();
  } catch {
    console.error(`Failed to load image: ${TILE_URL}/${z}/${x}/${y}.png`);
    img.src = "";
  }
  isRequesting = false;
  return img;
};

const imageRequestQueue: URLInfo[] = [];

const makeTiles = () => {
  const topLeftTile = getTopLeftTileInfo();
  displayLog("topLeftTile", topLeftTile);
  const tileLength = getTileLength();
  displayLog("tileLength", tileLength);
  const rowTileNum = (zoom > CANVAS_HEIGHT ? CANVAS_HEIGHT : zoom) / tileLength;
  const columnTileNum =
    (zoom > CANVAS_WIDTH ? CANVAS_WIDTH : zoom) / tileLength;

  displayLog("row, column", { row: rowTileNum, column: columnTileNum });
  const tiles: Tile[] = [];

  for (let i = 0; i < rowTileNum; i++) {
    for (let j = 0; j < columnTileNum; j++) {
      if (
        topLeftTile.urlInfo.x + j > Math.pow(2, level) - 1 ||
        topLeftTile.urlInfo.y + i > Math.pow(2, level) - 1
      ) {
        continue;
      }
      const urlInfo = {
        x: topLeftTile.urlInfo.x + j,
        y: topLeftTile.urlInfo.y + i,
        z: level,
      };

      const image = imageCaches.find((imageCache) => {
        return isEqualURLInfo(imageCache.urlInfo, urlInfo);
      })?.image;

      if (image === undefined) {
        imageRequestQueue.push(urlInfo);
      }

      const tile: Tile = {
        topLeftVertex: {
          x: topLeftTile.topLeftVertex.x + j * tileLength,
          y: topLeftTile.topLeftVertex.y + i * tileLength,
        },
        bottomRightVertex: {
          x: topLeftTile.bottomRightVertex.x + j * tileLength,
          y: topLeftTile.bottomRightVertex.y + i * tileLength,
        },
        urlInfo,
        image,
      };
      tiles.push(tile);
    }
  }
  displayLog("tiles", tiles);
  return tiles;
};

const drawTiles = (ctx: CanvasRenderingContext2D, tiles: Tile[]) => {
  for (const tile of tiles) {
    const image = tile.image;
    displayLog("image tile", tile);
    displayLog("image", image);
    const tileLength = getTileLength();
    if (image) {
      ctx.drawImage(
        image,
        tile.topLeftVertex.x,
        tile.topLeftVertex.y,
        tileLength,
        tileLength
      );
      ctx.strokeRect(
        tile.topLeftVertex.x,
        tile.topLeftVertex.y,
        tileLength,
        tileLength
      );
      ctx.font = "20px serif";
      ctx.fillStyle = "rgb(255, 0, 0)";
      const text = `${tile.urlInfo.x}/${tile.urlInfo.y}/${tile.urlInfo.z}`;
      ctx.fillText(
        text,
        (tile.topLeftVertex.x + tile.bottomRightVertex.x) / 2 -
          (text.length * 20) / 4,
        (tile.topLeftVertex.y + tile.bottomRightVertex.y) / 2
      );
    }
  }
};

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
      const diffX = Math.max(
        Math.min(e.nativeEvent.offsetX - mousePosition.x, 0.003),
        -0.003
      );
      const diffY = Math.max(
        Math.min(e.nativeEvent.offsetY - mousePosition.y, 0.003),
        -0.003
      );
      displayLog("diffX, diffY", { diffX, diffY });
      offsetWorldPos.x = offsetWorldPos.x + diffX;
      offsetWorldPos.y = offsetWorldPos.y + diffY;
      await drawMap();
    }
    mousePosition.x = e.nativeEvent.offsetX;
    mousePosition.y = e.nativeEvent.offsetY;
  };

  const handleWheel = async (e: WheelEvent<HTMLCanvasElement>) => {
    const diffZ = e.deltaY;
    let newZoom = zoom;
    if (diffZ < 0) {
      newZoom += 5;
    } else {
      newZoom -= 5;
    }
    newZoom = Math.max(newZoom, 0);
    if (newZoom === zoom) {
      return;
    }
    zoom = newZoom;

    const tileLength = getTileLength();
    if (tileLength >= 255) {
      level++;
    } else if (tileLength < 255 / 2) {
      level = Math.max(0, level--);
    }

    await drawMap();
  };

  const drawMap = async () => {
    // imageCachesからタイル画像を取得し、tile配列を作成する
    const tiles = makeTiles();

    // canvasに描画する
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawTiles(ctx, tiles);
    }
    const imageQueueCopy = imageRequestQueue.concat();
    imageRequestQueue.splice(0, imageRequestQueue.length);
    // キューの画像をオンラインから取得する
    for (const imageQueue of imageQueueCopy) {
      const image = await fetchImage(imageQueue);
      if (image) {
        imageCaches.push({
          urlInfo: imageQueue,
          image,
        });
      }
    }
  };

  useEffect(() => {
    (async () => {
      await drawMap();
      await drawMap();
    })();
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
