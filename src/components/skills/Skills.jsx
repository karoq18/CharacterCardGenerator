import { useContext, useState, useEffect } from "react";
import { FormContext } from "../../dataContext";
import Hint from "../hint/Hint";
import "../../app.css";
import characterConfig from "../../characterConfig";

function Skills() {
  const { formData, updateFormData } = useContext(FormContext);
  const [activeHintIndex, setActiveHintIndex] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [remainingPointsSkills, setRemainingPointsSkills] = useState(0);
  const selectedCharacterType = formData.characterType;
  const config = characterConfig[selectedCharacterType] || {};
  const excludeFields = config.excludeFields || [];
  const [additionalPointsAllocated, setAdditionalPointsAllocated] = useState(0);
  const basePoints = 10;


  const [skills, setSkills] = useState([
    {
      id: "dada",
      value: "",
      placeholder: "Obrona przed czarną magią: ",
      hint: "To przede wszystkim magia ochronna i biała magia wspomagająca. Nie krzywdzi, wspiera, jest zdolna kształtować magiczne osłony każdego rodzaju.",
    },
    {
      id: "charms",
      value: "",
      placeholder: "Uroki: ",
      hint: "Obejmują przede wszystkim zaklęcia ofensywne, bitewne, skupiają się na żywiołach, są siłą zniszczenia. To głównie zaklęcia pojedynkowe, na wysokim poziomie posiadają je ich doświadczeni mistrzowie.",
    },
    {
      id: "blackMagic",
      value: "",
      placeholder: "Czarna magia: ",
      hint: "Najplugawsza z dziedzin magicznych, potężna siła śmierci, która pozwala czarodziejowi na dokonywanie czynów niewyobrażalnie potwornych za cenę jego duszy. Pielęgnowana nade wszystko przez najstarsze czystokrwiste rodziny, w oczach większości czarodziejskiego społeczeństwa uchodzi za przerażającą. Z czarnej magii można korzystać wyłącznie wówczas, gdy postać posiada przynajmniej jeden punkt umiejętności w danej statystyce.",
    },
    {
      id: "healing",
      value: "",
      placeholder: "Uzdrawianie: ",
      hint: "Magia lecznicza, skomplikowana magia służąca do opieki nad organizmem czarodzieja, oczyszczenia, regeneracji, uzdrowienia. Trudna do opanowania na wyższym poziomie, wykorzystywana przede wszystkim przez magomedyków.",
    },
    {
      id: "transmutation",
      value: "",
      placeholder: "Transmutacja: ",
      hint: "To siła tworzenia i kształtowania, zmieniania właściwości, jest domeną twórców i artystów, bowiem pozwala na największą kreatywność i pomysłowość. Powszechnie uchodzi za najtrudniejszą z dziedzin magicznych.",
    },
    {
      id: "alchemy",
      value: "",
      placeholder: "Alchemia: ",
      hint: "Obejmuje zarówno wiedzę, jak i magiczną moc niezbędną do wykrzesania magii z komponentów alchemicznych. Pozwala na warzenie różnorodnych eliksirów, jak i wytwarzanie cennych talizmanów.",
    },
    {
      id: "fitness",
      value: "",
      placeholder: "Sprawność: ",
      hint: "Odpowiada za ogólną siłę mięśni, zdolność udźwigu, jej zdrowie i kondycję. Na wyższym poziomie określa atletów i siłaczy.",
    },
    {
      id: "agility",
      value: "",
      placeholder: "Zwinność: ",
      hint: "Odpowiada za ogólny refleks, prędkość, szybkość reakcji, zręczność i giętkość postaci. Na wyższym poziomie jest cechą skoczków i tancerzy.",
    },
  ]);

  const hintSkill =
    'Statystyki odpowiadają za <a href="https://www.morsmordre.net/t4771-zaklecia#102145">rzucanie zaklęć</a>, <a href="https://www.morsmordre.net/t4935-eliksiry-i-ingrediencje#107496">warzenie eliksirów</a> i <a href="https://www.morsmordre.net/t8708-talizmany">tworzenie talizmanów</a>, <a href="https://www.morsmordre.net/t4810-walka-wrecz#103100">walkę wręcz</a>, nadto wykorzystuje się je w mechanikach takich jak <a href="https://www.morsmordre.net/t8064-zabezpieczenia-pulapki">nakładanie pułapek</a>, <a href="https://www.morsmordre.net/t6913-swistokliki#180822">tworzenie świstoklików</a>, <a href="https://www.morsmordre.net/t5690-klatwy">nakładanie i przełamywanie klątw</a>, <a href="https://www.morsmordre.net/t9855-kadzidla">przygotowywanie kadzideł</a>, <a href="https://www.morsmordre.net/t10884-zyly-magiczne#331697">wykrywanie i otwieranie żył magicznych</a>. Przejrzyj dokładnie mechaniki, które Cię interesują - każda z nich ma inne wymogi odnośnie posiadanych statystyk i może też mieć dodatkowe wymagania posiadanych biegłości.';

  const handleInputMouseEnter = (index) => {
    setActiveHintIndex(index);
  };

  const handleInputChange = (e, id) => {
    let value = e.target.value;

    if (value < 0) {
      value = 0;
    }

    updateFormData("selectedOptionsStats", {
      ...formData.selectedOptionsStats,
      [id]: [
        {
          label: id,
          value: value,
          bonus: formData.selectedOptionsStats[id]?.[0]?.bonus || 0,
        },
      ],
    });
  };

  useEffect(() => {
    const sum = skills.reduce((acc, skill) => {
      const value = parseInt(
        formData.selectedOptionsStats?.[skill.id]?.[0]?.value || 0,
        10
      );
      return acc + value;
    }, 0);

    if (totalCost !== sum) {
      setTotalCost(sum);
      if (formData.totalCostStat !== sum) {
        updateFormData("totalCostStat", sum);
      }
    }
  }, [formData.selectedOptionsStats, skills, totalCost, updateFormData]);

  const isValidMinFitPoints = () => {
    const agilityPoints = parseInt(
      formData.selectedOptionsStats?.["agility"]?.[0]?.value || 0,
      10
    );
    const fitnessPoints = parseInt(
      formData.selectedOptionsStats?.["fitness"]?.[0]?.value || 0,
      10
    );

    const minFitPoints = agilityPoints + fitnessPoints;

    return (minFitPoints >= 10);
  };

  useEffect(() => {
    const agilityPoints = parseInt(
      formData.selectedOptionsStats?.["agility"]?.[0]?.value || 0,
      10
    );
    const fitnessPoints = parseInt(
      formData.selectedOptionsStats?.["fitness"]?.[0]?.value || 0,
      10
    );
  
    const totalForAgilityAndFitness = agilityPoints + fitnessPoints;
  
    if (formData.additionalPoints === 0) {
      setAdditionalPointsAllocated(0);
      return;
    }
  
    const pointsAboveBase = Math.max(0, totalForAgilityAndFitness - basePoints);
    const missingPoints = Math.max(0, formData.additionalPoints - pointsAboveBase);
  
    setAdditionalPointsAllocated(missingPoints);
  }, [formData]);
  

  useEffect(() => {
    const availablePoints =
      pointMax - (formData?.addPoints || 0) + (formData?.additionalPoints || 0);
    const remaining = availablePoints - totalCost;
    if (remaining !== remainingPointsSkills) {
      setRemainingPointsSkills(remaining);
      updateFormData("remainingPointsSkill", remaining);
    }
  }, [
    totalCost,
    formData.addPoints,
    formData.additionalPoints,
    updateFormData,
  ]);

  const schoolYear =
    parseInt(formData.selectedOptions?.metric?.[19]?.value, 10) || 0;
  const pointMax =
    selectedCharacterType === "student"
      ? schoolYear * 4
      : config.pointsSkillsLimit + formData?.selectedOptionsCredit[0]?.value || 0;

  const filteredSkills = skills.filter(
    (field) => !excludeFields.includes(field.id)
  );

  return (
    <div className="metricConteneir">
      <div className={`con-tooltip single`}>
        <div className="h2">Statystyki</div>
        <Hint description={hintSkill} />
      </div>
      {filteredSkills.map((skill, index) => (
        <div key={skill.id} className="input-group">
          <div className={`con-tooltip`}>
            <label htmlFor={skill.id}>{skill.placeholder}</label>
            <Hint description={skill.hint} />
          </div>

          <input
            type="number"
            value={formData.selectedOptionsStats?.[skill.id]?.[0]?.value || ""}
            placeholder={skill.placeholder}
            id={skill.id}
            name={skill.id}
            onChange={(e) => handleInputChange(e, skill.id)}
            onMouseEnter={() => handleInputMouseEnter(index)}
          />

          {formData.totalBonus &&
            Object.entries(formData.totalBonus).map(([stat, value]) =>
              stat === skill.id ? (
                <div key={stat} className="miniFrameText">
                  Bonus: {value} (różdżka)
                </div>
              ) : null
            )}
        </div>
      ))}

      <div className="miniFrame">
        <div className="h9">
          Dodatkowe punkty do wydania pomiędzy zwinność a sprawność:{" "}
          {formData.additionalPoints}
        </div>
        {additionalPointsAllocated > 0 && (
          <div className="error-message h9">
            Dodatkowe punkty muszą być przydzielone wyłącznie do zwinności lub
            sprawności! Wydałeś za mało punktów o: {additionalPointsAllocated}
          </div>
        )}

        {!isValidMinFitPoints() ? (
  <div className="h9">
  Suma wydanych punktów statystyk: {totalCost} | Reszta:{" "}
  {remainingPointsSkills}

          <div className="error-message h9">
            Musisz rozdzielić co najmniej 10 bazowych punktów pomiędzy zwinność, a sprawność!
          </div></div>
        ) : totalCost >
          pointMax -
            (formData?.addPoints || 0) +
            (formData?.additionalPoints || 0) ? (
          <div>
            <div className={`error-message h7`}>
              Wydałeś za dużo o{" "}
              {totalCost -
                (pointMax - (formData?.addPoints || 0)) -
                (formData?.additionalPoints || 0)}{" "}
              punktów statystyk
            </div>
            <div className="h7">
              Suma wydanych punktów statystyk:{" "}
              <span className="error-message">{totalCost}</span> | Reszta:{" "}
              <span className="error-message">{remainingPointsSkills}</span>
            </div>
          </div>
        ) : (
          <div className="h7">
            Suma wydanych punktów statystyk: {totalCost} | Reszta:{" "}
            {remainingPointsSkills}
          </div>
        )}
      </div>
    </div>
  );
}

export default Skills;
