import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "./smallcomponent/Card";
import BearLogo from "./smallcomponent/BearLogo";
import { useHistory } from 'react-router-dom';

function Selfpage({ currentUser, setCurrentUser }) {
  const history = useHistory();
  let url = "http://localhost:8000";
  let [userno, setuserno] = useState(currentUser ? JSON.parse(currentUser)[0].userno : undefined);
  let { authorno } = useParams();
  let [banner, setbanner] = useState("");
  let [avatar, setavatar] = useState("");
  let [userName, setuserName] = useState("");
  let [selfIntroduce, setselfIntroduce] = useState("");
  let [articles, setarticles] = useState([]);
  let [userlikes, setuserlikes] = useState([]);
  let [apple, setapple] = useState(null);

  useEffect(() => {
    async function firstRendem() {
      let result = await axios.post(url + `/selfpage/cards/${authorno}`, {
        userno: userno,
      });
      setapple(result);
      setavatar(
        result.data.authormessage[0].avatar
          ? url + result.data.authormessage[0].avatar
          : "http://localhost:8000/useravatar/pre.png"
      );
      setbanner(
        result.data.authormessage[0].banner
          ? url + result.data.authormessage[0].banner
          : "/images/raiway.jpg"
      );
      setuserName(result.data.authormessage[0].username);
      setselfIntroduce(result.data.authormessage[0].intro);
      setarticles(result.data.cardmessage);
      setuserlikes(result.data.usermessage);
    }
    firstRendem();
  }, []);

  return (
    <div>
      {apple ? (<div>
        <section className="selftop">
          <img className="selfCover" src={banner} alt="個人封面" />

          <div className="selfMessage">
            <img className="selfShot" src={avatar} alt="大頭貼" />
            <h4 className="userName">{userName}</h4>
          </div>
        </section>

        <div className="container">
          <section className="selfIntroduce">
            <p className="intro">{selfIntroduce}</p>
          </section>
          <section className="selfArticles">
            <h6 className="articles">ARTICLES</h6>
            <div className="selfCards">
              <div className="c-mylikes">
                {articles.map((article, i) => (
                  <Card
                    key={i}
                    data={article}
                    ifUserLike={userlikes.includes(article.articleno)}
                    userno={userno}
                    currentUser={currentUser}
                    history={history}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
        <BearLogo />
      </div>) : (
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

export default Selfpage;
