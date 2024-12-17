import { useState, useContext, useEffect } from "react";
import { FormContext } from "../../dataContext";
import "../generateHTML/generateHTML.css";
import characterConfig from "../../characterConfig";
import Hint from "../hint/Hint";

function GenerateHTML() {
  const { formData } = useContext(FormContext);
  const [htmlContent, setHtmlContent] = useState("");
  const selectedCharacterType = formData.characterType;

  const config = characterConfig[selectedCharacterType] || {};
  const includeSections = config.includeSections || [];

  const hintCardCode =
    'Skopiuj poniższy kod i wklej go do nowego tematu założonego w tym <a href="https://www.morsmordre.net/f4-kartoteki">dziale</a>. Nazwa tematu powinna zawierać imię oraz nazwisko twojej postaci. Jeśli jeszcze wprowadzasz poprawki do karty pamiętaj, aby dodać do nazwy dopisek [w budowie]. Jeśli już ukończyłeś pracę nad kartą postaci zapoznaj się z tym <a href="https://www.morsmordre.net/t1044-sprawdzanie-kart-kolejka">tematem</a>.';

  const hintCardSumCode =
    'Skopiuj poniższy kod i wklej go do tematu z rozwojem postaci jaki znajdziesz w tym <a href="https://www.morsmordre.net/f44-aktualizacje">dziale</a>.';

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

  const renderStats = () => {
    const stats = Object.keys(formData.selectedOptionsStats || {})
      .map((group) => {
        const statLabel = polishNamesStatsMap[group] || "Unknown";
        const statValue = formData.selectedOptionsStats[group]?.[0]?.value || 0;
        const statBonus = formData.totalBonus?.[group]
          ? `+${formData.totalBonus[group]} (różdżka)`
          : "Brak";
        return `<tr><td>${statLabel}:</td><td>${statValue}</td><td>${statBonus}</td></tr>`;
      })
      .join("");

    return stats;
  };

  const renderSkillsB = () => {
    const skillsGroups = config.includeSkillsB || [];

    const skillsContent = skillsGroups
      .map((group) => {
        const groupData = Array.isArray(formData.selectedOptionsSkillB[group])
          ? formData.selectedOptionsSkillB[group]
          : [];

        const mainSkills = groupData
          .filter((skill) => skill?.value && skill?.value !== "")
          .map((skill) => {
            return {
              label:
                group === "story" && skill.label === "Organizacja"
                  ? skill.value
                  : group === "lang"
                  ? `Język ojczysty: ${skill.label}`
                  : skill.label || "",

              value:
                group === "genetic"
                  ? "-"
                  : group === "story" && skill.label === "Organizacja"
                  ? "-"
                  : skill.value || "",
              cost: skill.cost || 0,
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

        if (combinedSkills.length === 0) return "";

        const sortedSkills = combinedSkills.sort((a, b) => {
          if (a.label.includes("Język ojczysty")) return -1;
          if (b.label.includes("Język ojczysty")) return 1;

          return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
        });

        const skillsRows = sortedSkills
          .map((skill) => {
            return `<tr><td>${skill.label}</td><td>${skill.value}</td><td>${skill.cost}</td></tr>`;
          })
          .join("");

        return `<tr><td id="exp2">${polishNamesMap[group]}</td><td id="exp2">Wartość</td><td id="exp2">Wydane Punkty</td></tr>${skillsRows}`;
      })
      .join("");

    return skillsContent;
  };

  const renderEmotion = () => {
    const { name, details } = formData.selectedOptionsEmotions;

    if (!name || !details || !Array.isArray(details)) {
      return;
    }

    const emotionRows = details
      .map((detail) => {
        return `<tr><td></td><td>${detail.range}</td><td>${detail.description}</td></tr>`;
      })
      .join("");

    return `<style>.verticalEmotion-text {letter-spacing: 5px;text-transform:uppercase;writing-mode: vertical-rl;text-orientation: upright;text-align: center; padding: 10px;}</style>
      <table class="tblz" id="exp"><tr><td>Emocja</td><td></td><td>k10</td><td>Efekt</td></tr><tr><td colspan="4" id="exp2">${name}</td></tr><tr><td rowspan="9"><span style="display:block;text-align:center" class="verticalEmotion-text">${name}</span><td></td><td></td><td></td></tr>
           ${emotionRows}
           </table>
           `;
  };

  const renderSpecific = () => {
    return `
    <h14>Wygląd</h14>${formData.appearance}
    <h14>Ciekawostki</h14>${formData.trivia}
    ${
      selectedCharacterType !== "independentCharacter"
        ? `<h14>Powiązania</h14>${formData.connections || ""}`
        : ""
    }`;
  };

  const shouldRenderField = (fieldId) => {
    return !config.excludeFields.includes(fieldId);
  };

  const renderCredit = () => {
    return `
  [b]Imię i nazwisko postaci:[/b] ${
    formData?.selectedOptions?.metric?.[1]?.value || ""
  } ${formData?.selectedOptions?.metric?.[2]?.value || ""}
  [b]Rejestracja różdżki:[/b] ${formData?.wandRegistration?.value || ""}
  [b]Suma punktów biegłości na start[/b]: ${formData?.remainingPointsSkillB} PB
  [b]Suma punktów majętności na start[/b]: ${
    formData?.selectedOptions?.metric?.[9]?.value === "Nędzny"
      ? "25 PM"
      : formData?.selectedOptions?.metric?.[9]?.value === "Ubogi"
      ? "50 PM"
      : formData?.selectedOptions?.metric?.[9]?.value === "Średniozamożny"
      ? "100 PM"
      : formData?.selectedOptions?.metric?.[9]?.value === "Bogaty"
      ? "200 PM"
      : ""
  } (Jeśli jakiś przedmiot został zakupiony za PM odejmij tę kwotę od przysługującej ci bazowej sumy PM)
  [b]Wydane punkty doświadczenia:[/b] ${
    formData?.creditBill > 1 ? formData?.creditBill + " PD =" : "0 PD"
  }${
      formData?.selectedOptionsCredit?.[0]?.cost
        ? " " + formData?.selectedOptionsCredit?.[0]?.value + " PS:"
        : ""
    }${
      formData?.selectedOptionsCredit?.[0]?.cost
        ? " " + formData?.selectedOptionsCredit?.[0]?.cost + "PD,"
        : ""
    }${
      formData?.selectedOptionsCredit?.[1]?.cost
        ? " " + formData?.selectedOptionsCredit?.[1]?.value + " PB:"
        : ""
    }${
      formData?.selectedOptionsCredit?.[1]?.cost
        ? " " + formData?.selectedOptionsCredit?.[1]?.cost + "PD,"
        : ""
    }${
      formData?.selectedOptionsCredit?.[2]?.cost
        ? " " + formData?.selectedOptionsCredit?.[2]?.name + ":"
        : ""
    }${
      formData?.selectedOptionsCredit?.[2]?.cost
        ? " " + formData?.selectedOptionsCredit?.[2]?.cost + "PD,"
        : ""
    }${
      formData?.selectedOptionsCredit?.[3]?.cost
        ? " " + formData?.selectedOptionsCredit?.[3]?.name + ":"
        : ""
    }${
      formData?.selectedOptionsCredit?.[3]?.cost
        ? " " + formData?.selectedOptionsCredit?.[3]?.cost + "PD,"
        : ""
    }${
      formData?.selectedOptionsCredit?.[4]?.cost
        ? " " + formData?.selectedOptionsCredit?.[4]?.name + ":"
        : ""
    }${
      formData?.selectedOptionsCredit?.[4]?.cost
        ? " " + formData?.selectedOptionsCredit?.[4]?.cost + "PD"
        : ""
    }   
  [b]Zdobyto:[/b] ${
    formData?.selectedOptionsCredit?.[0]?.cost
      ? formData?.selectedOptionsCredit?.[0]?.value + " PS,"
      : ""
  }${
      formData?.selectedOptionsCredit?.[1]?.cost
        ? " " + formData?.selectedOptionsCredit?.[1]?.value + " PB,"
        : ""
    }${
      formData?.selectedOptionsCredit?.[2]?.cost
        ? " " + formData?.selectedOptionsCredit?.[2]?.name + ","
        : ""
    }${
      formData?.selectedOptionsCredit?.[4]?.cost
        ? " " + formData?.selectedOptionsCredit?.[4]?.name + ","
        : ""
    } 
(Dodatkowo wypisz przedmioty zakupione ze sklepiku Mistrza Gry za punkty doświadczenia (PD) oraz za punkty majętności (PM))
  `;
  };

  useEffect(() => {
    const generateHTML = () => {
      const wandHTML = includeSections.includes("Wand")
        ? `<a class="rozdzka"><span>${
            formData.selectedOptions.wand[1]?.value || ""
          } ${formData.selectedOptions.wand[2]?.value || ""} ${
            formData.selectedWood?.name || ""
          } ${formData.selectedHeart?.name || ""}</span></a>`
        : "";

      const statsHTML = includeSections.includes("Skills")
        ? `<table class="tblz" id="exp"><tr><td colspan="3">Statystyki</td></tr><tr><td id="exp2">Statystyka</td><td id="exp2">Wartość</td><td id="exp2">Bonus</td></tr>${renderStats()}<tr><td id="exp2" colspan="3">Reszta: ${
            formData.remainingPointsSkill || ""
          }</td></tr></table>`
        : "";

      const skillsBHTML = includeSections.includes("SkillsB")
        ? `<table class="tblz" id="exp"><tr><td colspan="3">Biegłości</td></tr>${renderSkillsB()}<tr><td id="exp2" colspan="3">Reszta: ${
            formData.remainingPointsSkillB || ""
          }</td></tr></table>`
        : "";

      const metricHTML = `
  <div id="kp"><div class="m">
    ${
      shouldRenderField("3")
        ? `[b]Data urodzenia[/b]: ${
            formData.selectedOptions?.metric[3]?.value || ""
          }`
        : ""
    }
    ${
      shouldRenderField("6")
        ? `[b]Nazwisko matki[/b]: ${
            formData.selectedOptions?.metric[6]?.value || ""
          }`
        : ""
    }
    ${
      shouldRenderField("7")
        ? `[b]Miejsce zamieszkania[/b]: ${
            formData.selectedOptions?.metric[7]?.value || ""
          }`
        : ""
    }
    ${
      shouldRenderField("8")
        ? `[b]Czystość krwi[/b]: ${
            formData.selectedOptions?.metric[8]?.value || ""
          }`
        : ""
    }
    ${
      shouldRenderField("9")
        ? `[b]Status majątkowy[/b]: ${
            formData.selectedOptions?.metric[9]?.value || ""
          }`
        : ""
    }
    ${
      shouldRenderField("10")
        ? `[b]Zawód[/b]: ${formData.selectedOptions?.metric[10]?.value || ""}`
        : ""
    }
    ${
      shouldRenderField("11")
        ? `[b]Wzrost[/b]: ${formData.selectedOptions?.metric[11]?.value || ""}`
        : ""
    }
    ${
      shouldRenderField("12")
        ? `[b]Waga[/b]: ${formData.selectedOptions?.metric[12]?.value || ""}`
        : ""
    }
    ${
      shouldRenderField("13")
        ? `[b]Kolor włosów[/b]: ${
            formData.selectedOptions?.metric[13]?.value || ""
          }`
        : ""
    }
    ${
      shouldRenderField("14")
        ? `[b]Kolor oczu[/b]: ${
            formData.selectedOptions?.metric[14]?.value || ""
          }`
        : ""
    }
    ${
      shouldRenderField("15")
        ? `[b]Znaki szczególne[/b]: ${
            formData.selectedOptions?.metric[15]?.value || ""
          }`
        : ""
    }
  </div>`;

      const additionalMetricsHTML = includeSections.includes(
        "SpecificCharacter"
      )
        ? ""
        : `
  <div id="pozostale">
    ${wandHTML}
    ${
      shouldRenderField("20")
        ? `<a class="dom"><span>${
            formData.selectedOptions?.metric[20]?.value || ""
          }</span></a>`
        : ""
    }
    ${
      shouldRenderField("22")
        ? `<a class="bogin"><span>${
            formData.selectedOptions?.metric[22]?.value || ""
          }</span></a>`
        : ""
    }
    ${
      shouldRenderField("23")
        ? `<a class="amor"><span>${
            formData.selectedOptions?.metric[23]?.value || ""
          }</span></a>`
        : ""
    }
    ${
      shouldRenderField("24")
        ? `<a class="ein"><span>${
            formData.selectedOptions?.metric[24]?.value || ""
          }</span></a>`
        : ""
    }
    ${
      shouldRenderField("25")
        ? `<a class="pasja"><span>${
            formData.selectedOptions?.metric[25]?.value || ""
          }</span></a>`
        : ""
    }
    ${
      shouldRenderField("26")
        ? `<a class="druzyna"><span>${
            formData.selectedOptions?.metric[26]?.value || ""
          }</span></a>`
        : ""
    }
    ${
      shouldRenderField("27")
        ? `<a class="sport"><span>${
            formData.selectedOptions?.metric[27]?.value || ""
          }</span></a>`
        : ""
    }
    ${
      shouldRenderField("28")
        ? `<a class="muza"><span>${
            formData.selectedOptions?.metric[28]?.value || ""
          }</span></a>`
        : ""
    }
    ${
      shouldRenderField("29")
        ? `<a class="wizerunek"><span>${
            formData.selectedOptions?.metric[29]?.value || ""
          }</span></a>`
        : ""
    }
<br></div>`;

      const html = `<div id="up"><div id="up2">
<h6>${formData.selectedOptions?.metric[1]?.value || ""} ${
        formData.selectedOptions?.metric[2]?.value || ""
      }</h6>
${metricHTML}
${additionalMetricsHTML}
<img src="${formData.selectedOptions.metric[35]?.value || ""}" class="obr">
${includeSections.includes("SpecificCharacter") ? `<h14>Biografia</h14>` : ""}${
        formData?.biography || ""
      }
${includeSections.includes("SpecificCharacter") ? renderSpecific() : ""}
${statsHTML}
${skillsBHTML}
${
  includeSections.includes("ChildSkill") ? renderEmotion() : ""
}</div></div></div>`
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n");

      setHtmlContent(html);
    };

    generateHTML();
  }, [formData]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlContent).then(() => {});
  };

  return (
    <div className="generateMain">
      <div className={`con-tooltip single`}>
        <div className="h2">Skopiuj gotowy kod karty postaci</div>
        <Hint description={hintCardCode} />
      </div>
      {htmlContent && <textarea value={htmlContent} readOnly></textarea>}
      <button onClick={copyToClipboard}>Kopiuj</button>
      <div className={`con-tooltip single`}>
        <div className="h2">Skopiuj kod do rozwoju postaci</div>
        <Hint description={hintCardSumCode} />
      </div>
      {renderCredit && <textarea value={renderCredit()} readOnly></textarea>}
      <button onClick={copyToClipboard}>Kopiuj</button>
    </div>
  );
}

export default GenerateHTML;
