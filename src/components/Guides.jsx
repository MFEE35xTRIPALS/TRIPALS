import { useState, useEffect } from "react";
import axios from "axios";
import TypeIt from "typeit-react";
import Card from "./smallcomponent/Card";
import BearLogo from "./smallcomponent/BearLogo";
import { useHistory } from "react-router-dom";

function Guides({ currentUser, setCurrentUser }) {
  // const [result, setResult] = useState({});
  const history = useHistory();
  var url = "http://localhost:8000/articles";
  var [userno, setuserno] = useState(
    currentUser ? JSON.parse(currentUser)[0].userno : undefined
  );
  var [city, setCity] = useState(sessionStorage.getItem("city"));

  var [hashTags, setHashTags] = useState([]);
  var [articles, setArticles] = useState([]);
  var [likes, setlikes] = useState();
  var [cards, setCards] = useState();
  var [search, setSearch] = useState("");
  let [apple, setapple] = useState(null);

  /* ------- 初始化頁面 ------- */
  /* ------- 加上目的地傳資料來(文章排序) ------- */
  useEffect(() => {
    var firstRender = async () => {
      let result = await axios.post(url, { userno: userno });
      setHashTags(result.data[0]);
      setArticles(result.data[1]);
      setlikes(result.data[2].map((value) => value.articleno));
      setapple(result);
    };
    var CityRender = async () => {
      let result = await axios.post(url + "/destination", {
        userno: userno,
        city: sessionStorage.getItem("city"),
      });
      setHashTags(result.data[0]);
      setArticles(result.data[1]);
      setlikes(result.data[2].map((value) => value.articleno));
      setapple(result);
    };
    if (city) {
      console.log(city);
      CityRender();
    } else {
      firstRender();
    }
  }, []);

  /* ------- 卡片渲染(文章排序) ------- */
  useEffect(() => {
    if (articles) {
      setCards(
        articles.map((article) => (
          <Card
            key={article.articleno}
            data={article}
            ifUserLike={likes.includes(article.articleno)}
            userno={userno}
            currentUser={currentUser}
            history={history}
          />
        ))
      );
    }
    sessionStorage.removeItem("city");
  }, [articles, userno, likes]);

  /* ------- 點選瀏覽數(文章排序) ------- */
  async function doViewsSort() {
    let result = await axios.get(url + "/views", {
      userno: userno,
    });
    setArticles(result.data);
  }

  /* ------- 點選熱門度(文章排序) ------- */
  async function doHeartSort() {
    let result = await axios.get(url + "/hots", {
      userno: userno,
    });
    setArticles(result.data);
  }

  /* ------- 點擊hashtag 文章渲染 ------- */
  async function doTagOnClick(e) {
    let tagno = e.target.dataset.tagno;
    let result = await axios.post(url + `/hashtags/${tagno}`, {
      userno: userno,
    });
    setArticles(result.data);
  }

  /* ------- 點擊City 文章渲染 ------- */
  async function doLocationOnChange(e) {
    if (e.target.value) {
      let result = await axios.post(url + `/city`, {
        userno: userno,
        city: e.target.value,
      });
      setArticles(result.data);
    }
  }

  /* ------- 搜尋Search bar 文章渲染 ------- */
  function saveInput(e) {
    setSearch(e.target.value);
  }

  /* ------- 搜尋Search bar 文章渲染 ------- */
  async function doSearchOnClick() {
    let result = await axios.post(url + `/search`, {
      userno: userno,
      search: search,
    });
    setArticles(result.data);
  }

  return (
    <div>
      {apple ? (
        <div>
          <section className="title">
            <div className="img">
              <h1>
                <TypeIt element={"h1"}>Start your Trip.</TypeIt>
              </h1>
            </div>
          </section>
          <section className="hashtag">
            <div className="tag-search">
              <div className="left">
                <ul className="tags" id="tags">
                  {hashTags.map((tags, i) => (
                    <li
                      className="tag"
                      data-tagno={tags.tagno}
                      key={i}
                      onClick={doTagOnClick}
                    >
                      {tags.hashtag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="right">
                <div className="contain">
                  <form className="search">
                    <input
                      className="search__input"
                      type="search"
                      placeholder="Search"
                      id="searchInput"
                      onChange={saveInput}
                      onClick={(e) => {
                        e.target.value = "台中";
                        setSearch("台中");
                      }}
                    />

                    <div className="search__icon-container">
                      <label
                        htmlFor="searchInput"
                        className="search__label"
                        aria-label="Search"
                      >
                        <svg viewBox="0 0 1000 1000" title="Search">
                          <path
                            fill="currentColor"
                            d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
                          />
                        </svg>
                      </label>
                      <button
                        className="search__submit"
                        aria-label="Search"
                        type="button"
                        onClick={doSearchOnClick}
                      >
                        <svg viewBox="0 0 1000 1000" title="Search">
                          <path
                            fill="currentColor"
                            d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="sort">
              <form action="" className="category">
                <select className="city" onChange={doLocationOnChange}>
                  <option defaultValue value="">
                    &#129517; 地區
                  </option>
                  <optgroup label="北部地區">
                    <option value="宜蘭縣">宜蘭縣</option>
                    <option value="基隆市">基隆市</option>
                    <option value="台北市">台北市</option>
                    <option value="新北市">新北市</option>
                    <option value="桃園市">桃園市</option>
                    <option value="新竹市">新竹市</option>
                    <option value="新竹縣">新竹縣</option>
                  </optgroup>
                  <optgroup label="中部地區">
                    <option value="苗栗縣">苗栗縣</option>
                    <option value="台中市">台中市</option>
                    <option value="彰化縣">彰化縣</option>
                    <option value="南投縣">南投縣</option>
                    <option value="雲林縣">雲林縣</option>
                  </optgroup>
                  <optgroup label="南部地區">
                    <option value="嘉義市">嘉義市</option>
                    <option value="嘉義縣">嘉義縣</option>
                    <option value="台南市">台南市</option>
                    <option value="高雄市">高雄市</option>
                    <option value="屏東縣">屏東縣</option>
                  </optgroup>
                  <optgroup label="東部地區">
                    <option value="台東縣">台東縣</option>
                    <option value="花蓮縣">花蓮縣</option>
                  </optgroup>
                  <optgroup label="離島地區">
                    <option value="19">澎湖縣</option>
                    <option value="20">金門縣</option>
                    <option value="21">連江縣</option>
                  </optgroup>
                </select>
              </form>

              <button className="hots" onClick={doHeartSort}>
                <i className="fa-solid fa-heart"></i> 收藏數
              </button>
              <button className="views" onClick={doViewsSort}>
                <i className="fa-regular fa-eye"></i> 瀏覽數
              </button>
            </div>
          </section>
          <div className="container">
            <section className="selfArticles">
              <h6 className="articles">ARTICLES</h6>
              <div className="selfCards">
                <div className="c-mylikes" id="cards">
                  {/* <!-- onecard card 放置區--> */}
                  {cards}
                </div>
              </div>
            </section>
          </div>
          <BearLogo />
        </div>
      ) : (
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

export default Guides;
