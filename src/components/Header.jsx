import './CSS/Header.css';


const Header = () => {
    return (
        //navBar 
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


                        <div className="d-flex">
                            <a className="navWord" id="house" href="#"><i className="fa-solid fa-house"></i></a>
                            <button className="btn me-auto">SIGN UP</button>
                            <button className="btn me-auto">LOG IN</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}


export default Header