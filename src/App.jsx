import './app.css';
import { AdditionalPointsProvider } from './Context';
import NavigationMenu from './components/main/NavigationMenu';
import { FormProvider } from './dataContext';
import CharacterSelection from './components/main/CharacterSelection'; 
import { useState } from 'react';

function App() {
  const [characterSelected, setCharacterSelected] = useState(false);

  const handleCharacterSelect = () => {
    setCharacterSelected(true);
  };

  return (
    <FormProvider>
      <AdditionalPointsProvider>
        {!characterSelected ? (
          <CharacterSelection onCharacterSelect={handleCharacterSelect} />
        ) : (
          <NavigationMenu />
        )}
      </AdditionalPointsProvider>
    </FormProvider>
  );
}

export default App;