// 使用者點擊.edit_cover元素時，觸發 fileUpload 元件的點擊事件
let editButton = document.querySelector(".edit_cover");
// console.log(editButton);
editButton.addEventListener("click", function () {
  document.querySelector("#fileUpload").click();
});
let editshot = document.querySelector(".uploadShot");
editshot.addEventListener("click", function () {
  document.querySelector("#shotUpload").click();
});

// 開啟大頭貼modal
let camera = document.querySelector('.camera');
camera.addEventListener('click', function () {
  document.querySelector('.mymodal').style.display = 'flex';
})
// 關閉大頭貼modal
function closemodal() {
  document.querySelector('.mymodal').style.display = "none";
}
// 大頭貼上傳預覽
  let preview = document.querySelector('.imgPreview');
  let inputFile = document.querySelector('#shotUpload');

  inputFile.addEventListener('change', function () {
    let file = inputFile.files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    if (file && inputFile.files) {
      // console.log(preview);
      reader.onloadend = function (e) {
        // console.log(e)
        preview.setAttribute("src", e.target.result);
      }
    }
  })





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
