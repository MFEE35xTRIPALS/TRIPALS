import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [id, setId] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [labelText, setLabelText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/register2",
        {
          id: id,
          password: password,
          password2: password2,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response)
      const { status } = response.data;
      if (status === "notEnter") {
        setLabelText("尚未輸入");
      } else if (status === "success") {
        setLabelText("登入成功");
        window.location = "../../TaiwanTripals/Tripals.html";
      } else if (status === "notExist") {
        alert("尚未註冊");
      } else if (status === "fail") {
        console.log("帳號或密碼錯誤");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 處理 AxiosError
        console.log('Axios error:', error.message);
        console.log('HTTP status:', error.response.status);
      } else {
        // 處理其他錯誤
        console.log('其他錯誤:', error.message);
      }
    }
  };

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
        <form id="RegisterForm" onSubmit={handleSubmit}>
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
          <label htmlFor="password2">再次輸入</label>
          <input
            name="password2"
            type="password"
            value={password2}
            onChange={(event) => setpassword2(event.target.value)}
          />
          <label htmlFor="">{labelText}</label>
          <input type="submit" value="註冊" />
          <p>已有Tripals帳號?</p>
          <Link to="/login">Log In</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
