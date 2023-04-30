/* ------------- h1 Type animation ------------- */
new TypeIt("#ml6", {
  strings: "Start your Trip.",
  waitUntilVisible: true,
}).go();
/* ------------- CRUD ajax ------------- */
var url = "http://localhost:3000";

/* ------------- hashtag random 8 ------------- */
$.ajax({
  url: url + "/articles/hashtags",
  type: "GET",
  success: function (data) {
    $("#tags").empty();
    $.each(data, function (i, list) {
      var tag = `<li class="tag" ># ${list.hashtag}
      </li>`;
      $("#tags").append(tag);
      // console.log(list);
    });
  },
});

/* ----------------- location ----------------- */
var cities = [
  { value: 0, name: "基隆市" },
  { value: 1, name: "台北市" },
  { value: 2, name: "新北市" },
  { value: 3, name: "桃園市" },
  { value: 4, name: "新竹市" },
  { value: 5, name: "新竹縣" },
  { value: 6, name: "苗栗縣" },
  { value: 7, name: "台中市" },
  { value: 8, name: "彰化縣" },
  { value: 9, name: "南投縣" },
  { value: 10, name: "雲林縣" },
  { value: 11, name: "嘉義市" },
  { value: 12, name: "嘉義縣" },
  { value: 13, name: "台南市" },
  { value: 14, name: "高雄市" },
  { value: 15, name: "屏東縣" },
  { value: 16, name: "台東縣" },
  { value: 17, name: "花蓮縣" },
  { value: 18, name: "宜蘭縣" },
  { value: 19, name: "澎湖縣" },
  { value: 20, name: "金門縣" },
  { value: 21, name: "連江縣" },
];

$.each(cities, function (i, city) {
  var opt = ` <option value="${i}">${city.name}</option>`;
  $("select.city").append(opt);
});
