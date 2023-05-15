import React from 'react';

function HashTag(props) {
  const { myArray } = props.data;
  console.log(props.data);
  return (
    <div>
      {myArray && myArray.map(item => (
        <span>{item}</span>
      ))}
    </div>
  );
}


export default HashTag;