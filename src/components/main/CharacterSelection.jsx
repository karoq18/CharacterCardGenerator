import { useContext, useState, useEffect } from "react";
import "./characterSelection.css";
import { FormContext } from "../../dataContext";
import PropTypes from 'prop-types';

function CharacterSelection({ onCharacterSelect }) {
  const { formData, updateFormData } = useContext(FormContext);
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);
  const [showCharacterType, setShowCharacterType] = useState(false);

  useEffect(() => {
    const showCreateTimeout = setTimeout(() => {
      setShowCreateCharacter(true);
    }, 3000);

    const showTypeTimeout = setTimeout(() => {
      setShowCharacterType(true);
    }, 5000);

    return () => {
      clearTimeout(showCreateTimeout);
      clearTimeout(showTypeTimeout);
    };
  }, []);

  const handleCharacterTypeChange = (e) => {
    const selectedType = e.target.value;
    updateFormData("characterType", selectedType);

    if (selectedType) {
      onCharacterSelect();
    }
  };
  
  CharacterSelection.propTypes = {
    onCharacterSelect: PropTypes.func.isRequired,
  };

  return (
    <div className="characterConteneir">
      <div className="animated-text-container">
        <svg
          viewBox="0 -50 800 180"
          width="100%"
          className="animated-text"
          preserveAspectRatio="xMidYMid meet"
        >
          <path id="textPath" d="M100,100 Q400,0 700,100" fill="none"></path>
          <text textLength="600" lengthAdjust="spacingAndGlyphs">
            <textPath href="#textPath">Morsmordre</textPath>
          </text>
        </svg>
      </div>

      {showCreateCharacter && (
        <div className="h2 fade-in">Stwórz swoją postać</div>
      )}

      {showCharacterType && (
        <>
          <div className="h5 fade-in-delayed">Typ postaci</div>
          <div className="input-group fade-in-delayed">
            <select
              id="characterType"
              value={formData.characterType || ""}
              onChange={handleCharacterTypeChange}
            >
              <option value="">-- Wybierz --</option>
              <option value="wizard">Czarodziej</option>
              <option value="child">Dziecko</option>
              <option value="student">Uczeń</option>
              <option value="ghost">Duch</option>
              <option value="muggle">Mugol</option>
              <option value="dependentCharacter">Postać zależna</option>
              <option value="independentCharacter">Postać niezależna</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
}

export default CharacterSelection;
