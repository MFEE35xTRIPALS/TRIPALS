/* 最新消息摺疊 */
$(document).ready(function () {
  $('[class="my"]').click(function () {
    $(this).next("tr").toggle();
    // console.log($(this).parents());
  });
});

/* 使用者點擊切換分頁 */

// console.log(a_news);
let a_news = getComputedStyle(document.querySelector("#a-news")).display;
let a_members = getComputedStyle(document.querySelector("#a-members")).display;
let a_atricles = getComputedStyle(
  document.querySelector("#a-atricles")
).display;
let a_tags = getComputedStyle(document.querySelector("#a-tags")).display;
function toggleDisplay(elementId, displayValue) {
  document.querySelector(elementId).style.display = displayValue;
}
document
  .querySelector('a[href="#a-news"]')
  .addEventListener("click", function () {
    if (a_news == "none") {
      toggleDisplay("#a-news", "block");
      toggleDisplay("#a-members", "none");
      toggleDisplay("#a-atricles", "none");
      toggleDisplay("#a-tags", "none");
    }
  });
document
  .querySelector('a[href="#a-members"]')
  .addEventListener("click", function () {
    if (a_members == "none") {
      toggleDisplay("#a-news", "none");
      toggleDisplay("#a-members", "block");
      toggleDisplay("#a-atricles", "none");
      toggleDisplay("#a-tags", "none");
    }
  });
document
  .querySelector('a[href="#a-atricles"]')
  .addEventListener("click", function () {
    if (a_atricles == "none") {
      toggleDisplay("#a-news", "none");
      toggleDisplay("#a-members", "none");
      toggleDisplay("#a-atricles", "block");
      toggleDisplay("#a-tags", "none");
    }
  });
document
  .querySelector('a[href="#a-tags"]')
  .addEventListener("click", function () {
    if (a_tags == "none") {
      toggleDisplay("#a-news", "none");
      toggleDisplay("#a-members", "none");
      toggleDisplay("#a-atricles", "none");
      toggleDisplay("#a-tags", "block");
    }
  });
