// 傳入登入者id
let userno = 2;
let url = "http://localhost:3000";

// 使用者點擊.edit_cover元素時，觸發 fileUpload 元件的點擊事件
let editButton = document.querySelector(".uploadbanner");
// console.log(editButton);
editButton.addEventListener("click", function () {
  document.querySelector("#fileUpload").click();
});
let editshot = document.querySelector(".uploadShot");
editshot.addEventListener("click", function () {
  document.querySelector("#shotUpload").click();
});

// 開啟modal----------------------------------------------
let camera = document.querySelector(".camera");
let openBanner = document.querySelector(".edit_cover");
camera.addEventListener("click", function () {
  document.querySelector(".mymodal").style.display = "flex";
});
openBanner.addEventListener("click", function () {
  document.querySelector(".bannerModal").style.display = "flex";
});
// ------------------------------------------------------
// 關閉modal----------------------------------------------
function closemodal() {
  document.querySelector(".mymodal").style.display = "none";
}
// -------------------------------------------------------

function closeBanner() {
  document.querySelector(".bannerModal").style.display = "none";
}

// 使用者點擊切換分頁

// console.log(typeof c_likes);
let c_likes = getComputedStyle(document.querySelector("#c-likes")).display;
let c_message = getComputedStyle(document.querySelector("#c-message")).display;
let c_myarts = getComputedStyle(document.querySelector("#c-myarts")).display;
function toggleDisplay(elementId, displayValue) {
  document.querySelector(elementId).style.display = displayValue;
}
document
  .querySelector('a[href="#c-likes"]')
  .addEventListener("click", function () {
    if (c_likes == "none") {
      toggleDisplay("#c-likes", "block");
      toggleDisplay("#c-message", "none");
      toggleDisplay("#c-myarts", "none");
    }
  });
document
  .querySelector('a[href="#c-myarts"]')
  .addEventListener("click", function () {
    if (c_myarts == "none") {
      toggleDisplay("#c-likes", "none");
      toggleDisplay("#c-message", "none");
      toggleDisplay("#c-myarts", "block");
    }
  });
document
  .querySelector('a[href="#c-message"]')
  .addEventListener("click", function () {
    console.log(c_message);
    if (c_message == "block") {
      toggleDisplay("#c-likes", "none");
      toggleDisplay("#c-message", "block");
      toggleDisplay("#c-myarts", "none");
    }
  });

// 大頭貼上傳預覽-----------------------------------------
let preview = document.querySelector(".imgPreview");
let previewBanner = document.querySelector(".selfbanner");
let file;

function changePhoto(element) {
  // console.log(element.value);
  // console.log(element.files);
  file = element.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  // console.log(file);
  if (file) {
    // console.log(preview);
    reader.onloadend = function (e) {
      console.log(e.target);
      if (element.id == "shotUpload") {
        preview.setAttribute("src", e.target.result);
      } else if (element.id == "fileUpload") {
        previewBanner.setAttribute("src", e.target.result);
      }
    };
  }
}

$(document).ready(function () {
  // 恢復原廠banner
  let originBanner = previewBanner.getAttribute("src");
  document.querySelector(".cancel").addEventListener("click", function () {
    previewBanner.setAttribute("src", originBanner);
    console.log("kk");
    file = undefined;
    // console.log('kkk:' + originBanner)
  });
  let originAvatar = preview.getAttribute("src");
  let reoriginAvatarBtn = document.querySelector(".mymodal");
  let reoriginAvatarBtn2 = document.querySelector(".closemodal");

  reoriginAvatarBtn.addEventListener("click", () => {
    reoriginAvatar();
  });
  reoriginAvatarBtn2.addEventListener("click", () => {
    reoriginAvatar();
  });
  function reoriginAvatar() {
    preview.setAttribute("src", originAvatar);
    console.log("kk");
    file = undefined;
  }

  let uploadShotDone = document.querySelector(".uploadShotDone");
  let bannerDone = document.querySelector(".bannerDone");
  uploadShotDone.addEventListener("click", function (e) {
    console.log(file);
    if (file) {
      uploadPhoto(e.target.className);
      file = undefined;
    } else {
      alert("請至少選擇一個圖檔上傳,限制圖檔格式為：.jpg, .jpeg, .png, .gif");
    }
  });
  bannerDone.addEventListener("click", function (e) {
    console.log(file);
    if (file) {
      uploadPhoto(e.target.className);
      file = undefined;
    } else {
      alert("請至少選擇一個圖檔上傳,限制圖檔格式為：.jpg, .jpeg, .png, .gif");
    }
  });
  function uploadPhoto(target) {
    // console.log(target);
    // console.log(file);

    let formData = new FormData();
    formData.append("shotUpload", file);
    formData.append("userno", userno);
    // console.log(formData.get('shotUpload'));//檢查formData是否真的有東西
    $.ajax({
      url:
        target == "uploadShotDone"
          ? url + "/client/upload"
          : url + "/client/uploadBanner",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        console.log(data);
        alert(data.myPhotoAlert);
        if (data.myPhotoAlert == "大頭貼修改完成") {
          photoesAvatar(data.avatarData.avatar);
        } else if (data.myPhotoAlert == "封面照片修改完成") {
          photoes(data.bannerData.banner);
        }
      },
      error: function (err) {
        // 發生錯誤，顯示錯誤訊息
        console.error(err);
      },
    });
  }
  $('.c-mylikes').on("click", 'h6', function () {
    console.log($(this)[0].dataset.autherno);
    sessionStorage.setItem('atherno', JSON.stringify($(this)[0].dataset.autherno));
    window.location = './selfpage.html';
  });
  $('.c-mylikes').on("click", ".heart", function (e) {
    // 找到點擊的 i 元素所在的 card_body 元素
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

  // ----------------------------------------------------------------
  // console.log($); // 確認jQuery
  // ---------------------- 這裡是個人資料讀取 -------------------------- //
  // let userno; // 之後要改這裡！
  // ----- GET -----
  var renderID = () => {
    $.ajax({
      url: url + "/client/identity",
      type: "GET",
      data: {
        userno: userno,
      },
      success: function (data) {
        dataclear();//清空個人資料
        console.log(data.userLikes); // 確認有撈到資料
        if (data.userMessage[0].banner) {
          $(".selfbanner").attr("src", "");
          photoes(data.userMessage[0].banner);
          originBanner = previewBanner.getAttribute("src");
        }
        if (data.userMessage[0].avatar) {
          $(".shot,.imgPreview").attr("src", "");
          photoesAvatar(data.userMessage[0].avatar);
          originAvatar = preview.getAttribute("src");
        }
        $("#id").val(data.userMessage[0].userno);
        $("#email").text(data.userMessage[0].id);
        $("#pwd").val(data.userMessage[0].password);
        $("#nick").val(data.userMessage[0].nickname);
        $("#bday").val(data.userMessage[0].birthday);
        $("#myIntro").val(data.userMessage[0].intro);
        $(".username").text(
          data.userMessage[0].nickname ? data.userMessage[0].nickname : data.userMessage[0].username
        );
        if (!data.userLikes[0]) {
          $('.c-mylikes').html('<p>目前收藏文章數：0</p>');
        }
        $.each(data.userLikes, function (i, value) {
          cards(value.articleno,
            value.image ? url + value.image : "./img/puppy-1207816_1280.jpg",
            value.title,
            'fas',
            value.userno,
            value.avatar ? url + value.avatar : "./img/admin2.png",
            value.nickname ? value.nickname : value.username,
            value.count, value.view_count)
        });

      },
      error: function (err) {
        // 發生錯誤，顯示錯誤訊息
        console.error(err);
      },
    });
  };
  renderID();


  /* ------------- (自動偵測密碼限制) ------------- */
  let oktoPost = false;
  $("#pwd").on("input", () => {
    if (!$("#pwd").val()) {
      $("#m-pwd").text("*必填欄位");
      oktoPost = false;
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test($("#pwd").val())) {
      $("#m-pwd").text("*密碼長度6以上，並包含至少一個英數字");
      oktoPost = false;
    } else {
      $("#m-pwd").html(' <i class="fa-solid fa-circle-check"></i>');
      oktoPost = true;
    }
  });

  /* ------------- (按鍵儲存) ------------- */

  $(".c-change").on("click", function () {
    if (oktoPost) {
      $.ajax({
        url: url + "/client/identity/update",
        type: "post",
        data: {
          userno: userno, //  我有設變數在上面
          password: $("#pwd").val(),
          nickname: $("#nick").val(),
          birthday: $("#bday").val(),
          intro: $("#myIntro").val(),
        },
        success: function (data) {
          console.log(data); // 確認有撈到資料
          dataclear();
          renderID();
          alert("更新成功");
        },
      });
    } else {
      alert("請輸入正確格式密碼");
    }
  });
});
function photoes(banner) {
  $(".selfbanner").attr("src", url + banner + "?temp=" + Math.random());
}
function photoesAvatar(avatars) {
  $(".shot,.imgPreview").attr(
    "src",
    url + avatars + "?temp=" + Math.random()
  );
} //每次url都給不同參數讓瀏覽器不要使用緩存的圖片
function dataclear() {
  $("#id").text(), $("#email").val("");
  $("#pwd").val("");
  $("#nick").val("");
  $("#bday").val("");
  $("#myIntro").val("");
}
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
}
