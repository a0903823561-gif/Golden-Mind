let firstCard = null;
let lockBoard = false;
let matchedCount = 0;
let totalPairs = 0;

function startGame(rows, cols, level) {
  const board = document.getElementById("memory-board");
  const result = document.getElementById("result");

  document.getElementById("buttons").style.display = "none";
  board.style.display = "grid";
  result.style.display = "block";

  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  board.innerHTML = "";
  result.innerText = "";

  // 建立符號池
  const symbols = ["🍊","🥕","🍉","🍚","🍎","🍌","🍇","☎️","📻","☕","🍵","🕰️","🪭","🧺","🥟","🪑","🚲","🧹 "];
  let selected = symbols.slice(0, (rows*cols)/2);
  let cards = [...selected, ...selected].sort(() => Math.random() - 0.5);

  totalPairs = selected.length;
  matchedCount = 0;

  cards.forEach(symbol => {
    board.appendChild(createCard(symbol));
  });
}

function createCard(symbol) {
  const card = document.createElement("div");
  card.classList.add("card");

  const inner = document.createElement("div");
  inner.classList.add("card-inner");

  const front = document.createElement("div");
  front.classList.add("front");
  front.textContent = "?";

  const back = document.createElement("div");
  back.classList.add("back");
  back.textContent = symbol;

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener("click", () => flipCard(card, symbol));

  return card;
}

function flipCard(card, symbol) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = { card, symbol };
  } else {
    if (firstCard.symbol === symbol) {
      // 配對成功
      matchedCount++;
      firstCard = null;

      if (matchedCount === totalPairs) {
        document.getElementById("result").innerText = "🎉 恭喜過關！全部配對完成！";
      }
    } else {
      // 配對失敗，翻回去
      lockBoard = true;
      setTimeout(() => {
        card.classList.remove("flipped");
        firstCard.card.classList.remove("flipped");
        firstCard = null;
        lockBoard = false;
      }, 1000);
    }
  }
}
