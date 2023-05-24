import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import useSwaAlert from "./swaAlert";
import { baseUrl } from "../assets/config";

const Login = ({ setCurrentUser, setavatarImg, currentUser }) => {
  var url = "http://localhost:8000";

  const [id, setId] = useState("");
  const [password, setPwd] = useState("");
  const history = useHistory();
  const params = useParams();
  // alert美化
  const swaAlert = useSwaAlert();

  // ifEmailOK
  const [ifEmailOK, setEmailOK] = useState(true);
  const [ifPwdOK, setPwdOK] = useState(true);

  // 是否有相同Email
  async function handleSubmit(e) {
    if (id && password) {
      var result = await axios.post(url + "/logintest", {
        id,
        password,
      });
      var message = result.data.message;
      if (message === "NoUser") {
        // alert("Email尚未註冊，請重新輸入");
        swaAlert("Email尚未註冊，請重新輸入", "", "error", 1500);
      } else if (message === "WrongPwd") {
        // alert("密碼輸入錯誤，請重新輸入");
        swaAlert("密碼輸入錯誤，請重新輸入", "", "error", 1500);
      } else if (message === "Success") {
        // alert("登入成功");
        swaAlert("登入成功", "", "success", 1500);
        localStorage.setItem("user", JSON.stringify(result.data.currentuser));
        setCurrentUser(localStorage.getItem("user"));
        setavatarImg(
          JSON.parse(localStorage.getItem("user"))[0].avatar
            ? url + JSON.parse(localStorage.getItem("user"))[0].avatar
            : url + "/useravatar/pre.png"
        );
        // console.log(params.from)
        if (params.from === "register") {
          history.push('/')
        } else if (params.from === "write") {
          // history.goBack();
          axios
            .post(`${baseUrl}/guide/`, {
              userno: JSON.parse(localStorage.getItem("user"))[0].userno,
            })
            .then((response) => {
              console.log("新增文章");
              // window.location = `/edit/${response.data.main_articleno}`;
              history.push(`/edit/${response.data.main_articleno}`);
            })
            .catch((error) => {
              // 新增失敗
              alert("新增失敗");
              console.error("新增失敗:", error);
            });
        } else {
          history.goBack();
        }

      }
    } else {
      // alert("請確實輸入資料");
      swaAlert("請確實輸入資料", "", "error", 1500);
    }
  }

  const google = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };
  const facebook = () => {
    window.open("http://localhost:8000/auth/facebook", "_self");
  };

  return (
    <div className="page">
      <div id="LoginPage">
        <h1>Welcome back to Tripals</h1>
        <input type="button" value="透過Google登入" onClick={google} />
        <input type="button" value="透過Facebook登入" onClick={facebook} />

        <div id="hrOr">
          <hr />
          <p>OR</p>
          <hr />
        </div>
        <form id="Loginform">
          <label htmlFor="id">信箱</label>
          <input
            name="id"
            type="text"
            onChange={(e) => setId(e.target.value)}
            onBlur={(e) => {
              setEmailOK(Boolean(id));
            }}
          />
          {/* 回傳資料 */}
          <span>{ifEmailOK ? "" : "*請輸入Email"}</span>
          <label htmlFor="password">密碼</label>
          <input
            name="password"
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            onBlur={() => {
              setPwdOK(Boolean(password));
            }}
          />
          {/* 回傳資料 */}
          <span>{ifPwdOK ? "" : "*請輸入密碼"}</span>
          <button type="button" onClick={handleSubmit}>
            登入
          </button>
          <p>沒有Tripals帳號?</p>
          <Link to="/register">Sign Up</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
