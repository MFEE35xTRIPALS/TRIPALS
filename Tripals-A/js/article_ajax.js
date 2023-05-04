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
    if (hashtagno) {
      $.ajax({
        url: url + `/articles/hashtags/${hashtagno}`,
        type: "GET",
        success: function (data) {
          console.log(data);
          $(".c-mylikes").empty();
          $.each(data, function (i, list) {
            let card = `<div class="onecard card">
          <a href="#" class="c-cardImg">
            <div class="c-imgCover">
              <p>more</p>
            </div>
            <img
              class="Img"
              src="./img/puppy-1207816_1280.jpg"
              alt="文章首圖"
              class="card-img-top"
            />
          </a>

          <div class="card_body">
            <div>
              <a class="c-toSelfpage" href="#">
                <h4 class="card-title">
                  ${list.title}
                </h4>
              </a>
              <i class="heart fa-regular fa-heart"></i>
            </div>
            <a href="#" class="c-userName">
              <h6>
                <img src="./img/admin.png" alt="大頭照" class="head" />
                ${list.username}
              </h6>
            </a>
            <div class="viewsAndHeart">
              <p><i class="fa-regular fa-heart"></i> ${list.like_count}</p>
              <p><i class="fa-regular fa-eye"></i> ${list.view_count}</p>
            </div>
          </div>
        </div>`;
            $(".c-mylikes").append(card);
          });
        },
      });
    }
  });
});
/* ----------------- location ----------------- */
$("select").on("change", function () {
  console.log($("select").val());
  var city = $("select").val();
  $.ajax({
    url: url + `/articles/city`,
    type: "post",
    data: { city: city },
    success: function (data) {
      $(".c-mylikes").empty();
      console.log(data);
      $.each(data, function (i, list) {
        cards(list);
      });
    },
  });
});
/* ----------------- 瀏覽數排序 ----------------- */
// $("select").on("change", function () {
//   // console.log($("select").val());
//   // var city = $("select").val();
//   $.ajax({
//     url: url + `/articles/views`,
//     type: "post",
//     data: { city: "台中市" },
//     success: function (data) {
//       console.log(data);
//       $(".c-mylikes").empty();
//       $.each(data, function (i, list) {
//         let card = `<div class="onecard card">
//         <a href="#" class="c-cardImg">
//           <div class="c-imgCover">
//             <p>more</p>
//           </div>
//           <img
//             class="Img"
//             src="./img/puppy-1207816_1280.jpg"
//             alt="文章首圖"
//             class="card-img-top"
//           />
//         </a>
//         <div class="card_body">
//           <div>
//             <a class="c-toSelfpage" href="#">
//               <h4 class="card-title">
//                 ${list.title}
//               </h4>
//             </a>
//             <i class="heart fa-regular fa-heart"></i>
//           </div>
//           <a href="#" class="c-userName">
//             <h6>
//               <img src="./img/admin.png" alt="大頭照" class="head" />
//               ${list.username}
//             </h6>
//           </a>
//           <div class="viewsAndHeart">
//             <p><i class="fa-regular fa-heart"></i>0</p>
//             <p><i class="fa-regular fa-eye"></i> ${list.view_count}</p>
//           </div>
//         </div>
//       </div>`;
//         $(".c-mylikes").append(card);
//       });
//     },
//   });
// });

/* ----------------- 渲染card ----------------- */

/* ----------------- 收藏收藏 ----------------- */
$(".c-mylikes").on("click", ".heart", function (e) {
  // 使用者有無登入的判斷
  if (userno) {
    var onecard = $(this).closest(".onecard"); // card 本體

    var articlenoinput = onecard.find(".articleno");
    console.log(onecard);
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
        console.log(data.likesCount);
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

function cards(data) {
  // card 本體
  // data.usermessage.includes(value.articleno) ? 'fas' : '',
  var image = data.image ? url + data.image : "./img/sunrise.jpg";
  var avatar = url + data.avatar;
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
      <i class="heart fa-regular fa-heart"></i>
    </div>
    <a href="#" class="c-userName">
    <input class='autherno' type='hidden' value=${data.autherno}>
      <h6>
        <img src=${avatar} alt="大頭照" class="head" />
        ${data.username}
      </h6>
    </a>
    <div class="viewsAndHeart">
      <p><i class="fa-regular fa-heart"></i> ${data.like_count}</p>
      <p><i class="fa-regular fa-eye"></i> ${data.view_count}</p>
    </div>
  </div>
</div>`;
  $(".c-mylikes").append(mycards);
}
