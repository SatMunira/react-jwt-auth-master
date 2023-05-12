import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function StarRating({ value, onChange, onSubmit }) {
  const stars = Array(5).fill(0).map((_, i) => i + 1);

  const starStyle = {
    fontSize: '24px',
    marginLeft: '7px' // adjust this value as needed
  };
 
  
  return (
    <div className="star-rating "> {/* add text-center class here */}
      {stars.map((starValue) => (
        <FontAwesomeIcon
          key={starValue}
          icon={faStar}
          size='3x'
          style={starStyle}
          className="star"
          color={starValue <= value ? '' : '#e4e5e9'}
          onClick={() => {
            onChange(starValue);
            onSubmit(starValue);
          }}
        />
      ))}
    </div>
  );
}

export default StarRating;
