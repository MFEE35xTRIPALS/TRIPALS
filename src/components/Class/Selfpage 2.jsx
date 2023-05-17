import axios from "axios";
import React, { Component } from "react";
import Card from "./Card";

class Selfpage extends Component {
  state = {
    userno: 2,
    authormessage: [
      { banner: "", avatar: "", userName: "", selfIntroduce: "" },
    ],
    articles: [],
    userlikes: [],
  };
  render() {
    return (
      <div>
        <section className="selftop">
          <img
            className="selfCover"
            src={this.state.authormessage[0].banner}
            alt="個人封面"
          />

          <div className="selfMessage">
            <img
              className="selfShot"
              src={this.state.authormessage[0].avatar}
              alt="大頭貼"
            />
            <h4 className="userName">{this.state.authormessage[0].userName}</h4>
          </div>
        </section>

        <div className="container">
          <section className="selfIntroduce">
            <p>{this.state.authormessage[0].selfIntroduce}</p>
          </section>
          <section className="selfArticles">
            <h6 className="articles">ARTICLES</h6>
            <div className="selfCards">
              <div className="c-mylikes">
                {this.state.articles.map((article, i) => (
                  <Card
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
  async componentDidMount() {
    console.log(this.state.test)
    let url = "http://localhost:8000";
    var result = await axios.post(
      url + `/selfpage/cards/${this.props.match.params.authorno}`,
      { userno: this.state.userno }
    );
    // console.log(this.state.userno);
    var newState = { ...this.state };
    newState.authormessage[0].banner = result.data.authormessage[0].banner
      ? url + result.data.authormessage[0].banner
      : "/images/raiway.jpg";
    newState.authormessage[0].avatar = result.data.authormessage[0].avatar
      ? url + result.data.authormessage[0].avatar
      : "/images/admin2.png";
    newState.authormessage[0].userName = result.data.authormessage[0].nickname
      ? result.data.authormessage[0].nickname
      : result.data.authormessage[0].username;
    newState.authormessage[0].selfIntroduce =
      result.data.authormessage[0].intro;

    newState.articles = result.data.cardmessage;
    newState.userlikes = result.data.usermessage;
    this.setState(newState);
    // console.log(this.state.articles);
  }
}

export default Selfpage;
