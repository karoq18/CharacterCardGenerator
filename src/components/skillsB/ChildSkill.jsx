import { useState, useContext, useEffect } from "react";
import "./skillsB.css";
import { FormContext } from "../../dataContext";

function ChildSkill() {
  const { formData, updateFormData } = useContext(FormContext);
  const selectedOptionsEmotions = formData.selectedOptionsEmotions;
  const [activeTab, setActiveTab] = useState("ambition");

  const selectedLabelEmotions = {
    ambition: {
      name: "Ambicja",
      details: [
        { range: "1-3", description: "Magia się nie przebudziła." },
        {
          range: "4",
          description:
            "Przedmiot, na którym skupi się dziecko, spokojnie przenosi się do jego rąk; jeśli dziecko tego zechce, przedmiot ten zacznie zachowywać się tak, jakby rzucono na niego facere - zaczyna jednak wykonywać czynności w sposób niezwykle dokładny i pedantyczny (np. pianino gra najtrudniejsze melodie, szczotka wykonuje piękną i skomplikowaną fryzurę, a miotła poleruje na błysk).",
        },
        {
          range: "5",
          description:
            "Uroczy uśmiech dziecka przekona do jego słów każdego; dziecko kłamie jak z nut, zupełnie tak, jakby znalazło się pod wpływem łez nimfy.",
        },
        {
          range: "6",
          description:
            "Dziecko za cokolwiek się bierze, wykonuje swoją pracę perfekcyjnie nawet, jeśli podchodzi do danego zadania po raz pierwszy. Dotyczy zajęć, które nie wymagają wiedzy a praktyki.",
        },
        {
          range: "7",
          description:
            "Wygląd dziecka niezależnie od jego pozycji wyjściowej staje się nagle niezwykle schludny; włosy stają się dobrze ułożone, ubranie czyste i wyprasowane. Dziecko nabiera również daru przekonywania i sprawia wrażenie niezwykle grzecznego.",
        },
        {
          range: "8",
          description:
            "Pozwala wymusić bezwzględne posłuszeństwo na niewielkim dzikim zwierzęciu lub domowym pupilu, jeśli takie znajduje się w pobliżu.",
        },
        {
          range: "9",
          description:
            "Zmienia właściwości obiektu, na którym dziecko się skoncentruje: może zmienić jego wielkość i kolor.",
        },
        {
          range: "10",
          description:
            "W przestrzeni wokół dziecka nastaje natychmiastowy porządek; znikają kurze, brudy, przesuwają się meble, obrazy, by znaleźć się w pedantycznej symetrii, przedmioty układają się w idealnej harmonii.",
        },
      ],
    },
    curiosity: {
      name: "Ciekawość",
      details: [
        { range: "1-3", description: "Magia się nie przebudziła." },
        {
          range: "4",
          description:
            "To dzięki swojej magii dziecko zapamiętuje niezwykle zawiłe informacje, nawet takie, których jeszcze nie jest w stanie w pełni zrozumieć. U dziecka objawia się pamięć ejdetyczna, trwa do końca wątku.",
        },
        {
          range: "5",
          description:
            "Dzięki umysłowi rozjaśnionemu magią dziecko wykona w głowie nawet wybitnie skomplikowane obliczenia, przykładowo podając rachunek prawdopodobieństwa dowolnego zdarzenia.",
        },
        {
          range: "6",
          description:
            "Dziecko przypomina sobie zapamiętaną niegdyś niespotykaną i rzadką ciekawostkę dotyczącą tematu, odnośnie którego toczy się rozmowa lub o którym właśnie rozmyśla albo będącą odpowiedzią na sytuację dziejącą się na oczach dziecka.",
        },
        {
          range: "7",
          description:
            "Dziecko jest w stanie porozumieć się w języku, którego nigdy wcześniej nie słyszało ani nie widziało; efekt utrzymuje się zarówno w mowie, jak i w piśmie i dotyczy języków narodowych, w tym wymarłych, magicznych, run oraz nut.",
        },
        {
          range: "8",
          description:
            "Jeśli w pobliżu znajdują się książki, zaczynają lewitować i sunąć w kierunku dziecka, by mu pomóc; mogą zacząć same odczytywać swoją treść, by je zabawić lub pouczyć, ułożyć się pod jego nogami, by pomóc mu dosięgnąć czegoś znajdującego się poza jego zasięgiem, zasłonić je przed niebezpieczeństwem, uchronić przed upadkiem, etc.",
        },
        {
          range: "9",
          description:
            "Wyostrzają się zmysły dziecka, działają z nadnaturalną siłą, dziecko może podsłuchać wydarzenia z pokoju obok (chyba, że pokój ochroniony jest odpowiednim zaklęciem), wypatrzeć coś niedostrzegalnego dla innych lub wyczuć w smaku choćby odrobinę zaskakującej substancji -np. nielubianego produktu. Na okres tury dziecko otrzymuje +100 do rzutu na spostrzegawczość.",
        },
        {
          range: "10",
          description:
            "	W pobliżu dziecka otwierają się nawet magicznie zamknięte zamki, kłódki, również klamki, których dziecko nie było w stanie wcześniej dosięgnąć, otwierając mu drogę do świata sekretów i nowych doznań.",
        },
      ],
    },
    sulking: {
      name: "Dąsy",
      details: [
        { range: "1-3", description: "Magia się nie przebudziła." },
        {
          range: "4",
          description:
            "Próba jakiejkolwiek ingerencji w przestrzeń dziecka lub włączenie w jego przestrzeń elementów przez dziecko niepożądanych kończy się porażką, np. ścięte włosy odrastają, niechciany sweterek okazuje się zbyt mały, meble w pokoju przestawiają się tak, jak chce je widzieć dziecko, ścięte rośliny odrastają, niechciana owsianka ląduje na suficie, a brukselki same uciekają z talerza.",
        },
        {
          range: "5",
          description:
            "Osoba, która wywołała u dziecka dąsy, traci zdolność porozumiewania się. Głos grzęźnie jej w gardle, nie może wypowiedzieć ani słowa.",
        },
        {
          range: "6",
          description:
            "Zdarzenie lub przedmiot, które wywołało dąsy, zostaje zniszczone; drobne zakrzywienie w czasoprzestrzeni niweluje skutki działania najdalej poprzedniego zdarzenia, a przedmiot odebrany lub zabroniony dziecku ulega zniszczeniu.",
        },
        {
          range: "7",
          description:
            "Iluzja obrażonego dziecka objawia się przed postacią, która dąsy wywołała, do końca wątku i przez dwa kolejne. Iluzja nie odzywa się, nie porusza, ale pojawia się na nowo, jeśli postać się przemieści. Dziecko spogląda na postać z wyrzutem, z niezadowoloną, obrażoną minką, przeważnie ze skrzyżowanymi na piersi rękoma.*",
        },
        {
          range: "8",
          description:
            "Każde tupnięcie dziecka wywołuje nieznośny silny huk, którego efektem jest niegroźne, łagodne trzęsienie ziemi roztaczające się promieniem jednego pola wokół dziecka. Trzęsienie nie zagraża niczyjemu zdrowiu, ale może uszkodzić przedmioty. Trzęsienie trwa jedną turę.",
        },
        {
          range: "9",
          description:
            "Przyprawia postaci, która wywołała u dziecka dąsy, zwierzęcy element ciała (np. uszy, ogon). Przemiana jest niezauważalna i bezbolesna, stąd dorośli często nie zauważają zdarzenia w pierwszej chwili.",
        },
        {
          range: "10",
          description:
            "Temperatura w pomieszczeniu gwałtownie spada (może osiągnąć od 0 do -20 stopni Celsjusza w zależności od stopnia urażenia dziecka), podniesie się dopiero, kiedy dziecku wróci dobry humor.*",
        },
      ],
    },
    anger: {
      name: "Gniew",
      details: [
        { range: "1-3", description: "Magia się nie przebudziła." },
        {
          range: "4",
          description:
            "Trzaskają drzwi, okna i znajdujące się w pobliżu okiennice; zatrzaskują się także zamki, które otworzą się dopiero wtedy, kiedy zechce tego dziecko.*",
        },
        {
          range: "5",
          description:
            "Siła głosu dziecka zwiększa się, dziecko jest w stanie krzyczeć bardzo głośno, będzie go słychać w całym domu - nie powstrzymają go zaklęcia typu muffiato, co więcej, słowom będzie towarzyszyło silne echo.",
        },
        {
          range: "6",
          description:
            "W okół dziecka roztacza się fala uderzeniowa, która działa jak zaklęcie expulso.",
        },
        {
          range: "7",
          description:
            "Dziecko przenosi swoje humorki na najbliżej znajdujący się niższy umysł (zwierzę, magiczne stworzenie), które niekiedy może zaatakować postronną osobę lub sprzeciwić się jej w inny sposób.",
        },
        {
          range: "8",
          description:
            "Stojący najbliżej przedmiot wybucha w widowiskowy sposób.",
        },
        {
          range: "9",
          description:
            "Ślina dziecka zamienia się w silny kwas, jest w stanie przeżreć się przez przedmioty lub zostawić na ciele czarodzieja niegroźną ranę (mugole odczują ją mocniej).",
        },
        {
          range: "10",
          description:
            "Dziecko roztacza wokół siebie specyficzną nieprzyjemną aurę, która skutecznie zniechęca do interakcji z nim większość czarodziejów, zwłaszcza tych obcych. Odbierają dziecko jako dziwne i niepokojące.",
        },
      ],
    },
    dreams: {
      name: "Marzenia",
      details: [
        { range: "1-3", description: "Magia się nie przebudziła." },
        {
          range: "4",
          description:
            "Wymyślony przyjaciel dziecka - może pochodzić z wyobraźni lub dowolnego elementu przestrzeni - ożywa i na okres dwóch tur staje się widoczny dla wszystkich wokół; zachowuje się jednak jak iluzja, która nie jest w stanie dokonać zmian w rzeczywistości. Tylko dziecko ją słyszy.",
        },
        {
          range: "5",
          description:
            "Dziecko przywołuje do siebie okoliczne duchy; po udanym działaniu należy rzucić kością raz jeszcze, wyrzucenie 1 oznacza przyciągnięcie poltergeista.",
        },
        {
          range: "6",
          description:
            "Przyciąga ducha nieżyjącego krewnego, jednak nikt oprócz dziecka nie jest w stanie ani go zobaczyć ani się z nim porozumieć.",
        },
        {
          range: "7",
          description:
            "Dziecko śni na jawie, fragmenty jego snów, marzeń, myśli, przenikają do rzeczywistości i pojawiają się w niej całkiem realnie. Są to drobne fragmenty rzeczywistości, jak np. nieduże zwierzęta, ślady stóp, pojedynczy niewielki przedmiot, etc.",
        },
        {
          range: "8",
          description:
            "Kiedy dziecko zamknie oczy, może unieść się kilka cali w górę, łagodnie lewitując.",
        },
        {
          range: "9",
          description:
            "Wyobraźnia dziecka przenika do rzeczywistości na tyle mocno, że na okres dwóch tur towarzyszący mu czarodzieje zostają wciągnięci do jego świata, przeżywają jego myśli, marzenia, wyobrażenia, lęki i sny.",
        },
        {
          range: "10",
          description:
            "Wymyślony przyjaciel dziecka ożywa i pozostaje niewidoczny dla innych, ale może oddziaływać na otoczenie w sposób, który inni również odczują, np. może zjeść nielubianą przez dziecko brukselkę albo wykonać za dziecko nielubiane obowiązki domowe.",
        },
      ],
    },
    courage: {
      name: "Odwaga",
      details: [
        { range: "1-3", description: "Magia się nie przebudziła." },
        {
          range: "4",
          description:
            "Z drogi dziecka znika dowolna przeszkoda (np. szyba, mur, ściana, płot).",
        },
        {
          range: "5",
          description:
            "Znajduje się w pobliżu przedmioty zaczynają wygrywać chaotyczną motywującą melodię, nawet - lub zwłaszcza - jeśli nie zostały do tego stworzone (np garnki i chochle).",
        },
        {
          range: "6",
          description:
            "Dłonie dziecka zaczynają się żarzyć przyjemnym ciepłym światłem, które nie tylko rozświetla przestrzeń, ale i dodaje otuchy.",
        },
        {
          range: "7",
          description:
            "Dziecko dokonuje drobnej zmiany w czasoprzestrzeni, by uchronić trzecią osobę przed nieszczęśliwym zdarzeniem, np. rozmiękcza schody, usuwa przeszkody spod nóg osób trzecich, stabilizuje drabiny, stołki, podwyższenia.",
        },
        {
          range: "8",
          description:
            "Dziecko wykazuje się niezwykłą siłą charakteru i odwagą zawstydzającą dorosłych; rośnie jego dar perswazji, jest odbierane poważnie, a przyjaźni mu czarodzieje, którzy byli świadkiem jego zachowania, otrzymują +5 do swojego kolejnego rzutu.",
        },
        {
          range: "9",
          description:
            "Dziecko instynktownie wyczuwa zło, czarną magię; przedmioty, ludzi, miejsca objęte klątwami, czarnomagiczne przedmioty, a nawet samych czarnoksiężników (postaci o statystyce czarnej magii wyższej niż 10).",
        },
        {
          range: "10",
          description:
            "Dziecko staje się silniejsze lub zwinniejsze, czuje, że może byś szybsze, podnieść większe ciężary, że poprawiła się jego kondycja i może znieść więcej niedogodności; zdeterminowane będzie w stanie wspiąć się na bardzo wysokie drzewo, a nawet budynek, przeskoczyć szeroką wyrwę, etc.",
        },
      ],
    },
    joy: {
      name: "Radość",
      details: [
        { range: "1-3", description: "Magia się nie przebudziła." },
        {
          range: "4",
          description:
            "Wokół dziecka pojawia się magiczny wróżkowy pył przypominający fae feli, przesuwa się za dzieckiem jak długi welon lub tren - daje dziecku moc lewitacji (do dwóch metrów nad ziemią).",
        },
        {
          range: "5",
          description:
            "Dotknięty przez dziecko przedmiot zamienia się w dowolną zaczarowaną słodycz. Można go odczarować wyłącznie zaklęciem reparifarge.",
        },
        {
          range: "6",
          description:
            "W miejscu, w którym znajduje się dziecko (może być to wnętrze domu) pojawia się doskonale widoczna wielobarwna tęcza.",
        },
        {
          range: "7",
          description:
            "Dziecko wybucha radością (dosłownie); w obrębie pierścienia wokół pola, na którym stoi dziecko, roznosi się fala silnej energii, która rozdmuchuje wszystko, na co trafi. Może niegroźnie zranić lub zniszczyć przedmioty.",
        },
        {
          range: "8",
          description:
            "Dziecko sprawia, że otaczające go przedmioty tego samego gatunku (np. listy, książki, porozrzucane ubrania w pokoju, ale i jabłka na drzewie) unoszą się i przemieszczają chmarą tam, gdzie chce tego dziecko.*",
        },
        {
          range: "9",
          description:
            "Przestrzeń dostosowuje się do oczekiwań i pragnień dziecka, np. ściany, podłogi i sufity malują się na określone barwy, w określone wzory, na twarzach dorosłych pojawią się znamiona, piegi, zwierzęce cechy. Efekt cofnie tylko zaklęcie reparifarge.",
        },
        {
          range: "10",
          description:
            "Wokół dziecka roztacza się szczęśliwa aura, która wywołuje u dorosłych niekontrolowane rozweselenie, nieco jak pod wpływem diablego ziela. Póki dorosły znajduje się w obszarze jej działania, zachowania dziecka bawią go mocniej, niezależnie od tego, jak zareagowałby na nie trzeźwym umysłem. Trwa trzy tury.*",
        },
      ],
    },
    sadness: {
      name: "Smutek",
      details: [
        { range: "1-3", description: "Magia się nie przebudziła." },
        {
          range: "4",
          description:
            "Wokół dziecka, niezależnie od tego, czy znajduje się na zewnątrz, czy wewnątrz, zaczynają kłębić się czarne chmurki, z których spadnie deszcz; deszcz pada wokół dziecka, ale nie na nie bezpośrednio.",
        },
        {
          range: "5",
          description:
            "Wokół dziecka zaczynają się poruszać większe przedmioty, zależnie od otoczenia, np. gałęzie, poduszki, krzesła, które lgną do dziecka i otaczają je fortecą, pozwalając mu schować się przed światem. Forteca jest zadziwiająco wytrzymała, trudno ją rozbroić, łatwiej wywabić z niej dziecko.",
        },
        {
          range: "6",
          description:
            "Dziecko powoduje więdnięcie pobliskich roślin. Efektu nie da się cofnąć. Wszystko, co dorośli wokół dziecka wezmą do rąk, wypadnie im z tych rąk.",
        },
        {
          range: "7",
          description:
            "Emocjonalność dziecka pozwala mu wyczuć emocje drugiej postaci, rzeczywiste, nawet te najbardziej skryte. Nie zna przyczyn ich pojawienia się, ale potrafi je wykryć, rozpoznać i nazwać. Wykrywa także intencje drugiej postaci.",
        },
        {
          range: "8",
          description:
            "Dziecko otacza aura, która odpycha każdego, kto chce go dotknąć. Mija dopiero, kiedy dziecko zgodzi się na dotyk.*",
        },
        {
          range: "9",
          description:
            "Łzy dziecka zaczynają płynąć prawdziwym potokiem - dosłownie - zwiększają swoją objętość i zalewają przestrzeń wokół. Mogą spowodować szkody w mieszkaniu i są przyczyną częstych sprzeczek sąsiedzkich.",
        },
        {
          range: "10",
          description:
            "Duże, smutne oczy dziecka działają jak urok wili rzucony z krytycznym sukcesem; dziecko jest w stanie przekonać dorosłego do wszystkiego, efekt jednak mija z upływem tury, po której dorosły wyrazi zgodę.",
        },
      ],
    },
    fear: {
      name: "Strach",
      details: [
        { range: "1-3", description: "Magia się nie przebudziła." },
        {
          range: "4",
          description:
            "Dziecko deportuje się na odległość do 15 metrów w dowolnym kierunku; dokładne usytuowanie dziecka określa ono samo. Teleportacja może przenieść dziecko również w górę (na dach lub drzewo).",
        },
        {
          range: "5",
          description:
            "Dziecko otacza świetlista przeźroczysta bariera, która przypomina nietłukącą się szybę. Dziecko nie może z niej wyjść, ale tak samo nic (człowiek, pocisk, magia, warunki zewnętrzne) nie przedostanie się do środka. Bariera będzie trwała tak długo, jak długo dziecko będzie czuło strach.",
        },
        {
          range: "6",
          description:
            "Jeżeli zagrożenie pochodzi od zwierzęcia lub magicznego stworzenia, to nagle staje się niezwykle przyjazne. Jeżeli zagrożenie pochodzi od czarodzieja, jego różdżka upada. Jeżeli zagrożenie pochodzi od człowieka posługującego się innym niebezpiecznym przyrządem, ten zamienia się w kwiat wybrany przez dziecko.",
        },
        {
          range: "7",
          description:
            "Dziecko wydaje z siebie ogłuszający krzyk, który oszałamia wszystkich w zasięgu jego głosu. Dziecko może wykonać trzy ruchy zanim inne postaci dojdą do siebie.",
        },
        {
          range: "8",
          description:
            "Dziecko staje się niewidzialne. Efekt będzie trwał tak długo, jak długo dziecko będzie odczuwało strach.*",
        },
        {
          range: "9",
          description:
            "Znajdujące się najbliżej zwierzę rusza dziecku na ratunek.",
        },
        {
          range: "10",
          description:
            "Dziecko teleportuje się za plecy najbliżej znajdującego się dorosłego, któremu ufa.",
        },
      ],
    },
  };

  useEffect(() => {
    const selectedEmotion = selectedLabelEmotions[activeTab];

    if (
      formData.selectedOptionsEmotions?.name !== selectedEmotion.name ||
      JSON.stringify(formData.selectedOptionsEmotions?.details) !==
        JSON.stringify(selectedEmotion.details)
    ) {
      updateFormData("selectedOptionsEmotions", {
        name: selectedEmotion.name,
        details: selectedEmotion.details.map((detail) => ({
          range: detail.range,
          description: detail.description,
        })),
      });
    }
  }, [activeTab]);

  const renderEmotionTable = () => {
    const emotion = selectedLabelEmotions[activeTab];
    if (!emotion) return null;

    return (
      <div className="tableEmotion">
        <div className="tableEmotion-header">
          <div className={`tableEmotion-cell emotion-cell`}>EMOCJA</div>
          <div className={`tableEmotion-cell range-cell`}>K10</div>
          <div className={`tableEmotion-cell description-cell`}>EFEKT</div>
        </div>

        <div className="tableEmotion-content">
          <div className="emotion-row">
            <div className="emotion">{emotion.name}</div>
            <div className="detailsEmotion">
              {emotion.details.map((detail, index) => (
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

  return (
    <div className="metricConteneir">
      <div className="h2">Emocje</div>

      <div className="tabs-container">
        <div className="tabs-header">
          {Object.keys(selectedLabelEmotions).map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {selectedLabelEmotions[tab].name}
            </div>
          ))}
        </div>
        {renderEmotionTable()}
      </div>
    </div>
  );
}

export default ChildSkill;
