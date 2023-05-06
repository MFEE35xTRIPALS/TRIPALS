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

/* ----------- 最新消息+會員管理 CRUD ----------- */
var userno = 1;
var url = "http://localhost:3000";
// ----- render News -----
var renderNews = () => {
  $.ajax({
    url: url + "/admin/news",
    type: "GET",
    success: function (data) {
      $("#c-news").empty();
      $.each(data, function (i, list) {
        allNews = list;
        let newsTr = $("<tr>");
        let sta = "";
        if (list.status == "F") {
          // newsTr.toggleClass("a-noUse");
          // 已下架，全劃線
          sta = "已下架";
          newsTr.append(`<td class="news-c a-noUse">${list.newsno}</td>`);
          newsTr.append(`<td class="a-noUse">${list.title}</td>`);
          newsTr.append(`<td class="news-c a-noUse">${list.content}</td>`);
          newsTr.append(`<td class="a-noUse">${list.release}</td>`);
          newsTr.append(`<td class="a-noUse">${list.userid}</td>`);
          newsTr.append(`<td class="x-icon" >${sta}</td>`);
          newsTr.append(
            `<td class="x-icon"><i class="fa-regular fa-pen-to-square"></i></td>`
          );
          $("#c-news").append(newsTr);
        } else {
          // sta = "<i class='fa-solid fa-toggle-on'></i>";
          sta = "上架中";
          newsTr.append(`<td class="news-c">${list.newsno}</td>`);
          newsTr.append(`<td>${list.title}</td>`);
          newsTr.append(`<td class="news-c">${list.content}</td>`);
          newsTr.append(`<td>${list.release}</td>`);
          newsTr.append(`<td>${list.userid}</td>`);
          newsTr.append(`<td class="icon" >${sta}</td>`);
          newsTr.append(
            `<td class="icon"><i class="fa-regular fa-pen-to-square"></i></td>`
          );
          $("#c-news").append(newsTr);
        }
      });
    },
  });
};
renderNews();

// ----- render Members -----
var renderMembers = () => {
  $.ajax({
    url: url + "/admin/members",
    type: "GET",
    data: {
      userno: userno,
    },
    success: function (data) {
      $(".username").text(data[1][0].username);
      $("#c-members").empty();
      $.each(data[0], function (i, list) {
        let newsTr = $("<tr>");
        newsTr.append(`<td>${list.userno}</td>`);
        newsTr.append(`<td>${list.id}</td>`);
        newsTr.append(`<td class="news-c"> ${list.password}</td>`);
        if (list.permission == 0) {
          newsTr.append(`<td>管理員</td>`);
        } else {
          newsTr.append(
            `<td>${list.nickname == null ? "" : list.nickname}</td>`
          );
        }
        newsTr.append(`<td>${list.date}</td>`);
        $("#c-members").append(newsTr);
      });
      $(".totalMember").text(`網站會員總數：${data[0].length}`);
    },
  });
};
renderMembers();
// console.log(allMembers);

// ----- render 管理文章 -----
function manageArtilcles() {
  $.ajax({
    type: 'GET',
    url: url + `/admin/manageArtilcles`,
    success: function (data) {
      console.log(data);
      if (!data[0]) {
        $(".a-myart tbody").html("<p>目前被檢舉文章數：0</p>");
      }
      $.each(data, function (i, value) {
        let articleTr = $("<tr>")
        articleTr.append(`<td>${value.articleno}</td>`);
        articleTr.append(value.status == 'show' ? `<td><a href="/${value.articleno}">${value.title}</a></td>` : `<td>${value.title}</td>`);
        articleTr.append(`<td><i class="fas fa-exclamation-triangle"></i>${value.report_count}</td>`);
        let articlestatus;
        if (value.status == 'show') {
          articlestatus = '已發佈'
        } else if (value.status == "draft") {
          articlestatus = '草稿'
        } else {
          articlestatus = '檢舉刪除'
        }
        articleTr.append(`<td>${articlestatus}</td>`);
        articleTr.append(`<td><button data-takeOf=${value.articleno} class="a-takeOf" ${value.status == 'report' ? 'disabled' : ''}>下架</button></td>`);
        if (value.status == "report") {
          articleTr.addClass('a-deleteDone')
        }
        $(".a-myart tbody").append(articleTr);
      });
    }
  })
}
manageArtilcles();

$(document).ready(function () {
  /* -------------- form 顯示 -------------- */
  $("#c-news").on("click", "tr", function () {
    let row = $(this).closest("tr");
    $("#c-news tr").removeClass("chose");
    row.toggleClass("chose");
    // console.log(row.children());
    $("input[name='newsno']").val(row.children()[0].innerHTML);
    $("input[type='text']").val(row.children()[1].innerHTML);
    $("input[type='date']").val(row.children()[3].innerHTML);
    $("textarea").val(row.children()[2].innerHTML);
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

/* ------------- (按鍵取消｜News) ------------- */
$(".cancelBtn").on("click", function () {
  $("input").val("");
  $("textarea").val("");
  postBtn();
  $("#c-news tr").removeClass("chose");
});
/* ------------- (按鍵取消｜Members) ------------- */
$(".d-cancel").on("click", function () {
  document.querySelector("#m-change").close();
  postBtn();
});

/* ------------- (更新按鈕｜發布按鈕) ------------- */
// 如果點擊表格-> form 出現內容 -> 按鈕會交換
var postBtn = () => {
  $("input[name='newsno']").val()
    ? $(".c-change + .c-post").addClass("postBtn")
    : $(".c-change + .c-post").removeClass("postBtn");
};
/* ------------- (自動偵測必填欄位) ------------- */
$("input,textarea").on("input", function () {
  /* 顯示必填文字 */
  let showMessage = $(this).next("span");
  if (!$(this).val()) {
    showMessage.html("*必填欄位");
  } else {
    showMessage.html("");
  }
});

// // ----- POST 發布 -----
$(".c-post").on("click", function () {
  $("");
  if (
    !(
      $(".c-textmessage").val() &&
      $("input[type=date]").val() &&
      $("textarea").val()
    )
  ) {
    alert("請填寫必要內容");
  } else {
    let result = confirm("發布公告前記得確認文字都沒問題囉?!");
    if (result) {
      $.ajax({
        url: url + "/admin/news/post",
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
  }
});

/* ------------- (按鍵更新) ------------- */
// ----- UPDATE 更新 -----
$(".c-change").on("click", function () {
  if (
    !(
      $(".c-textmessage").val() &&
      $("input[type=date]").val() &&
      $("textarea").val()
    )
  ) {
    alert("請填寫必要內容");
  } else {
    $.ajax({
      url: url + "/admin/news/update",
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
  }
});

/* ------------- (按鍵刪除) ------------- */
// ----- DELETE 下架 -----
$(".deleteBtn").on("click", function () {
  confirm("公告下架後則不得重新上架唷！確定要下架嗎？");
  console.log("OK");
  $.ajax({
    url: url + "/admin/news/delete",
    type: "DELETE",
    data: {
      newsno: $('input[name="newsno"]').val(),
      status: "F",
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

/* ----------- 會員管理 CRUD ----------- */

/* ------------- (按鍵更新) ------------- */
$(".d-change").on("click", function () {
  var result = confirm("確定要變更會員資料嗎？");
  if (result) {
    $.ajax({
      url: url + "admin/members/update",
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
  }
});

/* ------------- (文章管理下架） ------------- */
// ----- Update 下架 -----
$('.a-myart tbody').on("click", ".a-takeOf", function (e) {
  console.log(e.currentTarget.dataset.takeof);
  if (confirm('文章下架後即無法復原,確定要下架文章嗎？')) {
    $.ajax({
      type: "PUT",
      url: url + '/admin/takeOf',
      data: {
        articleno: e.currentTarget.dataset.takeof
      },
      success: function (data) {
        $(".a-myart tbody").empty();
        manageArtilcles();
        alert(data);
      }
    })
  } else {
    return;
  }

});
