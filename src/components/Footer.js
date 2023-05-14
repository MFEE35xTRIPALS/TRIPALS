import React, { Component } from "react";



class Footer extends Component {
  render() {
        return (
      <div>
        {/* <!-- footer --> */}
        <footer>
        <div className="container">
          <div id="footerLogo">
              <img src='../media/LOGO.svg' alt="" />
            <h5>Copyright@Tripals All Rights Reserved.</h5>
          </div>
          <div id="footerNav">
            <ul className="footer_nav nav">
              <li>  
                  <a className="footer_en" href="#">
                    TOP
                  </a>
                  <a className="footer_ch" href="#main">
                    首頁
                  </a>
              </li>
              <li>
                  <a className="footer_en" href="#news">
                    NEWS
                  </a>
                  <a className="footer_ch" href="#">
                    最新消息
                  </a>
              </li>
              <li className="nav-item">
                  <a className="footer_en" href="#">
                    DESTINATIONS
                  </a>
                  <a className="footer_ch" href="#">
                    目的地
                  </a>
              </li>
              <li className="nav-item">
                  <a className="footer_en" href="#">
                    GUIDE
                  </a>
                  <a className="footer_ch" href="#">
                    旅遊導覽
                  </a>
              </li>
              <li className="nav-item">
                  <a className="footer_en" href="#">
                    WRITE
                  </a>
                  <a className="footer_ch" href="#">
                    寫文章
                  </a>
              </li>
              <li className="nav-item">
                  <a className="footer_en" href="mailto:info@example.com">
                    CONTACT
                  </a>
                  <a className="footer_ch" href="mailto:info@example.com">
                    聯絡我們
                  </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      </div>
    );
    }
  async componentDidMount() { }
}

export default Footer;