const mapping = {
  red: ["🍎","🍓","🍒"],
  yellow: ["🍌","🍍","🥭"],
  green: ["🍏","🥝","🥒"]
};

let targetColor = "";
let targetItems = [];
let score = 0;
let wrongCount = 0;
let requiredCount = 0;
let timeLimit = 0;
let timer;
let interval;
let generatedTargetCount = 0;

function startReactionGame(mode) {
  score = 0;
  wrongCount = 0;
  generatedTargetCount = 0;
  document.getElementById("menu-btn").style.display = "none";

  if (mode === "easy") { requiredCount = 3; timeLimit = 12; }
  else if (mode === "medium") { requiredCount = 5; timeLimit = 10; }
  else if (mode === "hard") { requiredCount = 7; timeLimit = 8; }

  const colors = ["red","yellow","green"];
  targetColor = colors[Math.floor(Math.random()*colors.length)];
  targetItems = mapping[targetColor];

  // 切換燈號
  document.querySelectorAll(".light").forEach(l => {
    l.classList.remove("active");
  });
  document.querySelector(`.light.${targetColor}`).classList.add("active");

  document.getElementById("question").innerText = 
    `請點擊 ${targetItems.join("、")}！`;
  document.getElementById("progress").innerText = 
    `已點擊 0 次，還需要 ${requiredCount} 次`;

  const board = document.getElementById("reaction-board");
  board.innerHTML = "";

  interval = setInterval(() => {
    spawnItems(board, 2);
    if (generatedTargetCount < requiredCount) {
      spawnTargetItem(board);
      generatedTargetCount++;
    }
  }, 1500);

  let timeLeft = timeLimit;
  updateTimerBar(timeLeft);

  timer = setInterval(() => {
    timeLeft--;
    updateTimerBar(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      clearInterval(interval);
      endGame(false);
    }
  }, 1000);
}

function spawnItems(board, count) {
  for (let i = 0; i < count; i++) {
    const allItems = [...mapping.red, ...mapping.yellow, ...mapping.green];
    const symbol = allItems[Math.floor(Math.random() * allItems.length)];
    createItem(board, symbol);
  }
}

function spawnTargetItem(board) {
  const symbol = targetItems[Math.floor(Math.random() * targetItems.length)];
  createItem(board, symbol);
}

function createItem(board, symbol) {
  const item = document.createElement("div");
  item.classList.add("item");
  item.innerText = symbol;

  // 避免重疊：檢查現有水果位置
  let x;
  let valid = false;
  let attempts = 0;
  while (!valid && attempts < 20) { // 最多嘗試 20 次避免無限迴圈
    x = 10 + Math.random() * 80;
    valid = true;
    board.querySelectorAll(".item").forEach(existing => {
      const existingX = parseFloat(existing.style.left);
      if (Math.abs(existingX - x) < 10) { // 距離太近就重抽
        valid = false;
      }
    });
    attempts++;
  }

  item.style.left = `${x}%`;
  item.style.top = `-10%`;

  board.appendChild(item);

  let pos = -10;
  let fall = setInterval(() => {
    pos += 2;
    item.style.top = `${pos}%`;
    if (pos >= 90) {
      clearInterval(fall);
      item.remove();
    }
  }, 100);

  item.addEventListener("click", () => {
    if (targetItems.includes(symbol)) {
      score++;
      let remaining = requiredCount - score;
      if (remaining > 0) {
        document.getElementById("progress").innerText = 
          `已點擊 ${score} 次，還需要 ${remaining} 次`;
      } else {
        document.getElementById("progress").innerText = "已成功！";
        endGame(true);
      }
    } else {
      wrongCount++;
      document.getElementById("progress").innerText = 
        `點錯了！錯誤次數：${wrongCount}/3`;
      if (wrongCount >= 3) {
        endGame(false, true);
      }
    }
    clearInterval(fall);
    item.remove();
  });
}

function updateTimerBar(timeLeft) {
  const progress = document.getElementById("timer-progress");
  const percent = (timeLeft / timeLimit) * 100;
  progress.style.width = percent + "%";

  // 顏色漸變：剩餘時間越少越紅
  if (percent > 60) {
    progress.style.backgroundColor = "#00FF00"; // 綠色
  } else if (percent > 30) {
    progress.style.backgroundColor = "#FFD700"; // 黃色
  } else {
    progress.style.backgroundColor = "#FF4500"; // 紅色
  }
}

function endGame(success = false, tooManyErrors = false) {
  clearInterval(timer);
  clearInterval(interval);
  const result = document.getElementById("result");

  if (tooManyErrors) {
    result.innerText = `❌ 遊戲結束！你已經點錯 3 次`;
  } else if (success) {
    result.innerText = `🎉 恭喜過關！成功點擊 ${score} 次 ${targetColor} 燈對應的水果`;
  } else {
    result.innerText = `😅 失敗了！只點擊到 ${score} 次 ${targetColor} 燈對應的水果`;
  }

  document.getElementById("menu-btn").style.display = "inline-block";
}

function goBackMenu() {
  window.location.href = "menu.html"; // 返回選單頁面
}
