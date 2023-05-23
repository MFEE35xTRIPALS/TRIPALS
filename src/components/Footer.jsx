import React, { useEffect } from "react";

const Footer = () => {
	return (
		<footer>
			{/* <!-- footer --> */}
			<div className="container">
				<div id="footerLogo">
					<img src="/images/LOGO.svg" alt="" />
					<h5>Copyright@Tripals All Rights Reserved.</h5>
				<h5>僅供學習用途，如有侵權請來信告知。</h5>

				</div>
				<div id="footerNav">
					<ul className="footer_nav nav">
						<li>
							<a className="footer_en" href="/">
								HOME
							</a>
							<a className="footer_ch" href="/">
								首頁
							</a>
						</li>
						<li>
							<a className="footer_en" href="/#news">
								NEWS
							</a>
							<a className="footer_ch" href="/#news">
								最新消息
							</a>
						</li>
						<li className="nav-item">
							<a className="footer_en" href="/Destination">
								DESTINATIONS
							</a>
							<a className="footer_ch" href="/Destination">
								目的地
							</a>
						</li>
						<li className="nav-item">
							<a className="footer_en" href="/Guides">
								GUIDE
							</a>
							<a className="footer_ch" href="/Guides">
								旅遊導覽
							</a>
						</li>
						<li className="nav-item">
							<a className="footer_en" href="">
								WRITE
							</a>
							<a className="footer_ch" href="">
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
	);
};

export default Footer;
