import { useState, useContext, useEffect } from "react";
import Hint from "../hint/Hint";
import { FormContext } from "../../dataContext";
import characterConfig from "../../characterConfig";

const CharacterMetric = () => {
  const { formData, updateFormData } = useContext(FormContext);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [showDisease, setShowDisease] = useState(false);
  const selectedOptions = formData.selectedOptions;
  const selectedCharacterType = formData.characterType;

  const fieldMetric = [
    {
      label: "name",
      id: "1",
      placeholder: "Imię: ",
      type: "input",
      hint: "Staraj się używać imion angielskich lub pochodzących z pobliskich krajów, unikaj takich, które pochodzą z innych kontynentów lub z języków sztucznych. Czarodzieje chętnie sięgali po mitologię, a niektóre z rodzin mają własną specyfikę nadawania imion (np. ród Black)",
    },
    {
      label: "surname",
      id: "2",
      placeholder: "Nazwisko: ",
      type: "input",
      hint: "Jeśli tworzysz postać, która pochodzi z rodziny posiadającej moderatora skontaktuj się z nim zanim oddasz kartę do akceptacji. Moderator rodziny pomoże dopasować Twoją postać do specyfiki rodziny. Pamiętaj, tworząc postać z rodu szlachetnego musisz wpasować ją w opis arystokracji oraz rodu w taki sposób, by Twojej postaci nie dało się przyporządkować do żadnego innego rodu równie trafnie, co do wybranego.",
    },
    {
      label: "birthDate",
      id: "3",
      placeholder: "Data urodzenia: ",
      type: "input",
      hint: "Pamiętaj, że akcja toczy się w 1958 r. Nie zapomnij też, że jeżeli Twoja postać ma urodziny we wrześniu, październiku, listopadzie lub grudniu, otrzymuje list za szkoły magii już po rozpoczęciu roku szkolnego. W związku z tym rozpoczyna naukę rok później od rówieśników urodzonych we wcześniejszych miesiącach.",
    },

    {
      label: "age",
      id: "18",
      placeholder: "Wiek: ",
      type: "input",
      hint: "Wpisz ile UKOŃCZONYCH lat ma twoja postać. Nie zaokrąglaj w górę. Jeśli postać w czerwcu ukończy np. 14 lat, a jest fabularny maj, to należy wpisać 13.",
    },
    {
      label: "schoolYear",
      id: "19",
      placeholder: "Rok nauki: ",
      type: "input",
      hint: "Na którym postać jest roku w szkole? Jeśli nie uczy się, pole musi pozostać puste.",
    },
    {
      label: "deathDate",
      id: "4",
      placeholder: "Data śmierci: ",
      type: "input",
      hint: "Data śmierci postaci",
    },
    {
      label: "circumstancesDeath",
      id: "5",
      placeholder: "Okoliczności śmierci: ",
      type: "input",
      hint: "Okoliczności śmierci. Dlaczego postać umarła? Co się stało? Z czyjej ręki?",
    },

    {
      label: "motherSurname",
      id: "6",
      placeholder: "Nazwisko matki: ",
      type: "input",
      hint: 'Nazwisko panieńskie matki Twojej postaci. Zachęcamy do wybierania nazwisk ze <a href="https://www.morsmordre.net/t1948-rodziny-czarodziejow#27514" target="_blank" rel="noopener noreferrer">spisu rodzin</a> obecnego na forum. Nazwisko ojca lub nazwisko panieńskie matki musi być jednym z wymienionych na liście. W przypadku postaci półkrwi matka nie może pochodzić z rodu szlachetnego. Postaci matek wywodzących się z rodów o krwi szlachetnej nie mogą być uznawane za zdrajców krwi. W przypadku postaci krwi czystej ze skazą, w karcie powinno znaleźć się wiarygodne uzasadnienie, dlaczego matka postaci popełniła mezalians (np. była nieurodziwa).',
    },
    {
      label: "residence",
      id: "7",
      placeholder: "Miejsce zamieszkania: ",
      type: "input",
      hint: 'Miasto lub dzielnica, w której mieszka Twoja postać. Zapoznaj się z <a href="https://www.morsmordre.net/t11765-zycie-codzienne#362894" target="_blank" rel="noopener noreferrer"> tym tematem</a> zanim obmyślisz miejsce, które zamieszkuje Twoja postać niezależnie od jej statusu społecznego. Jeśli tworzysz postać arystokraty miejscem zamieszkania postaci będzie jej siedziba rodowa (siedziby takiej nie mają wyłącznie Weasleyowie).',
    },
    {
      label: "bloodPurity",
      id: "8",
      placeholder: "Czystość krwi: ",
      type: "select",
      options: ["Mugolska", "Półkrwi", "Czysta ze skazą", "Czysta szlachecka"],
      hint: 'Poczytaj dokładnie o oznaczeniach przyjętych na forum w <a href="https://www.morsmordre.net/t96-czystosc-krwi" target="_blank" rel="noopener noreferrer"> tym temacie.</a>',
    },
    {
      label: "economicStatus",
      id: "9",
      placeholder: "Status majątkowy: ",
      type: "select",
      options: ["Nędzny", "Ubogi", "Średniozamożny", "Bogaty"],
      hint: 'O statusach przeczytasz więcej w <a href="https://www.morsmordre.net/t5063-finanse#109206" target="_blank" rel="noopener noreferrer"> tym wątku.</a> Jeśli jesteś arystokratą (nie Weasleyem) przysługuje Ci status bogacza. W innym przypadku musisz wybrać z trzech: średniozamożny, ubogi, nędzny w zależności od fabuły postaci. Status zamożny nie jest dostępny na start. Status majątkowy może zostać podniesiony w drodze fabularnego awansu.',
    },
    {
      label: "profession",
      id: "10",
      placeholder: "Zawód: ",
      type: "input",
      hint: 'Karta postaci powinna dokładnie opisywać, czym dokładnie zajmuje się Twoja postać. Posiłkuj się <a href="https://www.morsmordre.net/f442-profesje-czarodziejow" target="_blank" rel="noopener noreferrer"> opisem magicznych zawodów</a> oraz własną wyobraźnią. Nie są akceptowane karty osób zajmujących wysokie lub unikatowe i prestiżowe stanowiska (szef, dyrektor, niewymowny, nauczyciele magicznych szkół) - taki awans należy otrzymać fabularnie (należy się w tym celu skontaktować z Mistrzem Gry). Ponadto pamiętaj, że pracę w części zawodów (np. w Ministerstwie Magii i w Mungu) poprzedza staż, a część z nich wymaga ponadprzeciętnych umiejętności startowych, co może być trudne do uzyskania dla dopiero co tworzącej się postaci (np. auror).',
    },
    {
      label: "height",
      id: "11",
      placeholder: "Wzrost: ",
      type: "input",
      hint: "Podajemy w centymetrach, wzrost powinien być dopasowany do genetyki (obok człowieka - półgoblin, półolbrzym).",
    },
    {
      label: "weight",
      id: "12",
      placeholder: "Waga: ",
      type: "input",
      hint: "Podajemy w kilogramach, powinna być dopasowana do wzrostu.",
    },
    {
      label: "hairColor",
      id: "13",
      placeholder: "Kolor włosów: ",
      type: "input",
      hint: "Konkretne informacje.",
    },
    {
      label: "eyeColor",
      id: "14",
      placeholder: "Kolor oczu: ",
      type: "input",
      hint: "Konkretne informacje.",
    },
    {
      label: "distinctiveMarks",
      id: "15",
      placeholder: "Znaki szczególne: ",
      type: "input",
      hint: "Znaki szczególne postaci oraz ich dokładne umiejscowienie - blizny, znamiona, etc. Należy pamiętać o wspomnieniu o wysokim wzroście. Tatuaż artystyczny nie był powszechny w latach pięćdziesiątych.",
    },
    {
      label: "features",
      id: "16",
      placeholder: "Cechy charakterystyczne",
      type: "input",
      hint: "Czym się dana postać charakteryzuje, jak się zachowuje? Czy posiada jakieś znaki szczególne?",
  },

    {
      label: "house",
      id: "20",
      placeholder: "Dom: ",
      type: "input",
      hint: 'Wybierz, do której z <a href="https://www.morsmordre.net/t449-edukacja-i-szkoly-magii" target="_blank" rel="noopener noreferrer"> opisanych szkół</a> uczęszczała Twoja postać - nie akceptujemy postaci uczących się w innych - oraz dom, do którego należała. <a href="https://www.morsmordre.net/t439-spis-stanowisk-szkolnych#1157" target="_blank" rel="noopener noreferrer">Tutaj</a> znajdziesz spis absolwentów konkretnych domów oraz ich krótką charakterystykę oraz spis zajmowanych przez nich funkcji. Jeśli planujesz umieścić postać w drużynie Quidditcha lub chcesz, aby była prefektem, sprawdź, czy było to możliwe. Pamiętaj, że cztery domy w Hogwarcie reprezentowały pewne wartości, które musi odzwierciedlać Twoja postać, jeśli ma być ich absolwentem.',
    },
    {
      label: "boggart",
      id: "22",
      placeholder: "Bogin: ",
      type: "input",
      hint: "Wybierz kształt, który przybiera bogin Twojej postaci - materialny kształt, w który przeobraża się stworzenie, wywołując w Twojej postaci lęk. Boginem może być np. dementor, ponurak, ściana ognia, martwy bliski (a nie poczucie alienacji, chaos na świecie, bieda).",
    },
    {
      label: "amortentia",
      id: "23",
      placeholder: "Amortencja: ",
      type: "input",
      hint: "Zapach amortencji jest indywidualny dla każdego czarodzieja i kojarzy się z tym, co najbliższe jego sercu.",
    },
    {
      label: "ainEingarp",
      id: "24",
      placeholder: "Ain Eingarp: ",
      type: "input",
      hint: "Widok, jaki Twoja postać ujrzałaby w zwierciadle Ain Eingarp, które ukazuje najgłębsze skrywane marzenia.",
    },
    {
      label: "hobby",
      id: "25",
      placeholder: "Pasja: ",
      type: "input",
      hint: "Zainteresowania postaci, jej pasja, zajęcia, którymi w wolnym czasie postać się zajmuje.",
    },
    {
      label: "quidditch",
      id: "26",
      placeholder: "Quidditch: ",
      type: "input",
      hint: 'Ulubiona drużyna Quidditcha. Więcej o nich znajdziesz w <a href="https://www.morsmordre.net/t560-sport-i-gry" target="_blank" rel="noopener noreferrer">tym temacie.</a>',
    },
    {
      label: "activity",
      id: "27",
      placeholder: "Aktywność: ",
      type: "input",
      hint: 'O magicznych sportach poczytasz w <a href="https://www.morsmordre.net/t560-sport-i-gry" target="_blank" rel="noopener noreferrer">tym temacie.</a>',
    },
    {
      label: "music",
      id: "28",
      placeholder: "Muzyka: ",
      type: "input",
      hint: 'Klasyczna, jazz, kształtujący się rock\'n\'roll? O muzyce w latach 50-tych poczytasz więcej <a href="https://www.morsmordre.net/t555-muzyka" target="_blank" rel="noopener noreferrer">tutaj</a>.',
    },
    {
      label: "image",
      id: "29",
      placeholder: "Wizerunek: ",
      type: "input",
      hint: 'Miejsce na wpisanie osoby, której wizerunek przejmuje Twoja postać. Jeżeli chcesz sprawdzić, czy wybrana przez Ciebie twarz nie jest jeszcze zajęta lub jeśli wiesz, że stworzenie karty zajmie Ci jeszcze trochę czasu, a chcesz mieć pewność, że przez okres tworzenia karty nikt nie zajmie Twojego wizerunku, zajrzyj do <a href="https://www.morsmordre.net/t299-wizerunki" target="_blank" rel="noopener noreferrer">tego</a> tematu. Nie masz pomysłu na wizerunek? Przejrzyj nasze propozycje <a href="https://pl.pinterest.com/cinnamonowo/wizerunki-damskie/" target="_blank" rel="noopener noreferrer">damskie</a> i <a href="https://pl.pinterest.com/cinnamonowo/wizerunki-m%C4%99skie/" target="_blank" rel="noopener noreferrer">męskie</a>',
    },
    {
      label: "imageURL",
      id: "35",
      placeholder: "URL do obrazka",
      type: "input",
      hint: "Wklej URL do obrazka, który znajdzie się w karcie postaci.",
    },
    {
      label: "geneticDisease",
      id: "40",
      placeholder: "Choroba genetyczna: ",
      type: "select",
      options: [
        "Serpentyna",
        "Śmiertelna Bladość",
        "Transmutacyjne zaniki organowe",
        "Syndrom Grauguss'a",
        "Klątwa Ondyny",
        "Dotyk meduzy",
        "Trauma krwi",
        "Rozrost albioni",
        "Świniowstręt",
        "Rumień nienawiści",
      ],
      hint: 'Choroby przekazywane poprzez krew, z pokolenia na pokolenie, gdzie nosicielem choroby może być krewny w linii prostej - rodzice, dziadkowie, pradziadkowie. Każda z postaci o krwi szlachetnej ma 30% szans na obciążenie jedną z chorób genetycznych znajdujących się w <a href="https://www.morsmordre.net/t556-medycyna-choroby-i-urazy?highlight=choroby+genetyczne#chorobygenetyczne" target="_blank" rel="noopener noreferrer">naszym spisie.</a> Przed utworzeniem karty postaci prosimy o wykonanie <a href="https://www.morsmordre.net/t10330-choroby-genetyczne-ii?highlight=choroby+genetyczne" target="_blank" rel="noopener noreferrer">rzutu kością</a>, w celu określenia zdrowia postaci.',
    },
  ];

  const handleSelectChange = (event, index, placeholder) => {
    const value = event.target.value;
    const name = event.target.name;
    const id = event.target.id;

    if (id === "18") {
      const age = parseInt(value, 10);
      const maxAge = config.maxAge || Infinity;

      if (age > maxAge) {
        updateFormData("selectedOptions", {
          ...formData.selectedOptions,
          metric: {
            ...formData.selectedOptions.metric,
            [id]: {
              ...formData.selectedOptions.metric[id],
              label: placeholder,
              name: name,
              value: maxAge.toString(),
            },
          },
        });
        return;
      }
      updateFormData("selectedOptions", {
        ...formData.selectedOptions,
        metric: {
          ...formData.selectedOptions.metric,
          [id]: {
            ...formData.selectedOptions.metric[id],
            label: placeholder,
            name: name,
            value: age.toString(),
          },
        },
      });
      return;
    }

    updateFormData("selectedOptions", {
      ...formData.selectedOptions,
      metric: {
        ...formData.selectedOptions.metric,
        [id]: {
          ...formData.selectedOptions.metric[id],
          label: placeholder,
          name: name,
          value: value,
        },
      },
    });
    if (id === "8") {
      if (value !== "Czysta szlachecka") {
        updateFormData("selectedOptions", (prevOptions) => {
          const updatedMetric = { ...prevOptions.metric };
          updatedMetric[40] = { label: "", value: "", cost: 0 };

          return {
            ...prevOptions,
            metric: updatedMetric,
          };
        });

        updateFormData("selectedOptionsSkillB", (prevOptions) => {
          const updatedSpecial = [...prevOptions.special];

          updatedSpecial[5] = { label: "", value: "", cost: 0 };

          return {
            ...prevOptions,
            special: updatedSpecial,
          };
        });
        updateFormData("skillLocked", null);
        setShowDisease(false);
      }
    }
    if (id === "8") {
      if (value !== "Mugolska") {
        updateFormData("selectedOptionsSkillB", (prevOptions) => {
          const updatedSpecial = [...prevOptions.special];

          updatedSpecial[2] = { label: "", value: "", cost: 0 };
          return {
            ...prevOptions,
            special: updatedSpecial,
          };
        });
        updateFormData("skillLocked", null);
        setShowDisease(false);
      }
    }

    if (value === "Czysta szlachecka") {
      updateFormData("selectedOptionsSkillB", (prevOptions) => {
        const updatedSpecial = [...prevOptions.special];

        if (!updatedSpecial[5] || updatedSpecial[5].value !== "II") {
          updatedSpecial[5] = { label: "Savoir-vivre", value: "II", cost: 0 };
        }

        return {
          ...prevOptions,
          special: updatedSpecial,
        };
      });
      updateFormData("skillLocked", 5);
      setShowDisease(true);
    } else if (value === "Mugolska") {
      updateFormData("selectedOptionsSkillB", (prevOptions) => {
        const updatedSpecial = [
          ...(prevOptions?.special ||
            Array.from({ length: 8 }, () => ({ value: "", cost: 0 }))),
        ];
        updatedSpecial[2] = { label: "Mugoloznawstwo", value: "II", cost: 0 };

        return {
          ...prevOptions,
          special: updatedSpecial,
        };
      });
      updateFormData("skillLocked", 2);
    } else {
      updateFormData("skillLocked", null);
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    updateFormData("checkboxOption", isChecked);

    if (isChecked) {
      updateFormData("selectedOptionsSkillB", (prevOptions) => {
        const updatedSpecial = [
          ...(prevOptions?.special ||
            Array.from({ length: 8 }, () => ({ value: "", cost: 0 }))),
        ];
        updatedSpecial[2].label = "Mugoloznawstwo";
        updatedSpecial[2].value = "I";
        updatedSpecial[2].cost = 0;

        return {
          ...prevOptions,
          special: updatedSpecial,
        };
      });
      updateFormData("skillLocked", 1);
    } else {
      updateFormData("selectedOptionsSkillB", (prevOptions) => {
        const updatedSpecial = [
          ...(prevOptions?.special ||
            Array.from({ length: 8 }, () => ({ value: "", cost: 0 }))),
        ];
        updatedSpecial[2].value = "";
        updatedSpecial[2].cost = 0;

        return {
          ...prevOptions,
          special: updatedSpecial,
        };
      });
      updateFormData("skillLocked", null);
    }
  };

  useEffect(() => {
    const bloodPurity = formData.selectedOptions?.metric?.[8]?.value;
    if (bloodPurity === "Półkrwi") {
      setShowCheckbox(true);
    } else {
      setShowCheckbox(false);
    }
  }, [formData.selectedOptions]);

  useEffect(() => {
    const bloodPurity = formData.selectedOptions?.metric?.[8]?.value;
    if (bloodPurity === "Czysta szlachecka") {
      setShowDisease(true);
    } else {
      setShowDisease(false);
    }
  }, [formData.selectedOptions]);

  useEffect(() => {
    if (
      JSON.stringify(formData.selectedOptions) !==
      JSON.stringify(selectedOptions)
    ) {
      updateFormData("selectedOptions", selectedOptions);
    }
  }, [selectedOptions, formData.selectedOptions, updateFormData]);

  const config = characterConfig[selectedCharacterType] || {};
  const excludeFields = config.excludeFields || [];
  const filteredFields = fieldMetric.filter(
    (field) => !excludeFields.includes(field.id)
  );

  return (
    <div className="metricConteneir">
      <div className="h2">Metryka główna</div>
      {filteredFields.map((field, index) => (
        <div key={field.label} className="input-group">
          {(field.label !== "geneticDisease" || showDisease) && (
            <div className="con-tooltip">
              <label htmlFor={field.id}>{field.placeholder}</label>
              <Hint description={field.hint} />
            </div>
          )}

          {field.type === "input" ? (
            <input
              type="text"
              id={field.id}
              name={field.label}
              value={formData.selectedOptions?.metric?.[field.id]?.value || ""}
              placeholder={field.placeholder}
              required={field.required}
              onChange={(e) => handleSelectChange(e, index, field.placeholder)}
            />
          ) : (
            (field.label !== "geneticDisease" || showDisease) && (
              <select
                id={field.id}
                name={field.label}
                placeholder={field.placeholder}
                value={
                  formData.selectedOptions?.metric?.[field.id]?.value || ""
                }
                onChange={(e) =>
                  handleSelectChange(e, index, field.placeholder)
                }
              >
                <option value="" className="default-option">
                  Wybierz
                </option>
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )
          )}
        </div>
      ))}

      <div className="checkbox-group">
        {showCheckbox && (
          <>
            <label htmlFor="checkboxOption">
              Czy jedno z twoich rodziców jest krwi mugolskiej?
            </label>
            <input
              type="checkbox"
              id="checkboxOption"
              name="checkboxOption"
              checked={formData.checkboxOption || false}
              onChange={handleCheckboxChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterMetric;
