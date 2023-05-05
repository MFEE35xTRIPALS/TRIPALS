// 登入使用者編號
let userno;
if (true) {
  userno = 2;
}
// let authorno = 2;
let authorno = JSON.parse(sessionStorage.getItem('atherno'));

$(document).ready(function () {
  // console.log($);
  let url = 'http://localhost:3000';
  // let usercollect = 'http://localhost:3000';
  function getCards() {
    //GET 整頁的資料
    $(".selfCover").attr("src", "");
    $('.selfShot').attr("src", "");
    $('.userName').text('');
    $('.selfIntroduce p').text('');

    $.ajax({
      type: "GET",
      url: url + '/selfpage/cards',
      data: {
        userno: userno,
        authorno: authorno
      },
      success: function (data) {
        // 取得圖片資源成功，顯示圖片
        // console.log(data);
        userProfile(data.authormessage[0].banner ? url + data.authormessage[0].banner : "./img/y-s-LGx9C3nSo5I-unsplash.jpg",
          data.authormessage[0].avatar ? url + data.authormessage[0].avatar : "./img/admin2.png",
          data.authormessage[0].nickname ? data.authormessage[0].nickname : data.authormessage[0].username,
          data.authormessage[0].intro);
        $.each(data.cardmessage, function (i, value) {

          cards(value.articleno,
            value.image ? url + value.image : "./img/puppy-1207816_1280.jpg",
            value.title,
            data.usermessage.includes(value.articleno) ? 'fas' : '',
            value.userno,
            value.avatar ? url + value.avatar : "./img/admin2.png",
            value.nickname ? value.nickname : value.username,
            value.count, value.view_count)
        });
      },
      error: function (err) {
        // 發生錯誤，顯示錯誤訊息
        console.error(err);
      }
    });
  }
  getCards();
  $('.c-mylikes').on("click", ".heart", function (e) {
    // 找到點擊的 i 元素所在的 card_body 元素
    if (userno) {
      console.log(e.target.classList);
      var onecard = $(this).closest(".onecard");
      // console.log(onecard);
      // 在該元素中查找 input 元素
      var articlenoinput = onecard.find(".articleno");
      $.ajax({
        type: "POST",
        url: e.target.classList.contains('fas') ? url + '/selfpage/deleteLikes' : url + '/selfpage/insertLikes',
        data: {
          userno: userno,
          articleno: articlenoinput.val()
        },
        success: function (data) {
          console.log(data.likesCount);
          e.target.classList.toggle('fas');
          onecard.find('.viewsAndHeart p:first').empty();
          onecard.find('.viewsAndHeart p:first').html(`<i class="fa-regular fa-heart"></i> ${data.likesCount.collect}`);
          // alert(data);
        }
      })
    } else {
      if (confirm('需要登入後才可收藏文章，是否前往登入頁面？')) {
        window.location = './client.html';//之後要改成要去的登入頁面
      } else {
        return;
      };
    };

  });

  $('.c-mylikes').on("click", 'a', function (e) {
    e.preventDefault();
    // console.log(e.currentTarget);
    console.log($(this));
    var onecard = $(this).closest(".onecard");
    // console.log(onecard.find('.articleno').val());
    sessionStorage.setItem('articleno', JSON.stringify(onecard.find('.articleno').val()));
    window.location = './client.html';//之後要改成要去的瀏覽文章頁面
    $.ajax({
      type: "POST",
      url: url + '/selfpage/updateViews',
      data: {
        articleno: onecard.find('.articleno').val()
      },
      // success: function (data) {

      // }
    })
  })

  $('.c-mylikes').on("click", 'h6', function () {
    console.log($(this)[0].dataset.autherno);
    sessionStorage.setItem('atherno', JSON.stringify($(this)[0].dataset.autherno));
    window.location = './selfpage.html';

  })


});

function cards(articleno, img, title, heart, autherno, shot, userName, likes, views) {
  let mycards = `<div class="onecard card">
  <input class='articleno' type='hidden' value=${articleno}>
  <a href="#" class="c-cardImg">
    <div class="c-imgCover">
      <span>more</span>
    </div>
    <img
      class="Img"
      src=${img}
      alt="文章首圖"
    />
  </a>
  <div class="card_body">
    <div>
      <a class="c-toSelfpage" href="#">
        <h4 class="card-title">${title}
        </h4>
      </a>
      <i class="heart fa-regular ${heart} fa-heart"></i>
    </div>
      <h6 data-autherno=${autherno}>
        <img src=${shot} alt="大頭照" class="head" />
        ${userName}
      </h6>
    <div class="viewsAndHeart">
      <p><i class="fa-regular fa-heart"></i> ${likes}</p>
      <p><i class="fa-regular fa-eye"></i> ${views}</p>
    </div>
  </div>
</div>`;
  $('.c-mylikes').append(mycards);
  // $('h6').data('authorno');
}
function userProfile(banner, shot, userName, intro) {
  $(".selfCover").attr("src", banner);
  $('.selfShot').attr("src", shot);
  if (userName) {
    $('.userName').text(userName);
  }
  $('.selfIntroduce p').text(intro);

}