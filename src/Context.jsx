import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const AdditionalPointsContext = createContext();

export const useAdditionalPoints = () => useContext(AdditionalPointsContext);

export const AdditionalPointsProvider = ({ children }) => {
  const [additionalPoints, setAdditionalPoints] = useState(0);

  return (
    <AdditionalPointsContext.Provider value={{ additionalPoints, setAdditionalPoints }}>
      {children}
    </AdditionalPointsContext.Provider>
  );
};
AdditionalPointsProvider.propTypes = {
  children: PropTypes.node,
};

AdditionalPointsProvider.defaultProps = {
  children: null,
};
