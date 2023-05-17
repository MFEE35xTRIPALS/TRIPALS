import React, { Component } from "react";
import axios from "axios";

class Card2 extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    url: "http://localhost:8000",
    articles: this.props.data,
    articleno: this.props.data.articleno,
    userno: this.props.userno,
    // userlikes=boolen 有沒有收藏
    userlike: this.props.ifUserLike,
    image: this.props.data.image
      ? "http://localhost:8000" + this.props.data.image
      : "/images/sunrise.jpg",
    avatar: this.props.data.avatar
      ? "http://localhost:8000" + this.props.data.avatar
      : "/images/admin.png",
    like_count: this.props.data.like_count,
  };

  render() {
    return (
      <div>
        {/* card content */}
        <div className="onecard card">
          <a
            href={`/${this.state.articleno}`}
            onClick={this.toArticlepage}
            className="c-cardImg"
          >
            <div className="c-imgCover">
              <span>READ</span>
            </div>
            <img className="Img" src={this.state.image} alt="文章首圖" />
          </a>
          <div className="card_body">
            <div>
              <a
                className="c-toSelfpage"
                href={`/${this.state.articleno}`}
                onClick={this.toArticlepage}
              >
                <h4 className="card-title">{this.state.articles.title}</h4>
              </a>
              <i
                className={`heart fa-regular fa-heart ${this.state.userlike ? "fas" : ""
                  }`}
                onClick={this.updateLikes}
              ></i>
            </div>
            <h6
              data-autherno={this.state.articles.userno}
              onClick={this.toSelfpage}
            >
              <img src={this.state.avatar} alt="大頭照" className="head" />{" "}
              {this.state.articles.username}
            </h6>
            <div className="viewsAndHeart">
              <p>
                <i className="fa-regular fa-heart"></i> {this.state.like_count}
              </p>
              <p>
                <i className="fa-regular fa-eye"></i>{" "}
                {this.state.articles.view_count}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  /* ------- 跳轉作者個人頁面 ------- */
  toSelfpage = (e) => {
    // console.log(e.target.dataset.autherno);
    window.location = `/selfpage/${e.target.dataset.autherno}`;
  };
  /* ------- 跳轉文章瀏覽頁面並update瀏覽數(已搬到瀏覽文章頁) ------- */
  // toArticlepage = async (e) => {
  //   await axios.post(this.state.url + "/selfpage/updateViews", {
  //     articleno: this.state.articleno,
  //   });
  // };

  /* ------- 按愛心收藏＆取消收藏 ------- */
  // 按愛心收藏＆取消收藏
  updateLikes = async () => {
    // console.log(this.props.userno);
    // console.log(this.state.articleno);
    var result = await axios.post(
      this.state.userlike
        ? this.state.url + "/selfpage/deleteLikes"
        : this.state.url + "/selfpage/insertLikes",
      {
        userno: this.state.userno,
        articleno: this.state.articleno,
      }
    );
    var newState = { ...this.state };
    newState.userlike = !this.state.userlike;
    newState.like_count = result.data.likesCount;
    this.setState(newState);
  };
}

export default Card2;
