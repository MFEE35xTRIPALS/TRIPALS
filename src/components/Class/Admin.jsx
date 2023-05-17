import React, { Component } from "react";
import axios from "axios";

class Admin extends Component {
  state = {
    url: "http://localhost:8000",
    userno: 1,
    username: "",
    // AllNews
    news: [],
    // ClickedNews
    showNews: { title: "", content: "", release: "", newsno: "" },
    // AllMembers
    memberShips: [],
    // 更新｜發布 hidden icon
    ifPost: true,
    ifChange: false,
    // input內容
    ifSubmit: false,
    // AllArticles
    articles: [],
    // 點選跳轉
    ifOpenA: true,
    ifOpenB: false,
    ifOpenC: false,
  };
  render() {
    return (
      <div>
        <section className="c-head">
          <div className="img2"></div>
        </section>
        <section className="c-rwd">
          <section className="c-left">
            <div className="c-head">
              <div className="h-img">
                <img className="shot" src="/images/admin2.png" alt="shot" />
              </div>
              <h4 className="username">{this.state.username}</h4>
            </div>
            <div className="c-select">
              <ul>
                <li
                  onClick={() => {
                    var newState = { ...this.state };
                    newState.ifOpenA = true;
                    newState.ifOpenB = false;
                    newState.ifOpenC = false;
                    this.setState(newState);
                  }}
                >
                  最新消息
                </li>
                <li
                  onClick={() => {
                    var newState = { ...this.state };
                    newState.ifOpenA = false;
                    newState.ifOpenB = true;
                    newState.ifOpenC = false;
                    this.setState(newState);
                  }}
                >
                  會員管理
                </li>
                <li
                  onClick={() => {
                    var newState = { ...this.state };
                    newState.ifOpenA = false;
                    newState.ifOpenB = false;
                    newState.ifOpenC = true;
                    this.setState(newState);
                  }}
                >
                  文章管理
                </li>
              </ul>
            </div>
          </section>
          <section className="c-right">
            <div
              className={`c-block ${this.state.ifOpenA ? "" : "postBtn"}`}
              id="a-news"
            >
              <h3 className="c-title">最新消息</h3>
              <div className="a-news">
                <table className="c-myart">
                  <thead>
                    <tr>
                      <td className="a-noUse news-c">no</td>
                      <td>標題</td>
                      <td className="news-c">內文</td>
                      <td>發布日期</td>
                      <td>異動人</td>
                      <td>狀態</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody id="c-news">
                    {/* News 渲染位置 */}
                    {this.state.news.map((list, i) => {
                      // console.log(list.status);
                      if (list.status === "F") {
                        return (
                          <tr key={i} onClick={this.showNews}>
                            <td className="news-c a-noUse">{list.newsno}</td>
                            <td className="a-noUse">{list.title}</td>
                            <td className="news-c a-noUse">{list.content}</td>
                            <td className="a-noUse">{list.release}</td>
                            <td className="a-noUse">{list.userno}</td>
                            <td className="x-icon">已下架</td>
                            <td className="x-icon">
                              <i className="fa-regular fa-pen-to-square"></i>
                            </td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr key={i} onClick={this.showNews}>
                            <td className="news-c ">{list.newsno}</td>
                            <td>{list.title}</td>
                            <td className="news-c">{list.content}</td>
                            <td>{list.release}</td>
                            <td>{list.userno}</td>
                            <td className="icon">已發布</td>
                            <td className="icon">
                              <i className="fa-regular fa-pen-to-square"></i>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
              <form className="c-form">
                <input
                  type="hidden"
                  name="newsno"
                  value={this.state.showNews ? this.state.showNews.newsno : ""}
                />

                <div className="c-inbox">
                  <label htmlFor="">標題:</label>
                  <input
                    className="c-textmessage"
                    type="text"
                    placeholder="請輸入標題"
                    required
                    onChange={(e) => {
                      var newState = { ...this.state };
                      newState.showNews.title = e.target.value;
                      this.setState(newState);
                    }}
                    value={this.state.showNews ? this.state.showNews.title : ""}
                  />
                  <span id="a-title">
                    {this.state.ifSubmit &&
                      !this.state.showNews.title &&
                      "*必填欄位"}
                  </span>
                </div>
                <div className="c-inbox">
                  <label htmlFor="">日期:</label>
                  <input
                    id="bday"
                    type="date"
                    data-date=""
                    data-date-format="DD MMMM YYYY"
                    required
                    value={this.state.showNews.release}
                    onChange={(e) => {
                      var newState = { ...this.state };
                      newState.showNews.release = e.target.value;
                      this.setState(newState);
                    }}
                  />
                  <span id="a-date">
                    {this.state.ifSubmit &&
                      !this.state.showNews.release &&
                      "*必填欄位"}
                  </span>
                </div>
                <div className="c-textarea">
                  <label htmlFor="">內文:</label>
                  <textarea
                    className="c-textbox"
                    required
                    value={this.state.showNews.content}
                    onChange={(e) => {
                      var newState = { ...this.state };
                      newState.showNews.content = e.target.value;
                      this.setState(newState);
                    }}
                  ></textarea>
                  <span id="a-content">
                    {this.state.ifSubmit &&
                      !this.state.showNews.content &&
                      "*必填欄位"}
                  </span>
                </div>
                <div className="c-button">
                  <button
                    className={`c-change ${
                      this.state.ifChange ? "" : "postBtn"
                    }`}
                    type="button"
                    onClick={this.NewsUpdate}
                  >
                    <i className="fa-regular fa-pen-to-square"></i> 更新
                  </button>
                  <button
                    className={`c-post ${this.state.ifPost ? "" : "postBtn"}`}
                    type="button"
                    onClick={this.NewsInsert}
                  >
                    <i className="fa-regular fa-pen-to-square"></i> 發布
                  </button>
                  <button
                    className="deleteBtn"
                    type="button"
                    onClick={this.NewsTakeoff}
                  >
                    <i className="fa-regular fa-eye-slash"></i> 下架
                  </button>
                  <button
                    className="cancelBtn"
                    type="button"
                    onClick={this.NewsCancel}
                  >
                    <i className="far fa-times-circle"></i> 取消
                  </button>
                </div>
              </form>
            </div>
            <div
              className={`c-block ${this.state.ifOpenB ? "" : "postBtn"}`}
              id="a-members"
            >
              <h3 className="c-title">會員管理</h3>
              <h5 className="totalMember">
                網站會員總數：{this.state.memberShips.length}
              </h5>
              <div className="a-members">
                <table className="c-myart">
                  <thead>
                    <tr>
                      <td>no</td>
                      <td>電子信箱</td>
                      <td>暱稱</td>
                      <td>異動日期</td>
                      {/* <!-- <td>狀態</td> --> */}
                    </tr>
                  </thead>
                  <tbody id="c-members">
                    {/* News 渲染位置 */}
                    {this.state.memberShips.map((list, i) => {
                      // console.log(list);
                      return (
                        <tr key={i}>
                          <td>{list.userno}</td>
                          <td>{list.id}</td>
                          {/* <td class="news-c"> {list.password}</td> */}
                          <td>
                            {list.permission === 0
                              ? "管理員"
                              : list.nickname == null
                              ? ""
                              : list.nickname}
                          </td>
                          <td>{list.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* <!-- 會員資料的彈出視窗 --> */}
                <dialog id="m-change">
                  <div className="content">
                    <h4>會員資料修改</h4>
                    <form>
                      <input type="text" hidden name="d-id" />
                      <br />
                      <label htmlFor="d-email">電子信箱</label>
                      <br />
                      <input name="d-email" type="email" />
                      <br />
                      <label htmlFor="d-pwd">密碼</label>
                      <br />
                      <input name="d-pwd" type="password" />
                      <br />
                      <div className="d-button">
                        <button className="d-change" type="button">
                          <i className="fa-regular fa-pen-to-square"></i> 更新
                        </button>
                        <button
                          className="d-cancel"
                          type="button"
                          value="cancel"
                        >
                          <i className="far fa-times-circle"></i> 取消
                        </button>
                      </div>
                    </form>
                  </div>
                </dialog>
              </div>
            </div>
            <div
              className={`c-block ${this.state.ifOpenC ? "" : "postBtn"}`}
              id="a-atricles"
            >
              <h3 className="c-title">文章管理</h3>
              <div className="a-totalArt">
                <table className="a-myart">
                  <thead>
                    <tr>
                      <td>文章編號</td>
                      <td>文章標題</td>
                      <td>檢舉次數</td>
                      <td>狀態</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.articles.map((value, i) => {
                      // console.log(list.status);
                      if (value.status === "show") {
                        return (
                          <tr key={i}>
                            <td>{value.articleno}</td>
                            <td>
                              <a href={`/${value.articleno}`}>{value.title}</a>
                            </td>
                            <td>
                              <i className="fas fa-exclamation-triangle"></i>{" "}
                              {value.report_count}
                            </td>
                            <td>已發佈</td>
                            <td>
                              <button
                                data-takeof={value.articleno}
                                className="a-takeOf"
                                onClick={this.ArticlesTakeoff}
                              >
                                下架
                              </button>
                            </td>
                          </tr>
                        );
                      } else if (value.status === "report") {
                        return (
                          <tr key={i} className="a-deleteDone">
                            <td>{value.articleno}</td>
                            <td>{value.title}</td>
                            <td>
                              <i className="fas fa-exclamation-triangle"></i>{" "}
                              {value.report_count}
                            </td>
                            <td>檢舉刪除</td>
                            <td>
                              <button
                                data-takeof={value.articleno}
                                className="a-takeOf"
                                disabled
                              >
                                下架
                              </button>
                            </td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr key={i}>
                            <td>{value.articleno}</td>
                            <td>
                              <a href={`/${value.articleno}`}>{value.title}</a>
                            </td>
                            <td>
                              <i className="fas fa-exclamation-triangle"></i>{" "}
                              {value.report_count}
                            </td>
                            <td>草稿</td>
                            <td>
                              <button
                                data-takeof={value.articleno}
                                className="a-takeOf"
                                onClick={this.ArticlesTakeoff}
                              >
                                下架
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>
      </div>
    );
  }
  /* ------- 點選跳轉 ------- */
  //寫在裡面了
  /* ------- 初始化頁面(管理員資料＋最新消息＋會員管理) ------- */
  async componentDidMount() {
    /* ------- 最新消息 ------- */
    let resultNews = await axios.get("http://localhost:8000/admin/news");
    let resultMember = await axios.get("http://localhost:8000/admin/members", {
      params: { userno: this.state.userno },
    });
    let resultArticles = await axios.get(
      "http://localhost:8000/admin/manageArtilcles"
    );
    var newState = { ...this.state };
    newState.articles = resultArticles.data;
    newState.news = resultNews.data;
    newState.memberShips = resultMember.data[0];
    newState.username = resultMember.data[1][0].username;
    this.setState(newState);
    console.log(this.state.articles);
  }

  /* ------- 點擊最新消息tr-Show ------- */
  showNews = async (e) => {
    var list = Array.from(e.currentTarget.children);
    var obj = ["newsno", "title", "content", "release"];
    var newState = { ...this.state };
    list.map((td, i) => {
      return (
        (newState.showNews[`${obj[i]}`] = td.innerText),
        (newState.ifChange = true),
        (newState.ifPost = false)
      );
    });
    this.setState(newState);
  };
  /* ------- 最新消息-Cancle ------- */
  NewsCancel = (e) => {
    console.log("Cancle");
    var newState = { ...this.state };
    newState.showNews = { title: "", content: "", release: "", newsno: "" };
    newState.ifChange = false;
    newState.ifPost = true;
    this.setState(newState);
  };
  /* ------- 最新消息-Update ------- */
  NewsUpdate = async (e) => {
    console.log("Update");
    var newState = { ...this.state };
    newState.ifSubmit = true;
    if (
      this.state.showNews.title &&
      this.state.showNews.release &&
      this.state.showNews.content
    ) {
      // console.log("都有填囉");
      var resultNews = await axios.put(
        "http://localhost:8000/admin/news/update",
        {
          title: newState.showNews.title,
          content: newState.showNews.content,
          release: newState.showNews.release,
          newsno: newState.showNews.newsno,
        }
      );
      if (resultNews) {
        newState.ifSubmit = false;
        newState.news = resultNews.data;
        this.setState(newState);
      }
    } else {
      alert("請填寫必要內容");
    }
  };
  /* ------- 最新消息-Insert ------- */
  NewsInsert = async (e) => {
    console.log("Insert");
    var newState = { ...this.state };
    newState.ifSubmit = true;
    if (
      this.state.showNews.title &&
      this.state.showNews.release &&
      this.state.showNews.content
    ) {
      var resultNews = await axios.post(
        "http://localhost:8000/admin/news/post",
        {
          title: newState.showNews.title,
          content: newState.showNews.content,
          release: newState.showNews.release,
        }
      );
      if (resultNews) {
        newState.ifSubmit = false;
        newState.news = resultNews.data;
        this.setState(newState);
      }
    } else {
      alert("請填寫必要內容");
    }
  };
  /* ------- 最新消息-Takeoff ------- */
  NewsTakeoff = async (e) => {
    var ifOK = window.confirm("公告下架後則不得重新上架唷！確定要下架嗎？");
    var newState = { ...this.state };
    if (ifOK) {
      var resultNews = await axios.delete(
        "http://localhost:8000/admin/news/delete",
        {
          data: {
            newsno: newState.showNews.newsno,
            status: "F",
          },
        }
      );
      if (resultNews) {
        alert("公告下架成功");
        newState.showNews = { title: "", content: "", release: "", newsno: "" };
        newState.ifChange = false;
        newState.ifPost = true;
        newState.news = resultNews.data;
        this.setState(newState);
      }
    }
  };

  /* ------- 文章管理-Takeoff ------- */
  ArticlesTakeoff = async (e) => {
    let makesure = window.confirm("文章下架後即不得重新上架，確定要下架嗎？");
    var newState = { ...this.state };
    if (makesure) {
      var resultArticles = await axios.put(
        "http://localhost:8000/admin/takeOf",
        {
          articleno: e.currentTarget.dataset.takeof,
        }
      );
      if (resultArticles) {
        alert(resultArticles.data.myalert);
        newState.articles = resultArticles.data.myresult;
        // console.log(resultArticles.data.myresult)
        this.setState(newState);
      }
    }
  };
}

export default Admin;
