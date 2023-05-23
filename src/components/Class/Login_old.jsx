import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Login = ({ setCurrentUser, setavatarImg, currentUser }) => {
  const [id, setId] = useState("");
  const [password, setpassword] = useState("");
  const [labelText, setLabelText] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/login2",
        {
          id: id,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response);
      console.log(id, password);
      const { status } = response.data;
      if (status === "notEnter") {
        setLabelText("尚未輸入");
      } else if (status === "success") {
        setLabelText("登入成功");
        localStorage.setItem('user', JSON.stringify(response.data.currentuser))
        setCurrentUser(localStorage.getItem("user"))
        setavatarImg(response.data.currentuser[0].avatar
          ? "http://localhost:8000" + response.data.currentuser[0].avatar
          : "http://localhost:8000/useravatar/pre.png")

        setTimeout(() => {
          history.goBack();
        }, 3 * 1000)


      } else if (status === "notExist") {
        setLabelText("尚未註冊");
      } else if (status === "fail") {
        setLabelText("密碼錯誤");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 處理 AxiosError
        console.log('Axios error:', error.message);
        console.log('HTTP status:', error.response);
      } else {
        // 處理其他錯誤
        console.log('其他錯誤:', error.message);
      }
    }
  };

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
        <form id="Loginform" onSubmit={handleSubmit}>
          <label htmlFor="id">信箱</label>
          <input
            name="id"
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
          <label htmlFor="password">密碼</label>
          <input
            name="password"
            type="text"
            value={password}
            onChange={(event) => setpassword(event.target.value)}
          />
          <label id="checkLabel" htmlFor="">
            {labelText}
          </label>
          <input type="submit" value="登入" />
          <p>沒有Tripals帳號?</p>
          <Link to="/register">Sign Up</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
