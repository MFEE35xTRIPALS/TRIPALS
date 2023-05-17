import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "./smallcomponent/Card";
import BearLogo from "./smallcomponent/BearLogo";

function Selfpage() {
  let url = "http://localhost:8000";
  let [userno, setuserno] = useState(2);
  let { authorno } = useParams();
  let [banner, setbanner] = useState("");
  let [avatar, setavatar] = useState("");
  let [userName, setuserName] = useState("");
  let [selfIntroduce, setselfIntroduce] = useState("");
  let [articles, setarticles] = useState([]);
  let [userlikes, setuserlikes] = useState([]);

  useEffect(() => {
    async function firstRendem() {
      let result = await axios.post(url + `/selfpage/cards/${authorno}`, {
        userno: userno,
      });
      setavatar(
        result.data.authormessage[0].avatar
          ? url + result.data.authormessage[0].avatar
          : "/images/admin.png"
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
      <section className="selftop">
        <img className="selfCover" src={banner} alt="個人封面" />

        <div className="selfMessage">
          <img className="selfShot" src={avatar} alt="大頭貼" />
          <h4 className="userName">{userName}</h4>
        </div>
      </section>

      <div className="container">
        <section className="selfIntroduce">
          <p>{selfIntroduce}</p>
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
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <BearLogo />
    </div>
  );
}

export default Selfpage;
