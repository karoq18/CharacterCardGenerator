import { useState, useContext } from "react";
import { FormContext } from "../../dataContext";
import characterConfig from "../../characterConfig";
import Skills from "../skills/Skills";
import SkillsB from "../skillsB/SkillsB";
import CharacterMetric from "../metric/CharacterMetric";
import Biography from "../biography/Biography";
import Wand from "../skills/Wand";
import CardPreview from "../cardPreview/cardPreview";
import GenerateHTML from "../generateHTML/GenerateHTML";
import "./navigationMenu.css";
import CharacterSelection from "./CharacterSelection";
import ChildSkill from "../skillsB/ChildSkill";
import Credit from "../credit/Credit";

function NavigationMenu() {
  const [activeComponent, setActiveComponent] = useState("CharacterMetric");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { formData } = useContext(FormContext);
  const selectedCharacterType = formData.characterType;

  const config = characterConfig[selectedCharacterType] || {};

  const isComponentIncluded = (componentName) =>
    config.includeSections?.includes(componentName);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  const components = [
    {
      label: "Wybór postaci",
      name: "CharacterSelection",
      component: <CharacterSelection />,
    },
    {
      label: "Metryka",
      name: "CharacterMetric",
      component: <CharacterMetric />,
    },
    {
      label: "Biografia",
      name: "Biography",
      component: <Biography />,
    },
    {
      label: "Różdżka",
      name: "Wand",
      component: <Wand />,
    },
    {
      label: "Kredyt",
      name: "Credit",
      component: <Credit />,
    },
    {
      label: "Biegłości",
      name: "SkillsB",
      component: <SkillsB />,
    },
    {
      label: "Statystyki",
      name: "Skills",
      component: <Skills />,
    },
    {
      label: "Emocje",
      name: "ChildSkill",
      component: <ChildSkill />,
    },
  ];

  return (
    <div className="navigation-menu-container">
      <div className={`main-content ${isPanelOpen ? "panel-open" : ""}`}>
        <nav className="navigation">
          {components.map(({ label, name }) =>
            isComponentIncluded(name) ? (
              <button key={name} onClick={() => setActiveComponent(name)}>
                {label}
              </button>
            ) : null
          )}
          <button onClick={togglePanel}>Podgląd karty</button>
          <button onClick={() => setActiveComponent("GenerateHTML")}>
            Pobierz kod
          </button>
        </nav>

        {components.map(
          ({ name, component }) =>
            activeComponent === name &&
            isComponentIncluded(name) && <div key={name}>{component}</div>
        )}
        {activeComponent === "GenerateHTML" && <GenerateHTML />}
      </div>

      <div className={`side-panel ${isPanelOpen ? "open" : ""}`}>
        <div className="panel-content">
          <button
            className={`close-btn ${isPanelOpen ? "expanded" : ""}`}
            onClick={togglePanel}
          >
            <span className="arrow">&#88;</span>
          </button>
          <CardPreview />
        </div>
      </div>

      {!isPanelOpen && (
        <div
          className={`toggle-button ${isPanelOpen ? "expanded" : ""}`}
          onClick={togglePanel}
        >
          <span className="arrow">&#9664;</span>
        </div>
      )}
    </div>
  );
}

export default NavigationMenu;
