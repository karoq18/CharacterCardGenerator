import React, { useState, useContext, useEffect } from "react";
import { FormContext } from "../../dataContext";
import characterConfig from "../../characterConfig";
import "../cardPreview/cardPreview.css";
import "../../app.css";
import "../skillsB/skillsB.css";

const CardPreview = () => {
  const { formData, updateFormData } = useContext(FormContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedCharacterType = formData.characterType;

  const config = characterConfig[selectedCharacterType] || {};
  const excludeFields = config.excludeFields || [];
  const includeSections = config.includeSections || [];
  const hasWand = includeSections.includes("Wand");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderPersonalMetric = () => {
    const metricKeys = Object.keys(formData.selectedOptions?.metric || {}).sort(
      (a, b) => Number(a) - Number(b)
    );

    const otherMetrics = metricKeys.filter(
      (key) =>
        Number(key) > 2 && Number(key) <= 16 && !excludeFields.includes(key)
    );
    const specificMetrics = metricKeys.filter(
      (key) =>
        Number(key) > 19 && Number(key) < 30 && !excludeFields.includes(key)
    );

    return (
      <>
        <React.Fragment>
          <div className="metricH6">
            {(formData?.selectedOptions?.metric?.[1]?.value || "Imię") +
              " " +
              (formData?.selectedOptions?.metric?.[2]?.value || "Nazwisko")}
          </div>
        </React.Fragment>

        {includeSections.includes("SpecificCharacter") ? (
          <div className="h14">Metryka:</div>
        ) : null}

        <div
          className={
            includeSections.includes("SpecificCharacter") ? "" : "miniFrame"
          }
        >
          {otherMetrics.map((id, index) => (
            <div key={index} className="valueMetric">
              <strong className="descriptionMetric">
                {formData?.selectedOptions?.metric?.[id]?.label || ""}
              </strong>
              {formData?.selectedOptions?.metric?.[id]?.value || ""}
            </div>
          ))}

          <div id="cardPreviewOther">
            {hasWand ? (
              <div className={`valueMetric special`}>
                <button className="hover-target">
                  Różdżka:
                  <span>
                    {formData.selectedOptions.wand[1]?.value || ""}{" "}
                    {formData.selectedOptions.wand[2]?.value || ""}{" "}
                    {formData.selectedWood?.name} {formData.selectedHeart?.name}
                  </span>
                </button>
              </div>
            ) : null}
            {specificMetrics.map((id, index) => (
              <div key={index} className={`valueMetric special`}>
                <button className="hover-target">
                  {formData?.selectedOptions?.metric?.[id]?.label || ""}
                  <span>
                    {formData?.selectedOptions?.metric?.[id]?.value || ""}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderBiography = () => {
    return (
      <div>
        {includeSections.includes("SpecificCharacter") ? (
          <div className="h14">Biografia</div>
        ) : (
          ""
        )}
        <div
          className={`cardBio ${isExpanded ? "expanded" : ""}`}
          dangerouslySetInnerHTML={{ __html: formData.previewBio }}
        ></div>
        <button
          className={`expandButton ${isExpanded ? "expanded" : ""}`}
          onClick={toggleExpand}
        >
          <span className="arrow">&#9660;</span>
        </button>
      </div>
    );
  };

  const renderSpecific = () => {
    return (
      <div>
        <div className="h14">Wygląd</div>
        <div
          className={`cardBio ${isExpanded ? "expanded" : ""}`}
          dangerouslySetInnerHTML={{ __html: formData.previewAppearance }}
        ></div>
        <button
          className={`expandButton ${isExpanded ? "expanded" : ""}`}
          onClick={toggleExpand}
        >
          <span className="arrow">&#9660;</span>
        </button>

        <div class="h14">Ciekawostki</div>
        <div
          className={`cardBio ${isExpanded ? "expanded" : ""}`}
          dangerouslySetInnerHTML={{ __html: formData.previewTrivia }}
        ></div>
        <button
          className={`expandButton ${isExpanded ? "expanded" : ""}`}
          onClick={toggleExpand}
        >
          <span className="arrow">&#9660;</span>
        </button>

        {selectedCharacterType !== "independentCharacter" && (
          <>
        <div class="h14">Powiązania</div>
        <div
          className={`cardBio ${isExpanded ? "expanded" : ""}`}
          dangerouslySetInnerHTML={{ __html: formData.previewConnections }}
        ></div>
        <button
          className={`expandButton ${isExpanded ? "expanded" : ""}`}
          onClick={toggleExpand}
        >
          <span className="arrow">&#9660;</span>
        </button>
      </>
    )}
    </div>
    );
  };

  const renderImageCard = () => {
    return (
      <>
        <img
          src={formData.selectedOptions.metric[35]?.value || ""}
          alt=""
          className="imageCard"
        ></img>
      </>
    );
  };

  const polishNamesStatsMap = {
    dada: "OPCM",
    charms: "Zaklęcia",
    blackMagic: "Czarna Magia",
    healing: "Uzdrawianie",
    transmutation: "Transmutacja",
    alchemy: "Alchemia",
    fitness: "Sprawność",
    agility: "Zwinność",
  };

  const renderStats = () => (
    <>
      <div className={`descriptionSkillsB main`}>
        <div className={`nameSkillsB first`}>Statystyka</div>
        <div className="valueSkillsB">Wartość</div>
        <div className="costSkillsB">Bonus</div>
      </div>

      {Object.keys(formData.selectedOptionsStats || {})
        .filter((group) => !excludeFields.includes(group))
        .map((group, index) => (
          <div
            key={index}
            className={`descriptionSkillsB ${index % 2 === 0 ? "even" : "odd"}`}
          >
            <div className="nameSkillsB">
              {polishNamesStatsMap[group] || "Unknown"}
            </div>
            <div className="valueSkillsB">
              {formData.selectedOptionsStats[group]?.[0]?.value || 0}
            </div>
            <div className="costSkillsB">
            {formData.totalBonus?.[group] ? `+${formData.totalBonus[group]} (różdżka)` : "Brak"}
            </div>
          </div>
        ))}
      <div className={`descriptionSkillsB sum`}>
        Reszta: {formData.remainingPointsSkill}
      </div>
    </>
  );

  const polishNamesMap = {
    lang: "Język",
    social: "Biegłości Społeczne",
    basic: "Biegłości Podstawowe",
    special: "Biegłości Specjalne",
    craft: "Sztuka i Rzemiosło",
    sport: "Aktywności",
    genetic: "Genetyka",
    story: "Biegłości Fabularne",
    other: "Pozostałe",
    psychoGhost: "Psychokineza",
    othersGhost: "Pozostałe",
  };

  const filterUserSkillsByCategory = (category) => {
    return Object.keys(formData.selectedOptionsSkillB.user || {})
      .filter(
        (skillId) =>
          formData.selectedOptionsSkillB.user[skillId].category === category
      )
      .map((skillId) => formData.selectedOptionsSkillB.user[skillId]);
  };

  const renderSkillsB = () => {
    const skillsGroups = config.includeSkillsB || [];

    return (
      <>
        {skillsGroups.map((group) => (
          <div key={group}>{renderSkillsForGroup(group)}</div>
        ))}
        <div className={`descriptionSkillsB sum`}>
          Reszta: {formData.remainingPointsSkillB}
        </div>
      </>
    );
  };

  const renderSkillsForGroup = (group) => {
    const mainSkills = Object.keys(formData.selectedOptionsSkillB[group] || {})
      .filter(
        (id) =>
          formData.selectedOptionsSkillB[group][id]?.value &&
          formData.selectedOptionsSkillB[group][id]?.value !== ""
      )
      .map((id) => {
        if (group === "story" && id === "0") {
          return {
            label: formData.selectedOptionsSkillB[group][id]?.value || "",
            value: "-",
            cost: formData.selectedOptionsSkillB[group][id]?.cost || 0,
          };
        }

        if (group === "lang" && id === "0") {
          return {
            label: "Język ojczysty: " + formData.selectedOptionsSkillB[group][id]?.label || "",
            value: "II",
            cost: formData.selectedOptionsSkillB[group][id]?.cost || 0,
          };
        }

        if (group === "genetic" && id === "0") {
          return {
            label: formData.selectedOptionsSkillB[group][id]?.value || "",
            value: "-",
            cost: formData.selectedOptionsSkillB[group][id]?.cost || 0,
          };
        }

        return {
          label: formData.selectedOptionsSkillB[group][id]?.label || "",
          value:
            group === "genetic"
              ? "-"
              : formData.selectedOptionsSkillB[group][id]?.value || "",
          cost: formData.selectedOptionsSkillB[group][id]?.cost || 0,
        };
      });

    const userSkills = filterUserSkillsByCategory(group)
      .filter((skill) => skill.value && skill.value !== "")
      .map((skill) => ({
        label: skill.label || "",
        value: skill.value || "",
        cost: skill.cost || "",
      }));

    const combinedSkills = [...mainSkills, ...userSkills];

    const sortedSkills = combinedSkills.sort((a, b) => {
      if (a.label.includes("Język ojczysty")) return -1;
      if (b.label.includes("Język ojczysty")) return 1;

      return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
    });

    return (
      <>
        <div className="descriptionSkillsB main">
          <div className={`nameSkillsB first`}>
            {polishNamesMap[group] || "Unknown"}
          </div>
          <div className={`valueSkillsB`}>Wartość</div>
          <div className={`costSkillsB`}>Wydane Punkty</div>
        </div>

        {sortedSkills.map((skill, index) => (
          <div
            key={index}
            className={`descriptionSkillsB ${index % 2 === 0 ? "even" : "odd"}`}
          >
            <div className="nameSkillsB">{skill.label}</div>
            <div className="valueSkillsB">{skill.value}</div>
            <div className="costSkillsB">{skill.cost}</div>
          </div>
        ))}
      </>
    );
  };

  const renderEmotion = () => {
    const { name, details } = formData.selectedOptionsEmotions;

    if (!name || !details || !Array.isArray(details)) {
      return;
    }

    return (
      <div className="tableEmotion" style={{ fontSize: "0.8rem" }}>
        <div className="tableEmotion-header">
          <div className="tableEmotion-cell emotion-cell">EMOCJA</div>
          <div className="tableEmotion-cell range-cell">K10</div>
          <div className="tableEmotion-cell description-cell">EFEKT</div>
        </div>

        <div className="tableEmotion-content">
          <div className="emotion-row">
            <div className="emotion">{name}</div>
            <div className="detailsEmotion">
              {details.map((detail, index) => (
                <div className="detailEmotion" key={index}>
                  <span className="range">{detail.range}</span>
                  <span className="description">{detail.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const sectionRenderers = {
    CharacterMetric: renderPersonalMetric,
    ImageCard: renderImageCard,
    Biography: renderBiography,
    SpecificCharacter: renderSpecific,
    Skills: renderStats,
    SkillsB: renderSkillsB,
    ChildSkill: renderEmotion,
  };

  useEffect(() => {
  }, [formData]);

  return (
    <div id="up">
      <div id="cardPreviewMain">
        <div id="cardPreview">
          {includeSections.map((sectionName) => {
            const renderSection = sectionRenderers[sectionName];
            return renderSection ? (
              <div key={sectionName}>{renderSection()}</div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
