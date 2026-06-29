// 選單按鈕事件綁定
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("#menu-container button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const text = button.innerText;

      if (text.includes("記憶花園")) {
        window.location.href = "memory.html"; // 記憶花園頁面
      } else if (text.includes("專注森林")) {
        window.location.href = "focus.html"; // 專注森林頁面
      } else if (text.includes("反應車站")) {
        window.location.href = "reaction.html"; // 反應車站頁面
      } else if (text.includes("智慧超市")) {
        window.location.href = "market.html"; // 智慧超市頁面
      }
    });
  });
});
