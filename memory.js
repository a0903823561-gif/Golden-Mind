let symbols =["🍊","🥕","🍉","🍚","🍎","🍌","🍇","☎️","📻","☕","🍵","🕰️","🪭","🧺","🥟","🪑","🚲","🧹 "]; 
let cards = [];
let flippedCards = [];
let matchedCount = 0;

function startGame(rows, cols, mode) {
  document.getElementById("result").innerText = "";
  matchedCount = 0;
  flippedCards = [];

  // 計算需要的牌數
  let totalCards = rows * cols;
  let pairsNeeded = totalCards / 2;

  // 生成正確數量的配對牌
  cards = [];
  for (let i = 0; i < pairsNeeded; i++) {
    let symbol = symbols[i % symbols.length]; 
    cards.push(symbol, symbol); 
  }

  // 打亂牌組
  cards.sort(() => 0.5 - Math.random());

  const board = document.getElementById("memory-board");
  board.innerHTML = "";
  board.style.display = "grid";
  board.style.gridTemplateColumns = `repeat(${cols}, minmax(80px, 1fr))`;
  board.style.gridGap = "15px";

  // 套用模式 class (easy / medium / hard)
  board.className = "";
  board.classList.add(mode);

  // 建立卡片
  cards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerHTML = "?";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard(e) {
  const card = e.target;
  if (card.classList.contains("flipped") || flippedCards.length === 2) return;

  card.classList.add("flipped");
  card.innerHTML = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    matchedCount += 2;
    if (matchedCount === cards.length) {
      document.getElementById("result").innerText = "🎉 恭喜！你完成了所有配對！";
      setTimeout(() => location.href="menu.html", 3000);
    }
  } else {
    card1.classList.remove("flipped");
    card1.innerHTML = "?";
    card2.classList.remove("flipped");
    card2.innerHTML = "?";
  }
  flippedCards = [];
}

function startMemoryGame(mode) {
  // 遊戲初始化邏輯...
  document.getElementById("back-menu-btn").style.display = "none"; // 開始遊戲時隱藏返回鍵
}

function endGame(success = false) {
  // 遊戲結束邏輯...
  if (success) {
    document.getElementById("result").innerText = "🎉 恭喜完成！";
  } else {
    document.getElementById("result").innerText = "😅 遊戲失敗！";
  }

  // 顯示返回選單按鈕
  document.getElementById("back-menu-btn").style.display = "block";
}

function goBackMenu() {
  window.location.href = "menu.html";
}
