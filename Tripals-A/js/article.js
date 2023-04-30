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
