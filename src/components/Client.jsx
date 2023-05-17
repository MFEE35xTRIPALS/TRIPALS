import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./smallcomponent/Card";
import BearLogo from "./smallcomponent/BearLogo";

function Client({ currentUser, setCurrentUser }) {
  // console.log(JSON.parse(currentUser)[0].userno)
  console.log(setCurrentUser)
  let url = "http://localhost:8000";
  let [userno, setuserno] = useState(JSON.parse(currentUser)[0].userno);
  // 我的文章
  let [selfarticles, setselfarticles] = useState([]);
  // 我的收藏
  let [userLikes, setuserLikes] = useState([]);
  // 會員資訊
  let [userMessage, setUserMessage] = useState({});
  let [avaUsername, setavaUsername] = useState("");
  let [ifPwdOK, setIfPwdOK] = useState(true);
  // 點選跳轉
  let [ifOpenA, setIfOpenA] = useState(true);
  let [ifOpenB, setIfOpenB] = useState(false);
  let [ifOpenC, setIfOpenC] = useState(false);
  // 編輯圖片
  let [userimage, setuserimage] = useState("");
  let [userimagetemp, setuserimagetemp] = useState("");
  let [useravatar, setuseravatar] = useState("");
  let [useravatartemp, setuseravatartemp] = useState("");
  let [ifOpenBanner, setifOpenBanner] = useState(false);
  let [ifOpenavatar, setifOpenavatar] = useState(false);
  let [file, setfile] = useState({});

  useEffect(() => {
    async function firstRendem() {
      let result = await axios.post(url + `/client/identity`, {
        userno: userno,
      });
      // console.log(result.data)
      setselfarticles(result.data.selfarticles);
      setuserLikes(result.data.userLikes);
      setUserMessage(result.data.userMessage[0]);
      setavaUsername(
        result.data.userMessage[0].nickname
          ? result.data.userMessage[0].nickname
          : result.data.userMessage[0].username
      );
      setuserimage(
        result.data.userMessage[0].banner
          ? url + result.data.userMessage[0].banner
          : "/images/raiway.jpg"
      );
      setuserimagetemp(
        result.data.userMessage[0].banner
          ? url + result.data.userMessage[0].banner
          : "/images/raiway.jpg"
      );
      setuseravatar(
        result.data.userMessage[0].avatar
          ? url + result.data.userMessage[0].avatar
          : "/images/admin.png"
      );
      setuseravatartemp(
        result.data.userMessage[0].avatar
          ? url + result.data.userMessage[0].avatar
          : "/images/admin.png"
      );
    }
    firstRendem();
  }, []);

  // 大頭貼上傳預覽-----------------------------------------
  function changePhoto(element) {
    console.log(element.target.files[0]);
    let file = element.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    if (file) {
      // console.log(preview);
      reader.onloadend = (e) => {
        if (element.target.id === "shotUpload") {
          setuseravatar(e.target.result);
          setfile(file);
        } else if (element.target.id === "fileUpload") {
          // console.log(e.target.result)
          setuserimage(e.target.result);
          setfile(file);
        }
      };
    }
  }
  // ---------取消預覽---------
  function cancelPriview(e) {
    setifOpenBanner(false);
    setifOpenavatar(false);
    setuserimage(userimagetemp);
    setuseravatar(useravatartemp);
    setfile({});
  }

  // ---------上傳圖檔---------
  let uploadImages = async (e) => {
    if (file.name) {
      let photoUrl;
      if (e.target.className === "uploadShotDone") {
        photoUrl = url + "/client/upload";
      } else if (e.target.className === "bannerDone") {
        photoUrl = url + "/client/uploadBanner";
      }
      let formData = new FormData();
      formData.append("shotUpload", file);
      formData.append("userno", userno);
      // console.log(photoUrl)
      let resultImages = await axios.post(photoUrl, formData);
      alert(resultImages.data.myPhotoAlert);
      setifOpenBanner(false);
      setifOpenavatar(false);
      setfile({});
      if (resultImages.data.myPhotoAlert === "大頭貼修改完成") {
        setuseravatar(
          url + resultImages.data.avatarData.avatar + "?temp=" + Math.random()
        );
        setuseravatartemp(
          url + resultImages.data.avatarData.avatar + "?temp=" + Math.random()
        );
        setuserimage(userimagetemp);
      } else if (resultImages.data.myPhotoAlert === "封面照片修改完成") {
        setuserimage(
          url + resultImages.data.bannerData.banner + "?temp=" + Math.random()
        );
        setuserimagetemp(
          url + resultImages.data.bannerData.banner + "?temp=" + Math.random()
        );
        setuseravatar(useravatartemp);
      }
    } else {
      alert("請至少選擇一個圖檔上傳,限制圖檔格式為：.jpg, .jpeg, .png, .gif");
    }
  };

  // ---------刪除文章-----------------
  let trashcan = async (e) => {
    let makesrue = window.confirm("文章刪除後即無法復原，確定要刪除嗎？");
    if (makesrue) {
      var trashcan = await axios.delete(url + "/guide", {
        data: JSON.stringify({ main_articleno: e.target.dataset.articleno }),
        headers: { "Content-Type": "application/json" },
      });

      alert(trashcan.data);
      let arrtest = selfarticles.filter(
        (articles) =>
          articles.articleno !== parseInt(e.target.dataset.articleno)
      );
      setselfarticles(arrtest);
    }
  };

  // 更新使用者資訊-------------------------------
  let userChange = async () => {
    if (userMessage.password && ifPwdOK) {
      // console.log("都有填囉");
      var resultInfo = await axios.post(url + "/client/identity/update", {
        userno: userno,
        password: userMessage.password,
        nickname: userMessage.nickname,
        birthday: userMessage.birthday,
        intro: userMessage.intro,
      });
      if (resultInfo) {
        // console.log(resultInfo.data[0])
        setUserMessage(resultInfo.data[0]);
        setavaUsername(
          resultInfo.data[0].nickname
            ? resultInfo.data[0].nickname
            : resultInfo.data[0].username
        );
      }
    } else {
      alert("請填寫必要內容");
    }
  };

  return (
    <div>
      {!currentUser && <div>請先登錄</div>}
      {currentUser && <div>
        <section className="c-head">
          <form encType="multipart/form-data">
            <div
              className={`bannerModal ${ifOpenBanner ? "flexBtn" : "postBtn"
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
                onClick={cancelPriview}
              >
                取消
              </button>
              <button
                type="button"
                className="bannerDone"
                onClick={uploadImages}
              >
                確認上傳
              </button>
            </div>
            <div className="img2">
              <img
                className="selfbanner"
                src={userimage}
                alt="個人頁面"
              />
              <button
                onClick={() => {
                  setifOpenBanner(true)
                }}
                type="button"
                className="edit_cover"
                id="edit_cover"
              >
                編輯封面
              </button>
              <input
                onChange={changePhoto}
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
                  setifOpenavatar(true)
                }}
                type="button"
                className="camera"
              >
                <i className="fas fa-camera"></i>
              </button>
              <form encType="multipart/form-data">
                <div
                  className={`mymodal ${ifOpenavatar ? "flexBtn" : "postBtn"
                    }`}
                  onClick={cancelPriview}
                >
                  <div
                    className="modalContent"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <span
                      onClick={cancelPriview}
                      className="closemodal">
                      &times;
                    </span>
                    <div className="imgPreviewBorder">
                      <img
                        className="imgPreview"
                        src={useravatar}
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
                        onClick={uploadImages}
                      >
                        確認上傳
                      </button>
                    </div>
                  </div>
                </div>
                <input
                  onChange={changePhoto}
                  type="file"
                  id="shotUpload"
                  accept=".jpg, .jpeg, .png, .gif"
                  hidden
                />
              </form>
              <div className="h-img">
                <img className="shot" src={useravatar} alt="shot" />
              </div>
              <h4 className="username">
                {avaUsername}
              </h4>
            </div>

            <div className="c-select">
              <ul>
                <li
                  onClick={() => {
                    setIfOpenA(true);
                    setIfOpenB(false);
                    setIfOpenC(false);
                  }}
                >
                  個人資料
                </li>
                <li
                  onClick={() => {
                    setIfOpenA(false);
                    setIfOpenB(true);
                    setIfOpenC(false);
                  }}
                >
                  我的收藏
                </li>
                <li
                  onClick={() => {
                    setIfOpenA(false);
                    setIfOpenB(false);
                    setIfOpenC(true);
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
              className={`c-block ${ifOpenA ? "" : "postBtn"}`}
            >
              <h3 className="c-title">個人資料</h3>
              <form className="c-form">
                <div className="c-inbox">
                  <label htmlFor="email">帳號:</label>
                  <span id="id">{userMessage.userno}</span>
                  <span id="email" className="c-mail">
                    {userMessage.id}
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
                      setUserMessage((prevState) => ({
                        ...prevState,
                        password: e.target.value,
                      }))
                      setIfPwdOK(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(
                        e.target.value
                      ))
                    }}
                    value={userMessage.password}
                  />
                  {!userMessage.password && (
                    <span id="m-pwd">*必填欄位</span>
                  )}
                  {userMessage.password && !ifPwdOK && (
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
                      setUserMessage((prevState) => ({
                        ...prevState,
                        nickname: e.target.value,
                      }))
                    }}
                    value={userMessage.nickname}
                  />
                </div>
                <div className="c-inbox">
                  <label htmlFor="bday">生日:</label>
                  <input
                    id="bday"
                    className="c-date"
                    type="date"
                    onChange={(e) => {
                      setUserMessage((prevState) => ({
                        ...prevState,
                        birthday: e.target.value,
                      }))
                    }}
                    value={
                      userMessage.birthday
                        ? userMessage.birthday
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
                      setUserMessage((prevState) => ({
                        ...prevState,
                        intro: e.target.value,
                      }))
                    }}
                    value={
                      userMessage.intro
                        ? userMessage.intro
                        : ""
                    }
                  ></textarea>
                </div>
                <div className="c-inbox">
                  <button
                    className="c-change"
                    type="button"
                    onClick={userChange}
                  >
                    確定修改
                  </button>
                </div>
              </form>
            </div>
            <div
              id="c-likes"
              className={`c-block ${ifOpenB ? "" : "postBtn"}`}
            >
              <h3 className="c-title">我的收藏</h3>
              <div className="c-mylikes">
                {userLikes[0] ? (
                  userLikes.map((article, i) => (
                    <Card
                      key={i}
                      data={article}
                      ifUserLike={true}
                      userno={userno}
                    />
                  ))
                ) : (
                  <p>目前收藏文章數：0</p>
                )}
              </div>
            </div>
            <div
              id="c-myarts"
              className={`c-block ${ifOpenC ? "" : "postBtn"}`}
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
                    {selfarticles[0] ? (
                      selfarticles.map((value, i) => {
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
                                  onClick={trashcan}
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
                                  onClick={trashcan}
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
                        <td colSpan={5}>您尚未發布任何文章</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>
        <BearLogo />
      </div>}
    </div>
  );
}

export default Client;
