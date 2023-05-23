import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Memberinfo from "./smallcomponent/Memberinfo";
import Mylikes from "./smallcomponent/Mylikes";
import Myarticles from "./smallcomponent/Myarticles";
import BearLogo from "./smallcomponent/BearLogo";
import { useHistory } from 'react-router-dom';
import useSwaConfirm from "../components/swaConfirm";
import useSwaAlert from "../components/swaAlert";

function Client({ currentUser, setCurrentUser, setavatarImg }) {
  const history = useHistory();
  const swaConfirm = useSwaConfirm();
  const swaAlert = useSwaAlert();
  let url = "http://localhost:8000";
  let [userno, setuserno] = useState(currentUser ? JSON.parse(currentUser)[0].userno : 0);
  // 我的文章
  let [selfarticles, setselfarticles] = useState([]);
  // 我的收藏
  let [userLikes, setuserLikes] = useState([]);
  // 會員資訊
  let [userMessage, setUserMessage] = useState({});
  let [avaUsername, setavaUsername] = useState("");
  let [ifPwdOK, setIfPwdOK] = useState(true);

  // 編輯圖片
  let [userimage, setuserimage] = useState("");
  let [userimagetemp, setuserimagetemp] = useState("");
  let [useravatar, setuseravatar] = useState("");
  let [useravatartemp, setuseravatartemp] = useState("");
  let [ifOpenBanner, setifOpenBanner] = useState(false);
  let [ifOpenavatar, setifOpenavatar] = useState(false);
  let [file, setfile] = useState({});

  //讀取中...
  let [apple, setapple] = useState(null);

  useEffect(() => {
    if (currentUser) {
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
            : "http://localhost:8000/useravatar/pre.png"
        );
        setuseravatartemp(
          result.data.userMessage[0].avatar
            ? url + result.data.userMessage[0].avatar
            : "http://localhost:8000/useravatar/pre.png"
        );
        setapple(result)
      }
      firstRendem();
    }
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
    // reader.abort();
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
      swaAlert(resultImages.data.myPhotoAlert, '', 'success', 1500)
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
        setavatarImg(url + resultImages.data.avatarData.avatar + "?temp=" + Math.random());
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
      swaAlert("請至少選擇一個圖檔上傳,限制圖檔格式為：.jpg, .jpeg, .png, .gif", '', "warning", 1500)
    }
  };




  return (
    <div>
      {apple ? (<div>
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
            <BrowserRouter>
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
                    <Link className="selectLi" to="/client" exact>
                      個人資料
                    </Link>
                    <Link className="selectLi" to="/client/Mylikes">
                      我的收藏
                    </Link>
                    <Link className="selectLi" to="/client/Myarticles">
                      我的文章
                    </Link>

                  </ul>
                </div>
                <div>
                </div>
              </section>
              <section className="c-right">
                <Switch>
                  <Route
                    path="/client/Myarticles"
                    render={(props) => (
                      <Myarticles
                        {...props}
                        currentUser={currentUser}
                        selfarticles={selfarticles}
                        setselfarticles={setselfarticles}
                        swaAlert={swaAlert}
                        swaConfirm={swaConfirm}
                        history={history}
                      />
                    )}
                  />
                  <Route
                    path="/client/Mylikes"
                    render={(props) => (
                      <Mylikes
                        {...props}
                        currentUser={currentUser}
                        userLikes={userLikes}
                        history={history}
                      />
                    )}
                  />
                  <Route
                    path="/client"
                    render={(props) => (
                      <Memberinfo
                        {...props}
                        currentUser={currentUser}
                        userMessage={userMessage}
                        setUserMessage={setUserMessage}
                        avaUsername={avaUsername}
                        setavaUsername={setavaUsername}
                        ifPwdOK={ifPwdOK}
                        setIfPwdOK={setIfPwdOK}
                        swaAlert={swaAlert}
                      />
                    )}
                  />
                </Switch>
              </section>
            </BrowserRouter>
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

export default Client;
