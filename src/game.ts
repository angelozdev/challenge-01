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
  #columns: number;
  #rows: number;
  container: HTMLElement;
  positions: Array<HTMLButtonElement[]>;

  constructor({ columns, rows, container }: Options) {
    this.#columns = columns;
    this.#rows = rows;
    this.container = container;
    this.positions = [];

    this.hightlightCells = this.hightlightCells.bind(this);

    this.initialize();
  }

  set columns(number: number) {
    this.#columns = number;
  }

  set rows(number: number) {
    this.#rows = number;
  }

  initialize() {
    if (!this.container) throw new Error("Container is not defined");
    this.fillBoard();
  }

  fillBoard() {
    const color = this.getRandomColor();
    for (let r = 0; r < this.#rows; r++) {
      this.positions[r] = [];
      for (let c = 0; c < this.#columns; c++) {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.style.flexBasis = `${100 / this.#columns}%`;
        cell.style.background = color;
        cell.setAttribute("data-row", r.toString());
        cell.setAttribute("data-column", c.toString());

        this.positions[r][c] = cell;
        this.container.appendChild(cell);
        this.addEvent(cell);
      }
    }
  }

  addEvent(element: HTMLButtonElement) {
    element.addEventListener("click", this.hightlightCells);
  }

  hightlightCells(event: MouseEvent) {
    const target = event.target as HTMLButtonElement;
    const row = +target.dataset.row;
    const column = +target.dataset.column;

    const indexes = {
      bottom: [row + 1, column],
      bottomLeft: [row + 1, column - 1],
      bottomRight: [row + 1, column + 1],
      center: [row, column],
      left: [row, column - 1],
      right: [row, column + 1],
      top: [row - 1, column],
      topLeft: [row - 1, column - 1],
      topRight: [row - 1, column + 1],
    };

    const color = this.getRandomColor();

    for (const key in indexes) {
      const [row, col] = indexes[key];
      const cell = this.positions?.[row]?.[col];
      if (!cell) continue;
      cell.style.backgroundColor = color;
    }
  }

  reset() {
    const color = this.getRandomColor();
    this.positions.forEach((row) => {
      row.forEach((cell) => {
        cell.style.backgroundColor = color;
      });
    });
  }

  getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  removeEvents() {
    this.positions.forEach((row) => {
      row.forEach((cell) => {
        cell.removeEventListener("click", this.hightlightCells);
      });
    });
  }

  clean() {
    this.removeEvents();
    this.positions = [];
    this.container.innerHTML = "";
    this.initialize();
  }
}

export default Game;
