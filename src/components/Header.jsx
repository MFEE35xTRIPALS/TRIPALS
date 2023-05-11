import './CSS/Header.css';


const Header = () => {
    return (
        //navBar 
        <header class="fixed-top">

            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">

                    <button class="navbar-toggler border-0 hamburger hamburger--squeeze" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="navWord" href="#" data-en="GUIDE" data-zh="旅遊導覽">GUIDE</a>
                            </li>
                            <li class="nav-item">
                                <a class="navWord" href="#" data-en="WRITE" data-zh="寫文章">WRITE</a>
                            </li>
                            <li class="nav-item">
                                <a class="navWord" href="#" data-en="DESTINATIONS" data-zh="目的地">DESTINATIONS</a>
                            </li>
                        </ul>


                        <div class="d-flex">
                            <a class="navWord" id="house" href="#"><i class="fa-solid fa-house"></i></a>
                            <button class="btn me-auto">SIGN UP</button>
                            <button class="btn me-auto">LOG IN</button>
                        </div>
                    </div>
                </div>
            </nav>


        </header>
    )
}


export default Header