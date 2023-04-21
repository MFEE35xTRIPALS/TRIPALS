// console.log($); //確認jQuery

/* ---------------- 最新消息 CRUD ---------------- */
// ----- GET -----
var renderNews = () => {
  $.ajax({
    url: "http://localhost:3000/news",
    type: "GET",
    success: function (data) {
      console.log(data); // 確認有撈到資料
      $("#c-news").empty();
      $.each(data, function (i, list) {
        let newsTr = $("<tr>");
        newsTr.append(`<td>${list.newsno}</td>`);
        newsTr.append(`<td>${list.title}</td>`);
        newsTr.append(`<td class="news-c">${list.content}</td>`);
        newsTr.append(`<td>${list.date}</td>`);
        newsTr.append(`<td ><i class="fa-regular fa-pen-to-square"></i></td>`);
        newsTr.append(`<td ><i class="fa-regular fa-trash-can"></i></td>`);
        $("#c-news").append(newsTr);
      });
    },
  });
};
renderNews();
/* ------------------ form 顯示 ------------------ */
$(document).ready(function () {
  $("tbody").on("click", "tr", function () {
    // console.log("OK");
    var row = $(this).closest("tr");
    // console.log(row.children());
    // console.log($(".c-textmessage").val());
    $("input[name='newsno']").val(row.children()[0].innerHTML);
    $("input[type='text']").val(row.children()[1].innerHTML);
    $("input[type='date']").val(row.children()[3].innerHTML);
    $("textarea").val(row.children()[2].innerHTML);
    // console.log($("input[name='newsno']").val());
  });
});
/* ------------- form 清除 (按鍵取消) ------------- */
$(".c-cancel").on("click", function () {
  $("input").val("");
  $("textarea").val("");
});

/* ------------- form 提交 (按鍵發布) ------------- */
// ----- POST 發布 -----
$(".c-change").on("click", function () {
  $.ajax({
    url: "http://localhost:3000/news",
    type: "POST",
    data: {
      newsno: $('input[name="newsno"]').val(),
      title: $('input[type="text"]').val(),
      content: $("textarea").val(),
      release: $("input[type='date']").val(),
    },
    success: function (data) {
      // console.log(data); // 確認有撈到資料
      renderNews();
    },
  });
});
