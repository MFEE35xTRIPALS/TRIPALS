import { useState, useEffect } from "react";
import axios from "axios";
import BearLogo from "./smallcomponent/BearLogo";
import useSwaConfirm from "../components/swaConfirm";
import useSwaAlert from "../components/swaAlert";

function Admin({ currentUser, setCurrentUser }) {
  const swaConfirm = useSwaConfirm();
  const swaAlert = useSwaAlert();
  var url = "http://localhost:8000";
  let [userno, setuserno] = useState(currentUser ? JSON.parse(currentUser)[0].userno : 0); //管理員
  var [username, setUsername] = useState();
  var [news, setNews] = useState([]);
  var [showNew, setShowNew] = useState({
    newsno: "",
    title: "",
    content: "",
    release: "",
  });
  var [members, setMembers] = useState([]);
  var [articles, setArticles] = useState([]);

  // 判斷是否為第一次渲染
  var [ifFirst, setIfFirst] = useState(false);

  //點擊跳轉
  var [ifOpenA, setIfOpenA] = useState(true);
  var [ifOpenB, setIfOpenB] = useState(false);
  var [ifOpenC, setIfOpenC] = useState(false);

  // 更新｜發布 hidden icon
  var [ifPost, setIfPost] = useState(true);
  var [ifChange, setIfChange] = useState(false);

  // input內容判斷
  var [ifSubmit, setIfSubmit] = useState(false);

  //讀取中...
  let [apple, setapple] = useState(null);

  /* ------- 初始化頁面 ------- */
  /* ------- 初始化頁面(管理員資料＋最新消息＋會員管理) ------- */
  useEffect(() => {
    if (currentUser) {
      var firstRender = async () => {
        let result = await axios.post(url + "/admin", {
          userno: userno,
        });
        console.log(result);
        setNews(result.data[0]);
        setMembers(result.data[1]);
        setUsername(result.data[2][0].username);
        setArticles(result.data[3]);
        setIfFirst(true);
        setapple(result)
      };
      firstRender();
      console.log("OK");
    }
  }, []);

  /* ------- 點擊最新消息tr-Show ------- */
  function showNews(e) {
    if (ifFirst) {
      var list = Array.from(e.currentTarget.children);
      var obj = ["newsno", "title", "content", "release"];
      var show = {};
      list.map((td, i) => {
        return (show[`${obj[i]}`] = td.innerText);
      });
      setShowNew(show);
      setIfChange(true);
      setIfPost(false);
      setIfSubmit(true);
    }
  }

  /* ------- 最新消息-Cancle ------- */
  function NewsCancel() {
    var show = { title: "", content: "", release: "", newsno: "" };
    setShowNew(show);
    setIfChange(false);
    setIfPost(true);
    setIfSubmit(false);
  }

  /* ------- 最新消息-Update ------- */
  async function NewsUpdate(e) {
    setIfSubmit(true);
    if (showNew.title && showNew.release && showNew.content) {
      // console.log("都有填囉");
      var result = await axios.put(url + "/admin/news/update", {
        title: showNew.title,
        content: showNew.content,
        release: showNew.release,
        newsno: showNew.newsno,
      });
      if (result) {
        setIfSubmit(false);
        setNews(result.data);
        NewsCancel()
        swaAlert("更新完成", '', 'success', 1500)
      }
    } else {
      swaAlert("請填寫必要內容", '', 'warning', 1500)
    }
  }

  /* ------- 最新消息-Insert ------- */
  async function NewsInsert(e) {
    setIfSubmit(true);
    if (showNew.title && showNew.release && showNew.content) {
      var result = await axios.post(url + "/admin/news/post", {
        title: showNew.title,
        content: showNew.content,
        release: showNew.release,
      });
      if (result) {
        setIfSubmit(false);
        setNews(result.data);
        NewsCancel();
        swaAlert("成功發布", '', 'success', 1500)
      }
    } else {
      swaAlert("請填寫必要內容", '', 'warning', 1500)
    }
  }

  /* ------- 最新消息-Takeoff ------- */
  function NewsTakeoff(e) {
    swaConfirm('公告下架後則不得重新上架唷！', '確定要下架嗎？', 'warning', async () => {
      await axios.delete(url + "/admin/news/delete", {
        data: {
          newsno: showNew.newsno,
          status: "F",
        },
      })
        .then((result) => {
          swaAlert("公告下架成功", '', 'success', 1500)
          var show = { title: "", content: "", release: "", newsno: "" };
          setShowNew(show);
          setIfChange(false);
          setIfPost(true);
          setIfSubmit(false);
          setNews(result.data);
        })
    })

  }

  /* ------- 文章管理-Takeoff ------- */
  function ArticlesTakeoff(e) {
    swaConfirm('文章下架後即不得重新上架', '確定要下架嗎？', 'warning', async () => {
      await axios.put(url + "/admin/takeOf", {
        articleno: e.target.dataset.takeof,
      })
        .then((result) => {
          swaAlert(result.data.myalert, '', 'success', 1500)
          setArticles(result.data.myresult);
        })
    })

  }

  return (
    <div>
      {apple ? (<div>
        {!currentUser && <div>管理者請先登錄</div>}
        {currentUser &&
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
                  <h4 className="username">{username}</h4>
                </div>
                <div className="c-select">
                  <ul>
                    <li className="selectLi"
                      onClick={() => {
                        setIfOpenA(true);
                        setIfOpenB(false);
                        setIfOpenC(false);
                      }}
                    >
                      最新消息
                    </li>
                    <li className="selectLi"
                      onClick={() => {
                        setIfOpenA(false);
                        setIfOpenB(true);
                        setIfOpenC(false);
                      }}
                    >
                      會員管理
                    </li>
                    <li className="selectLi"
                      onClick={() => {
                        setIfOpenA(false);
                        setIfOpenB(false);
                        setIfOpenC(true);
                      }}
                    >
                      文章管理
                    </li>
                  </ul>
                </div>
              </section>
              <section className="c-right">
                <div className={`c-block ${ifOpenA ? "" : "postBtn"}`} id="a-news">
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
                        {news.map((list, i) => {
                          if (list.status === "F") {
                            return (
                              <tr key={i} onClick={showNews}>
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
                              <tr key={i} onClick={showNews}>
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
                      value={showNew ? showNews.newsno : ""}
                    />

                    <div className="c-inbox">
                      <label htmlFor="">標題:</label>
                      <input
                        className="c-textmessage"
                        type="text"
                        placeholder="請輸入標題"
                        required
                        onChange={(e) => {
                          setShowNew((prevState) => ({
                            ...prevState,
                            title: e.target.value,
                          }));
                        }}
                        value={showNew ? showNew.title : ""}
                      />
                      <span id="a-title">
                        {ifSubmit && !showNew.title && "*必填欄位"}
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
                        value={showNew.release}
                        onChange={(e) => {
                          setShowNew((prevState) => ({
                            ...prevState,
                            release: e.target.value,
                          }));
                        }}
                      />
                      <span id="a-date">
                        {ifSubmit && !showNew.release && "*必填欄位"}
                      </span>
                    </div>
                    <div className="c-textarea">
                      <label htmlFor="">內文:</label>
                      <textarea
                        className="c-textbox"
                        required
                        value={showNew.content}
                        onChange={(e) => {
                          setShowNew((prevState) => ({
                            ...prevState,
                            content: e.target.value,
                          }));
                        }}
                      ></textarea>
                      <span id="a-content">
                        {ifSubmit && !showNew.content && "*必填欄位"}
                      </span>
                    </div>
                    <div className="c-button">
                      <button
                        className={`c-change ${ifChange ? "" : "postBtn"}`}
                        type="button"
                        onClick={NewsUpdate}
                      >
                        <i className="fa-regular fa-pen-to-square"></i> 更新
                      </button>
                      <button
                        className={`c-post ${ifPost ? "" : "postBtn"}`}
                        type="button"
                        onClick={NewsInsert}
                      >
                        <i className="fa-regular fa-pen-to-square"></i> 發布
                      </button>
                      <button
                        className="deleteBtn"
                        type="button"
                        onClick={NewsTakeoff}
                      >
                        <i className="fa-regular fa-eye-slash"></i> 下架
                      </button>
                      <button
                        className="cancelBtn"
                        type="button"
                        onClick={NewsCancel}
                      >
                        <i className="far fa-times-circle"></i> 取消
                      </button>
                    </div>
                  </form>
                </div>
                <div className={`c-block ${ifOpenB ? "" : "postBtn"}`} id="a-members">
                  <h3 className="c-title">會員管理</h3>
                  <h5 className="totalMember">網站會員總數：{members.length}</h5>
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
                        {/* MemberShip 渲染位置 */}
                        {members.map((list) => {
                          return (
                            <tr key={list.userno}>
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
                            <button className="d-cancel" type="button" value="cancel">
                              <i className="far fa-times-circle"></i> 取消
                            </button>
                          </div>
                        </form>
                      </div>
                    </dialog>
                  </div>
                </div>
                <div
                  className={`c-block ${ifOpenC ? "" : "postBtn"}`}
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
                        {articles.map((value, i) => {
                          if (value.status === "show") {
                            return (
                              <tr key={i}>
                                <td>{value.articleno}</td>
                                <td>
                                  <a href={`/view${value.articleno}`}>{value.title}</a>
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
                                    onClick={ArticlesTakeoff}
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
                                  <a href={`/view${value.articleno}`}>{value.title}</a>
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
                                    onClick={ArticlesTakeoff}
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
            <BearLogo />
          </div>}
      </div>) : (
        <div className="loader">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
