let fruits = ["🍎", "🍌", "🍇", "🍊", "🍉", "🍓"];
let currentQuestion = 0;
let totalQuestions = 5;
let dropInterval;
let gameArea = document.getElementById("game-area");
let targetFruit = "";
let timeLeft;
let timerCountdown;
let errors = 0;
let maxErrors = 3;

function startFocusGame(mode) {
  document.getElementById("back-menu-btn").style.display = "none";
  document.getElementById("restart-btn").style.display = "none";
  document.getElementById("progress").innerText = "遊戲開始！模式：" + mode;
  document.getElementById("errors").innerText = "錯誤次數：0";
  currentQuestion = 0;
  errors = 0;
  gameArea.innerHTML = "";

  // 設定指定水果
  targetFruit = fruits[Math.floor(Math.random() * fruits.length)];
  document.getElementById("target").innerText = "請點擊指定水果：" + targetFruit;

  // 模式控制掉落速度與時間限制
  let speed;
  if (mode === "easy") {
    speed = 2500;
    timeLeft = 30;
  } else if (mode === "medium") {
    speed = 1500;
    timeLeft = 20;
  } else {
    speed = 800;
    timeLeft = 15;
  }

  document.getElementById("timer").innerText = "剩餘時間：" + timeLeft + " 秒";

  dropInterval = setInterval(() => dropMultipleFruits(3), speed); // 一次生成 3 個水果
  timerCountdown = setInterval(updateTimer, 1000);
}

function dropMultipleFruits(count) {
  let positions = []; // 用來記錄已使用的位置，避免重疊

  for (let i = 0; i < count; i++) {
    let fruit;
    if (Math.random() < 0.5) {
      fruit = targetFruit; // 50% 機率生成指定水果
    } else {
      fruit = fruits[Math.floor(Math.random() * fruits.length)];
    }

    let fruitElem = document.createElement("div");
    fruitElem.className = "fruit";
    fruitElem.innerText = fruit;

    // 隨機生成位置，避免重疊
    let leftPos;
    do {
      leftPos = Math.floor(Math.random() * 740);
    } while (positions.some(pos => Math.abs(pos - leftPos) < 60)); // 保持至少 60px 間距
    positions.push(leftPos);

    fruitElem.style.left = leftPos + "px";
    fruitElem.style.top = "0px";

    gameArea.appendChild(fruitElem);

    let fallSpeed = 3;
    let fall = setInterval(() => {
      let top = parseInt(fruitElem.style.top);
      if (top >= 540) {
        clearInterval(fall);
        fruitElem.remove();
      } else {
        fruitElem.style.top = top + fallSpeed + "px";
      }
    }, 30);

    fruitElem.onclick = () => {
      clearInterval(fall);
      fruitElem.remove();

      if (fruit === targetFruit) {
        currentQuestion++;
        document.getElementById("progress").innerText = "已點擊指定水果：" + currentQuestion + "/" + totalQuestions;
        if (currentQuestion >= totalQuestions) {
          endGame(true);
        }
      } else {
        errors++;
        document.getElementById("errors").innerText = "錯誤次數：" + errors;
        if (errors >= maxErrors) {
          endGame(false);
        }
      }
    };
  }
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerText = "剩餘時間：" + timeLeft + " 秒";
  if (timeLeft <= 0) {
    endGame(false);
  }
}

function endGame(success = false) {
  clearInterval(dropInterval);
  clearInterval(timerCountdown);
  if (success) {
    document.getElementById("progress").innerText = "🎉 恭喜完成挑戰！";
  } else {
    document.getElementById("progress").innerText = "😅 遊戲失敗！";
  }
  document.getElementById("back-menu-btn").style.display = "block";
  document.getElementById("restart-btn").style.display = "block";
}

function restartGame() {
  startFocusGame("easy"); // 預設重新開始簡單模式
}

function goBackMenu() {
  window.location.href = "menu.html";
}

function dropMultipleFruits(count) {
  let sectionWidth = 800 / count; // 遊戲區域寬度平均分成 count 區塊
  let positions = [];

  for (let i = 0; i < count; i++) {
    let fruit;
    if (Math.random() < 0.5) {
      fruit = targetFruit; // 50% 機率生成指定水果
    } else {
      fruit = fruits[Math.floor(Math.random() * fruits.length)];
    }

    let fruitElem = document.createElement("div");
    fruitElem.className = "fruit";
    fruitElem.innerText = fruit;

    // 每個水果落在不同區塊，並加隨機偏移
    let baseLeft = i * sectionWidth;
    let offset = Math.floor(Math.random() * (sectionWidth - 60)); // 保留間距
    let leftPos = baseLeft + offset;

    fruitElem.style.left = leftPos + "px";
    fruitElem.style.top = "0px";

    gameArea.appendChild(fruitElem);

    let fallSpeed = 3;
    let fall = setInterval(() => {
      let top = parseInt(fruitElem.style.top);
      if (top >= 540) {
        clearInterval(fall);
        fruitElem.remove();
      } else {
        fruitElem.style.top = top + fallSpeed + "px";
      }
    }, 30);

    fruitElem.onclick = () => {
      clearInterval(fall);
      fruitElem.remove();

      if (fruit === targetFruit) {
        currentQuestion++;
        document.getElementById("progress").innerText = "已點擊指定水果：" + currentQuestion + "/" + totalQuestions;
        if (currentQuestion >= totalQuestions) {
          endGame(true);
        }
      } else {
        errors++;
        document.getElementById("errors").innerText = "錯誤次數：" + errors;
        if (errors >= maxErrors) {
          endGame(false);
        }
      }
    };
  }
}
