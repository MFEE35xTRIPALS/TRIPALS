$(document).ready(function () {
    // console.log($);
    function getCards() {
        //     //GET 大頭貼照片
        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/selfpage/cards',
            success: function ([data1, data2]) {
                // 取得圖片資源成功，顯示圖片
                $('.c-mylikes').empty();
                $('.selfMessage').empty();
                console.log(data1);
                console.log(data2[0]);
                userProfile(data1[0].banner,data1[0].avatar,data1[0].nickname,data1[0].intro)
                $.each(data1, function (i, value) {
                    if (data2[0].collect == null || data2[0].collect.indexOf(value.articleno) == -1) {
                        cards(value.image, value.title, '', value.avatar, value.nickname, value.like_count, value.view_count);
                    }else if(data2[0].collect.indexOf(value.articleno)>0){
                        cards(value.image, value.title, 'fas', value.avatar, value.nickname, value.like_count, value.view_count);
                    }
                });
            },
            error: function (err) {
                // 發生錯誤，顯示錯誤訊息
                console.error(err);
            }
        });
    }
    function cards(img, title, heart, shot, userName, likes, views) {
        $('.c-mylikes').append(`<div class="onecard card">
        <a href="#" class="c-cardImg">
          <div class="c-imgCover">
            <p>more</p>
          </div>
          <img
            class="Img"
            src="${img}"
            alt="文章首圖"
            class="card-img-top"
          />
        </a>

        <div class="card_body">
          <div>
            <a class="c-toSelfpage" href="#">
              <h4 class="card-title">
                ${title}
              </h4>
            </a>
            <i class="heart fa-regular ${heart} fa-heart"></i>
          </div>
          <a href="#" class="c-userName">
            <h6>
              <img src="${shot}" alt="大頭照" class="head" />
              ${userName}
            </h6>
          </a>
          <div class="viewsAndHeart">
            <p><i class="fa-regular fa-heart"></i> ${likes}</p>
            <p><i class="fa-regular fa-eye"></i> ${views}</p>
          </div>
        </div>
      </div>`)
    }
    function userProfile(banner,shot,userName,intro){
        $(".selfCover").attr("src",`${banner}`);
        $('.selfMessage').append(`<img class="selfShot" src="${shot}" alt="大頭貼" />
        <h4 class="userName">${userName}</h4>`);
        $('.selfIntroduce p').text(`${intro}`)
    }
    getCards()
});