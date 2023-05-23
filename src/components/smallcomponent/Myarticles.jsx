import { useState } from "react";
import axios from "axios";

function Myarticles({ currentUser, selfarticles, setselfarticles, swaConfirm, swaAlert, history }) {
  // console.log(JSON.parse(currentUser)[0].userno)
  // console.log(setCurrentUser)
  let url = "http://localhost:8000";


  // ---------刪除文章-----------------
  let trashcan = (e) => {
    // let makesrue = window.confirm("文章刪除後即無法復原，確定要刪除嗎？");
    swaConfirm("文章刪除後即無法復原", '確定要刪除嗎？', 'warning', async () => {
      await axios.delete(url + "/guide", {
        data: JSON.stringify({ main_articleno: e.target.dataset.articleno }),
        headers: { "Content-Type": "application/json" },
      })
        .then((trashcanresult) => {
          swaAlert(trashcanresult.data, '', 'success', 1500);
          let arrtest = selfarticles.filter(
            (articles) =>
              articles.articleno !== parseInt(e.target.dataset.articleno)
          );
          setselfarticles(arrtest);
        })
    })

  };

  return (
    <div
      id="c-myarts"
      className='c-block'
    >
      <h3 className="c-title">我的文章</h3>
      <div className="c-mine">
        <table className="c-myart">
          <thead>
            <tr>
              <td>文章標題</td>
              <td>觀看數</td>
              <td>熱門度</td>
              <td>狀態</td>
              <td>編輯文章</td>
            </tr>
          </thead>
          <tbody>
            {selfarticles[0] ? (
              selfarticles.map((value, i) => {
                // console.log(list.status);
                if (value.status === "show") {
                  return (
                    <tr key={i}>
                      <td>
                        <a href='#' onClick={() => { history.push(`/view${value.articleno}`) }}>
                          {value.title}
                        </a>
                      </td>
                      <td>
                        <i className="fa-regular fa-eye"></i>{" "}
                        {value.view_count}
                      </td>
                      <td>
                        <i className="fa-regular fa-heart"></i>{" "}
                        {value.count}
                      </td>
                      <td>已發佈</td>
                      <td>
                        <a
                          className="c-editArt"
                          href='#'
                          onClick={() => { history.push(`/edit/${value.articleno}`) }}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </a>
                        <i
                          className="fa-regular fa-trash-can trash"
                          data-articleno={value.articleno}
                          onClick={trashcan}
                        ></i>
                      </td>
                    </tr>
                  );
                } else if (value.status === "draft") {
                  return (
                    <tr key={i}>
                      <td>
                        <a href='#' onClick={() => { history.push(`/view${value.articleno}`) }}>
                          {value.title}
                        </a>
                      </td>
                      <td>
                        <i className="fa-regular fa-eye"></i>{" "}
                        {value.view_count}
                      </td>
                      <td>
                        <i className="fa-regular fa-heart"></i>{" "}
                        {value.count}
                      </td>
                      <td>草稿</td>
                      <td>
                        <a
                          className="c-editArt"
                          href='#'
                          onClick={() => { history.push(`/edit/${value.articleno}`) }}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </a>
                        <i
                          className="fa-regular fa-trash-can trash"
                          data-articleno={value.articleno}
                          onClick={trashcan}
                        ></i>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={i} className="c-deleteDone">
                      <td>{value.title}</td>
                      <td>
                        <i className="fa-regular fa-eye"></i>{" "}
                        {value.view_count}
                      </td>
                      <td>
                        <i className="fa-regular fa-heart"></i>{" "}
                        {value.count}
                      </td>
                      <td>檢舉刪除</td>
                      <td>無法編輯</td>
                    </tr>
                  );
                }
              })
            ) : (
              <tr>
                <td colSpan={5}>您尚未發布任何文章</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Myarticles;
