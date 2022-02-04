import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const resetButton = document.getElementById("reset");
  const startButton = document.getElementById("start");
  const rowsInput = document.getElementById("numberOfRows") as HTMLInputElement;
  const columnsInput = document.getElementById(
    "numberOfColumns"
  ) as HTMLInputElement;
  const game = new Game({ columns: 6, rows: 15, container });

  resetButton.addEventListener("click", () => {
    game.reset();
  });

  startButton.addEventListener("click", () => {
    game.rows = parseInt(rowsInput.value) || 15;
    game.columns = parseInt(columnsInput.value) || 6;
    game.clean();
    console.log(game);
  });
});
