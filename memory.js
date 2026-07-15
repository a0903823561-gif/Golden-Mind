let firstCard = null;
let lockBoard = false;
let matchedCount = 0;
let totalPairs = 0;

const symbols = ["🍊","🥕","🍉","🍚","🍎","🍌","🍇","☎️","📻","🍵","🕰️","🪭","🧺","🥟","🪑","🚲","🧹"];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomSymbols(symbols, count) {
  let pool = [...symbols];
  let result = [];
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * pool.length);
    result.push(pool[index]);
    pool.splice(index, 1);
  }
  return result;
}

function startGame(rows, cols, level) {
  const board = document.getElementById("memory-board");
  const result = document.getElementById("result");

  document.getElementById("buttons").style.display = "none";
  board.style.display = "grid";
  result.style.display = "block";

  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  board.innerHTML = "";
  result.innerText = "";

  // 隨機挑選符號，確保機率平均
  let selected = getRandomSymbols(symbols, (rows*cols)/2);
  let cards = [...selected, ...selected];
  cards = shuffle(cards);

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
      matchedCount++;
      firstCard = null;

      if (matchedCount === totalPairs) {
        document.getElementById("result").innerText = "🎉 恭喜過關！全部配對完成！";
      }
    } else {
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
