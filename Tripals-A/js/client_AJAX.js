// 傳入登入者id
let userno = 6;

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
  console.log(file);
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

  let url = "http://localhost:3000";
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
        }else if(data.myPhotoAlert == '封面照片修改完成'){
          photoes(data.bannerData.banner);
        }                                                                                                                                                                                                                                                                                             {}

      },
      error: function (err) {
        // 發生錯誤，顯示錯誤訊息
        console.error(err);
      },
    });
  }

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
        dataclear();
        console.log(data); // 確認有撈到資料
        if (data[0].banner !== null) {
          $(".selfbanner").attr("src", "");
          photoes(data[0].banner);
          originBanner = previewBanner.getAttribute("src");
        }
        if (data[0].avatar !== null) {
          $(".shot,.imgPreview").attr("src", "");
          photoesAvatar(data[0].avatar);
          originAvatar = preview.getAttribute("src");
        }
        $("#id").val(data[0].userno);
        $("#email").text(data[0].id);
        $("#pwd").val(data[0].password);
        $("#nick").val(data[0].nickname);
        $("#bday").val(data[0].birthday);
        $("#myIntro").val(data[0].intro);
        $(".username").text(
          data[0].nickname ? data[0].nickname : data[0].username
        );
      },
      error: function (err) {
        // 發生錯誤，顯示錯誤訊息
        console.error(err);
      },
    });
  };
  renderID();

  function photoes(banner) {
    $(".selfbanner").attr("src", url + banner + "?temp=" + Math.random());
  }
  function photoesAvatar(avatars) {
    $(".shot,.imgPreview").attr("src", url + avatars + "?temp=" + Math.random());
  } //每次url都給不同參數讓瀏覽器不要使用緩存的圖片
  function dataclear() {
    $("#id").text(), $("#email").val("");
    $("#pwd").val("");
    $("#nick").val("");
    $("#bday").val("");
    $("#myIntro").val("");
  }

  /* ------------- (按鍵儲存) ------------- */
  $(".c-change").on("click", function () {
    console.log($("#nick").val());
    // alert("ＯＫ");
    $.ajax({
      url: url + "/client/identity/update",
      type: "post",
      data: {
        userno: userno, //  我有設變數在上面
        // userno: $("#id").val(),
        password: $("#pwd").val(),
        nickname: $("#nick").val(),
        birthday: $("#bday").val(),
        intro: $("#myIntro").val(),
      },
      success: function (data) {
        console.log(data); // 確認有撈到資料
        dataclear();
        alert("更新成功");
        renderID();
      },
    });
  });
});
