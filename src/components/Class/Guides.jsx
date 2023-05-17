import React, { Component } from "react";
import axios from "axios";
import TypeIt from "typeit-react";
import Card2 from "./Cards-2";

class Guides extends Component {
  state = {
    city: null,
    userno: 2,
    hashTags: [],
    articles: [],
    searchInput: "",
    // userlike userno所有收藏的文章
    userlikes: [],
    url: "http://localhost:8000",
  };
  render() {
    return (
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
                {this.state.hashTags.map((tags, i) => (
                  <li
                    className="tag"
                    data-tagno={tags.tagno}
                    key={i}
                    onClick={this.doTagOnClick}
                  >
                    #{tags.hashtag}
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
                    onChange={this.saveInput}
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
                      onClick={this.doSearchOnClick}
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
              <select className="city" onChange={this.doLocationOnChange}>
                <option defaultValue="">&#129517; 地區</option>
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

            <button className="views" onClick={this.doViewsSort}>
              <i className="fa-regular fa-eye"></i> 瀏覽數
            </button>
            <button className="hots" onClick={this.doHeartSort}>
              <i className="fa-solid fa-heart"></i> 熱門度
            </button>
          </div>
        </section>
        <div className="container">
          <section className="selfArticles">
            <h6 className="articles">ARTICLES</h6>
            <div className="selfCards">
              <div className="c-mylikes">
                {/* <!-- onecard card 放置區--> */}
                {this.state.articles.map((article, i) => (
                  <Card2
                    key={i}
                    data={article}
                    ifUserLike={this.state.userlikes.includes(
                      article.articleno
                    )}
                    userno={this.state.userno}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
  /* ------- hashtag random 8 ------- */
  async componentDidMount() {
    // console.log(this.state.city);
    // console.log(this.props.match.params.city);
    var findCity = { ...this.state };
    findCity.city = sessionStorage.getItem("city");
    this.setState(findCity);

    var resultArticles;
    let resultHashtag = await axios.get("http://localhost:8000/articles");
    /* ------- 初始化頁面(文章排序) ------- */
    if (!this.state.city) {
      resultArticles = await axios.post(
        "http://localhost:8000/articles/views",
        { userno: this.state.userno }
      );
    } else {
      resultArticles = await axios.post("http://localhost:8000/articles/city", {
        userno: this.state.userno,
        city: this.state.city,
      });
    }
    var newState = { ...this.state };
    sessionStorage.removeItem("city");
    newState.articles = resultArticles.data[0];
    newState.userlikes = resultArticles.data[1].map((value) => value.articleno);
    newState.hashTags = resultHashtag.data;
    newState.city = sessionStorage.getItem("city");

    this.setState(newState);
  }
  /* ------- 點選瀏覽數(文章排序) ------- */
  doViewsSort = async () => {
    let resultArticles = await axios.post(this.state.url + "/articles/views", {
      userno: this.state.userno,
    });
    var newState = { ...this.state };
    newState.articles = resultArticles.data[0];
    this.setState(newState);
  };
  /* ------- 點選熱門度(文章排序) ------- */
  doHeartSort = async () => {
    let resultArticles = await axios.post(this.state.url + "/articles/hots", {
      userno: this.state.userno,
    });
    var newState = { ...this.state };
    newState.articles = resultArticles.data[0];
    this.setState(newState);
  };
  /* ------- 點擊hashtag 文章渲染 ------- */
  doTagOnClick = async (e) => {
    let tagno = e.target.dataset.tagno;
    let resultArticles = await axios.post(
      this.state.url + `/articles/hashtags/${tagno}`,
      {
        userno: this.state.userno,
      }
    );
    var newState = { ...this.state };
    newState.articles = resultArticles.data[0];
    this.setState(newState);
  };
  /* ------- 點擊City 文章渲染 ------- */
  doLocationOnChange = async (e) => {
    // console.log(e.target.value);
    let resultArticles = await axios.post(this.state.url + `/articles/city`, {
      userno: this.state.userno,
      city: e.target.value,
    });
    console.log(resultArticles);
    var newState = { ...this.state };
    newState.articles = resultArticles.data[0];
    this.setState(newState);
  };
  /* ------- 搜尋Search bar 文章渲染 ------- */
  saveInput = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
  };
  /* ------- 搜尋Search bar 文章渲染 ------- */
  doSearchOnClick = async () => {
    // let search = this.state.searchInput;
    // console.log(search);
    let resultArticles = await axios.post(this.state.url + `/articles/search`, {
      userno: this.state.userno,
      search: this.state.searchInput,
    });
    var newState = { ...this.state };
    newState.articles = resultArticles.data[0];
    this.setState(newState);
  };
}

export default Guides;
