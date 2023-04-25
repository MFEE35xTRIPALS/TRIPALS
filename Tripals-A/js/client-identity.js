// console.log($); // 確認jQuery
// ---------------------- 這裡是個人資料讀取 -------------------------- //
let userno1 = 6; // 之後要改這裡！
// ----- GET -----
var renderID = () => {
  $.ajax({
    url: "http://localhost:3000/client/identity",
    type: "GET",
    success: function (data) {
      dataclear();
      console.log(data); // 確認有撈到資料
      // $("#id").val(data[0].userno);
      $("#email").val(data[0].id);
      $("#pwd").val(data[0].password);
      $("#nick").val(data[0].nickname);
      $("#bday").val(data[0].birthday);
      $("#myIntro").val(data[0].intro);
      $(".username").text(
        data[0].nickname ? data[0].nickname : data[0].username
      );
    },
  });
};
renderID();

function dataclear() {
  $("#id").val(), $("#email").val("");
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
    url: "http://localhost:3000/client/identity/update",
    type: "post",
    data: {
      userno: userno, //  我有設變數在上面
      // userno: $("#id").val(),
      id: $("#email").val(),
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

// ---------------------- 這裡是照片儲存 -------------------------- //
// var y = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "userHead"); // 保存的路徑，需手動建立檔案夾
//   },
//   filename: function (req, file, cb) {
//     // // PDF作法，有時間戳記，適合用在要保存每次上傳的東西
//     // var userFileName = Date.now() + "." + file.originalname.split(".")[1];
//     // // 老師改編，適合用在: 使用者大頭照，id.副檔名，上傳新的直接覆蓋
//     var userFileName = "55688" + "." + file.originalname.split(".")[1];
//     cb(null, userFileName);
//   },
// });

// // ▽ 過濾檔案類型
// var x = multer({
//   storage: y,
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype != "image/png") {
//       return cb(new Error("檔案類型錯誤"));
//     }
//     cb(null, true);
//   },
// }); // 設置storage
