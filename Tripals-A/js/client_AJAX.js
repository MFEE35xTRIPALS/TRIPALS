$(document).ready(function () {
    function getAvatar() {
        //GET 大頭貼照片
        $.ajax({
            type: "GET",
            url: 'http://localhost:3000/client/avatar',
            success: function (data) {
                // 取得圖片資源成功，顯示圖片
                $(".h-img").empty();
                $('.imgPreviewBorder').empty();
                avator(data.avatar, data.nickname)
                console.log(data);
                console.log('我是5500');
            },
            error: function (err) {
                // 發生錯誤，顯示錯誤訊息
                console.error(err);
            }
        });
    }
    function avator(avatars, uerName) {
        $('.h-img').append(`<img class="shot" src='./userprofile/userno_2${avatars}' alt="shot" />`);
        $('.imgPreviewBorder').append(`<img class="imgPreview" src="./userprofile/userno_2${avatars}" alt="大頭貼預覽">`);
        $('.username').text(`${uerName}`);

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
    $('.uploadShotDone').onclick = function () {
        $.ajax({
            url: 'http://localhost:3000/client',
            type: 'POST',
            data: $('#shotUpload').files,
            processData: false,
            contentType: false,
            success: function () {
                alert('Upload successful!');
                // $('#avatarImg').attr('src', 'http://localhost:3000/client/uploadfile' + new Date().getTime());
            },
            error: function () {
                alert('Upload failed!');
            }
        });
    }
});