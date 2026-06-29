// 導入頁面按鈕：跳到遊戲選單
function startGame() {
    // 確認檔名要和你的選單頁面一致
    window.location.href = "menu.html"; 
}

// （選單頁面可用的功能範例）
// 這裡可以加上其他控制，例如返回導入頁面
function goBackToIntro() {
    window.location.href = "index.html";
}

// （遊戲結束後可用的功能範例）
// 顯示結算結果
function showResult(success) {
    const resultDiv = document.getElementById("result");
    if(success){
        resultDiv.innerHTML = `
            <h1>🎉 恭喜通關！</h1>
            <p>今日記憶力提升：＋15%</p>
            <p>反應速度加快：＋10%</p>
            <p>腦力金幣 +100</p>
        `;
    } else {
        resultDiv.innerHTML = `
            <h1>差一點點就成功囉！</h1>
            <p>大腦已經熱身完畢，再試一次！</p>
        `;
    }
}
