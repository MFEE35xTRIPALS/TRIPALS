import React, { useState } from 'react';

function BearLogo() {
  const [imageSrc, setImageSrc] = useState('./media/Bear.svg');

  const handleImageChange = () => {
    setImageSrc(prevSrc =>
      prevSrc.match('./media/Bear.svg')
        ? './media/heartBear.svg'
        : './media/Bear.svg'
    );
  };

  return (
    <div>
      <a href="#">
        <img
          id="bear"
          src={imageSrc}
          onMouseOver={handleImageChange}
          onMouseOut={handleImageChange}
          alt=""
        />
      </a>
    </div>
  );
}

export default BearLogo;