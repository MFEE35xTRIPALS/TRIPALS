import React, { useEffect } from 'react';
import './CSS/hamburgers.css';

const Header = () => {
  useEffect(() => {
    const handleNavMouseOver = (event) => {
      event.target.textContent = event.target.getAttribute('data-zh');
    };

    const handleNavMouseOut = (event) => {
      event.target.textContent = event.target.getAttribute('data-en');
    };

    const handleScroll = () => {
      const navLinks = document.querySelectorAll('.navWord');
      const scrollY = window.scrollY;

      if (scrollY > 900 && scrollY < 3400) {
        navLinks.forEach((link) => {
          link.style.color = '#578F52';
        });
      } else {
        navLinks.forEach((link) => {
          link.style.color = '#ffffff';
        });
      }
    };

    const handleHamburgerClick = () => {
      const hamburger = document.querySelector('.hamburger');
      hamburger.classList.toggle('is-active');
    };

    const handleNavLinkClick = () => {
      const navContent = document.querySelector('#navbarContent');
      const navToggler = document.querySelector('.navbar-toggler');
      if (navContent.classList.contains('show')) {
        navContent.classList.remove('show');
      }
      if (navToggler.classList.contains('is-active')) {
        navToggler.classList.remove('is-active');
      }
    };

    const navItems = document.querySelectorAll('ul a[data-en]');
    navItems.forEach((item) => {
      item.addEventListener('mouseover', handleNavMouseOver);
      item.addEventListener('mouseout', handleNavMouseOut);
    });

    window.addEventListener('scroll', handleScroll);

    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', handleHamburgerClick);
    }

    const navToggles = document.querySelectorAll('.nav-link');
    navToggles.forEach((element) => {
      element.addEventListener('click', handleNavLinkClick);
    });

    return () => {
      navItems.forEach((item) => {
        item.removeEventListener('mouseover', handleNavMouseOver);
        item.removeEventListener('mouseout', handleNavMouseOut);
      });
      window.removeEventListener('scroll', handleScroll);
      if (hamburger) {
        hamburger.removeEventListener('click', handleHamburgerClick);
      }
      navToggles.forEach((element) => {
        element.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, []);

  return (
    <header className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <button className="navbar-toggler border-0 hamburger hamburger--squeeze" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="navWord" href="#" data-en="GUIDE" data-zh="旅遊導覽">GUIDE</a>
              </li>
              <li className="nav-item">
                <a className="navWord" href="#" data-en="WRITE" data-zh="寫文章">WRITE</a>
              </li>
              <li className="nav-item">
                <a className="navWord" href="#" data-en="DESTINATIONS" data-zh="目的地">DESTINATIONS</a>
              </li>
            </ul>
          </div>
          <div className="d-flex ms-auto">
              <a className="navWord" id="house" href="#"><i className="fa-solid fa-house"></i></a>
              <button className="btn  logInBtn">SIGN UP</button>
              <button className="btn  logInBtn">LOG IN</button>
            </div>
      <div class="dropdown me-auto">
        <button class="btn dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <div class="userImage rounded-circle">
            <img class="avatar" src="./media/nana.jpg" alt="UserImage" />
          </div>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#"><i class="fa-solid fa-home"></i>首頁</a></li>
          <li><a class="dropdown-item" href="#"><i class="fa-solid fa-user"></i>個人資料</a></li>
          <li><a class="dropdown-item" href="#"><i class="fa-solid fa-heart"></i>我的收藏</a></li>
          <li><a class="dropdown-item" href="#"><i class="fa-solid fa-pen-to-square"></i>我的文章</a></li>
          <li><a class="dropdown-item" href="#">登出</a></li>
        </ul>
      </div>
        </div>
      </nav>
   
    </header>
  )
}


export default Header