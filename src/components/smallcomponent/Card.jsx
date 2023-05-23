import React, { useState } from "react";
import axios from "axios";
import useSwaConfirm from "../../components/swaConfirm";
import useSwaAlert from "../../components/swaAlert";


function Card(props) {
  const swaAlert = useSwaAlert();
  const swaConfirm = useSwaConfirm();
  const [data] = useState({ ...props.data });
  // console.log(props)

  var url = "http://localhost:8000";
  var image = props.data.image ? url + props.data.image : "/images/sunrise.jpg";
  var avatar = props.data.avatar
    ? url + props.data.avatar
    : "http://localhost:8000/useravatar/pre.png";
  var [like_count, setlike_count] = useState(props.data.like_count);
  var [userlikes, setuserlikes] = useState(props.ifUserLike);
  var userno = props.userno;
  var articleno = props.data.articleno;

  return (
    <div>
      {/* card content */}
      <div className="onecard card">
        <a
          // href={`/${articleno}`}
          className="c-cardImg"
          onClick={toViewArticle}
        >
          <div className="c-imgCover">
            <span>READ</span>
          </div>
          <img className="Img" src={image} alt="文章首圖" />
        </a>
        <div className="card_body">
          <div>
            <a
              className="c-toSelfpage"
              // href={`/${articleno}`}
              onClick={toViewArticle}
            >
              <h4 className="card-title">{data.title}</h4>
            </a>
            <i
              className={`heart fa-regular fa-heart ${userlikes ? "fas" : ""}`}
              onClick={updateLikes}
            ></i>
          </div>
          <h6 data-autherno={data.userno} onClick={toSelfpage}>
            <img src={avatar} alt="大頭照" className="head" /> {data.username}
          </h6>
          <div className="viewsAndHeart">
            <p>
              <i className="fa-regular fa-heart"></i> {like_count}
            </p>
            <p>
              <i className="fa-regular fa-eye"></i> {data.view_count}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // 跳轉作者個人頁面
  function toSelfpage(e) {
    // console.log(e.target.dataset.autherno);
    props.history.push(`/selfpage${e.target.dataset.autherno}`)
    // window.location = `/selfpage${e.target.dataset.autherno}`;
  }

  // 跳轉文章瀏覽頁面
  function toViewArticle(e) {
    // console.log(articleno);
    props.history.push(`/view${articleno}`)
    // window.location = `/view${articleno}`;
  }

  // 按愛心收藏＆取消收藏
  async function updateLikes() {
    // console.log(userlikes);
    if (props.currentUser) {
      var result = await axios.post(
        userlikes
          ? url + "/selfpage/deleteLikes"
          : url + "/selfpage/insertLikes",
        {
          userno: userno,
          articleno: articleno,
        }
      );
      // console.log(result.data.likesCount);
      setuserlikes(!userlikes);
      if (userlikes) {
        swaAlert('已取消收藏', '', '', 1500)
      } else {
        swaAlert('收藏成功', '', 'success', 1500)
      }
      setlike_count(result.data.likesCount);
    } else {
      // let ifSingin = window.confirm("登入後才可收藏文章,是否要前往登入？");
      swaConfirm("登入後才可收藏文章", '是否要前往登入？', "warning", () => {
        props.history.push("/login/else")
      })
      // if (ifSingin) {
      //   props.history.push("/login")
      //   // window.location = "/login";
      // } else {
      //   return;
      // }
    }
  }
}

export default Card;
