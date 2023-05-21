import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = (props) => {
  var url = "http://localhost:8000";
  const [id, setId] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [labelText, setLabelText] = useState("");

  // ifEmailOK
  const [ifEmailOK, setEmailOK] = useState(false);
  const [ifPwdOK, setPwdOK] = useState(false);

  // 是否有相同Email
  async function handleSubmit(e) {
    setPwdOK(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password));

    // console.log(e.currentTarget.value);
    if (ifEmailOK) {
      var result = await axios.post(url + "/registertest", {
        id,
        password,
        password2,
      });
    }
    // console.log(result.data[0].userno);
    console.log(result.data.message);
    // var userno = result.data[0].userno;
  }

  return (
    <div className="page">
      <div id="RegisterPage">
        <h1>測試版註冊Tripals</h1>
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
            onBlur={(event) => {
              setId(event.target.value);
              setEmailOK(
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(id)
              );
            }}
          />
          {/* 回傳資料 */}
          {useEffect(() => {
            console.log(ifEmailOK);

            id && !ifEmailOK && (
              <span style={{ color: "red" }}>*請輸入正確格式</span>
            );
          }, [ifEmailOK])}
          <label htmlFor="password">密碼</label>
          <input
            name="password"
            type="text"
            value={password}
            onChange={(event) => setpassword(event.target.value)}
          />
          {password && !ifPwdOK && (
            <span id="m-pwd">*密碼長度6以上，並包含至少一個英數字</span>
          )}
          <label htmlFor="password2">再次輸入</label>
          <input
            name="password2"
            type="password"
            value={password2}
            onChange={(event) => setpassword2(event.target.value)}
          />
          <label htmlFor="">{labelText}</label>
          <input type="button" value="註冊" onClick={handleSubmit} />
          <p>已有Tripals帳號?</p>
          <Link to="/logintest">Log In</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
