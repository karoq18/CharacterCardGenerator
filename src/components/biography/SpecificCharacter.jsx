import  { useContext } from "react";
import { FormContext } from "../../dataContext";
import "../biography/biography.css";
import "../../app.css";
import Hint from "../hint/Hint";

import pIcon from "../../image/formatP.svg";
import leftIcon from "../../image/formatLeft.svg";
import rightIcon from "../../image/formatRight.svg";
import centerIcon from "../../image/formatCenter.svg";
import justifyIcon from "../../image/formatJustify.svg";
import boldIcon from "../../image/formatBold.svg";
import italicIcon from "../../image/formatItalic.svg";
import underlinedIcon from "../../image/formatUnderlined.svg";
import strikeIcon from "../../image/formatStrike.svg";

function SpecificCharacter() {
  const { formData, updateFormData } = useContext(FormContext);
  const selectedCharacterType = formData.characterType;

  const hintBio =
    'Karta musi być napisana w pierwszej lub trzeciej osobie. Nieakceptowane są karty w formie powieści epistolarnej. Pamiętaj, że na urodzenie postaci (krew), genetykę oraz umiejętności przysługują <a href="https://www.morsmordre.net/t1-regulamin#1">limity</a> dostępne dla każdego gracza. W tekście powinna znaleźć się wyczerpująca informacja o historii postaci - nie skupiaj się wyłącznie na czasach dzieciństwa i Hogwartu, jeżeli Twoja postać jest już dorosła. Zastanów się nad tym, co robiła po szkole i jakie przyniosło to dla niej konsekwencje. Pamiętaj, że Twoja postać nie ma samych zalet, każdy ma również wady. Powinieneś również przebąknąć chociaż kilka zdań o wyglądzie i zwyczajach Twojej postaci, z historii powinien wynikać jej charakter. Postaraj się wyczerpać możliwości biograficzne. Pamiętaj, aby zawrzeć również poglądy postaci na temat czystości krwi. W oparciu o ważne tematy z działu <a href="https://www.morsmordre.net/f443-fabula-glowna">głównej fabuły</a> odwołaj się do wydarzeń, które mogły mieć wpływ na życie Twojej postaci. Przy tworzeniu postaci szlachcica należy wziąć pod uwagę opis rodu (np. rodziny Shacklebolt i Shafiq mają specyficzny typ urody charakterystyczny dla innych kontynentów, natomiast Blackowie mają zwyczaj nazywać swoje dzieci zgodnie z nazwami ciał niebieskich lub kwiatów). Żaden z rodów szlacheckich nie posiada przysłowiowego ostatniego dziedzica, nieakceptowane są również karty najstarszych żyjących męskich członków takich rodzin, a także ich małżonek. Rody nie są i nie będą zamykane na życzenie graczy. Szlachcice mają również obowiązek rzucić kością na przymus posiadania choroby genetycznej (więcej <a href="https://www.morsmordre.net/t10330-choroby-genetyczne-ii">tutaj</a>). Pamiętaj, że w ślad za szlacheckim pochodzeniem idzie szlacheckie wychowanie - większość rodów gardzi mugolami oraz czarodziejami nieczystej krwi. Więcej o zwyczajach szlachty przeczytasz w <a href="https://www.morsmordre.net/t522-rody-krwi-szlachetnej">tym temacie</a>. Ponadto, nie są już akceptowane karty "czarnych owiec", czyli osób zachowujących się sprzecznie z opisem rodziny. Postaraj się dopasować charakter, zainteresowania i wychowanie postaci do wybranego przez siebie rodu, a jeśli bardziej pasują do innego - wybierz inny. Jeśli chcesz, aby Twoja postać posiadała genetykę, zastanów się dobrze nad jej wyborem i weź ja tylko wtedy, kiedy nie masz wątpliwości, że pasuje do Twojego konceptu. Więcej o genetykach przeczytasz w <a href="https://www.morsmordre.net/f228-genetyki-i-umiejetnosci">tym</a> dziale.';

  const addTag = (tag, field, type = "square") => {
    const textarea = document.getElementById(field);
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    let openingTag, closingTag;

    if (type === "square") {
      openingTag = `[${tag}]`;
      closingTag = `[/${tag}]`;
    } else if (type === "angle") {
      openingTag = `<${tag}>`;
      closingTag = `</${tag}>`;
    }

    const newText = `${textarea.value.substring(
      0,
      start
    )}${openingTag}${textarea.value.substring(
      start,
      end
    )}${closingTag}${textarea.value.substring(end)}`;

    updateFormData(field, newText);
    updateFormData(
      `preview${field.charAt(0).toUpperCase() + field.slice(1)}`,
      parseTagsToHTML(newText)
    );
  };

  const parseTagsToHTML = (text) => {
    return text
      .replace(
        /\[left\](.*?)\[\/left\]/g,
        '<div style="text-align:left;">$1</div>'
      )
      .replace(
        /\[center\](.*?)\[\/center\]/g,
        '<div style="text-align:center;">$1</div>'
      )
      .replace(
        /\[right\](.*?)\[\/right\]/g,
        '<div style="text-align:right;">$1</div>'
      )
      .replace(
        /\[justify\](.*?)\[\/justify\]/g,
        '<div style="text-align:justify;">$1</div>'
      )

      .replace(
        /\[b\](.*?)\[\/b\]/g,
        '<span style="font-weight:bold;">$1</span>'
      )
      .replace(
        /\[i\](.*?)\[\/i\]/g,
        '<span style="font-style:italic;">$1</span>'
      )
      .replace(
        /\[u\](.*?)\[\/u\]/g,
        '<span style="text-decoration: underline;">$1</span>'
      )
      .replace(
        /\[strike\](.*?)\[\/strike\]/g,
        '<span style="text-decoration: line-through;">$1</span>'
      );
  };

  const handleContentChange = (e, field) => {
    const newValue = e.target.value;
    updateFormData(field, newValue);
    updateFormData(
      `preview${field.charAt(0).toUpperCase() + field.slice(1)}`,
      parseTagsToHTML(newValue)
    );
  };

  const buttonSpecific = (field) => {
    return (
      <div className="editor-buttons">
        <button onClick={() => addTag("p", field, "angle")}>
          <img src={pIcon} alt="Nowy akapit" />
        </button>
        <button onClick={() => addTag("left", field, "square")}>
          <img src={leftIcon} alt="Left align" />
        </button>
        <button onClick={() => addTag("center", field, "square")}>
          <img src={centerIcon} alt="Center align" />
        </button>
        <button onClick={() => addTag("right", field, "square")}>
          <img src={rightIcon} alt="Right align" />
        </button>
        <button onClick={() => addTag("justify", field, "square")}>
          <img src={justifyIcon} alt="Justified" />
        </button>
        <button onClick={() => addTag("b", field, "square")}>
          <img src={boldIcon} alt="Pogrub" />
        </button>
        <button onClick={() => addTag("i", field, "square")}>
          <img src={italicIcon} alt="Kursywa" />
        </button>
        <button onClick={() => addTag("u", field, "square")}>
          <img src={underlinedIcon} alt="Podkreśl" />
        </button>
        <button onClick={() => addTag("strike", field, "square")}>
          <img src={strikeIcon} alt="Przekreśl" />
        </button>
      </div>
    );
  };

  return (
    <div id="biographyMain">
      <div className={`con-tooltip single`}>
        <div className="h2">Wygląd</div>
        <Hint description={hintBio} />
      </div>
      {buttonSpecific("appearance")}
      <textarea
        className="specific"
        id="appearance"
        value={formData.appearance || ""}
        onChange={(e) => handleContentChange(e, "appearance")}
      ></textarea>

      <div className={`con-tooltip single`}>
        <div className="h2">Ciekawostki</div>
        <Hint description={hintBio} />
      </div>
      {buttonSpecific("trivia")}
      <textarea
        className="specific"
        id="trivia"
        value={formData.trivia || ""}
        onChange={(e) => handleContentChange(e, "trivia")}
      ></textarea>

      {selectedCharacterType !== "independentCharacter" && (
        <>
          <div className={`con-tooltip single`}>
            <div className="h2">Powiązania</div>
            <Hint description={hintBio} />
          </div>
          {buttonSpecific("connections")}
          <textarea
            className="specific"
            id="connections"
            value={formData.connections || ""}
            onChange={(e) => handleContentChange(e, "connections")}
          ></textarea>
        </>
      )}
    </div>
  );
}

export default SpecificCharacter;
