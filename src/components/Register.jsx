import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useSwaAlert from "./swaAlert";
import { useHistory } from 'react-router-dom';

const Register = (props) => {
  const history = useHistory();
  var url = "http://localhost:8000";
  const [id, setId] = useState("");
  const [password, setPwd] = useState("");
  const [password2, setPwd2] = useState("");

  // alert美化
  const swaAlert = useSwaAlert();

  // ifEmailOK
  const [ifEmailOK, setEmailOK] = useState(false);
  const [ifPwdOK, setPwdOK] = useState(false);
  const [ifPwd2OK, setPwd2OK] = useState(true);

  // 是否有相同Email
  async function handleSubmit(e) {
    if (ifEmailOK && ifPwdOK && ifPwd2OK) {
      var result = await axios.post(url + "/registertest", {
        id,
        password,
        password2,
      });
      var message = result.data.message;
      if (message === "EmailExist") {
        // alert("此帳戶已存在");
        swaAlert("此帳戶已存在", "", "warning", 1500);
      } else if (message === "Success") {
        // alert("註冊成功");
        swaAlert("註冊成功", "請再次輸入帳號密碼進行登入", "success", 1500);
        history.push("/login/register")
      }
    } else {
      // alert("請確實輸入資料");
      swaAlert("請確實輸入資料", "", "warning", 1500);
    }
  }

  return (
    <div className="page">
      <div id="RegisterPage">
        <h1>註冊Tripals</h1>
        <input type="button" value="透過Google繼續" />
        <input type="button" value="透過Facebook繼續" />

        <div id="hrOr">
          <hr />
          <p>OR</p>
          <hr />
        </div>
        <form id="RegisterForm">
          <label htmlFor="id">信箱</label>
          <input
            name="id"
            type="email"
            // value={id}
            onChange={(e) => {
              setId(e.target.value);
              setEmailOK(
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  e.target.value
                )
              );
            }}
          />
          {/* 回傳資料 */}
          <span>{id && !ifEmailOK && "*請輸入正確格式"}</span>
          <label htmlFor="password">密碼</label>
          <input
            name="password"
            type="password"
            // value={password}
            onChange={(e) => {
              setPwd(e.target.value);
              setPwdOK(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(e.target.value));
            }}
          />
          {/* 回傳資料 */}
          <span>
            {password && !ifPwdOK && "*密碼長度6以上，並包含至少一個英數字"}
          </span>
          <label htmlFor="password2">再次輸入</label>
          <input
            name="password2"
            type="password"
            // value={password2}
            onChange={(event) => {
              setPwd2(event.target.value);
              setPwd2OK(event.target.value === password);
            }}
          />
          <span>{password2 && !ifPwd2OK && "*密碼輸入不一致"}</span>
          <button type="button" onClick={handleSubmit}>
            註冊
          </button>

          <p>已有Tripals帳號?</p>
          <Link to={"/login/register"}>Log In</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
