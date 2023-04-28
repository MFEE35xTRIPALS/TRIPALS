// console.log($); //確認jQuery
/* ------------- 使用者點擊切換分頁 ------------- */
/* ------------- 改jQuery ------------- */
$('a[href="#a-news"]').on("click", function () {
  $("#a-news").css("display", "block");
  $("#a-members").css("display", "none");
  $("#a-atricles").css("display", "none");
  $("input").val("");
  $("textarea").val("");
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

/* ----------- 最新消息 CRUD ----------- */
var userno = 1;
var allMembers;
var url = "http://localhost:3000";
// ----- GET News -----
var renderNews = () => {
  $.ajax({
    url: url + "/admin",
    type: "GET",
    success: function (data) {
      // console.log(data); // 確認有撈到資料
      $("#c-news").empty();
      $.each(data, function (i, list) {
        allNews = list;
        let newsTr = $("<tr>");
        let sta = "";
        if (list.status == "F") {
          newsTr.toggleClass("a-noUse");
          sta = "已下架";
        } else {
          sta = "已發布";
        }
        newsTr.append(`<td >${list.newsno}</td>`);
        newsTr.append(`<td>${list.title}</td>`);
        newsTr.append(`<td class="news-c">${list.content}</td>`);
        newsTr.append(`<td>${list.release}</td>`);
        newsTr.append(`<td>${list.date}</td>`);
        newsTr.append(`<td>${sta}</td>`);
        newsTr.append(
          `<td class="icon"><i class="fa-regular fa-pen-to-square"></i></td>`
        );
        $("#c-news").append(newsTr);
      });
    },
  });
};
renderNews();

$(document).ready(function () {
  /* ------------- form 顯示 ------------- */
  $("#c-news").on("click", "tr", function () {
    let row = $(this).closest("tr");
    // console.log(row.children());
    $("input[name='newsno']").val(row.children()[0].innerHTML);
    $("input[type='text']").val(row.children()[1].innerHTML);
    $("input[type='date']").val(row.children()[3].innerHTML);
    $("textarea").val(row.children()[2].innerHTML);
    // console.log($("input[name='newsno']").val());
    postBtn();
  });
  /* ------------- 會員管理dialog ------------- */
  $("#c-members").on("click", "tr", function () {
    let row = $(this).closest("tr");
    // console.log(row.children());
    document.querySelector("#m-change").showModal();
    let memberId = row.children()[0].innerHTML;
    $("input[name='d-id']").val(memberId);
    $("input[name='d-email']").val(row.children()[1].innerHTML);
    $("input[name='d-pwd']").val(row.children()[2].innerHTML);
  });
});

/* ------------- (按鍵取消) ------------- */
$(".cancelBtn").on("click", function () {
  $("input").val("");
  $("textarea").val("");
  postBtn();
});

/* ------------- () ------------- */
// 如果點擊表格-> form 出現內容 -> 按鈕會交換
var postBtn = () => {
  $("input[name='newsno']").val()
    ? $(".c-change + .c-post").addClass("postBtn")
    : $(".c-change + .c-post").removeClass("postBtn");
};
// ----- POST 發布 -----
$(".c-post").on("click", function () {
  let result = confirm("發布公告前記得確認文字都沒問題囉?!");
  if (result) {
    $.ajax({
      url: "http://localhost:3000/admin/post",
      type: "post",
      data: {
        newsno: $('input[name="newsno"]').val(),
        title: $('input[type="text"]').val(),
        content: $("textarea").val(),
        release: $("input[type='date']").val(),
      },
      success: function (data) {
        // console.log(data); // 確認有撈到資料
        alert("公告發布成功");
        $("input").val("");
        $("textarea").val("");
        postBtn();
        renderNews();
      },
    });
  }
});

/* ------------- (按鍵更新) ------------- */
// ----- UPDATE 更新 -----
$(".c-change").on("click", function () {
  console.log("OK");
  $.ajax({
    url: "http://localhost:3000/admin/update",
    type: "PUT",
    data: {
      newsno: $('input[name="newsno"]').val(),
      title: $('input[type="text"]').val(),
      content: $("textarea").val(),
      release: $("input[type='date']").val(),
    },
    success: function (data) {
      // console.log(data); // 確認有撈到資料
      alert("公告更新成功");
      $("input").val("");
      $("textarea").val("");
      postBtn();
      renderNews();
    },
  });
});

/* ------------- (按鍵刪除) ------------- */
// ----- DELETE 下架 -----
$(".deleteBtn").on("click", function () {
  confirm("公告下架後則不得重新上架唷！確定要下架嗎？");
  console.log("OK");
  $.ajax({
    url: "http://localhost:3000/admin/delete",
    type: "DELETE",
    data: {
      newsno: $('input[name="newsno"]').val(),
      status: "F",
      // title: $('input[type="text"]').val(),
      // content: $("textarea").val(),
      // release: $("input[type='date']").val(),
    },
    success: function (data) {
      // console.log(data); // 確認有撈到資料
      alert("公告下架成功");
      $("input").val("");
      $("textarea").val("");
      postBtn();
      renderNews();
    },
  });
});

/* ------------- 半完成 ------------- */
// 目前userno 尚未處理
//

//
/* ----------- 會員管理 CRUD ----------- */

// ----- GET -----
var renderMembers = () => {
  $.ajax({
    url: "http://localhost:3000/members",
    type: "GET",
    success: function (data) {
      // console.log(data); // 確認有撈到資料
      $("#c-members").empty();
      $.each(data, function (i, list) {
        allMembers = list;
        let newsTr = $("<tr>");
        let sta = "";
        if (list.status == "T") {
          sta = "<i class='fa-solid fa-toggle-on'></i>";
        } else {
          sta = "<i class='fa-solid fa-toggle-off'></i>";
          newsTr.toggleClass("a-noUse");
        }
        newsTr.append(`<td>${list.userno}</td>`);
        newsTr.append(`<td>${list.id}</td>`);
        newsTr.append(`<td class="news-c"> ${list.password}</td>`);
        newsTr.append(`<td>${list.nickname == null ? "" : list.nickname}</td>`);
        newsTr.append(`<td>${list.date}</td>`);
        newsTr.append(`<td class="icon">${sta}</td>`);
        newsTr.append(
          `<td class="icon"><i class="fa-regular fa-pen-to-square"></i></td>`
        );
        $("#c-members").append(newsTr);
      });
    },
  });
};
renderMembers();
// console.log(allMembers);

/* ------------- (按鍵取消) ------------- */
$(".d-cancel").on("click", function () {
  document.querySelector("#m-change").close();

  // console.log($("input[name='newsno']").val());
  postBtn();
});
$(".d-cancel").on("click", function () {
  document.querySelector("#m-change").close();

  // console.log($("input[name='newsno']").val());
  postBtn();
});

/* ------------- (按鍵更新) ------------- */
$(".d-change").on("click", function () {
  confirm("確定要變更會員資料嗎？");
  $.ajax({
    url: "http://localhost:3000/members/update",
    type: "put",
    data: {
      userno: $('input[name="d-id"]').val(),
      id: $('input[name="d-email"]').val(),
      password: $('input[name="d-pwd"]').val(),
    },
    success: function (data) {
      // console.log(data); // 確認有撈到資料
      document.querySelector("#m-change").close();
      alert("資料修改成功");
      // document.querySelector("#d-okay").showModal();
      // $("input").val("");
      // $("textarea").val("");

      renderMembers();
    },
  });
});
