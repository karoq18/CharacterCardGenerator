import { useContext } from "react";
import { FormContext } from "../../dataContext";
import Hint from "../hint/Hint";

function Credit() {
  const { formData, updateFormData } = useContext(FormContext);

  const hintCredit =
    "Podczas tworzenia karty postaci można zakupić statystyki, biegłości, umiejętności i przedmioty ze sklepiku mistrza gry o łącznej sumie PD nie większej niż wartość równa wiekowi postaci przemnożonemu przez 20, jeżeli postać ukończyła 25 rok życia. Po odjęciu ceny zakupów stan konta staje się liczbą ujemną - do momentu, w którym taki dług zostanie spłacony rozwój postaci pozostaje zablokowany. Przykładowo, postać, która ma skończone 25 lat, może wydać na start 500 PD (25*20), zacznie jednak wówczas grę z kredytem -500 PD. Punkty konieczne do wykupienia genetyki tworząca się postać dopisuje do swojego długu. Zatem jeśli 25 letnia postać wydała 500 PD i rozpoczyna grę z maksymalnym dla siebie długiem -500 PD, ale dodatkowo chce mieć geny metamorfomagii, rozpoczyna grę z długiem -900 PD (-500 i -400 za genetykę). Zalecamy dokładnie przemyśleć swój początkowy zakup, punkty doświadczenia są nabywane wolno i odrobienie dużej ilości PD zajmie kilka miesięcy aktywnej gry, w której trakcie rozwój takiej postaci będzie całkowicie zablokowany. Może się to okazać problemem zwłaszcza dla osób, które jeszcze niedokładnie znają mechanikę forum i mogą nieświadomie podjąć błędne decyzje, których osoba sprawdzająca kartę nie wychwyci.";

  const fieldCredit = [
    {
      label: "Statystyki",
      id: "0",
      placeholder: "Ilość punktów statystyk",
      type: "number",
      nType: "input",
      hint: "Jeden punkt statystyk kosztuje 80PD",
    },
    {
      label: "Biegłości",
      id: "1",
      placeholder: "Ilość punktów biegłości",
      type: "number",
      nType: "input",
      hint: "Jeden punkt biegłości kosztuje 50PD",
    },
    {
      label: "Umiejętności",
      id: "2",
      placeholder: "Wybierz umiejętność",
      nType: "select",
      options: [
        { value: 1, cost: 500, label: "Animagia" },
        { value: 2, cost: 800, label: "Legilimencja" },
        { value: 3, cost: 800, label: "Magia bezróżdżkowa" },
        { value: 4, cost: 500, label: "Oklumencja" },
        { value: 5, cost: 400, label: "Teleportacja łączna" },
      ],
      hint: 'Każda umiejętność ma inną cenę oraz wymagania. Więcej informacji znajdziesz <a href="https://www.morsmordre.net/t296-sklepik-mistrza-gry#180305"> tutaj.</a>',
    },

    {
      label: "Przedmioty ze sklepu Mistrza Gry",
      id: "3",
      placeholder: "Suma wydanych PD w sklepie",
      type: "number",
      nType: "input",
      hint: 'Listę przedmiotów oraz ceny znajdziesz <a href="https://www.morsmordre.net/t296-sklepik-mistrza-gry#180299"> tutaj.</a>',
    },
    {
      label: "Genetyka",
      id: "4",
      placeholder: "Wybierz genetykę",
      nType: "select",
      options: [
        { value: 1, cost: 300, label: "Jasnowidzenie" },
        { value: 2, cost: 400, label: "Metamorfomagia" },
        { value: 3, cost: 300, label: "Półwila" },
        { value: 4, cost: 300, label: "Zwierzęcousty" },
      ],
      hint: 'Więcej informacji o genetykach znajdziesz <a href="https://www.morsmordre.net/f228-inne-rodzaje-magii"> tutaj.</a>',
    },
  ];

  const valideAge = () => {
    const minAge = formData?.selectedOptions?.metric?.[18]?.value;
    return minAge < 25;
  };

  const handleSelectChange = (event, field) => {
    const value = Number(event.target.value);
    const cost =
      field.nType === "select"
        ? field.options.find((option) => option.value === value)?.cost || 0
        : field.id === "0"
        ? value * 80 || 0
        : field.id === "1"
        ? value * 50 || 0
        : value || 0;

    const name = event.target.options
      ? event.target.options[event.target.selectedIndex]?.text || ""
      : field.label;
    const id = event.target.id;

    updateFormData("selectedOptionsCredit", {
      ...formData.selectedOptionsCredit,
      [id]: {
        ...formData.selectedOptionsCredit[id],
        label: field.label,
        name: name,
        value: value,
        cost: cost,
      },
    });
    return;
  };

  const spendPD = () => {
    const selectedCredits = formData.selectedOptionsCredit || {};

    let sum = 0;
    Object.keys(selectedCredits).forEach((key) => {
      const credit = selectedCredits[key];
      sum += Number(credit.cost || 0);
    });
    if (sum !== formData.creditBill) {
      updateFormData("creditBill", sum);
    }

    return sum;
  };

  const bill = () => {
    const max = formData?.selectedOptions?.metric?.[18]?.value * 20 || 0;
    const spend = formData?.creditBill || 0;
    const finalBill = spend - max;

    if (max < spend) {
      return (
        <span className="error-message">Wydałeś za dużo o: {finalBill} PD</span>
      );
    }
    return "Pozostało do wydania: " + Math.abs(finalBill) + " PD";
  };

  return (
    <div className="metricConteneir">
      <div className={`con-tooltip single`}>
        <div className="h2">Kredyt</div>
        <Hint description={hintCredit} />
      </div>

      {valideAge() ? (
        <div className="miniFrame">
          <div className="h9">
            Aby wziąć kredyt na punkty doświadczenia Twoja postać musi mieć co
            najmniej 25 lat.
          </div>
        </div>
      ) : (
        <>
          <div className="miniFrame">
            <div className="h9" style={{ marginBottom: '10px' }}>
              Maksymalna kwota kredytu:{" "}
              {formData?.selectedOptions?.metric?.[18]?.value * 20} PD
            </div>
            {fieldCredit.map((field) => (
              <div key={field.label} className="input-group">
                <div className="con-tooltipCredit">
                  <Hint description={field.hint} />
                  <div className="creditField">
                    <label htmlFor={field.id}>{field.placeholder}</label>
                  </div>
                  {field.nType === "input" ? (
                    <>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.label}
                        value={
                          formData.selectedOptionsCredit?.[field.id]?.value ||
                          ""
                        }
                        placeholder={field.placeholder}
                        required={field.required}
                        onChange={(e) => handleSelectChange(e, field)}
                      />
                      <span className="creditField">
                        Suma: {formData.selectedOptionsCredit?.[field.id]?.cost}
                      </span>
                    </>
                  ) : field.nType === "select" ? (
                    <>
                      <select
                        id={field.id}
                        name={field.label}
                        value={
                          formData.selectedOptionsCredit?.[field.id]?.value ||
                          ""
                        }
                        onChange={(e) => handleSelectChange(e, field)}
                      >
                        <option value="">Brak</option>
                        {field.options.map((option, optIndex) => (
                          <option key={optIndex} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <span className="creditField">
                        Suma: {formData.selectedOptionsCredit?.[field.id]?.cost}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
            <div className="h9">
              Suma: {spendPD()} PD
              <div className="h9">{bill()}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Credit;
