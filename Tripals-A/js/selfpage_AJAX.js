// 登入使用者編號
let userno = 5;
let authorno = 3;

$(document).ready(function () {
  // console.log($);
  let url = 'http://localhost:3000';
  function getCards() {
    //GET 整頁的資料
    $(".selfCover").attr("src", "");
    $('.selfShot').attr("src", "");
    $('.userName').text('');
    $('.selfIntroduce p').text('');
    $('.c-mylikes').empty();
    $.ajax({
      type: "GET",
      url: url + '/selfpage/cards',
      data: {
        userno: userno,
        authorno: authorno
      },
      success: function (data) {
        // 取得圖片資源成功，顯示圖片
        console.log(data.usermessage);

        userProfile(data.authormessage[0].banner ? url + data.authormessage[0].banner : "./img/y-s-LGx9C3nSo5I-unsplash.jpg",
          data.authormessage[0].avatar ? url + data.authormessage[0].avatar : "./img/admin2.png",
          data.authormessage[0].nickname ? data.authormessage[0].nickname : data.authormessage[0].username,
          data.authormessage[0].intro);
        $.each(data.cardmessage, function (i, value) {
          // console.log(value.userno);
          data.usermessage.forEach(element => {
            if (element.includes(value.articleno)) {
              console.log('fas');
              // return 'fas';
            } else {
              console.log("不包含")
              // return '';
            }
          });
          cards(value.articleno,
            value.image ? url + value.image : "./img/puppy-1207816_1280.jpg",
            value.title,


            'fas',


            value.userno,
            value.avatar ? url + value.avatar : "./img/admin2.png",
            value.nickname ? value.nickname : value.username,
            value.like_count, value.view_count)
        });
      },
      error: function (err) {
        // 發生錯誤，顯示錯誤訊息
        console.error(err);
      }
    });
  }
  function cards(articleno, img, title, heart, autherno, shot, userName, likes, views) {
    let mycards = `<div class="onecard card">
    <a href="#" class="c-cardImg">
    <input type='hidden' value=${articleno}>
      <div class="c-imgCover">
        <p>more</p>
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
      <a href="#" class="c-userName">
      <input type='hidden' value=${autherno}>
        <h6>
          <img src=${shot} alt="大頭照" class="head" />
          ${userName}
        </h6>
      </a>
      <div class="viewsAndHeart">
        <p><i class="fa-regular fa-heart"></i>${likes}</p>
        <p><i class="fa-regular fa-eye"></i>${views}</p>
      </div>
    </div>
  </div>`;
    $('.c-mylikes').append(mycards);
  }
  function userProfile(banner, shot, userName, intro) {
    $(".selfCover").attr("src", banner);
    $('.selfShot').attr("src", shot);
    if (userName) {
      $('.userName').text(userName);
    }
    $('.selfIntroduce p').text(intro);

  }
  getCards()
});