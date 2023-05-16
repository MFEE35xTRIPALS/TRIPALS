import { useEffect } from "react";

function UseWindowSize(panelsStayOpen) {
  useEffect(() => {
    function handleWindowSize() {
      if (window.innerWidth < 768) {
        panelsStayOpen.slice(1).forEach((el) => {
          el.classList.remove("show");
        });
      } else {
        panelsStayOpen.forEach((el) => {
          el.classList.add("show");
        });
      }
    }
    handleWindowSize();
    window.addEventListener("resize", handleWindowSize);
    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, [panelsStayOpen]);
}

export default UseWindowSize;