import { useState } from "react";
import Card from "./Card";

function Mylikes({ currentUser, userLikes, history }) {
  // console.log(JSON.parse(currentUser)[0].userno)
  // console.log(setCurrentUser)
  let [userno, setuserno] = useState(currentUser ? JSON.parse(currentUser)[0].userno : 0);

  return (
    <div
      id="c-likes"
      className='c-block'
    >
      <h3 className="c-title">我的收藏</h3>
      <div className="c-mylikes">
        {userLikes[0] ? (
          userLikes.map((article, i) => (
            <Card
              key={i}
              data={article}
              ifUserLike={true}
              userno={userno}
              currentUser={currentUser}
              history={history}
            />
          ))
        ) : (
          <p>目前收藏文章數：0</p>
        )}
      </div>
    </div>
  );
}

export default Mylikes;
