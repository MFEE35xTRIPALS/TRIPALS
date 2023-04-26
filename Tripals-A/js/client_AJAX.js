// 傳入登入者id
let userno = 3;

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
let camera = document.querySelector('.camera');
let openBanner = document.querySelector('.edit_cover');
camera.addEventListener('click', function () {
  document.querySelector('.mymodal').style.display = 'flex';
})
openBanner.addEventListener('click', function () {
  document.querySelector('.bannerModal').style.display = 'flex';
})
// ------------------------------------------------------
// 關閉modal----------------------------------------------
function closemodal() {
  document.querySelector('.mymodal').style.display = "none";
}
// -------------------------------------------------------
function closeBanner() {
  document.querySelector('.bannerModal').style.display = "none";
//   document.querySelector('#apple').reset();
}


// 使用者點擊切換分頁

// console.log(typeof c_likes);
let c_likes = getComputedStyle(document.querySelector('#c-likes')).display;
let c_message = getComputedStyle(document.querySelector('#c-message')).display;
let c_myarts = getComputedStyle(document.querySelector('#c-myarts')).display;
function toggleDisplay(elementId, displayValue) {
  document.querySelector(elementId).style.display = displayValue;
}
document.querySelector('a[href="#c-likes"]').addEventListener('click', function () {
  if (c_likes == 'none') {
    toggleDisplay('#c-likes', 'block');
    toggleDisplay('#c-message', 'none');
    toggleDisplay('#c-myarts', 'none');
  }
});
document.querySelector('a[href="#c-myarts"]').addEventListener('click', function () {
  if (c_myarts == 'none') {
    toggleDisplay('#c-likes', 'none');
    toggleDisplay('#c-message', 'none');
    toggleDisplay('#c-myarts', 'block');
  }
});
document.querySelector('a[href="#c-message"]').addEventListener('click', function () {
  console.log(c_message)
  if (c_message == 'block') {
    toggleDisplay('#c-likes', 'none');
    toggleDisplay('#c-message', 'block');
    toggleDisplay('#c-myarts', 'none');
  }
});


// 大頭貼上傳預覽-----------------------------------------
let preview = document.querySelector('.imgPreview');
let previewBanner = document.querySelector('.selfbanner');
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
            console.log(e.target)
            if (element.id == 'shotUpload') {
                preview.setAttribute("src", e.target.result);
            } else if (element.id == 'fileUpload') {
                previewBanner.setAttribute("src", e.target.result);

            }
        }
    }
}

$(document).ready(function () {

    let url = 'http://localhost:3000';
    function getAvatar() {
        //GET 大頭貼照片
        $(".shot,.imgPreview,.selfbanner").attr('src', '');
        $.ajax({
            type: "GET",
            url: url + '/client/avatar',
            data: {
                userno: userno
            },
            success: function (data) {
                // 取得圖片資源成功，顯示圖片
                // console.log(data);
                photoes(url + data.avatar, url + data.banner);
            },
            error: function (err) {
                // 發生錯誤，顯示錯誤訊息
                console.error(err);
            }
        });
    }
    function photoes(avatars, banner) {
        $(".shot,.imgPreview").attr('src', avatars + '?temp=' + Math.random());//每次url都給不同參數讓瀏覽器不要使用緩存的圖片
        $(".selfbanner").attr('src', banner + '?temp=' + Math.random());//每次url都給不同參數讓瀏覽器不要使用緩存的圖片

    };
    getAvatar();


    let uploadShotDone = document.querySelector('.uploadShotDone');
    let bannerDone = document.querySelector('.bannerDone');
    uploadShotDone.addEventListener('click', function (e) { uploadPhoto(e.target.className); })
    bannerDone.addEventListener('click', function (e) { uploadPhoto(e.target.className); })
    function uploadPhoto(target) {
        // console.log(target);
        // console.log(file);
        let formData = new FormData();
        formData.append('shotUpload', file);
        formData.append('userno', userno);
        // console.log(formData.get('shotUpload'));//檢查formData是否真的有東西
        $.ajax({
            url: (target == 'uploadShotDone')?url+'/client/upload':url+'/client/uploadBanner',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                // console.log(data);
                alert(data);
                getAvatar();
            },
        });
    }
});




