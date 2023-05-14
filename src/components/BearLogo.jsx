import React, { useState } from 'react';

function BearLogo() {
  const [imageSrc, setImageSrc] = useState('../media/Bear.svg');

  const handleImageChange = () => {
    setImageSrc(prevSrc =>
      prevSrc.match('../media/Bear.svg')
        ? '../media/heartBear.svg'
        : '../media/Bear.svg'
    );
  };

  return (
    <div>
      <img id="bear" src={imageSrc} alt="Bear" />
      <button onClick={handleImageChange}>Change Image</button>
    </div>
  );
}


export default BearLogo;