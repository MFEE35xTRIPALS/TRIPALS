$(document).ready(function () {
    // 傳入登入者id
    let userno = 2;

    function getAvatar() {
        //GET 大頭貼照片
        let url = 'http://localhost:3000';
        $.ajax({
            type: "GET",
            url: url + '/client/avatar',
            success: function (data) {
                // 取得圖片資源成功，顯示圖片
                $(".h-img").empty();
                $('.imgPreviewBorder').empty();
                avator(url + data.avatar)
                console.log(data);
            },
            error: function (err) {
                // 發生錯誤，顯示錯誤訊息
                console.error(err);
            }
        });
    }
    function avator(avatars) {
        $('.h-img').append(`<img class="shot" src=${avatars} alt="shot" />`);
        $('.imgPreviewBorder').append(`<img class="imgPreview" src=${avatars} alt="大頭貼預覽">`);

    };
    getAvatar();
    
    // 大頭貼上傳預覽
    let preview = document.querySelector('.imgPreview');
    let inputFile = document.querySelector('#shotUpload');

    inputFile.addEventListener('change', (e) => {
        let file = e.target.files[0];
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
        $('.uploadShotDone').on('click', function () {
            console.log(file);
            let formData = new FormData();
            formData.append('shotUpload', file);
            // console.log(formData.get('shotUpload'));//檢查formData是否真的有東西
            $.ajax({
                url: 'http://localhost:3000/client/upload',
                type: 'POST',
                data:formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    alert(data);
                    getAvatar();
                },
            });
        })

    })

});
