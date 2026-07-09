const itemsPool = ["🥛","🍞","🍎","🍌","🍇","🍪","🥕","🍗","🍟","🍫"];
let shoppingList = [];
let collected = [];
let score = 0;
let wrongCount = 0;
let requiredCount = 0;
let timeLimit = 0;
let timer;
let interval;
let previewTimer;

function startSupermarketGame(mode) {
  score = 0;
  wrongCount = 0;
  collected = [];const itemsPool = ["🥛","🍞","🍎","🍌","🍇","🍪","🥕","🍗","🍟","🍫"];
let shoppingList = [];
let collected = [];
let score = 0;
let wrongCount = 0;
let requiredCount = 0;
let timeLimit = 0;
let timer;
let interval;
let previewTimer;

function startSupermarketGame(mode) {
  score = 0;
  wrongCount = 0;
  collected = [];
  document.getElementById("menu-btn").style.display = "none";
  document.getElementById("result").innerText = "";
  document.getElementById("collected-list").innerHTML = "<li>尚未購買</li>";

  if (mode === "easy") { 
    requiredCount = 3; 
    timeLimit = 15; 
  } else if (mode === "medium") { 
    requiredCount = 5; 
    timeLimit = 12; 
  } else if (mode === "hard") { 
    requiredCount = 6;   // 修改成 6 個商品
    timeLimit = 10; 
  } else if (mode === "expert") { 
    requiredCount = 7;   // 新增專家模式
    timeLimit = 9;       // 專家模式時間更短，增加挑戰
  }

  // 建立購物清單
  shoppingList = [];
  while (shoppingList.length < requiredCount) {
    let item = itemsPool[Math.floor(Math.random()*itemsPool.length)];
    if (!shoppingList.includes(item)) shoppingList.push(item);
  }

  document.getElementById("shopping-list").innerText = 
    `購物清單：${shoppingList.join("、")}`;
  document.getElementById("progress").innerText = 
    `請先記住清單，遊戲即將開始...`;

  const board = document.getElementById("supermarket-board");
  board.innerHTML = "";

  // 顯示「直接開始」按鈕
  const startBtn = document.createElement("button");
  startBtn.innerText = "直接開始";
  startBtn.style.marginTop = "20px";
  startBtn.onclick = () => {
    clearTimeout(previewTimer);
    startBtn.remove();
    runGame(board);
  };
  document.body.appendChild(startBtn);

  // 延遲 8 秒後自動開始
  previewTimer = setTimeout(() => {
    if (document.body.contains(startBtn)) startBtn.remove();
    runGame(board);
  }, 8000);
}

function runGame(board) {
  // 清單消失
  document.getElementById("shopping-list").innerText = "";
  document.getElementById("progress").innerText = 
    `已找到 0 個，還需要 ${requiredCount} 個`;

  interval = setInterval(() => {
    spawnItems(board, 3);
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
    const symbol = itemsPool[Math.floor(Math.random() * itemsPool.length)];
    createItem(board, symbol);
  }
}

function createItem(board, symbol) {
  const item = document.createElement("div");
  item.classList.add("item");
  item.innerText = symbol;

  let x = 10 + Math.random() * 80;
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
    if (shoppingList.includes(symbol) && !collected.includes(symbol)) {
      collected.push(symbol);
      score++;

      // 更新右側欄位：直式顯示
      const listElement = document.getElementById("collected-list");
      listElement.innerHTML = "";
      collected.forEach(fruit => {
        const li = document.createElement("li");
        li.innerText = fruit;
        listElement.appendChild(li);
      });

      let remaining = requiredCount - score;
      if (remaining > 0) {
        document.getElementById("progress").innerText = 
          `已找到 ${score} 個，還需要 ${remaining} 個`;
      } else {
        document.getElementById("progress").innerText = "已完成清單！";
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
    result.innerText = `🎉 恭喜過關！成功完成購物清單`;
  } else {
    result.innerText = `😅 失敗了！只找到 ${score} 個清單商品`;
  }

  document.getElementById("menu-btn").style.display = "inline-block";
}

function goBackMenu() {
  window.location.href = "menu.html"; // 返回選單頁面
}

  document.getElementById("menu-btn").style.display = "none";
  document.getElementById("result").innerText = "";
  document.getElementById("collected-list").innerHTML = "<li>尚未購買</li>";

  if (mode === "easy") { requiredCount = 3; timeLimit = 15; }
  else if (mode === "medium") { requiredCount = 5; timeLimit = 12; }
  else if (mode === "hard") { requiredCount = 7; timeLimit = 10; }

  // 建立購物清單
  shoppingList = [];
  while (shoppingList.length < requiredCount) {
    let item = itemsPool[Math.floor(Math.random()*itemsPool.length)];
    if (!shoppingList.includes(item)) shoppingList.push(item);
  }

  document.getElementById("shopping-list").innerText = 
    `購物清單：${shoppingList.join("、")}`;
  document.getElementById("progress").innerText = 
    `請先記住清單，遊戲即將開始...`;

  const board = document.getElementById("supermarket-board");
  board.innerHTML = "";

  // 顯示「直接開始」按鈕
  const startBtn = document.createElement("button");
  startBtn.innerText = "直接開始";
  startBtn.style.marginTop = "20px";
  startBtn.onclick = () => {
    clearTimeout(previewTimer);
    startBtn.remove();
    runGame(board);
  };
  document.body.appendChild(startBtn);

  // 延遲 8 秒後自動開始
  previewTimer = setTimeout(() => {
    if (document.body.contains(startBtn)) startBtn.remove();
    runGame(board);
  }, 8000);
}

function runGame(board) {
  // 清單消失
  document.getElementById("shopping-list").innerText = "";
  document.getElementById("progress").innerText = 
    `已找到 0 個，還需要 ${requiredCount} 個`;

  interval = setInterval(() => {
    spawnItems(board, 3);
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
    const symbol = itemsPool[Math.floor(Math.random() * itemsPool.length)];
    createItem(board, symbol);
  }
}

function createItem(board, symbol) {
  const item = document.createElement("div");
  item.classList.add("item");
  item.innerText = symbol;

  let x = 10 + Math.random() * 80;
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
    if (shoppingList.includes(symbol) && !collected.includes(symbol)) {
      collected.push(symbol);
      score++;

      // 更新右側欄位：直式顯示
      const listElement = document.getElementById("collected-list");
      listElement.innerHTML = "";
      collected.forEach(fruit => {
        const li = document.createElement("li");
        li.innerText = fruit;
        listElement.appendChild(li);
      });

      let remaining = requiredCount - score;
      if (remaining > 0) {
        document.getElementById("progress").innerText = 
          `已找到 ${score} 個，還需要 ${remaining} 個`;
      } else {
        document.getElementById("progress").innerText = "已完成清單！";
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
    result.innerText = `🎉 恭喜過關！成功完成購物清單`;
  } else {
    result.innerText = `😅 失敗了！只找到 ${score} 個清單商品`;
  }

  document.getElementById("menu-btn").style.display = "inline-block";
}

function goBackMenu() {
  window.location.href = "menu.html"; // 返回選單頁面
}
