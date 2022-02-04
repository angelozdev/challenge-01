document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const game = new Game({ columns: 6, rows: 15, container });
  console.log(game);
});

const colors = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "SlateGrey",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen",
];

type Options = { columns: number; rows: number; container: HTMLElement };

class Game {
  columns: number;
  rows: number;
  container: HTMLElement;
  positions: Array<HTMLElement[]>;

  constructor({ columns, rows, container }: Options) {
    this.columns = columns;
    this.rows = rows;
    this.container = container;
    this.positions = [];

    this.initialize();
  }

  initialize() {
    if (!this.container) throw new Error("Container is not defined");
    this.fillBoard();
  }

  fillBoard() {
    for (let r = 0; r < this.rows; r++) {
      this.positions[r] = [];
      for (let c = 0; c < this.columns; c++) {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.style.flexBasis = `${100 / this.columns}%`;

        this.positions[r][c] = cell;
        this.addEvent(cell, [r, c]);
        this.container.appendChild(cell);
      }
    }
  }

  addEvent(element: HTMLElement, coordinates: Array<number>) {
    element.addEventListener("click", () => {
      this.hightlightCells(coordinates);
    });
  }

  hightlightCells(coordinates: Array<number>) {
    const [r, c] = coordinates;
    const indexes = {
      bottom: [r + 1, c],
      bottomLeft: [r + 1, c - 1],
      bottomRight: [r + 1, c + 1],
      center: [r, c],
      left: [r, c - 1],
      right: [r, c + 1],
      top: [r - 1, c],
      topLeft: [r - 1, c - 1],
      topRight: [r - 1, c + 1],
    };

    const color = colors[Math.floor(Math.random() * colors.length)];

    for (const key in indexes) {
      const [row, col] = indexes[key];
      const cell = this.positions?.[row]?.[col];
      if (!cell) continue;
      cell.style.backgroundColor = color;
    }
  }
}
