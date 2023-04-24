$(document).ready(function () {
<<<<<<< Updated upstream
  // function getAvatar() {
  //     //GET 大頭貼照片
  //     $.ajax({
  //         type: "GET",
  //         url: 'http://localhost:3000/client/avatar',
  //         success: function (data) {
  //             // 取得圖片資源成功，顯示圖片
  //             $(".h-img").empty();
  //             $('.imgPreviewBorder').empty();
  //             avator(data.avatar, data.nickname)
  //             console.log(data);
  //             console.log('我是5500');
  //         },
  //         error: function (err) {
  //             // 發生錯誤，顯示錯誤訊息
  //             console.error(err);
  //         }
  //     });
  // }
  // function avator(avatars, uerName) {
  //     $('.h-img').append(`<img class="shot" src="./userprofile/userno_2${avatars}" alt="shot" />`);
  //     $('.imgPreviewBorder').append(`<img class="imgPreview" src='./userprofile/userno_2${avatars}' alt="大頭貼預覽">`);
  //     $('.username').text(`${uerName}`);

  // };
  // getAvatar();
  // 上傳圖片
  // $('.uploadShotDone').submit(function (e) {
  //     e.preventDefault();
  //     var formData = new FormData();
  //     formData.append('avatar', $('#shotUpload')[0].files[0]);
  //     $.ajax({
  //         url: 'http://localhost:3000/client/uploadfile',
  //         type: 'POST',
  //         data: formData,
  //         processData: false,
  //         contentType: false,
  //         success: function () {
  //             alert('Upload successful!');
  //             $('#avatarImg').attr('src', 'http://localhost:3000/client/uploadfile' + new Date().getTime());
  //         },
  //         error: function () {
  //             alert('Upload failed!');
  //         }
  //     });
  // });
  console.log($(".uploadShotDone"));
  $(".uploadShotDone").on("click", function () {
    // console.log('??')
    var formData = new FormData();
    formData.append("avatar", $("#shotUpload").files);
    console.log(formData);
    $.ajax({
      url: "http://localhost:3000/client/upload",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function () {
        alert("Upload successful!");
        // $('#avatarImg').attr('src', 'http://localhost:3000/client/uploadfile' + new Date().getTime());
      },
    });
  });
});
=======
    function getAvatar() {
        //GET 大頭貼照片
        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/client/avatar',
            success: function (data) {
                // 取得圖片資源成功，顯示圖片
                // $(".h-img").empty();
                $('.imgPreviewBorder').empty();
                // avator(data.avatar)
                console.log("Helllo" + JSON.stringify(data));
                // $('.shot').attr('src','file://Users/chenxin/Documents/GitHub/Tripals-Backend/router/public/userno_2/avatar.png')
                console.log('我是5500');
            },
            error: function (err) {
                // 發生錯誤，顯示錯誤訊息
                console.error(err);
            }
        });
    }
    function avator(avatars, uerName) {
        $('.h-img').append(`<img class="shot" src="./userprofile/userno_2${avatars}" alt="shot" />`);
        $('.imgPreviewBorder').append(`<img class="imgPreview" src='./userprofile/userno_2${avatars}' alt="大頭貼預覽">`);

    };
    getAvatar();
    // 上傳圖片
    // $('.uploadShotDone').submit(function (e) {
    //     e.preventDefault();
    //     var formData = new FormData();
    //     formData.append('avatar', $('#shotUpload')[0].files[0]);
    //     $.ajax({
    //         url: 'http://localhost:3000/client/uploadfile',
    //         type: 'POST',
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         success: function () {
    //             alert('Upload successful!');
    //             $('#avatarImg').attr('src', 'http://localhost:3000/client/uploadfile' + new Date().getTime());
    //         },
    //         error: function () {
    //             alert('Upload failed!');
    //         }
    //     });
    // });
    // 大頭貼上傳預覽
    let preview = document.querySelector('.imgPreview');
    let inputFile = document.querySelector('#shotUpload');

    inputFile.addEventListener('change', function () {
        let file = inputFile.files[0];
        console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        // console.log(reader);
        if (file && inputFile.files) {
            // console.log(preview);
            reader.onloadend = function (e) {
                // console.log(e)
                preview.setAttribute("src", e.target.result);
            }
        }
    })

    $('.uploadShotDone').on('click', function () {
        // console.log('??')
        let file = inputFile.files[0];
        console.log('第二次'+inputFile);
        var formData = new FormData();
        formData.append('avatar', $('#shotUpload').file);
        console.log(formData);
        $.ajax({
            url: 'http://localhost:3000/client/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                console.log('okkkk');
                alert('Upload successful!');
                // $('#avatarImg').attr('src', 'http://localhost:3000/client/uploadfile' + new Date().getTime());
            },
        });
    })
});
>>>>>>> Stashed changes
