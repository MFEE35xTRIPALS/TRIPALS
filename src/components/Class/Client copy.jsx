import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

class Client extends Component {
  state = {
    url: "http://localhost:8000",
    userno: 4,
    selfarticles: [],
    userLikes: [],
    // 會員資訊
    userMessage: {},
    ifPwdOK: true,
    // 點選跳轉
    ifOpenA: true,
    ifOpenB: false,
    ifOpenC: false,
    // 編輯圖片
    userimage: "",
    userimagetemp: "",
    useravatar: "",
    useravatartemp: "",
    ifOpenBanner: false,
    ifOpenavatar: false,
    file: {},
  };
  render() {
    return (
      <div>
        <section className="c-head">
          <form encType="multipart/form-data">
            <div
              className={`bannerModal ${this.state.ifOpenBanner ? "flexBtn" : "postBtn"
                }`}
            >
              <button
                onClick={() => document.querySelector("#fileUpload").click()}
                type="button"
                className="uploadbanner"
              >
                上傳照片
              </button>
              <button
                type="button"
                className="cancel"
                onClick={this.cancelPriview}
              >
                取消
              </button>
              <button
                type="button"
                className="bannerDone"
                onClick={this.uploadImages}
              >
                確認上傳
              </button>
            </div>
            <div className="img2">
              <img
                className="selfbanner"
                src={this.state.userimage}
                alt="個人頁面"
              />
              <button
                onClick={() => {
                  var newState = { ...this.state };
                  newState.ifOpenBanner = true;
                  newState.file = {};
                  this.setState(newState);
                }}
                type="button"
                className="edit_cover"
                id="edit_cover"
              >
                編輯封面
              </button>
              <input
                onChange={this.changePhoto}
                type="file"
                id="fileUpload"
                accept=".jpg, .jpeg, .png, .gif"
                hidden
              />
            </div>
          </form>
        </section>
        <section className="c-rwd">
          <section className="c-left">
            <div className="c-head">
              <button
                onClick={() => {
                  var newState = { ...this.state };
                  newState.ifOpenavatar = true;
                  newState.file = {};
                  this.setState(newState);
                }}
                type="button"
                className="camera"
              >
                <i className="fas fa-camera"></i>
              </button>
              <form encType="multipart/form-data">
                <div
                  className={`mymodal ${this.state.ifOpenavatar ? "flexBtn" : "postBtn"
                    }`}
                  onClick={this.cancelPriview}
                >
                  <div
                    className="modalContent"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <span onClick={this.cancelPriview} className="closemodal">
                      &times;
                    </span>
                    <div className="imgPreviewBorder">
                      <img
                        className="imgPreview"
                        src={this.state.useravatar}
                        alt="大頭貼預覽"
                      />
                    </div>
                    <div className="uploadShotBtn">
                      <button
                        onClick={() => {
                          document.querySelector("#shotUpload").click();
                        }}
                        className="uploadShot"
                        type="button"
                      >
                        上傳照片
                      </button>
                      <button
                        className="uploadShotDone"
                        type="button"
                        onClick={this.uploadImages}
                      >
                        確認上傳
                      </button>
                    </div>
                  </div>
                </div>
                <input
                  onChange={this.changePhoto}
                  type="file"
                  id="shotUpload"
                  accept=".jpg, .jpeg, .png, .gif"
                  hidden
                />
              </form>
              <div className="h-img">
                <img className="shot" src={this.state.useravatar} alt="shot" />
              </div>
              <h4 className="username">
                {this.state.userMessage.nickname
                  ? this.state.userMessage.nickname
                  : this.state.userMessage.username}
              </h4>
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
                  個人資料
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
                  我的收藏
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
                  我的文章
                </li>
              </ul>
            </div>
          </section>
          <section className="c-right">
            <div
              id="c-message"
              className={`c-block ${this.state.ifOpenA ? "" : "postBtn"}`}
            >
              <h3 className="c-title">個人資料</h3>
              <form className="c-form">
                <div className="c-inbox">
                  <label htmlFor="email">帳號:</label>
                  <span id="id">{this.state.userMessage.userno}</span>
                  <span id="email" className="c-mail">
                    {this.state.userMessage.id}
                  </span>
                  <br />
                </div>
                <div className="c-inbox">
                  <label htmlFor="pwd">密碼:</label>
                  <input
                    id="pwd"
                    className="c-textmessage"
                    type="password"
                    placeholder="請輸入密碼"
                    pattern="[a-zA-Z0-9]{6,}"
                    onChange={(e) => {
                      var newState = { ...this.state };
                      newState.userMessage.password = e.target.value;
                      newState.ifPwdOK = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(
                        newState.userMessage.password
                      );

                      this.setState(newState);
                    }}
                    value={this.state.userMessage.password}
                  />
                  {!this.state.userMessage.password && (
                    <span id="m-pwd">*必填欄位</span>
                  )}
                  {this.state.userMessage.password && !this.state.ifPwdOK && (
                    <span id="m-pwd">*密碼長度6以上，並包含至少一個英數字</span>
                  )}
                </div>
                <div className="c-inbox">
                  <label htmlFor="nick">暱稱:</label>
                  <input
                    id="nick"
                    className="c-textmessage"
                    type="text"
                    onChange={(e) => {
                      var newState = { ...this.state };
                      newState.userMessage.nickname = e.target.value;
                      this.setState(newState);
                    }}
                    value={this.state.userMessage.nickname}
                  />
                </div>
                <div className="c-inbox">
                  <label htmlFor="bday">生日:</label>
                  <input
                    id="bday"
                    className="c-date"
                    type="date"
                    onChange={(e) => {
                      var newState = { ...this.state };
                      newState.userMessage.birthday = e.target.value;
                      this.setState(newState);
                    }}
                    value={
                      this.state.userMessage.birthday
                        ? this.state.userMessage.birthday
                        : ""
                    }
                  />
                </div>
                <div className="c-textarea">
                  <label htmlFor="myIntro">個人簡介:</label>
                  <textarea
                    id="myIntro"
                    className="c-textbox"
                    onChange={(e) => {
                      var newState = { ...this.state };
                      newState.userMessage.intro = e.target.value;
                      this.setState(newState);
                    }}
                    value={
                      this.state.userMessage.intro
                        ? this.state.userMessage.intro
                        : ""
                    }
                  ></textarea>
                </div>
                <div className="c-inbox">
                  <button
                    className="c-change"
                    type="button"
                    onClick={this.userChange}
                  >
                    確定修改
                  </button>
                </div>
              </form>
            </div>
            <div
              id="c-likes"
              className={`c-block ${this.state.ifOpenB ? "" : "postBtn"}`}
            >
              <h3 className="c-title">我的收藏</h3>
              <div className="c-mylikes">
                {this.state.userLikes[0] ? (
                  this.state.userLikes.map((article, i) => (
                    <Card
                      key={i}
                      data={article}
                      ifUserLike={true}
                      userno={this.state.userno}
                    />
                  ))
                ) : (
                  <p>目前收藏文章數：0</p>
                )}
              </div>
            </div>
            <div
              id="c-myarts"
              className={`c-block ${this.state.ifOpenC ? "" : "postBtn"}`}
            >
              <h3 className="c-title">我的文章</h3>
              <div className="c-mine">
                <table className="c-myart">
                  <thead>
                    <tr>
                      <td>文章標題</td>
                      <td>觀看數</td>
                      <td>熱門度</td>
                      <td>狀態</td>
                      <td>編輯文章</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.selfarticles[0] ? (
                      this.state.selfarticles.map((value, i) => {
                        // console.log(list.status);
                        if (value.status === "show") {
                          return (
                            <tr key={i}>
                              <td>
                                <a href={`/${value.articleno}`}>
                                  {value.title}
                                </a>
                              </td>
                              <td>
                                <i className="fa-regular fa-eye"></i>{" "}
                                {value.view_count}
                              </td>
                              <td>
                                <i className="fa-regular fa-heart"></i>{" "}
                                {value.count}
                              </td>
                              <td>已發佈</td>
                              <td>
                                <a
                                  className="c-editArt"
                                  href={`/${value.articleno}`}
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>
                                </a>
                                <i
                                  className="fa-regular fa-trash-can trash"
                                  data-articleno={value.articleno}
                                  onClick={this.trashcan}
                                ></i>
                              </td>
                            </tr>
                          );
                        } else if (value.status === "draft") {
                          return (
                            <tr key={i}>
                              <td>{value.title}</td>
                              <td>
                                <i className="fa-regular fa-eye"></i>{" "}
                                {value.view_count}
                              </td>
                              <td>
                                <i className="fa-regular fa-heart"></i>{" "}
                                {value.count}
                              </td>
                              <td>草稿</td>
                              <td>
                                <a
                                  className="c-editArt"
                                  href={`/${value.articleno}`}
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>
                                </a>
                                <i
                                  className="fa-regular fa-trash-can trash"
                                  data-articleno={value.articleno}
                                  onClick={this.trashcan}
                                ></i>
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr key={i} className="c-deleteDone">
                              <td>{value.title}</td>
                              <td>
                                <i className="fa-regular fa-eye"></i>{" "}
                                {value.view_count}
                              </td>
                              <td>
                                <i className="fa-regular fa-heart"></i>{" "}
                                {value.count}
                              </td>
                              <td>檢舉刪除</td>
                              <td>無法編輯</td>
                            </tr>
                          );
                        }
                      })
                    ) : (
                      <tr>
                        <td>您尚未發布任何文章</td>
                      </tr>
                    )}
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
  /* ------- 初始化頁面 ------- */
  async componentDidMount() {
    var result = await axios.post(this.state.url + `/client/identity`, {
      userno: this.state.userno,
    });
    // console.log(result.data.userMessage[0].avatar)
    var newState = { ...this.state };
    newState.userMessage = result.data.userMessage[0];
    newState.userLikes = result.data.userLikes;
    newState.selfarticles = result.data.selfarticles;
    newState.userimage = result.data.userMessage[0].banner
      ? this.state.url + result.data.userMessage[0].banner
      : "/images/raiway.jpg";
    newState.userimagetemp = result.data.userMessage[0].banner
      ? this.state.url + result.data.userMessage[0].banner
      : "/images/raiway.jpg";
    newState.useravatar = result.data.userMessage[0].avatar
      ? this.state.url + result.data.userMessage[0].avatar
      : "/images/admin2.png";
    newState.useravatartemp = result.data.userMessage[0].avatar
      ? this.state.url + result.data.userMessage[0].avatar
      : "/images/admin2.png";
    this.setState(newState);
  }
  /* ------- 點擊最新消息-Show ------- */
  userChange = async () => {
    var newState = { ...this.state };
    if (this.state.userMessage.password && this.state.ifPwdOK) {
      console.log("都有填囉");
      var resultInfo = await axios.post(
        "http://localhost:8000/client/identity/update",
        {
          userno: newState.userno,
          password: newState.userMessage.password,
          nickname: newState.userMessage.nickname,
          birthday: newState.userMessage.birthday,
          intro: newState.userMessage.intro,
        }
      );
      if (resultInfo) {
        newState.userMessage = resultInfo.data[0];
        this.setState(newState);
        console.log(this.state.userMessage.password);
      }
    } else {
      alert("請填寫必要內容");
    }
  };

  // ---------刪除文章-----------------
  trashcan = async (e) => {
    console.log(e.target.dataset.articleno);
    let makesrue = window.confirm("文章刪除後即無法復原，確定要刪除嗎？");
    if (makesrue) {
      var trashcan = await axios
        .delete(this.state.url + "/guide", {
          data: JSON.stringify({ main_articleno: e.target.dataset.articleno }),
          headers: { "Content-Type": "application/json" },
        });
      // console.log(trashcan)
      alert(trashcan.data);
      let arrtest = this.state.selfarticles.filter((articles) => articles.articleno !== parseInt(e.target.dataset.articleno))
      let newState = { ...this.state };
      newState.selfarticles = arrtest;
      this.setState(newState);
    }
  };

  // 大頭貼上傳預覽-----------------------------------------
  // changePhoto = (element) => {
  //   let file = element.target.files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   // console.log(file);
  //   if (file) {
  //     // console.log(preview);
  //     reader.onloadend = (e) => {
  //       if (element.target.id === "shotUpload") {
  //         let newState = { ...this.state };
  //         newState.useravatar = e.target.result;
  //         newState.file = file;
  //         this.setState(newState);
  //       } else if (element.target.id === "fileUpload") {
  //         let newState = { ...this.state };
  //         newState.userimage = e.target.result;
  //         newState.file = file;
  //         this.setState(newState);
  //         // console.log(file)
  //       }
  //     };
  //   }
  // };

  // ---------取消預覽---------
  // cancelPriview = (e) => {
  //   console.log(e);
  //   var newState = { ...this.state };
  //   newState.ifOpenBanner = false;
  //   newState.ifOpenavatar = false;
  //   newState.userimage = this.state.userimagetemp;
  //   newState.useravatar = this.state.useravatartemp;
  //   newState.file = {};
  //   this.setState(newState);
  // };

  // ---------上傳圖檔---------
  // uploadImages = async (e) => {
  //   if (this.state.file.name) {
  //     let photoUrl;
  //     if (e.target.className === "uploadShotDone") {
  //       photoUrl = this.state.url + "/client/upload";
  //     } else if (e.target.className === "bannerDone") {
  //       photoUrl = this.state.url + "/client/uploadBanner";
  //     }
  //     let formData = new FormData();
  //     formData.append("shotUpload", this.state.file);
  //     formData.append("userno", this.state.userno);
  //     // console.log(photoUrl)
  //     let resultImages = await axios.post(photoUrl, formData);
  //     alert(resultImages.data.myPhotoAlert);
  //     var newState = { ...this.state };
  //     newState.ifOpenBanner = false;
  //     newState.ifOpenavatar = false;
  //     newState.file = {};
  //     if (resultImages.data.myPhotoAlert === "大頭貼修改完成") {
  //       newState.useravatar =
  //         this.state.url +
  //         resultImages.data.avatarData.avatar +
  //         "?temp=" +
  //         Math.random();
  //       newState.userimage = this.state.userimagetemp;
  //     } else if (resultImages.data.myPhotoAlert === "封面照片修改完成") {
  //       newState.userimage =
  //         this.state.url +
  //         resultImages.data.bannerData.banner +
  //         "?temp=" +
  //         Math.random();
  //       newState.useravatar = this.state.useravatartemp;
  //     }
  //     this.setState(newState);
  //   } else {
  //     alert("請至少選擇一個圖檔上傳,限制圖檔格式為：.jpg, .jpeg, .png, .gif");
  //   }
  // };
}

export default Client;
