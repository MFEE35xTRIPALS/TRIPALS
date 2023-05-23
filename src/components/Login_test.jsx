import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = ({ setCurrentUser, setavatarImg, currentUser }) => {
  var url = "http://localhost:8000";

  const [id, setId] = useState("");
  const [password, setPwd] = useState("");
  const history = useHistory();

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
        alert("Email尚未註冊，請重新輸入");
      } else if (message === "WrongPwd") {
        alert("密碼輸入錯誤，請重新輸入");
      } else if (message === "Success") {
        alert("登入成功");
        localStorage.setItem("user", JSON.stringify(result.data.currentuser));
        setCurrentUser(localStorage.getItem("user"));
        setavatarImg(
          localStorage.getItem("user")[0].avatar
            ? url + localStorage.getItem("user")[0].avatar
            : url + "/useravatar/pre.png"
        );

        setTimeout(() => {
          history.goBack();
        }, 3 * 1000);
      }
    } else {
      alert("請確實輸入資料");
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
          <span style={{ color: "red" }} className={ifEmailOK ? "postBtn" : ""}>
            *請輸入Email
          </span>
          {/* 回傳資料 */}
          <label htmlFor="password">密碼</label>
          <input
            name="password"
            type="text"
            onChange={(e) => setPwd(e.target.value)}
            onBlur={() => {
              setPwdOK(Boolean(password));
            }}
          />
          {/* 回傳資料 */}
          <span style={{ color: "red" }} className={ifPwdOK ? "postBtn" : ""}>
            *請輸入密碼
          </span>
          <input type="button" value="登入" onClick={handleSubmit} />
          <p>沒有Tripals帳號?</p>
          <Link to="/registertest">Sign Up</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
