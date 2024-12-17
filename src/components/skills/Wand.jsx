import  { useState, useContext, useEffect } from "react";
import "./skills.css";
import { FormContext } from "../../dataContext";
import Hint from "../hint/Hint";

const wood = {
  OPCM: {
    afromosia: { dada: 2 },
    amboina: { dada: 2 },
    bangkirai: { dada: 2 },
    cyprys: { dada: 2 },
    "czarny bez": { dada: 2 },
    "dziki bez": { dada: 2 },
    grenadill: { dada: 2 },
    hikora: { dada: 2 },
    jarzębina: { dada: 2 },
    jesion: { dada: 2 },
    judaszowiec: { dada: 2 },
    kempas: { dada: 2 },
    klon: { dada: 2 },
    palisander: { dada: 2 },
    paulownia: { dada: 2 },
    wianowłostka: { dada: 2 },
    wiśnia: { dada: 2 },
  },

  Uroki: {
    brzózka: { charms: 2 },
    brzoza: { charms: 2 },
    daglezja: { charms: 2 },
    "dąb czerwony": { charms: 2 },
    dereń: { charms: 2 },
    kasztanowiec: { charms: 2 },
    jabłoń: { charms: 2 },
    "lipa srebrzysta": { charms: 2 },
    migdałowiec: { charms: 2 },
    modrzew: { charms: 2 },
    osika: { charms: 2 },
    mopane: { charms: 2 },
    okan: { charms: 2 },
    okoume: { charms: 2 },
    ostrokrzew: { charms: 2 },
    "pau ferro": { charms: 2 },
    świerk: { charms: 2 },
  },

  CM: {
    argan: { blackMagic: 2 },
    cis: { blackMagic: 2 },
    cynamonowiec: { blackMagic: 2 },
    "drzewo różane": { blackMagic: 2 },
    "drewno wężowe": { blackMagic: 2 },
    "drzewo życia": { blackMagic: 2 },
    głóg: { blackMagic: 2 },
    hurma: { blackMagic: 2 },
    jakaranda: { blackMagic: 2 },
    morela: { blackMagic: 2 },
    rzewnia: { blackMagic: 2 },
    sykomora: { blackMagic: 2 },
    śliwa: { blackMagic: 2 },
    tamaryszek: { blackMagic: 2 },
    tarnina: { blackMagic: 2 },
    wawrzyn: { blackMagic: 2 },
    zitan: { blackMagic: 2 },
  },

  Uzdrawianie: {
    abura: { healing: 2 },
    akacja: { healing: 2 },
    "drzewo sandałowe": { healing: 2 },
    eukaliptus: { healing: 2 },
    limba: { healing: 2 },
    magnolia: { healing: 2 },
    mango: { healing: 2 },
    "miłorząb japoński": { healing: 2 },
    olcha: { healing: 2 },
    ohia: { healing: 2 },
    platan: { healing: 2 },
    ramin: { healing: 2 },
    sosna: { healing: 2 },
    "święte drzewo": { healing: 2 },
    tabebuja: { healing: 2 },
    wierzba: { healing: 2 },
  },

  Transmutacja: {
    araukaria: { transmutation: 2 },
    berchemia: { transmutation: 2 },
    cedr: { transmutation: 2 },
    "czarny orzech": { transmutation: 2 },
    dąb: { transmutation: 2 },
    "drewno pistacjowe": { transmutation: 2 },
    "drzewo oliwne": { transmutation: 2 },
    "drzewo poziomkowe": { transmutation: 2 },
    "drewno z morza": { transmutation: 2 },
    figowiec: { transmutation: 2 },
    heban: { transmutation: 2 },
    jodła: { transmutation: 2 },
    lilak: { transmutation: 2 },
    łoskotnica: { transmutation: 2 },
    "orzech włoski": { transmutation: 2 },
    wiąz: { transmutation: 2 },
    winorośl: { transmutation: 2 },
  },

  Alchemia: {
    agar: { alchemy: 2 },
    buk: { alchemy: 2 },
    "czeremcha zwyczajna": { alchemy: 2 },
    "dąb szypułkowy": { alchemy: 2 },
    "drewno księżycowe": { alchemy: 2 },
    fernambuk: { alchemy: 2 },
    grab: { alchemy: 2 },
    grusza: { alchemy: 2 },
    lapacho: { alchemy: 2 },
    leszczyna: { alchemy: 2 },
    pekan: { alchemy: 2 },
    robinia: { alchemy: 2 },
    sekwoja: { alchemy: 2 },
    surmia: { alchemy: 2 },
    szakłak: { alchemy: 2 },
    taman: { alchemy: 2 },
    topola: { alchemy: 2 },
  },

  Pozostałe: {},
};

const heart = {
  OPCM: {
    "igła szpiczaka": { dada: 3 },
    "łuska smoka": { dada: 3 },
    "sierść niuchacza": { dada: 3 },
    "śluz korniczaka": { dada: 3 },
    "włos z głowy nimfy": { dada: 3 },
    "włókno z serca smoka": { dada: 3 },
    "łuska trytona": { dada: 2, charms: 1 },
    "oko lunaballi": { dada: 2, charms: 1 },
    "włókienko z pachwiny nietoperza": { dada: 2, charms: 1 },
    "pióro memortka": { dada: 2, charms: 1 },
    "kolec jadowy chimery": { dada: 2, transmutation: 1 },
    "pancerz langustnika ladaco": { dada: 2, transmutation: 1 },
    "róg buchorożca": { dada: 2, transmutation: 1 },
    "włos centaura": { dada: 2, transmutation: 1 },
    "pióro pegaza": { dada: 2, healing: 1 },
    "róg garboroga": { dada: 2, healing: 1 },
    "włos curupiry": { dada: 2, healing: 1 },
    "pióro nawałnika burzowego": { dada: 2, alchemy: 1 },
    "róg jednorożca": { dada: 2, alchemy: 1 },
    "sierść szczuroszczeta": { dada: 2, alchemy: 1 },
  },

  Uroki: {
    "jad pikującego licha": { charms: 3 },
    "jad śmierciotuli": { charms: 3 },
    "krew reema": { charms: 3 },
    "pazur nundu": { charms: 3 },
    "sierść psidwaka": { charms: 3 },
    "szpon hipogryfa": { charms: 3 },
    "łuska popiełka": { charms: 2, dada: 1 },
    "pióro bystroducha": { charms: 2, dada: 1 },
    "pióro gryfa": { charms: 2, dada: 1 },
    "włos trzminorka": { charms: 2, dada: 1 },
    "sierść ponuraka": { charms: 2, transmutation: 1 },
    "włos wozaka": { charms: 2, transmutation: 1 },
    "włos z głowy dżina": { charms: 2, transmutation: 1 },
    "pióro znikacza": { charms: 2, healing: 1 },
    "włos yeti": { charms: 2, healing: 1 },
    "włókno z mandragory": { charms: 2, healing: 1 },
    "błona druzgotka": { charms: 2, alchemy: 1 },
    "czernidło marmite": { charms: 2, alchemy: 1 },
    "łuska wsiąkiewki": { charms: 2, alchemy: 1 },
    "skrzydło żądlibąka": { charms: 2, alchemy: 1 },
  },

  CM: {
    "jad bazyliszka": { blackMagic: 1, charms: 2 },
    "łuska chimery": { blackMagic: 1, charms: 2 },
    "pióro świergotnika": { blackMagic: 1, charms: 2 },
    "sierść kelpii": { blackMagic: 1, charms: 2 },
    "łuska kappy": { blackMagic: 1, dada: 2 },
    "łuska skorpeny": { blackMagic: 1, dada: 2 },
    "paliczek dementora": { blackMagic: 1, dada: 2 },
    "strzęp całunu śmierciotuli": { blackMagic: 1, dada: 2 },
    "włos szyszymory": { blackMagic: 1, dada: 2 },
    "łuska jeżanki": { blackMagic: 1, transmutation: 2 },
    "pióro lelka wróżebnika": { blackMagic: 1, transmutation: 2 },
    "pazur garboroga": { blackMagic: 1, transmutation: 2 },
    "włos pogrebina": { blackMagic: 1, transmutation: 2 },
    "kieł wampira": { blackMagic: 1, healing: 2 },
    "orb bogina": { blackMagic: 1, healing: 2 },
    "róg nundu": { blackMagic: 1, healing: 2 },
    "jad ciamarnicy": { blackMagic: 1, alchemy: 2 },
    "sierść bagnowyja": { blackMagic: 1, alchemy: 2 },
    "włos trolla": { blackMagic: 1, alchemy: 2 },
  },

  Uzdrawianie: {
    "łuska remory": { healing: 3 },
    "popiół feniksa": { healing: 3 },
    "róg kozłaga": { healing: 3 },
    "wibrys kuguchara": { healing: 3 },
    "włos z ogona / grzywy jednorożca": { healing: 3 },
    "żądło żądlibąka": { healing: 3 },
    "blaszka chrobotka": { healing: 2, charms: 1 },
    "szpon gromoptaka": { healing: 2, charms: 1 },
    "włos akromantuli": { healing: 2, charms: 1 },
    "jad akromantuli": { healing: 2, dada: 1 },
    "pióro hipogryfa": { healing: 2, dada: 1 },
    "sierść pufka": { healing: 2, dada: 1 },
    "błona ze skrzydła testrala": { healing: 2, transmutation: 1 },
    "łuska salamandry": { healing: 2, transmutation: 1 },
    "orb zjawy": { healing: 2, transmutation: 1 },
    "włos z ogona sfinksa": { healing: 2, transmutation: 1 },
    "opiłki szponu bystroducha": { healing: 2, alchemy: 1 },
    "kieł sasabonsama": { healing: 2, alchemy: 1 },
    "nić przędna akromantuli": { healing: 2, alchemy: 1 },
    "pióro gromoptaka": { healing: 2, alchemy: 1 },
  },

  Transmutacja: {
    "łuska hipokampusa": { transmutation: 3 },
    "łuska widłowęża": { transmutation: 3 },
    "opiłka kopyta centaura": { transmutation: 3 },
    "pazur wilkołaka": { transmutation: 3 },
    "sierść mantykory": { transmutation: 3 },
    "sierść przyczajacza": { transmutation: 3 },
    "pióro abraksana": { transmutation: 2, charms: 1 },
    "róg reema": { transmutation: 2, charms: 1 },
    "sierść kuguchara": { transmutation: 2, charms: 1 },
    "włos z głowy wili": { transmutation: 2, charms: 1 },
    "jad widłowęża": { transmutation: 2, dada: 1 },
    "kieł chropianka": { transmutation: 2, dada: 1 },
    "pióro dirikraka": { transmutation: 2, dada: 1 },
    "pył ze skrzydeł elfa": { transmutation: 2, dada: 1 },
    "włos goblina": { transmutation: 2, healing: 1 },
    "włos z ogona demimoza": { transmutation: 2, healing: 1 },
    "wylinka akromantulii": { transmutation: 2, healing: 1 },
    "pazur smoka": { transmutation: 2, alchemy: 1 },
    "róg tebo": { transmutation: 2, alchemy: 1 },
    "włókno z serca bystroducha": { transmutation: 2, alchemy: 1 },
  },

  Alchemia: {
    "jad toksyczka": { alchemy: 3 },
    "kolec jadowy mantykory": { alchemy: 3 },
    "włos abraksana": { alchemy: 3 },
    "róg dwurożca": { alchemy: 3 },
    "skrzydło trzminorka": { alchemy: 3 },
    "włos z głowy wampira": { alchemy: 3 },
    "pazur sfinksa": { alchemy: 2, charms: 1 },
    "pióro hoo-hoo": { alchemy: 2, charms: 1 },
    "włos z głowy ghula": { alchemy: 2, charms: 1 },
    "włos z głowy sfinksa": { alchemy: 2, charms: 1 },
    "orb zwodnika": { alchemy: 2, dada: 1 },
    "pióro feniksa": { alchemy: 2, dada: 1 },
    "popiół hoo-hoo": { alchemy: 2, dada: 1 },
    "róg trolla rzecznego": { alchemy: 2, dada: 1 },
    "włos z głowy syreny": { alchemy: 2, dada: 1 },
    "język kozłaga": { alchemy: 2, transmutation: 1 },
    "kieł wozaka": { alchemy: 2, transmutation: 1 },
    "pazur pufka": { alchemy: 2, transmutation: 1 },
    "włos kudłonia": { alchemy: 2, transmutation: 1 },
    "orb caipory": { alchemy: 2, healing: 1 },
    "język pufka": { alchemy: 2, healing: 1 },
    "pióro żmijoptaka": { alchemy: 2, healing: 1 },
    "sierść wozaka": { alchemy: 2, healing: 1 },
  },

  Pozostałe: {
    "włos z głowy olbrzyma": { fitness: 3 },
  },
};

function Wand() {
  const { formData, updateFormData } = useContext(FormContext);
  const [bonus, setBonus] = useState({});
  const [activeWoodSection, setActiveWoodSection] = useState("category");
  const [activeHeartSection, setActiveHeartSection] = useState("category");

  const woodTypes = Object.keys(wood);
  const heartTypes = Object.keys(heart);
  const hintWand =
    'Więcej o różdżkach przeczytasz <a href="https://www.morsmordre.net/t166-rozdzki#360">tutaj</a>.';
  const hintWandReg = 
  'Więcej o rejestracji różdżki przeczytasz <a href="https://www.morsmordre.net/t8062-rejestracja-rozdzek?highlight=rejestracja+r%C3%B3%C5%BCd%C5%BCek">tutaj</a>.'

  const fieldWand = [
    {
      label: "wandLength",
      id: "1",
      placeholder: "Długość różdżki: ",
      type: "select",
      options: [
        "7 cali",
        "8 cali",
        "9 cali",
        "10 cali",
        "11 cali",
        "12 cali",
        "13 cali",
        "14 cali",
        "15 cali",
        "16 cali",
        "17 cali",
        "18 cali",
      ],
      hint: "Wielu wytwórców dostosowuje długość różdżki do wysokości i postury czarodzieja, jednak należy pamiętać także o wewnętrznej wielkości czarodzieja, czyli jego predyspozycji i potencjału. Różdżki z reguły mają od 9 do 14 cali, chociaż najkrótsza sprzedana przez Olivandera wynosi 7 cali, a najdłuższa ponad 18. Właściciel tej ostatniej zażądał większej z uwagi na swoją posturę, a krótka różdżka odpowiada nie tyle zewnętrznym, co wewnętrznym atrybutom czarodzieja - krótkie pasują najczęściej do czarodziejów, charakterom których czegoś brakuje. Wielokrotnie drobni czarodzieje są wybierani przez długie różdżki.",
    },
    {
      label: "wandFlexibility",
      id: "2",
      placeholder: "Elastyczność różdżki: ",
      type: "select",
      options: [
        "sztywna",
        "dość sztywna",
        "dość giętka",
        "giętka",
        "bardzo giętka",
      ],
      hint: "Różdżka może być elastyczna bądź sztywna. Stopień elastyczności oznacza stopień przystosowania się i gotowość do zmian właściciela. Najlepiej jednak, analizując różdżkę wziąć pod uwagę nie tylko jej elastyczność, ale wszystkie czynniki: rdzeń, rodzaj drewna, długość oraz także doświadczenia życiowe i styl magii czarodzieja, który tę różdżkę posiada.",
    },
  ];

  const bonusNames = {
    dada: "OPCM",
    charms: "Uroki",
    blackMagic: "CM",
    healing: "Uzdrawianie",
    transmutation: "Transmutacja",
    alchemy: "Alchemia",
  };

  const handleCategoryChangeBW = (category) => {
    updateFormData("selectedCategoryBW", category);
    updateFormData("selectedWood", {});
    setActiveWoodSection("details");
  };

  const handleCategoryChangeBH = (category) => {
    updateFormData("selectedCategoryBH", category);
    updateFormData("selectedHeart", {});
    setActiveHeartSection("details");
  };

  const handleWoodChange = (woodType) => {
    const woodBonus = wood[formData.selectedCategoryBW]?.[woodType] || {};
    updateFormData("selectedWood", { name: "", bonus: {} });

    updateFormData("selectedWood", {
      name: woodType,
      bonus: woodBonus,
    });
  };
  console.log(formData);
  const handleHeartChange = (heartType) => {
    const heartBonus = heart[formData.selectedCategoryBH]?.[heartType] || {};
    updateFormData("selectedHeart", { name: "", bonus: {} });

    updateFormData("selectedHeart", {
      name: heartType,
      bonus: heartBonus,
    });
  };

  const calculateBonus = () => {
    const woodBonus = formData.selectedWood?.bonus || {};
    const heartBonus = formData.selectedHeart?.bonus || {};
    const totalBonus = { ...woodBonus };

    Object.keys(heartBonus).forEach((key) => {
      totalBonus[key] = (totalBonus[key] || 0) + heartBonus[key];
    });

    return totalBonus;
  };

  const updateStatsWithBonus = (calculatedBonus) => {
    const updatedStats = { ...formData.selectedOptionsStats };

    Object.keys(calculatedBonus).forEach((skill) => {
      if (updatedStats[skill]) {
        updatedStats[skill][0] = {
          ...updatedStats[skill][0],
          bonus: calculatedBonus[skill],
        };
      }
    });

    updateFormData("selectedOptionsStats", updatedStats);
  };

  useEffect(() => {
    const calculatedBonus = calculateBonus();
    if (formData.calculatedBonus !== calculatedBonus) {
      setBonus(calculatedBonus);
      updateFormData("totalBonus", calculatedBonus);
      updateStatsWithBonus(calculatedBonus);
    }
  }, [formData.selectedWood, formData.selectedHeart]);

  const handleSelectChange = (event, index) => {
    const value = event.target.value;
    const id = event.target.id;
    const name  = event.target.name;

    updateFormData("selectedOptions", {
      ...formData.selectedOptions,
      wand: {
        ...formData.selectedOptions.wand,
        [id]: {
          ...formData.selectedOptions.wand[id],
          value: value,
        },
      },
    });
    
    if (name === 'wandRegistration') {
      updateFormData('wandRegistration', { value });
    }
  };

  useEffect(() => {
    console.log("Aktualna wartość formData:", formData);
  }, [formData]);

  return (
    <div id="wand">
      <div className={`con-tooltip single`}>
        <div className="h2">Wybór różdżki</div>
        <Hint description={hintWand} />
      </div>
      <div className={`input-group wandReg`}>
      <span className="con-tooltip">
        <label>Rejestracja różdżki:</label>
        <Hint description={hintWandReg} />
      </span>
        <select
          value={formData.wandRegistration?.value || ""}
          name="wandRegistration"
          onChange={handleSelectChange}
        >
          <option value="">Wybierz</option>
          <option value="Tak">Tak</option>
          <option value="Nie">Nie</option>
        </select>
      </div>
      <div className={`miniFrame wandBonus`}>
        <div className="h5">
          {formData.selectedOptions?.wand?.[1].value}{" "}
          {formData.selectedOptions?.wand?.[2].value}{" "}
          {formData.selectedWood?.name} {formData.selectedHeart?.name}
        </div>
        {Object.entries(bonus).map(([key, value]) => (
          <div key={key} className="h8">
            {bonusNames[key] || key}: {value}
          </div>
        ))}
      </div>

      {fieldWand.map((field, index) => (
        <div key={field.id} className="wandButtonGroup">
          <div className={`input-group wand`}>
            <div className={`con-tooltip`}>
              <div className="h5">{field.placeholder}</div>
              <Hint description={field.hint} />
            </div>
            <select
              id={field.id}
              name={field.label}
              value={formData.selectedOptions?.wand?.[field.id]?.value || ""}
              onChange={(e) => handleSelectChange(e, index, field.placeholder)}
            >
              <option value="">Wybierz</option>
              {field.options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      {activeWoodSection === "category" && (
        <div className="wandButtonGroup">
          <div className="con-tooltip">
            <div className="h5">Drewno z bonusem do:</div>
            <Hint
              description={
                "Wybierz do jakiej statystyki chcesz otrzymać bonus z drewna różdżki."
              }
            />
          </div>
          {woodTypes.map((category) => (
            <div
              className="wandCategory"
              key={category}
              onClick={() => handleCategoryChangeBW(category)}
              style={{
                fontWeight:
                  formData.selectedCategoryBW === category ? "bold" : "normal",
              }}
            >
              {category}
            </div>
          ))}
        </div>
      )}
      {activeWoodSection === "details" && formData.selectedCategoryBW && (
        <div className="wandButtonGroup">
          <div className="con-tooltip">
            <div className="h5">Drewno:</div>
            <Hint description={"Wybierz drewno różdżki."} />
          </div>
          <div className="h6">{formData.selectedCategoryBW}</div>
          <button
            className="wandBack"
            onClick={() => setActiveWoodSection("category")}
          >
            ◀ Powrót
          </button>
          <div className="wandTypesContainer">
            {Object.keys(wood[formData.selectedCategoryBW]).map(
              (woodType, index) => (
                <div
                  className={`wandTypes special`}
                  key={`${woodType}-${index}`}
                  onClick={() => handleWoodChange(woodType)}
                  style={{
                    fontWeight:
                      formData.selectedWood?.name === woodType
                        ? "bold"
                        : "normal",
                  }}
                >
                  {woodType}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {activeHeartSection === "category" && (
        <div className="wandButtonGroup">
          <div className="con-tooltip">
            <div className="h5">Rdzeń z bonusem do:</div>
            <Hint
              description={
                "Wybierz do jakiej statystyki chcesz otrzymać bonus z rdzenia różdżki."
              }
            />
          </div>
          {heartTypes.map((category) => (
            <div
              className="wandCategory"
              key={category}
              onClick={() => handleCategoryChangeBH(category)}
              style={{
                fontWeight:
                  formData.selectedCategoryBH === category ? "bold" : "normal",
              }}
            >
              {category}
            </div>
          ))}
        </div>
      )}
      {activeHeartSection === "details" && formData.selectedCategoryBH && (
        <div className="wandButtonGroup">
          <div className="con-tooltip">
            <div className="h5">Rdzeń:</div>
            <Hint description={"Wybierz rdzeń różdżki."} />
          </div>
          <div className="h6">{formData.selectedCategoryBH}</div>
          <button
            className="wandBack"
            onClick={() => setActiveHeartSection("category")}
          >
            ◀ Powrót
          </button>
          <div className="wandTypesContainer">
            {Object.keys(heart[formData.selectedCategoryBH]).map(
              (heartType, index) => (
                <div
                  className={`wandTypes special`}
                  key={`${heartType}-${index}`}
                  onClick={() => handleHeartChange(heartType)}
                  style={{
                    fontWeight:
                      formData.selectedHeart?.name === heartType
                        ? "bold"
                        : "normal",
                  }}
                >
                  {heartType}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Wand;
