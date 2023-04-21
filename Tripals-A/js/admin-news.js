// console.log($); //確認jQuery

/* ----------- 最新消息 CRUD ----------- */
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
        newsTr.append(`<td class="news-c">${list.newsno}</td>`);
        newsTr.append(`<td>${list.title}</td>`);
        newsTr.append(`<td class="news-c">${list.content}</td>`);
        newsTr.append(`<td>${list.date}</td>`);
        newsTr.append(`<td ><i class="fa-regular fa-pen-to-square"></i></td>`);
        $("#c-news").append(newsTr);
      });
    },
  });
};
renderNews();

/* ------------- form 顯示 ------------- */
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
    console.log($("input[name='newsno']").val());
    postBtn();
  });
});

/* ------------- (按鍵取消) ------------- */
$(".cancelBtn").on("click", function () {
  $("input").val("");
  $("textarea").val("");
  console.log($("input[name='newsno']").val());
  postBtn();
});

/* ------------- (按鍵發布) ------------- */
// 如果點擊表格-> form 出現內容 -> 按鈕會交換
var postBtn = () => {
  $("input[name='newsno']").val()
    ? $(".c-change + .c-post").addClass("postBtn")
    : $(".c-change + .c-post").removeClass("postBtn");
};
// ----- POST 發布 -----
$(".c-post").on("click", function () {
  console.log("OK");
  $.ajax({
    url: "http://localhost:3000/news/post",
    type: "post",
    data: {
      newsno: $('input[name="newsno"]').val(),
      title: $('input[type="text"]').val(),
      content: $("textarea").val(),
      release: $("input[type='date']").val(),
    },
    success: function (data) {
      console.log(data); // 確認有撈到資料
      $("input").val("");
      $("textarea").val("");
      postBtn();
      renderNews();
    },
  });
});

/* ------------- (按鍵更新) ------------- */
// ----- UPDATE 更新 -----
$(".c-change").on("click", function () {
  console.log("OK");
  $.ajax({
    url: "http://localhost:3000/news/update",
    type: "post",
    data: {
      newsno: $('input[name="newsno"]').val(),
      title: $('input[type="text"]').val(),
      content: $("textarea").val(),
      release: $("input[type='date']").val(),
    },
    success: function (data) {
      console.log(data); // 確認有撈到資料
      $("input").val("");
      $("textarea").val("");
      postBtn();
      renderNews();
    },
  });
});

/* ------------- (按鍵刪除) ------------- */
// ----- DELETE 刪除 -----
$(".deleteBtn").on("click", function () {
  console.log("OK");
  $.ajax({
    url: "http://localhost:3000/news/delete",
    type: "post",
    data: {
      newsno: $('input[name="newsno"]').val(),
      // title: $('input[type="text"]').val(),
      // content: $("textarea").val(),
      // release: $("input[type='date']").val(),
    },
    success: function (data) {
      console.log(data); // 確認有撈到資料
      $("input").val("");
      $("textarea").val("");
      postBtn();
      renderNews();
    },
  });
});

/* ------------- 半完成 ------------- */
// 目前userno 尚未處理
