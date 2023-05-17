import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/HenryStyle/hamburgers.css";

const Navigation = ({ currentUser, setCurrentUser }) => {
  useEffect(() => {
    const handleNavMouseOver = (event) => {
      event.target.textContent = event.target.getAttribute("data-zh");
    };

    const handleNavMouseOut = (event) => {
      event.target.textContent = event.target.getAttribute("data-en");
    };

    const handleScroll = () => {
      const navLinks = document.querySelectorAll(".navWord");
      const scrollY = window.scrollY;

      if (scrollY > 900 && scrollY < 3400) {
        navLinks.forEach((link) => {
          link.style.color = "#578F52";
        });
      } else {
        navLinks.forEach((link) => {
          link.style.color = "#ffffff";
        });
      }
    };

    const handleHamburgerClick = () => {
      const hamburger = document.querySelector(".hamburger");
      hamburger.classList.toggle("is-active");
    };

    const handleNavLinkClick = () => {
      const navContent = document.querySelector("#navbarContent");
      const navToggler = document.querySelector(".navbar-toggler");
      if (navContent.classList.contains("show")) {
        navContent.classList.remove("show");
      }
      if (navToggler.classList.contains("is-active")) {
        navToggler.classList.remove("is-active");
      }
    };

    const navItems = document.querySelectorAll("ul a[data-en]");
    navItems.forEach((item) => {
      item.addEventListener("mouseover", handleNavMouseOver);
      item.addEventListener("mouseout", handleNavMouseOut);
    });

    window.addEventListener("scroll", handleScroll);

    const hamburger = document.querySelector(".hamburger");
    if (hamburger) {
      hamburger.addEventListener("click", handleHamburgerClick);
    }

    const navToggles = document.querySelectorAll(".nav-link");
    navToggles.forEach((element) => {
      element.addEventListener("click", handleNavLinkClick);
    });

    return () => {
      navItems.forEach((item) => {
        item.removeEventListener("mouseover", handleNavMouseOver);
        item.removeEventListener("mouseout", handleNavMouseOut);
      });
      window.removeEventListener("scroll", handleScroll);
      if (hamburger) {
        hamburger.removeEventListener("click", handleHamburgerClick);
      }
      navToggles.forEach((element) => {
        element.removeEventListener("click", handleNavLinkClick);
      });
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null)

  }

  return (
    <header className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler border-0 hamburger hamburger--squeeze"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="navWord"
                  href="./Guides"
                  data-en="GUIDE"
                  data-zh="旅遊導覽"
                >
                  GUIDE
                </a>
              </li>
              <li className="nav-item">
                <a className="navWord" href="" data-en="WRITE" data-zh="寫文章">
                  WRITE
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="navWord"
                  href="./Destination"
                  data-en="DESTINATIONS"
                  data-zh="目的地"
                >
                  DESTINATIONS
                </a>
              </li>
            </ul>

            <div className="d-flex">
              <a className="navWord" id="house" href="/">
                <i className="fa-solid fa-house"></i>
              </a>
              {!currentUser && <div><Link className="btn me-auto" to="/register">
                SING UP
              </Link>
                <Link className="btn me-auto" to="/login">
                  LOGIN
                </Link></div>}

              {currentUser && <Link onClick={logout} className="btn me-auto" to="/">
                LOG OUT
              </Link>}

            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
