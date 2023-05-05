var userno = 2;
/* ------------- h1 Type animation ------------- */
new TypeIt("#ml6", {
  strings: "Start your Trip.",
  waitUntilVisible: true,
}).go();
/* ------------- CRUD ajax ------------- */
var url = "http://localhost:3000";

/* ------------- hashtag random 8 ------------- */

$.ajax({
  url: url + `/articles/hashtags`,
  type: "GET",
  success: function (data) {
    $("#tags").empty();
    $.each(data, function (i, list) {
      var tag = `<li class="tag" data-tagno="${list.tagno}" >＃${list.hashtag}</li>`;
      $("#tags").append(tag);
    });
  },
});
/* ------------ function 存到 session ------------ */
function tagno(x) {
  sessionStorage.setItem("tagno", x);
}

/* --------------- hashtag click --------------- */
$(document).ready(function () {
  $("#tags").on("click", "li", function () {
    tagno($(this).data().tagno); // 將tagno存到session
    var hashtagno = sessionStorage.getItem("tagno");
    // console.log("小火龍是" + $(this).data().tagno);
    // console.log("皮卡丘是" + apple);
    $.ajax({
      url: url + `/articles/hashtags/${hashtagno}`,
      type: "post",
      data: { userno: userno },
      success: function (data) {
        $(".c-mylikes").empty();
        var likes = data[1].map((value) => value.articleno);
        $.each(data[0], function (i, list) {
          let heart = likes.includes(list.articleno) ? "fas" : "";
          cards(list, heart);
        });
      },
    });
  });

  /* --------------- 跳轉作者個人頁面 --------------- */
  $(".c-mylikes").on("click", "h6", function () {
    console.log($(this)[0].dataset.autherno);
    sessionStorage.setItem(
      "atherno",
      JSON.stringify($(this)[0].dataset.autherno)
    );
    window.location = "./selfpage.html";
  });

  /* --------------- 瀏覽數計數器 --------------- */
  $(".c-mylikes").on("click", "a", function (e) {
    e.preventDefault();
    var onecard = $(this).closest(".onecard");
    sessionStorage.setItem(
      "articleno",
      JSON.stringify(onecard.find(".articleno").val())
    );
    $.ajax({
      type: "POST",
      url: url + "/selfpage/updateViews",
      data: {
        articleno: onecard.find(".articleno").val(),
      },
    });
  });
});
/* ----------------- location ----------------- */
$(".search__label").on("click", function () {
  var city = $("select").val();
  $.ajax({
    url: url + `/articles/city`,
    type: "post",
    data: { city: city, userno: userno },
    success: function (data) {
      $(".c-mylikes").empty();
      var likes = data[1].map((value) => value.articleno);

      $.each(data[0], function (i, list) {
        let heart = likes.includes(list.articleno) ? "fas" : "";
        cards(list, heart);
      });
    },
  });
});
/* ----------------- 瀏覽數排序 ----------------- */
function rendViews() {
  $.ajax({
    url: url + `/articles/views`,
    type: "post",
    data: { userno: userno },
    success: function (data) {
      $(".c-mylikes").empty();
      var likes = data[1].map((value) => value.articleno);
      $.each(data[0], function (i, list) {
        let heart = likes.includes(list.articleno) ? "fas" : "";
        cards(list, heart);
      });
    },
  });
}
rendViews();
$(".views").on("click", function () {
  rendViews();
});
/* ----------------- 愛心數排序 ----------------- */
$(".hots").on("click", function () {
  $.ajax({
    url: url + `/articles/hots`,
    type: "post",
    data: { userno: userno },
    success: function (data) {
      $(".c-mylikes").empty();
      var likes = data[1].map((value) => value.articleno);
      $.each(data[0], function (i, list) {
        let heart = likes.includes(list.articleno) ? "fas" : "";
        cards(list, heart);
      });
    },
  });
});
/* ----------------- 文章收藏 ----------------- */
$(".c-mylikes").on("click", ".heart", function (e) {
  // 使用者有無登入的判斷
  if (userno) {
    var onecard = $(this).closest(".onecard"); // card 本體

    var articlenoinput = onecard.find(".articleno");
    $.ajax({
      type: "POST",
      url: e.target.classList.contains("fas")
        ? url + "/selfpage/deleteLikes"
        : url + "/selfpage/insertLikes",
      data: {
        userno: userno,
        articleno: articlenoinput.val(),
      },
      success: function (data) {
        e.target.classList.toggle("fas");
        onecard.find(".viewsAndHeart p:first").empty();
        onecard
          .find(".viewsAndHeart p:first")
          .html(
            `<i class="fa-regular fa-heart"></i> ${data.likesCount.collect}`
          );
        // alert(data);
      },
    });
  } else {
    if (confirm("需要登入後才可收藏文章，是否前往登入頁面？")) {
      window.location = "./client.html";
    } else {
      return;
    }
  }
});

function cards(data, heart) {
  // card 本體
  // data.usermessage.includes(value.articleno) ? 'fas' : '',
  var image = data.image ? url + data.image : "./img/sunrise.jpg";
  var avatar = data.avatar ? url + data.avatar : "./img/admin.png";
  let mycards = `<div class="onecard card">
  <a href="#" class="c-cardImg">
  <input class='articleno' type='hidden' value=${data.articleno}>
    <div class="c-imgCover">
      <span>more</span>
    </div>
    <img
      class="Img"
      src=${image}
      alt="文章首圖"
    />
  </a>
  <div class="card_body">
    <div>
      <a class="c-toSelfpage" href="#">
        <h4 class="card-title">${data.title}
        </h4>
      </a>
      <i class="heart fa-regular fa-heart ${heart}"></i>
    </div>
      <h6 data-autherno=${data.userno}>
        <img src=${avatar} alt="大頭照" class="head" />
        ${data.username}
      </h6>
    <div class="viewsAndHeart">
      <p><i class="fa-regular fa-heart"></i> ${data.like_count}</p>
      <p><i class="fa-regular fa-eye"></i> ${data.view_count}</p>
    </div>
  </div>
</div>`;
  $(".c-mylikes").append(mycards);
}

/* ----------------- Search Bar ----------------- */
// $(".c-mylikes").on("click", ".heart", function (e) {
//   // 使用者有無登入的判斷
//   if (userno) {
//     var onecard = $(this).closest(".onecard"); // card 本體

//     var articlenoinput = onecard.find(".articleno");
//     $.ajax({
//       type: "POST",
//       url: e.target.classList.contains("fas")
//         ? url + "/selfpage/deleteLikes"
//         : url + "/selfpage/insertLikes",
//       data: {
//         userno: userno,
//         articleno: articlenoinput.val(),
//       },
//       success: function (data) {
//         e.target.classList.toggle("fas");
//         onecard.find(".viewsAndHeart p:first").empty();
//         onecard
//           .find(".viewsAndHeart p:first")
//           .html(
//             `<i class="fa-regular fa-heart"></i> ${data.likesCount.collect}`
//           );
//         // alert(data);
//       },
//     });
//   } else {
//     if (confirm("需要登入後才可收藏文章，是否前往登入頁面？")) {
//       window.location = "./client.html";
//     } else {
//       return;
//     }
//   }
// });
