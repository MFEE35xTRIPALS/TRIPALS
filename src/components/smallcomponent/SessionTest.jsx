import { useState, useEffect } from 'react';
import axios from 'axios';

function AppSessionTest() {
  const [sessionData, setSessionData] = useState({ id: '' }); // 預設為空物件
  const [labelText, setLabelText] = useState('');
  const [user, setUser] = useState(null);


  // useEffect(() => {

  //     fetch("http://localhost:8000/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       }

  //     }).then(response => {
  //       if (response.status === 200) return response.json();
  //       throw new Error("error!")
  //     }).then(resObject =>{
  //       setUser(resObject.user);
  //     })
  //     .catch((err)=>{
  //       console.log(err);
  //     });
  // }, []);
  // console.log(user);

  const logout = () => {
    window.open("http://localhost:8000/auth/logout", "_self");
  }

useEffect(()=>{
  axios.get("http://localhost:8000/getSessionData").then((response)=>{
  setSessionData(response);
  });
},[]);

  return (
    <div>
      <h1>Welcome {sessionData.id}</h1>
      <p>Session data: {JSON.stringify(sessionData)}</p>
      <button onClick={logout}>logout</button>
    </div>

  );
}

export default AppSessionTest;