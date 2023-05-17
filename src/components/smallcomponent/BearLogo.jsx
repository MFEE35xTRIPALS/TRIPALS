import React, { useState } from 'react';

function BearLogo() {
  const [imageSrc, setImageSrc] = useState('/images/Bear.svg');

  const handleImageChange = () => {
    setImageSrc(prevSrc =>
      prevSrc.match('/images/Bear.svg')
        ? '/images/heartBear.svg'
        : '/images/Bear.svg'
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