/* ----------- 大頭貼 ----------- */
$("img.shot").attr("src", "");
var url = "http://localhost:3000";
// ----- GET -----
var renderHead = () => {
  $.ajax({
    url: "http://localhost:3000/head",
    type: "GET",
    success: function (data) {
      console.log(data.avatar); // 確認有撈到資料
      $("img.shot").attr("src", url + data.avatar);
    },
  });
};
renderHead();
// ----- 預覽 -----
// 需要new fileReader
