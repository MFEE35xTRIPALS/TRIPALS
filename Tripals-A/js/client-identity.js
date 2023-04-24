// console.log($); // 確認jQuery
// ---------------------- 這裡是個人資料讀取 -------------------------- //
// ----- GET -----
var renderID = () => {
  $.ajax({
    url: "http://localhost:3000/client/identity",
    type: "GET",
    success: function (data) {
      dataclear();
      // console.log(data); // 確認有撈到資料
      $("#id").val(data[0].userno);
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
  $("#id").val("");
  $("#email").val("");
  $("#pwd").val("");
  $("#nick").val("");
  $("#bday").val("");
  $("#myIntro").val("");
}

/* ------------- (按鍵儲存) ------------- */
$(".c-change").on("click", function () {
  // alert("ＯＫ");
  $.ajax({
    url: "http://localhost:3000/client/identity/update",
    type: "post",
    data: {
      userno: $("#id").val(),
      id: $("#email").val(),
      password: $("#pwd").val(),
      nickname: $("#nick").val(),
      birthday: $("#bday").val(),
      intro: $("#myIntro").val(),
    },
    success: function (data) {
      // console.log(data); // 確認有撈到資料
      dataclear();
      alert("更新成功");
      renderID();
    },
  });
});
