/* ------------- 最新消息摺疊 ------------- */
// $(document).ready(function () {
//   $('[class="my"]').click(function () {
//     $(this).next("tr").toggle();
//     // console.log($(this).parents());
//   });
// });

/* ------------- 使用者點擊切換分頁 ------------- */
// let a_news = getComputedStyle(document.querySelector("#a-news")).display;
// let a_members = getComputedStyle(document.querySelector("#a-members")).display;
// let a_atricles = getComputedStyle(
//   document.querySelector("#a-atricles")
// ).display;

// function toggleDisplay(elementId, displayValue) {
//   document.querySelector(elementId).style.display = displayValue;
// }
// document
//   .querySelector('a[href="#a-news"]')
//   .addEventListener("click", function () {
//     if (a_news == "block") {
//       toggleDisplay("#a-news", "block");
//       toggleDisplay("#a-members", "none");
//       toggleDisplay("#a-atricles", "none");
//     }
//   });
// document
//   .querySelector('a[href="#a-members"]')
//   .addEventListener("click", function () {
//     if (a_members == "none") {
//       toggleDisplay("#a-news", "none");
//       toggleDisplay("#a-members", "block");
//       toggleDisplay("#a-atricles", "none");
//     }
//   });
// document
//   .querySelector('a[href="#a-atricles"]')
//   .addEventListener("click", function () {
//     if (a_atricles == "none") {
//       toggleDisplay("#a-news", "none");
//       toggleDisplay("#a-members", "none");
//       toggleDisplay("#a-atricles", "block");
//     }
//   });

// $("li").on("click", function () {
//   console.log($(this).children().prop("href"));
// });

/* ------------- 使用者點擊切換分頁 ------------- */
/* ------------- 改jQuery ------------- */
// console.log($);
$('a[href="#a-news"]').on("click", function () {
  $("#a-news").css("display", "block");
  $("#a-members").css("display", "none");
  $("#a-atricles").css("display", "none");
});
$('a[href="#a-members"]').on("click", function () {
  $("#a-news").css("display", "none");
  $("#a-members").css("display", "block");
  $("#a-atricles").css("display", "none");
});
$('a[href="#a-atricles"]').on("click", function () {
  $("#a-news").css("display", "none");
  $("#a-members").css("display", "none");
  $("#a-atricles").css("display", "block");
});
