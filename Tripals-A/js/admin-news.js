// console.log($); //確認jQuery

// ----- GET -----
$.ajax({
  url: "http://localhost:3000/news",
  type: "GET",
  success: function (data) {
    console.log(data); // 確認有撈到資料
    $.each(data, function (i, list) {
      let newsTr = $("<tr>");
      newsTr.append(`<td>${list.newsno}</td>`);
      newsTr.append(`<td>${list.title}</td>`);
      newsTr.append(`<td class="news-c">${list.content}</td>`);
      newsTr.append(`<td>${list.date}</td>`);
      newsTr.append(`<td><i class="fa-regular fa-pen-to-square"></i></td>`);
      $("#c-news").append(newsTr);
    });
  },
});
