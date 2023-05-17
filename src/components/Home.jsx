import React, { Fragment, useEffect, useState } from "react";

function Home() {
  var url = "http://localhost:8000";
  var [news, setNews] = useState([]);
  var [popular, setPopular] = useState([]);
  var [recommend, setRecommend] = useState([]);

  // 判斷是否為第一次渲染
  var [ifFirst, setIfFirst] = useState(false);

  // 第一次抓資料就先把第一個卡片文字儲存
  var [showdiv1, setShowdiv1] = useState("");
  var [showdiv2, setShowdiv2] = useState("");
  var [showdiv3, setShowdiv3] = useState("");

  return <div>Welcome Triples(假首頁111)</div>;
}

export default Home;
