import { useState, useEffect, useRef } from 'react';
import '../../app.css';
import PropTypes from 'prop-types';



const Hint = ({ description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null); 

  const toggleTooltip = () => {
      setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
          setIsVisible(false);
      }
  };
  Hint.propTypes = {
    description: PropTypes.func,
  };

  useEffect(() => {
      if (isVisible) {
          document.addEventListener('mousedown', handleClickOutside);
      } else {
          document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [isVisible]);

  return (
      <div className="hint-container" ref={tooltipRef}>
          
          <div className="question-mark" onClick={toggleTooltip}></div>
          <div className="question-mark1" onClick={toggleTooltip}></div>
          
          <div className={`tooltip ${isVisible ? 'visible' : ''}`} dangerouslySetInnerHTML={{ __html: description }} />
      </div>
  );
};

export default Hint;