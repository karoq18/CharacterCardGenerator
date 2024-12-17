# Generator Karty Postaci 

Aplikacja do tworzenia kart postaci została zaprojektowana zgodnie z mechaniką gry PBF (Play by Forum) w świecie fantasy. Oferuje dynamiczną konfigurację pól, zarządzanie metryką, statystykami, biegłościami, wybór różdżki oraz generowanie kodu HTML zgodnego z formatem forum internetowego. System automatycznie dostosowuje widoczność pól do wybranego typu postaci, zapewniając pełną personalizację i zgodność z zasadami gry.

**Uwaga:** Aplikacja została dostosowana do specyficznych wymagań jednego z forów PBF. Osoby zainteresowane wykorzystaniem projektu na innych forach mogą zmodyfikować kod, aby dostosować go do własnych potrzeb.

## Demo Live

🚀 **[Zobacz Demo Live](http://www.morsmordre.addhost.pl/karta/index.html)** 🚀

## Funkcjonalności

- **Podpowiedzi:** Każdy formularz oraz jego pole posiadają wskazówki, aby ułatwić zrozumienie i stworzenie karty postaci.
- **Dynamiczne formularze:** Pola formularza są modyfikowane na podstawie konfiguracji z pliku `characterConfig`. Wybór typu postaci (dziecko, duch, charłak, czarodziej itp.) wpływa na widoczność komponentów i danych.
- **Metryka główna:** Możliwość wprowadzenia podstawowych danych o postaci. Wybór niektórych pól wpływa na statystyki oraz biegłości.
- **Statystyki:** Możliwość rozdania statystyk z uwzględnieniem przysługującej danej postaci liczby oraz pełną walidacją.
- **Biegłości:** Możliwość wybrania poziomu biegłości, dodania własnych biegłości oraz system liczenia punktów wraz z walidacją.
- **Biografia:** Możliwość napisania biografii z opcją dodawania formatowania (BBCode) zgodnego z konkretnym forum.
- **Wybór różdżki:** Konfigurator różdżki z wyborem rdzenia i drewna.
- **Podgląd na żywo:** Interaktywny podgląd wyglądu karty postaci w czasie rzeczywistym.
- **Generowanie gotowego kodu HTML:** Gotowy kod karty do skopiowania i umieszczenia na zewnętrznym forum zgodnie ze specyfikacją.
- **Emocje dla postaci dziecka:** Dzieci mają dodatkowe opcje wyboru emocji.

## Technologie

- **Frontend:** React + Vite
- **Stan aplikacji:** Context API
- **Formatowanie danych:** Dynamiczna konfiguracja z pliku `characterConfig`
- **Stylizacja:** CSS  

Projekt oparty na nowoczesnym stacku frontendu z wykorzystaniem React i Vite, co zapewnia wydajność i łatwość rozwoju.

## Autor

**Karolina Ćwiklińska**  
Projekt rozwijany z myślą o łatwym i intuicyjnym tworzeniu kart postaci dla społeczności graczy PBF.
