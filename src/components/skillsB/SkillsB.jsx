import { useState, useContext, useEffect } from "react";
import "./skillsB.css";
import AllChooseSkill from "./AllChooseSkill";
import { FormContext } from "../../dataContext";
import characterConfig from "../../characterConfig";
import Hint from "../hint/Hint";

function SkillsB() {
  const { formData, updateFormData } = useContext(FormContext);
  const selectedCharacterType = formData.characterType;
  const config = characterConfig[selectedCharacterType] || {};
  const includeSkillsB = config.includeSkillsB || [];
  const selectedOptionsSkillB = formData.selectedOptionsSkillB;
  const [activeTab, setActiveTab] = useState(null);
  const [userSkills, setUserSkills] = useState(formData.userSkills || []);
  const [newUserSkill, setNewUserSkill] = useState("");
  const [geneticLvl, setGeneticLvl] = useState(0);
  const [nextSkillId, setNextSkillId] = useState(0);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [addPoints, setAddPoints] = useState(0);
  const [maxPointsMessage, setMaxPointsMessage] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [remainingPointsSkillsB, setRemainingPointsSkillsB] = useState(0);

  const [sportPoints, setSportPoints] = useState(0);
  const [additionalPoints, setAdditionalPoints] = useState(0);
  const skillLocked = formData?.skillLocked || null;

  const age = parseInt(formData.selectedOptions?.metric?.[18]?.value, 10) || 0;
  const pointMax =
    selectedCharacterType === "child"
      ? age * 2
      : selectedCharacterType === "student"
      ? Math.max((age - 12) * 6 + age * 2, 0)
      : config.pointsSkillsBLimit + formData?.selectedOptionsCredit[1]?.value || 0;

  const selectLabelsBasic = [
    "Anatomia",
    "Astronomia",
    "Geomancja",
    "Historia magii",
    "Numerologia",
    "Opieka nad magicznymi stworzeniami",
    "Skradanie",
    "Starożytne runy",
    "Spostrzegawczość",
    "Zielarstwo",
    "Zręczne ręce",
  ];

  const selectLabelsSocial = [
    "Kłamstwo",
    "Kokieteria",
    "Perswazja",
    "Zastraszanie",
  ];

  const selectLabelsSpecial = [
    "Ekonomia",
    "Odporność magiczna",
    "Mugoloznawstwo",
    "Potencjał magiczny",
    "Wytrzymałość psychiczna",
    "Savoir-vivre",
    "Szczęście",
    "Pech",
  ];

  const selectLabelsCraft = [
    "Konstrukcje magiczne",
    "Literatura (wiedza)",
    "Magikowalstwo",
    "Muzyka (wiedza)",
    "Różdżkarstwo",
    "Malarstwo",
    "Rysunek",
    "Projektowanie",
    "Sztuka (wiedza)",
    "Wiązanie mioteł",
    "Wróżbiarstwo",
  ];

  const selectLabelsSport = [
    "Latanie na miotle",
    "Quidditch",
    "Quodpot",
    "Pływanie",
    "Taniec balowy",
    "Taniec klasyczny (balet)",
    "Taniec współczesny",
    "Szermierka",
    "Walka wręcz",
    "Żeglarstwo",
  ];

  const selectLabelsStory = ["Organizacja", "Rozpoznawalność"];

  const selectOptionsBasic = Array(15).fill([
    { value: "I", cost: 2 },
    { value: "II", cost: 10 },
    { value: "III", cost: 25 },
    { value: "IV", cost: 40 },
  ]);

  const selectOptionsSpecial = [
    [
      { value: "I", cost: 5 },
      { value: "II", cost: 15 },
      { value: "III", cost: 25 },
    ],
    [{ value: "I", cost: 5 }],
    [
      { value: "I", cost: 2 },
      { value: "II", cost: 10 },
      { value: "III", cost: 20 },
    ],
    [
      { value: "I", cost: 2 },
      { value: "II", cost: 10 },
      { value: "III", cost: 20 },
    ],
    [
      { value: "I", cost: 5 },
      { value: "II", cost: 10 },
      { value: "III", cost: 20 },
    ],
    [
      { value: "I", cost: 2 },
      { value: "II", cost: 5 },
    ],
    [
      { value: "I", cost: 2 },
      { value: "II", cost: 10 },
      { value: "III", cost: 20 },
    ],
    [
      { value: "I", cost: 2 },
      { value: "II", cost: 10 },
      { value: "III", cost: 20 },
    ],
  ];

  const selectOptionsStandard = Array(11).fill([
    { value: "I", cost: 0.5 },
    { value: "II", cost: 7 },
    { value: "III", cost: 25 },
  ]);

  const selectOptionsLang = Array(11).fill([
    { value: "I", cost: 1 },
    { value: "II", cost: 2 },
  ]);

  const selectOptionsGenetic = [
    "Jasnowidz",
    "Wilkołak",
    "Metamorfomag",
    "Półgoblin",
    "Półolbrzym",
    "Półwila",
    "Zwierzęcoustny",
  ];

  const selectOptionsStory = [
    [
      { value: "Neutralny", cost: 0 },
      { value: "Rycerze Walpurgii", cost: 0 },
      { value: "Zakon Feniksa", cost: 0 },
    ],
    [{ value: "I", cost: 0 }],
  ];

  const selectLabelsGhostPsycho = [
    "Aerokineza",
    "Audiokineza",
    "Bilokacja",
    "Chronokineza",
    "Elektrokineza",
    "Geokineza",
    "Gyrokineza",
    "Hydrokineza",
    "Inokineza",
    "Kriokineza",
    "Magnetokineza",
    "Pirokineza",
    "Telekineza",
    "Teleportacja",
  ];

  const selectLabelsGhostOthers = ["Odporność magiczna"];

  const selectOptionsGhostPsycho = Array(14).fill([
    { value: "I", cost: 2 },
    { value: "II", cost: 5 },
    { value: "III", cost: 15 },
  ]);

  const selectOptionsGhostOthers = Array(1).fill([{ value: "I", cost: 5 }]);

  const skillHint = {
    Anatomia:
      "Wiedza o biologii człowieka, jego anatomii, budowie. Odzwierciedla również umiejętność pierwszej pomocy. Wymagana u medyków. Niezbędna do umiejętnego korzystania z magii leczniczej. Wspomaga pozyskiwanie komponentów anatomicznych.",
    Astronomia:
      "Znajomość mapy nieba, wiedza o gwiazdach, ich konstelacjach, księżycu i innych ciałach astralnych, a także o zjawiskach zachodzących w przestrzeni kosmicznej i ich wpływie na magię czarodziejów (pełnia, układy gwiazd i planet, burze słoneczne, etc). Astronomia jest wykorzystywana przy warzeniu eliskirów, ułatwia także pozyskiwanie niektórych komponentów - minerałów kosmicznych.",
    Geomancja:
      "Nauka o Ziemi, jej mapie, magicznych właściwościach. Pomaga zrozumieć i odpowiednio wykorzystać magię pochodzącą z natury i terenów. Wiedza geomantyczna wyróżnia podróżników i postaci badające dawne miejsca kultu, pozwala na wykrywanie i wykorzystywanie niedostrzegalnych ziemskich energii (np. żyły magiczne), przewidywanie zjawisk meteorologicznych oraz magometeorologicznych. Geomancja znajduje szerokie zastosowanie w magicznej architekturze, pozwala zbadać i zrozumieć warunki stabilizujące i destabilizujące magię na danym obszarze. Wspomaga pozyskiwanie minerałów ziemskich.",
    "Historia magii":
      "Ogólna wiedza o historii czarodziejskiego świata, konfliktach i sojuszach, genealogii i heraldyce, legendach i baśniach, systemach prawnych i politycznych, a także zależnościach międzynarodowych, pozwala na rozpoznawanie historycznych osobistości. Wyraża znajomość tradycji i kultury istot takich jak m.in. duchy, skrzaty domowe, trytony, wile i centaury. Na niższych poziomach wyraża również szczegółowe i dokładne zorientowanie w aktualnej sytuacji polityczno-prawnej.",
    Numerologia:
      "Nazywana królową nauk, traktuje o magii liczb, budowie magii, jej naturze, procesach i reakcjach. Pozwala przewidywać i rozumieć zachowanie magii jako odizolowanej energii. Stanowi podstawową wiedzę teoretyczną będącą fundamentem badań o magii. Jej znajomość wymagana jest do prowadzenia niektórych badań naukowych niezbędna do tworzenia nowych zaklęć, przedmiotów, jest wykorzystywana np. przy konstrukcji świstoklików, magii niewerbalnej i zabezpieczeniach.",
    "Opieka nad magicznymi stworzeniami":
      "Znajomość magicznych zwierząt, nauka o ich zwyczajach i preferencjach. Umożliwia nie tylko prawidłowe rozpoznawanie dzikich stworzeń, ale także przewidywanie ich zachowań oraz wiedzę na temat ich słabości. Odpowiada za prawidłowe zachowanie postaci przy stworzeniach. Umożliwia prawidłową opiekę nad zwierzętami, ich oswojenie i tresurę, na wyższych poziomach - również niektórych zwierząt niebezpiecznych. Wspomaga uzyskiwanie komponentów zwierzęcych. ONMS jest związane ze stworzeniami, nie istotami.",
    Skradanie:
      "Umiejętność cichego poruszania się w każdej sytuacji, maskowania obecności w cieniu lub z wykorzystaniem unikalnej rzeźby terenu. Bezszelestne pokonywanie trasy i związanych z nią przeszkód, cichy, ostrożny chód, świadome, a nawet nieświadome i instynktowne omijane przestrzeni potencjalnie widocznej, stwarzającej warunki do wywołania hałasu. Pozwala zaskoczyć przeciwnika. Na wyższych poziomach wymaga refleksu oraz lekkości ciała, za które odpowiada statystyka zwinności.",
    "Starożytne runy":
    "Pisanie i czytanie starożytnych alfabetów różnych kultur (do najczęściej stosowanych dzisiaj w Europie należą runy futharku, ale biegłość na wyższym poziomie może obejmować również pismo orchońskie i jego wcześniejsze odmiany oraz rowasz). Na wyższych poziomach może obejmować również znajomość petroglifow, kipu, pisma muszelkowego (wampum, aroko), starożytnego pisma klinowego, hieroglificznego (egipskie, kreteńskie i pozostałe), fenickiego, a także aramejskiego, pisma ideograficznego i podobnych. Oprócz znajomości znaków pomocna jest znajomość języka. Pisma tego typu są wykorzystywane w magicznych rytuałach, współcześnie najczęściej dotyczą klątw. Wykorzystywane jest również ich magiczne znaczenie ochronne i wspomagające np. poprzez zastosowanie znaków w talizmanach.",
    Spostrzegawczość:
    "Ostrość zmysłów, bystrość wzroku, celność oka, wrażliwość na zewnętrzne bodźce, zapachy, dźwięki. Zdolności do obserwowania i zapamiętywania, na wyższym poziomie nawet bardzo mało istotnych detali. Umiejętność czytania i rozumienia emocji innych poprzez obserwację ich mimiki, ruchów, intonacji. Postać spostrzegawcza łatwiej niż inne wychwytuje zmiany w swoim otoczeniu. Biegłość na wyższym poziomie wiążę się z naturalną ostrożnością i podwyższoną czujnością postaci.",
    Zielarstwo:
      "Wiedza o budowie, zastosowaniu, rozwoju a także prawidłowej pielęgnacji i preferencjach roślin, w tym ziół. Pozwala na skuteczną uprawę oraz skuteczne wykorzystywanie ich właściwości (np. leczniczych, toksycznych). Na wyższych poziomach obejmuje prawidłowe radzenie sobie z magicznymi roślinami niebezpiecznymi. Wspomaga uzyskiwanie komponentów roślinnych i pozwala na przygotowywanie magicznych kadzideł.",
    "Zręczne ręce":
      "Umiejętność dokonywania drobnych zręcznych czynności przy pomocy dłoni; kradzieży, również kieszonkowej, ale i włamywania się i pokonywania zamków niemagicznymi sposobami, przełamywanie zabezpieczeń bez pomocy magii (np. ściągnięcie laku z listu i ponowne go nałożenie w sposób niepostrzeżony). Zręczne ręce mogą być przydatne również w trakcie wykonywania różnego rodzaju sztuczek, oszustw w trakcie gier hazardowych i nie tylko, bierze się ją pod uwagę przy próbach podrzucania innym przedmiotów, etc.",
    Kłamstwo:
      "Umiejętność ukrywania prawdy, panowania nad ekspresją twarzy, udawania emocji, wrażeń, lekkość i płynność, szybkość dobierania wiarygodnych wymówek, biegłość w odnajdywaniu się w zawiłości własnych zmyślonych historii. Zdolności aktorskie obejmują mimikę, gesty oraz ton głosu, zdolność panowania nad tremą. Kłamstwo co do zasady nie wymaga rzutu kością i nie należy na nie rzucać, jeśli mistrz gry nie stwierdzi inaczej, wymagane jest jednak wiarygodne odegranie biegłości.",
    Kokieteria:
      "Kokieteria to sposób komunikacji, korzystanie z fizyczności celem zaskarbienia sobie przychylności innych, świadomość ciała. Ma znaczenie w sytuacji, w której postać próbuje coś osiągnąć wbrew innej postaci i z premedytacją usiłuje przekonać ją do swoich celów, wykorzystując w tym celu charyzmę bazującą na aparycji, nie autorytecie. Wymaga odegrania odpowiedniego do posiadanego poziomu biegłości. Co do zasady nie wymaga rzutu kością i nie należy na nią rzucać, jeśli mistrz gry nie stwierdzi inaczej, wymagane jest jednak jej wiarygodne odegranie.",
    Perswazja: 
    "Umiejętność słownego przekonywania do swoich racji, siła przebicia, charyzmy, wykorzystywanie swojej pozycji, kontaktów, skupia się na skutecznym dialogu oraz ukazaniu adekwatnego autorytetu w danej dziedzinie. Wymaga odegrania odpowiedniego do posiadanego poziomu biegłości. Co do zasady nie wymaga rzutu kością i nie należy na nią rzucać, jeśli mistrz gry nie stwierdzi inaczej, wymagane jest jednak jej wiarygodne odegranie.",
    Zastraszanie:
      "Agresywna perswazja wsparta przymiotami postaci wyróżniającymi ją z tłumu (wysoki wzrost, siła mięśniowa) lub cechami wyróżniającymi ją w sposób negatywny (tatuaż, nóż), zastraszaniem nie są wysublimowane szantaże ani retoryczne przekonywanie do swoich racji nawet, jeżeli ta retoryka nosi znamiona groźby i wzbudza strach.  Co do zasady nie wymaga rzutu kością i nie należy na nią rzucać, jeśli mistrz gry nie stwierdzi inaczej, wymagane jest jednak jej wiarygodne odegranie.",
    Ekonomia:
      'Umiejętność obrotu kapitałem, tzw. żyłka do interesów. Specjalistyczna wiedza o pieniądzu, finansach, handlu, przedsiębiorczości, produkcji, gospodarce i procesach ekonomicznych, w tym umiejętność przeprowadzania analiz rynkowych. Zdolność prowadzenia i czytania ksiąg rachunkowych. Umiejętne szacowanie ryzyka inwestycyjnego. Należy pamiętać, że w dziedzinie ekonomii szczególnie ważnym elementem jest doświadczenie. Zapewnia dodatkowy zarobek zgodnie z zasadami rozpisanymi w <a href="https://www.morsmordre.net/t5063-finanse#109207"> tym</a> temacie.',
    "Odporność magiczna":
      "Odporność magiczna, zawsze nabyta, wykorzystywana w trakcie rzutów obronnych na niektóre potężne zaklęcia. Zakupienie biegłości pozwala na wyliczenie bonusu odpornościowego równego sumie wszystkich wydanych PB powyżej wartości 70, włączając w to PB biegłości fabularnych (Zakon Feniksa/Rycerze Walpurgii). Zakup biegłości kosztuje 5 PB, jednak można ją wzmacniać tak jak inne bez ograniczenia (wówczas wartość odporności zostaje podniesiona również o wydane na tę biegłość punkty powyżej 5). Wartość odporności magicznej postaci nie może przekroczyć 100.",
    Mugoloznawstwo:
      "Umożliwia postaci rozumienie mugolskiego świata. Występuje na trzech poziomach. Poziom I - umiejętność odnalezienia się w mugolskim świecie, posługiwania się mugolskimi pieniędzmi, przejścia przez ulicę; czarodziej dopiero z tą biegłością zaczyna rozumieć podstawy mugolskiego świata i wie, że samochód to nie stalowy smok. Poziom II - duży kontakt z mugolskim światem; czarodziej może posiadać prawo jazdy, używa elektryczności i rozumie działanie sprzętów takich jak telewizor. Poziom III - korzystanie z broni palnej. Postaci mugolaków otrzymują tę biegłość za darmo na poziomie II, a postaci półkrwi wychowane przez jednego z rodziców mugola - na I poziomie.",
    "Potencjał magiczny":
      'Biegłość dostępna tylko dla charłaków. Określa zdolności magiczne charłaka, stopień rozbudzenia uśpionej w nim magii i możliwości jej wykorzystania. Może być ćwiczona kursami, terapiami lub samorozwojem. Dokładne informacje znajdują się w odpowiednim <a href="https://www.morsmordre.net/t11540-zdolnosci-charlakow#357721"> temacie</a>.',
    "Wytrzymałość psychiczna":
     'Stalowe nerwy. Oznacza wytrzymałość psychiczną postaci, jej odporność na ból, stres, zdolność działania pomimo silnej presji, zdolność samokontroli nad emocjami, postać wytrzymała psychicznie nie ignoruje trudności, ale jest w stanie sobie z nimi poradzić. Cechuje postaci dojrzałe, o dużym, bogatym doświadczeniu. Nie występuje u postaci kruchych, podatnych na używki, emocjonalnych. I poziom - Postać przepracowała trudne wydarzenia z przeszłości, jest zdolna do krótkotrwałego ukierunkowania się na celu z pominięciem zewnętrznych dystraktorów, jest w stanie poradzić sobie ze stresem i działać pod presją, myśli trzeźwo nawet w krytycznych sytuacjach. Ma nieznacznie podwyższoną percepcję rzeczywistości. Jest wytrzymalsza psychicznie od przeciętnego czarodzieja. Trudniej ją wyprowadzić z równowagi. +5 do żywotności. II poziom - Postać miała styczność z niezwykłymi i niecodziennymi doświadczeniami wykraczającymi poza doświadczenia napotykającymi przeciętnych czarodziejów, a te doświadczenia uczyniły ją silniejszą na drodze przepracowanych traum. Łatwiej niż inni radzi sobie ze swoimi słabościami, jest w stanie je okiełznać, odsunąć i działać pomimo ich.  Jest odporniejsza na fizyczny ból. Trudniej ją rozproszyć. Postać potrafi separować się od emocji innych. +15 do żywotności III poziom - Postać ma absolutną kontrolę nad swoimi emocjami, jest wewnętrznie świadoma, potrafi skupić się wyłącznie na chłodnym rachunku zysków i strat, uczucia i emocje nie są w stanie jej rozproszyć, potrafi postawić cel ponad jakiekolwiek inne rozterki i wątpliwości. Skupienie nie sprawia jej żadnego problemu, trudno ją rozproszyć. Liczne niezwykłe i niecodzienne trudne doświadczenia postaci wykraczają daleko poza doświadczenia przeciętnego czarodzieja. Zachowuje trzeźwość umysłu w każdej sytuacji.  +30 do żywotności. Nadto każdy poziom wytrzymałości psychicznej podwyższa o 10 granicę otrzymywanych obrażeń wyznaczającą rany psychiczne I, II i III stopnia (<a href="https://www.morsmordre.net/t92-mechanika#obr"> więcej</a>).',
    "Savoir-vivre":
      "	Znajomość towarzyskich konwenansów, zwyczajów i reguł grzeczności na poziomie zaawansowanym. Przeważnie odnosić się będzie do wszelkich form towarzyskich związanych z życiem klas wyższych oraz zwyczajów poszczególnych rodów szlacheckich, dotyczy protokołu dyplomatycznego, zasad zachowania na balach najwyższej rangi. Poziom II dotyczy ścisłej elity. Jeżeli mężczyzna pojmuje za żonę czystokrwistą kobietę spoza arystokracji musi ona posiadać tę biegłość na II poziomie. Arystokraci otrzymują tę biegłość za darmo na II poziomie, dzieci szlachetnej krwi - na I poziomie.",
    Szczęście:
      "Występuje na trzech poziomach. Poziom I - ochrona przed efektem krytycznej jedynki. Poziom II - pozwala raz przerzucić wybraną kostkę w trakcie wydarzenia z udziałem mistrza gry; liczy się drugi wynik. K1 postaci jest odczytywane jak k100. Poziom III - pozwala raz przerzucić wybraną kostkę w trakcie wydarzenia z udziałem mistrza gry; liczy się lepszy wynik. Postać przynosi szczęście innym, raz w trakcie wątku k1 postaci sojuszniczej odczytywane jest jak k100.",
    Pech: 
    "Występuje na trzech poziomach. Poziom I - każdy krytyczny sukces na kości k100 oznacza krytyczną porażkę; postać może losować dwie parszywki w trakcie jednego okresu fabularnego. Poziom II - postać roztacza pecha wokół siebie: również krytyczne sukcesy wszystkich postaci znajdujących się w jednym wątku z postacią pechową stają się krytycznymi porażkami. Poziom III - krytyczne porażki stają się bardziej spektakularne.",
    "Konstrukcje magiczne":
      'Wiedza o praktycznych zastosowaniach magii w czarodziejskim budownictwie, zarówno ogólnym, jak i komunikacyjnym. Pozwala na zrozumienie działania magicznych mechanizmów stosowanych w architektonicznych konstrukcjach, a także (na wyższych poziomach) na ich projektowanie i tworzenie. Zawiera w sobie znajomość podstawowych materiałów budowlanych i ich właściwości. Pomocna w nakładaniu zabezpieczeń. Wystarczająca do wykonania prostych konstrukcji. W przypadku tych bardziej złożonych wymaga również wiedzy zaczerpniętej z innych dziedzin magicznych (głównie numerologii i geomancji). Więcej informacji znajdziesz <a href="https://www.morsmordre.net/t11544-konstrukcje-magiczne"> tutaj</a>.',
    "Literatura (wiedza)":
      "Znajomość dzieł literackich. Poziom I oznacza podstawową znajomość nazwisk i dzieł największych literatów, ogólna wiedza na temat epok; poziom II - znajomość bardziej niszowych dzieł, posiadanie szczegółowych informacji na temat kontekstu biograficznego i historycznego autorów, dokładną znajomość epok i charakterystycznych dla nich stylów; poziom III - mistrzowską znajomość wszystkiego, co związane z literaturą, a także jej analizą.",
    Magikowalstwo:
      'Umiejętność mieszania i formowania zaczarowanego metalu przy pomocy młota i kowadła, a także zaklinanie go. Obejmuje wiedzę związaną z ich właściwościami, strukturą, wytrzymałością, plastycznością, a także przewodnictwem. Zdolność do wszelkiego wytwarzania i obróbki przedmiotów takich jak kotły, łańcuchy, obroże, podkowy, klatki, ogrodzenia, okucia, zamki, klucze i inne wyroby magimetalurgiczne. Więcej informacji znajdziesz <a href=https://www.morsmordre.net/t11539-magikowalstwo> tutaj</a>.',
    "Muzyka (wiedza)":
      "Wiedza na temat muzyki oraz tańca, jej historii, znanych muzykach oraz kompozytorach. Poziom I oznacza znajomość nazwisk i dzieł największych osobistości zapisanych w historii muzyki, umiejętność czytania nut; poziom II - dobrą znajomość także tych mniej znanych, umiejętność komponowania; poziom III - mistrzowską znajomość wszystkiego, co związane z muzyką, a także jej analizą, w 'Jaka to melodia' taka postać zawsze rozpoznaje utwór po pierwszej nutce.",
    Różdżkarstwo: 
    "	Umiejętność tworzenia, dobierania i rozpoznawania różdżek, wiedza o nich; ich magii, zwyczajach, rdzeniach. Biegłość dostępna wyłącznie dla postaci pochodzących z rodziny Ollivander.",
    Malarstwo:
      "Malarstwo - Sztuka plastyczna charakteryzująca się użyciem linii oraz plamy barwnej. Malarstwo różni się w zależności od medium (farby olejne, farby akwarelowe, pastele, tusz, etc.) oraz nurtu w sztuce. Biegłość odpowiada za fizyczne umiejętności posługiwania się narzędziami wykorzystywanymi do malarstwa (pędzle, farby, pastele, przygotowanie płótna, czas schnięcia), prędkość oraz jakość wykonywanych obrazów, praktycznego zastosowania zasad teorii koloru oraz perspektywy.",
    Rysunek:
      "Rysunek - Sztuka plastyczna charakteryzująca się pracą z linią oraz walorem. Umiejętność często przydatna zarówno przy malarstwie oraz projektowaniu, pomaga przenosić istniejące jak i wymyślone kształty na papier. Na wyższych poziomach znajomości charakteryzuje ludzi o pewnych ruchach dłoni oraz niektórych artystów, a same rysunki zyskują na dokładności w przedstawionych detalach. Przydatna dla naukowców wykonujących własne ilustracje roślin, zwierząt czy anatomiczne.",
    Projektowanie:
      "Projektowanie - Grafika warsztatowa, kolaż czy projektowanie przedmiotów (ubrań, przedmiotów codziennego użytku, mebli, budynków). Umiejętność wykorzystywana do przenoszenia idei na papier, nie zawsze wymagających umiejętności rysunku czy malarstwa. Poza samym tworzeniem planów do wykonania odpowiada za znajomość pracy z różnymi materiałami w małej skali. Na wyższych poziomach charakteryzuje dobrze wykonane wykresy oraz rysunki techniczne. Jest umiejętnością posiadają przez projektantów czy architektów.",
    "Sztuka (wiedza)":
      "	Znajomość malarstwa, architektury i rzeźby. Poziom I umożliwia rozpoznawanie najbardziej znanych dzieł i ich twórców, daje ogólną wiedzę na temat stylów; poziom II - znajomość bardziej niszowych dzieł, posiadanie szczegółowych informacji na temat biografii i twórczości artystów, dokładna znajomość cech charakterystycznych dla danych stylów; poziom III - mistrzowską znajomość wszystkiego, co związane ze sztuką plastyczną, a także jego analizą.",
    "Wiązanie mioteł":
      'Umiejętność tworzenia mioteł obejmująca wiązanie i uzupełnianie wici, struganie trzonu i łączenie elementów. Obejmuje także naprawianie uszkodzeń i konserwowanie sprzętu. Znajomość rodzajów drewna, ich właściwości i zastosowania, a także umiejętność wykorzystania prostych metali. Więcej informacji znajdziesz <a href="https://www.morsmordre.net/t11538-wiazanie-miotel"> tutaj.</a>',
    Wróżbiarstwo:
      'Sztuka magiczna, wiedza o wróżeniu za pomocą rekwizytów (fusów, kart Tarota, etc.); wróżbiarstwo ma szczególne znaczenie u <a href="https://www.morsmordre.net/t2298-gen-jasnowidzenie> jasnowidzów</a>.',
    "Latanie na miotle":
      'Miotła jest podstawowym środkiem transportu czarodziejów, jest bezpieczniejsza i niesie za sobą mniej niedogodności niż teleportacja, miotły używa się również do <a href="https://www.morsmordre.net/t560-sport-i-gry"> większości czarodziejskich sportów</a>.',
    Quidditch:
      "Obejmuje znajomość zasad gry, poruszania się po boisku, a także typowych dla tego sportu przepisów, formacji i kombinacji taktycznych. Do grania w szkolnej drużynie Quidditcha wymagany jest I stopień, dla postaci, które były w szkole gwiazdami lub kapitanami - II stopień, zaś dla osób zajmujących się tym zawodowo - II i III.",
    Quodpot:
      "Amerykańska odmiana quidditcha.",
    Pływanie: 
    "Umiejętność pływania i przetrwania w wodzie.",
    "Taniec balowy":
      "Tańce standardowe (foxtrot, tango, walc angielski, walc wiedeński), tańce salonowe (lansjer, kontredans). Umiejętność niezbędna na arystokratycznych salonach.",
    "Taniec klasyczny (balet)":
      "Umiejętność tańczenia baletu.",
    "Taniec współczesny":
      "Tańce znane z magicznych potańcówek -  cha-cha, rock 'n' roll, tańce swingowe (w tym jive).",
    Szermierka: 
    "Umiejętność walki na miecze lub inne białe bronie.",
    "Walka wręcz":
      'Wymagana do silniejszych ciosów i bardziej skomplikowanych technik obrony. Szczegóły w <a href="https://www.morsmordre.net/t4810-walka-wrecz"> temacie</a>.',
    Żeglarstwo:
      "Umiejętność żeglowania, manewrowania łodziami i znajomość zasad pływania po wodach.",
    Organizacja:
      'Przynależność do <https://www.morsmordre.net/t471-rycerze-walpurgii> Rycerzy Walpurgii</a> lub <a href="https://www.morsmordre.net/t3290-zakon-feniksa">Zakonu Feniksa</a> jako sojusznik',
    Rozpoznawalność:
      "Stopień, w jakim postać jest rozpoznawana przez innych, co może wpływać na jej relacje i odbiór społeczny.",
    Genetyka:
    'Biegłości genetyki przysługują: jasnowidzom, metamorfomagom, półolbrzymom, półwilom, wilkołakom i zwierzęcoustym. Punkty genetyki oznaczają poziom opanowania wyjątkowych mocy, umiejętność zarządzania przez postać jej darem i wykazują doświadczenie w tymże. Nie mają one wydzielonych poziomów, każdy 1 wydany punkt biegłości daje premię +2 do rzutów związanych z genetyką. Opis związanych z tym mechanik znajduje się w tematach poświęconych odpowiednim <a href="https://www.morsmordre.net/f228-inne-rodzaje-magii"> genetykom</a>. Górny próg podniesienia biegłości wynosi 50 PB, za wyjątkiem jasnowidzów, u których ten próg wynosi 25 PB oraz półwil, u których ten próg wynosi 10. Nadto jasnowidzowie otrzymują bonus do rzutu na genetykę w wysokości ilości podwojonych punktów wydanych na biegłość wróżbiarstwa, a półwile - na biegłość kokieterii. Za brak biegłości nie przysługuje kara, jeżeli postać posiada genetykę.',
  Pozostałe:
  "Biegłości pozostałe są to biegłości wyrażające specyficzne zainteresowania postaci, które nie mieszczą się w żadnych powyższych kategoriach. Są to zajęcia niewymagające wysiłku fizycznego uzasadniającego przyrost masy, niemożliwe do sklasyfikowania w biegłościach sztuki lub rzemiosła, ale też mniej popularne hobby, w których postać nabywa biegłość wyróżniającą ją wśród innych. Brak biegłości nie daje kary do rzutu, lecz posiadanie biegłości sprawia, że postać w pewnym stopniu, zależnym od poziomu, wyróżnia się swoimi umiejętnościami. Przykładowe biegłości to: czarodziejskie szachy, gargułki, majsterkowanie, magiczny poker, mocna głowa, strzelectwo (czarodziejska kusza), wiedza o wąskich dziedzinach, które nie mieszczą się w innych biegłościach lub są w stosunku nich zbyt wąskie u postaci. Cena wykupienia kolejnych poziomów rośnie wraz ze wzrostem poziomu. Kupując poziom wyższy, należy opłacić także poziomy niższe. Wykupienie poziomu II kosztuje więc 7 PB, poziomu III - łącznie 25 PB. Każdy kolejny poziom oznacza większą biegłość, a co za tym idzie, wyższy bonus do kości przy podejmowaniu działań wymagających znajomości określonej umiejętności odzwierciedlonej przez biegłość.",
  Język:
  "Każdej postaci oprócz darmowej znajomości języka ojczystego przysługuje zakup znajomości języków narodowych bądź magicznych. Języki narodowe - znajomość języków narodowych (bądź wymarłych). Języki magiczne - znajomość języków typowo magicznych, są to języki: goblidegucki, trollański, trytoński."  
};

  const handleSelectChange = (event, idOrIndex, group, label) => {
    const value = event.target.value;

    if (group === "genetic") {
      const updatedGenetic = [{ label: value, value: value, cost: geneticLvl }];

      updateFormData("selectedOptionsSkillB", {
        ...formData.selectedOptionsSkillB,
        genetic: updatedGenetic,
      });
    } else if (group === "user") {
      const skillCategory = formData.userSkills.find(
        (skill) => skill.id === idOrIndex
      )?.category;
      const options =
        skillCategory === "lang"
          ? selectOptionsLang[0]
          : selectOptionsStandard[0];
      const selectedOption = options.find((option) => option.value === value);

      const updatedUser = {
        ...formData.selectedOptionsSkillB.user,
        [idOrIndex]: {
          category:
            formData.userSkills.find((skill) => skill.id === idOrIndex)
              ?.category || "",
          label:
            formData.userSkills.find((skill) => skill.id === idOrIndex)?.name ||
            "",
          value: value,
          cost: selectedOption ? selectedOption.cost : 0,
        },
      };

      updateFormData("selectedOptionsSkillB", {
        ...formData.selectedOptionsSkillB,
        user: updatedUser,
      });
    } else {
      const optionSet =
        group === "basic"
          ? selectOptionsBasic
          : group === "social"
          ? selectOptionsBasic
          : group === "special"
          ? selectOptionsSpecial
          : group === "sport"
          ? selectOptionsStandard
          : group === "lang"
          ? selectOptionsLang
          : group === "craft"
          ? selectOptionsStandard
          : group === "story"
          ? selectOptionsStory
          : group === "psychoGhost"
          ? selectOptionsGhostPsycho
          : group === "othersGhost"
          ? selectOptionsGhostOthers
          : [selectOptionsStandard];

      const selectedOption = optionSet[idOrIndex % optionSet.length]?.find(
        (option) => option.value === value
      );

      const updatedGroup = formData.selectedOptionsSkillB[group].map(
        (item, index) =>
          index === idOrIndex
            ? {
                label,
                value: value,
                cost: selectedOption ? selectedOption.cost : 0,
              }
            : item
      );

      updateFormData("selectedOptionsSkillB", {
        ...formData.selectedOptionsSkillB,
        [group]: updatedGroup,
      });
    }
  };

  const handleAddUserSkill = (category) => {
    if (
      newUserSkill &&
      !userSkills.some((skill) => skill.name === newUserSkill)
    ) {
      const newSkill = {
        id: nextSkillId,
        name: newUserSkill,
        category: category,
      };

      const updatedUserSkills = [...userSkills, newSkill];
      setUserSkills(updatedUserSkills);
      updateFormData("userSkills", updatedUserSkills);

      const updatedUserOptions = {
        ...formData.selectedOptionsSkillB.user,
        [nextSkillId]: {
          category: category,
          label: newUserSkill,
          value: "",
          cost: 0,
        },
      };

      updateFormData("selectedOptionsSkillB", {
        ...formData.selectedOptionsSkillB,
        user: updatedUserOptions,
      });

      setNextSkillId((prevId) => prevId + 1);
      setNewUserSkill("");
    }
  };

  const handleRemoveUserSkill = (skillId, group, index) => {
    if (skillId !== undefined) {
      const updatedUserSkills = userSkills.filter(
        (skill) => skill.id !== skillId
      );
      setUserSkills(updatedUserSkills);
      updateFormData("userSkills", updatedUserSkills);

      const updatedUserOptions = { ...selectedOptionsSkillB.user };
      delete updatedUserOptions[skillId];

      updateFormData("selectedOptionsSkillB", {
        ...formData.selectedOptionsSkillB,
        user: updatedUserOptions,
      });
    }

    if (group && index !== undefined) {
      const updatedGroupOptions = formData.selectedOptionsSkillB[group].map(
        (option, i) => {
          if (i === index) {
            return { value: "", cost: 0 };
          }
          return option;
        }
      );

      updateFormData("selectedOptionsSkillB", {
        ...formData.selectedOptionsSkillB,
        [group]: updatedGroupOptions,
      });
    }
  };

  const handleEditUserSkillName = (skillId, newName) => {
    const updatedUserSkills = userSkills.map((skill) => {
      if (skill.id === skillId) {
        return { ...skill, name: newName };
      }
      return skill;
    });
    setUserSkills(updatedUserSkills);
    updateFormData("userSkills", updatedUserSkills);
    const updatedUserOptions = {
      ...formData.selectedOptionsSkillB.user,
      [skillId]: {
        ...formData.selectedOptionsSkillB.user[skillId],
        label: newName,
      },
    };

    updateFormData("selectedOptionsSkillB", {
      ...formData.selectedOptionsSkillB,
      user: updatedUserOptions,
    });
  };

  const startEditing = (skillId) => {
    setEditingSkillId(skillId);
  };

  const handleNameChange = (e, skillId) => {
    const newName = e.target.value;
    handleEditUserSkillName(skillId, newName);
  };

  const saveEdit = (skillId) => {
    setEditingSkillId(null);
  };

  useEffect(() => {
    const calculateTotalCost = () => {
      let cost = 0;
      [
        "basic",
        "social",
        "special",
        "craft",
        "sport",
        "othersGhost",
        "psychoGhost",
      ].forEach((group) => {
        selectedOptionsSkillB[group].forEach((item) => {
          if (item.value) {
            cost += item.cost;
          }
        });
      });
      if (
        selectedOptionsSkillB.genetic &&
        selectedOptionsSkillB.genetic[0]?.value
      ) {
        cost += selectedOptionsSkillB.genetic[0]?.cost;
      }
      userSkills.forEach((skill) => {
        const selectedValue = selectedOptionsSkillB.user[skill.id];
        if (selectedValue?.value) {
          let options =
            skill.category === "lang"
              ? selectOptionsLang[0]
              : selectOptionsStandard[0];
          const option = options.find(
            (option) => option.value === selectedValue.value
          );
          if (option) {
            cost += option.cost;
          }
        }
      });
      setTotalCost(cost);
      updateFormData("totalCostSkillB", cost);
    };
    calculateTotalCost();
  }, [selectedOptionsSkillB, userSkills]);

  const renderTotalCostInfo = () => {
    if (totalCost > pointMax + addPoints) {
      return (
        <div className="h7">
          <div className="error-message">
            Wydałeś za dużo PB o {totalCost - (pointMax + addPoints)}
          </div>
          <div>
            Suma wydanych punktów biegłości:{" "}
            <span className="error-message">{totalCost}</span> | Reszta:{" "}
            <span className="error-message">{remainingPointsSkillsB}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="h7">
          Suma wydanych punktów biegłości: {totalCost} | Reszta:{" "}
          {remainingPointsSkillsB}
        </div>
      );
    }
  };

  useEffect(() => {
    const availablePoints = pointMax + (formData?.addPoints || 0);
    const remaining = availablePoints - totalCost;
    if (remaining !== remainingPointsSkillsB) {
      setRemainingPointsSkillsB(remaining);
      updateFormData("remainingPointsSkillB", remaining);
    }
  }, [totalCost, formData.addPoints, updateFormData]);

  useEffect(() => {
    const calculateSportPoints = () => {
      let sportPoints = 0;

      selectedOptionsSkillB.sport.forEach((selectedValue, index) => {
        if (selectedValue.value) {
          const option = selectOptionsStandard[
            index % selectOptionsStandard.length
          ].find((option) => option.value === selectedValue.value);
          if (option) {
            sportPoints += option.cost;
          }
        }
      });
      userSkills.forEach((skill) => {
        if (skill.category === "sport") {
          const selectedValue = selectedOptionsSkillB.user[skill.id];
          if (selectedValue.value) {
            const option = selectOptionsStandard[0].find(
              (option) => option.value === selectedValue.value
            );
            if (option) {
              sportPoints += option.cost;
            }
          }
        }
      });

      if (
        sportPoints !== sportPoints ||
        additionalPoints !== calculateAdditionalPoints(sportPoints)
      ) {
        setSportPoints(sportPoints);

        const additionalPoints = calculateAdditionalPoints(sportPoints);
        setAdditionalPoints(additionalPoints);

        updateFormData("sportPoints", sportPoints);
        updateFormData("additionalPoints", additionalPoints);
      }
    };

    const calculateAdditionalPoints = (sportPoints) => {
      let additionalPoints = 0;
      if (sportPoints >= 3) additionalPoints = 1;
      if (sportPoints >= 9) additionalPoints = 5;
      if (sportPoints >= 21) additionalPoints = 10;
      return additionalPoints;
    };

    calculateSportPoints(); // Wywołanie funkcji
  }, [selectedOptionsSkillB, userSkills, updateFormData]);

  useEffect(() => {
    if (
      JSON.stringify(formData.selectedOptionsSkillB) !==
      JSON.stringify(selectedOptionsSkillB)
    ) {
      updateFormData("selectedOptionsSkillB", selectedOptionsSkillB);
    }
  }, [selectedOptionsSkillB, formData.selectedOptionsSkillB, updateFormData]);

  const allSelectedSkills = [
    formData.selectedOptionsSkillB.lang[0]
      ? {
          category: "Język",
          name:
            formData.selectedOptionsSkillB.lang[0]?.label || "Brak wartości",
          value:
            formData.selectedOptionsSkillB.lang[0]?.value || "Brak wartości",
          cost: formData.selectedOptionsSkillB.lang[0]?.cost || 0,
        }
      : null,

    ...formData.selectedOptionsSkillB.social.map((item, index) =>
      item.value &&
      selectOptionsBasic[0].find((option) => option.value === item.value)
        ? {
            category: "Społeczne",
            name: selectLabelsSocial[index],
            value: item.value,
            cost: selectOptionsBasic[0].find(
              (option) => option.value === item.value
            )?.cost,
          }
        : null
    ),

    ...formData.selectedOptionsSkillB.basic.map((item, index) =>
      item.value &&
      selectOptionsBasic[0].find((option) => option.value === item.value)
        ? {
            category: "Podstawowe",
            name: selectLabelsBasic[index],
            value: item.value,
            cost: selectOptionsBasic[0].find(
              (option) => option.value === item.value
            )?.cost,
          }
        : null
    ),

    ...formData.selectedOptionsSkillB.special.map((item, index) =>
      item.value &&
      selectOptionsSpecial[index % selectOptionsSpecial.length].find(
        (option) => option.value === item.value
      )
        ? {
            category: "Specjalne",
            name: selectLabelsSpecial[index],
            value: item.value,
            cost: item.cost,
          }
        : null
    ),

    ...formData.selectedOptionsSkillB.craft.map((item, index) =>
      item.value &&
      selectOptionsStandard[0].find((option) => option.value === item.value)
        ? {
            category: "Sztuka i Rzemiosło",
            name: selectLabelsCraft[index],
            value: item.value,
            cost: selectOptionsStandard[0].find(
              (option) => option.value === item.value
            )?.cost,
          }
        : null
    ),

    ...formData.selectedOptionsSkillB.sport.map((item, index) =>
      item.value &&
      selectOptionsStandard[0].find((option) => option.value === item.value)
        ? {
            category: "Aktywności",
            name: selectLabelsSport[index],
            value: item.value,
            cost: selectOptionsStandard[0].find(
              (option) => option.value === item.value
            )?.cost,
          }
        : null
    ),

    ...formData.selectedOptionsSkillB.psychoGhost.map((item, index) =>
      item.value &&
      selectOptionsStandard[0].find((option) => option.value === item.value)
        ? {
            category: "Psychokineza",
            name: selectLabelsGhostPsycho[index],
            value: item.value,
            cost: selectOptionsGhostPsycho[0].find(
              (option) => option.value === item.value
            )?.cost,
          }
        : null
    ),

    ...formData.selectedOptionsSkillB.othersGhost.map((item, index) =>
      item.value &&
      selectOptionsStandard[0].find((option) => option.value === item.value)
        ? {
            category: "Pozostałe",
            name: selectLabelsGhostOthers[index],
            value: item.value,
            cost: selectOptionsGhostOthers[0].find(
              (option) => option.value === item.value
            )?.cost,
          }
        : null
    ),

    formData.selectedOptionsSkillB.genetic[0]?.value
      ? {
          category: "Genetyka",
          name: formData.selectedOptionsSkillB.genetic[0]?.label || "",
          value: "-",
          cost: formData.selectedOptionsSkillB.genetic[0]?.cost || 0,
        }
      : null,

    ...formData.selectedOptionsSkillB.story.map((item, index) =>
      item.value &&
      selectOptionsStory[index % selectOptionsStory.length].find(
        (option) => option.value === item.value
      )
        ? {
            category: "Biegłości fabularne",
            name: selectLabelsStory[index],
            value: item.value,
            cost: item.cost,
          }
        : null
    ),

    ...userSkills.map((skill) => {
      let options;
      let category;

      switch (skill.category) {
        case "lang":
          options = selectOptionsLang[0];
          category = "Język";
          break;
        case "craft":
          options = selectOptionsStandard[0];
          category = "Sztuka i Rzemiosło";
          break;
        case "sport":
          options = selectOptionsStandard[0];
          category = "Aktywności";
          break;
        default:
          options = selectOptionsStandard[0];
          category = "Pozostałe";
          break;
      }

      const selectedUserOption = formData.selectedOptionsSkillB.user[skill.id];
      const option = selectedUserOption
        ? options.find((option) => option.value === selectedUserOption.value)
        : null;

      return option && skill.name
        ? {
            category,
            name: skill.name,
            value: selectedUserOption.value,
            cost: selectedUserOption.cost,
          }
        : null;
    }),
  ].filter((skill) => skill !== null);

  const renderSelectGroup = (labels, options, group) => (
    <div className={`tab-content ${activeTab === group ? "active" : ""}`}>
      {group === "lang" && (
        <div className="select-group">
          <label>Język ojczysty:</label>
          <input
            type="text"
            placeholder="Wpisz nazwę języka ojczystego"
            value={formData.selectedOptionsSkillB.lang[0]?.label || ""}
            onChange={(e) => {
              const newValue = e.target.value;
              updateFormData("selectedOptionsSkillB", {
                ...formData.selectedOptionsSkillB,
                lang: [{ label: newValue, value: "II", cost: 0 }],
              });
            }}
          />

          <select
            name="selectNativeLangLevel"
            id="selectNativeLangLevel"
            value={formData.selectedOptionsSkillB.lang[0]?.value || "II"}
            disabled
          >
            <option value="II">II (ojczysty)</option>
          </select>
        </div>
      )}

      {labels.map(
        (label, index) =>
          (label !== "Potencjał magiczny" ||
            formData.characterType === "muggle") && (
            <div key={index} className="select-group">
              <div className={`con-tooltipSkillsB`}>
                <Hint description={skillHint[label] || "Brak opisu"} />
                <label htmlFor={`select_${group}_${index}`}>{label}:</label>
              </div>
              <select
                name={`select_${group}_${index}`}
                id={`select_${group}_${index}`}
                value={
                  formData.selectedOptionsSkillB[group]?.[index]?.value ||
                  (group === "story" && selectOptionsStory[index][0].value)
                }
                disabled={
                  group === "special" &&
                  index === 5 &&
                  formData.skillLocked === 5
                }
                onChange={(e) => handleSelectChange(e, index, group, label)}
              >
                <option value="">Brak</option>
                {options[index % options.length].map((option, optionIndex) => (
                  <option
                    key={optionIndex}
                    value={option.value}
                    disabled={
                      (group === "special" &&
                        index === 2 &&
                        formData.skillLocked === 2 &&
                        (option.value === "I" || option.value === "II")) ||
                      (group === "special" &&
                        index === 2 &&
                        formData.skillLocked === 1 &&
                        option.value === "I")
                    }
                  >
                    {option.value}
                  </option>
                ))}
              </select>
              <button onClick={() => handleRemoveUserSkill(null, group, index)}>
                Usuń
              </button>
            </div>
          )
      )}

      {group === "genetic" && (
        <div className="select-group">
          <div className={`con-tooltipSkillsB`}>
          <Hint description={skillHint["Genetyka"] || "Brak opisu"} />
          <label htmlFor="genetic">Genetyka:</label>
          </div>
          <select
            name="genetic"
            id="genetic"
            value={formData.selectedOptionsSkillB.genetic[0]?.value || ""}
            onChange={(e) => handleSelectChange(e, 0, "genetic")}
          >
            <option value="">Brak</option>
            {selectOptionsGenetic.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Wpisz ilość punktów genetyki"
            disabled={
              formData.selectedOptionsSkillB.genetic[0]?.value === "Półgoblin"
            }
            value={
              formData.selectedOptionsSkillB.genetic[0]?.cost || geneticLvl
            }
            onChange={(e) => {
              const maxLimit =
                formData.selectedOptionsSkillB.genetic[0]?.value === "Jasnowidz"
                  ? 25
                  : formData.selectedOptionsSkillB.genetic[0]?.value ===
                    "Półwila"
                  ? 10
                  : 50;
              let newCost = Number(e.target.value);

              if (newCost > maxLimit) {
                newCost = maxLimit;
                setMaxPointsMessage(
                  `Maksymalna liczba punktów, jaką możesz wydać na genetykę - ${formData.selectedOptionsSkillB.genetic[0]?.value} - to ${maxLimit} PB`
                );
              } else {
                setMaxPointsMessage("");
              }
              setGeneticLvl(newCost);

              updateFormData("selectedOptionsSkillB", {
                ...formData.selectedOptionsSkillB,
                genetic: [
                  {
                    ...formData.selectedOptionsSkillB.genetic[0],
                    cost: newCost,
                  },
                ],
              });
            }}
          />
          {maxPointsMessage && <p>{maxPointsMessage}</p>}
        </div>
      )}

      {["craft", "sport", "other", "lang"].includes(group) && (
        <div className="user-skills-section">
          {userSkills
            .filter((skill) => skill.category === group)
            .map((skill, index) => (
              <div key={skill.id} className="select-group">
                <label htmlFor={`selectUser_${skill.id}`}>
                  {editingSkillId === skill.id ? (
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleNameChange(e, skill.id)}
                      onBlur={() => saveEdit(skill.id)}
                      autoFocus
                    />
                  ) : (
                    skill.name
                  )}
                </label>
                <select
                  name={`selectUser_${skill.id}`}
                  id={`selectUser_${skill.id}`}
                  value={
                    formData.selectedOptionsSkillB.user[skill.id]?.value || ""
                  }
                  onChange={(e) => handleSelectChange(e, skill.id, "user")}
                >
                  <option value="">Wybierz</option>
                  {group === "lang"
                    ? selectOptionsLang[0].map((option, optionIndex) => (
                        <option key={optionIndex} value={option.value}>
                          {option.value}
                        </option>
                      ))
                    : selectOptionsStandard[0].map((option, optionIndex) => (
                        <option key={optionIndex} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                </select>
                <button onClick={() => handleRemoveUserSkill(skill.id)}>
                  Usuń
                </button>
                <button onClick={() => setEditingSkillId(skill.id)}>
                  Edytuj
                </button>
              </div>
            ))}
            <div className="select-group">
            <div className={`con-tooltipSkillsB`}>
            {group === "lang"  ? (
              <Hint description={skillHint["Język"] || "Brak opisu"} />
            ) : (
            <Hint description={skillHint["Pozostałe"] || "Brak opisu"} />
            )}
            <label>Pozostałe:</label>
            </div>
            <input
              type="text"
              placeholder="Wpisz własną biegłość"
              value={newUserSkill}
              onChange={(e) => setNewUserSkill(e.target.value)}
            />
            <button onClick={() => handleAddUserSkill(group)}>+</button>
          </div>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    console.log("Genetic data:", formData.selectedOptionsSkillB.genetic);
  }, [formData.selectedOptionsSkillB.genetic]);

  useEffect(() => {
    if (formData.addPoints !== undefined) {
      setAddPoints(formData.addPoints);
    }
  }, [formData.addPoints]);

  return (
    <div className="metricConteneir">
      <div className="h2">Biegłości</div>

      <div className="tabs-container">
        <div className="tabs-header">
          {includeSkillsB.map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "lang"
                ? "Język"
                : tab === "social"
                ? "Biegłości Społeczne"
                : tab === "basic"
                ? "Biegłości Podstawowe"
                : tab === "special"
                ? "Biegłości Specjalne"
                 : tab === "story"
                ? "Biegłości Fabularne"
                : tab === "craft"
                ? "Sztuka i Rzemiosło"
                : tab === "sport"
                ? "Aktywność"
                : tab === "genetic"
                ? "Genetyka"
                : tab === "psychoGhost"
                ? "Psychokineza"
                : tab === "othersGhost"
                ? "Pozostałe"
                : "Pozostałe"}
            </div>
          ))}
        </div>
        {activeTab === "lang" && renderSelectGroup([], [], "lang")}
        {activeTab === "social" &&
          renderSelectGroup(selectLabelsSocial, selectOptionsBasic, "social")}
        {activeTab === "basic" &&
          renderSelectGroup(selectLabelsBasic, selectOptionsBasic, "basic")}
        {activeTab === "special" &&
          renderSelectGroup(
            selectLabelsSpecial,
            selectOptionsSpecial,
            "special"
          )}
          {activeTab === "story" &&
          renderSelectGroup(selectLabelsStory, selectOptionsStory, "story")}
        {activeTab === "craft" &&
          renderSelectGroup(selectLabelsCraft, selectOptionsStandard, "craft")}
        {activeTab === "sport" &&
          renderSelectGroup(selectLabelsSport, selectOptionsStandard, "sport")}
        {activeTab === "genetic" &&
          renderSelectGroup([], selectOptionsGenetic, "genetic")}
        {activeTab === "other" &&
          renderSelectGroup([], selectOptionsStandard, "other")}
        {activeTab === "psychoGhost" &&
          renderSelectGroup(
            selectLabelsGhostPsycho,
            selectOptionsGhostPsycho,
            "psychoGhost"
          )}
        {activeTab === "othersGhost" &&
          renderSelectGroup(
            selectLabelsGhostOthers,
            selectOptionsGhostOthers,
            "othersGhost"
          )}
      </div>

      <div className="selected-skills-summary">
        <div className={`skillPointsToSkillB h9`}>
          Ilość wymienionych punktów statystyk na punkty biegłości:
          <input
            type="text"
            placeholder="Wymienione punkty statystyk na PB"
            value={addPoints}
            onChange={(e) => {
              let newValue = Number(e.target.value) || 0;
              if (newValue > 15) {
                newValue = 15;
              }
              setAddPoints(newValue);
              updateFormData("addPoints", newValue);
            }}
          />{" "}
        </div>
        {renderTotalCostInfo()}
      </div>
      <AllChooseSkill selectedSkillsDetails={allSelectedSkills} />
    </div>
  );
}

export default SkillsB;
