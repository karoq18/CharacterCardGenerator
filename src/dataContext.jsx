import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    characterType: '',
    selectedOptionsStats: {
      dada: [{ label: 'dada', value: '', bonus: 0 }],
      charms: [{ label: 'charms', value: '', bonus: 0 }],
      blackMagic: [{ label: 'blackMagic', value: '', bonus: 0 }],
      healing: [{ label: 'healing', value: '', bonus: 0 }],
      transmutation: [{ label: 'transmutation', value: '', bonus: 0 }],
      alchemy: [{ label: 'alchemy', value: '', bonus: 0 }],
      fitness: [{ label: 'fitness', value: '', bonus: 0 }],
      agility: [{ label: 'agility', value: '', bonus: 0 }]
    },
    selectedOptionsSkillB: {
      lang: ({ label: 'Ojczysty', value: 'II', cost: 0 }),
      basic: Array.from({ length: 15 }, () => ({ label: '', value: '', cost: 0 })),
      social: Array.from({ length: 4 }, () => ({ label: '', value: '', cost: 0 })),
      special: Array.from({ length: 8 }, () => ({ label: '', value: '', cost: 0 })),
      story: [{ label: 'Organizacja', value: 'Neutralny', cost: 0 }, { label: 'Rozpoznawalność', value: 'I', cost: 0 }],
      craft: Array.from({ length: 11 }, () => ({ label: '', value: '', cost: 0 })),
      sport: Array.from({ length: 10 }, () => ({ label: '', value: '', cost: 0 })),
      genetic: [{ label: '', value: '-', cost: 0 }],
      user: ({ category: '', label: '', value: '', cost: 0 }),
      other: ({ label: '', value: '', cost: 0 }),
      psychoGhost: Array.from({ length: 14 }, () => ({label: '', value: '', cost: 0})),
      othersGhost: Array.from({ length: 1 }, () => ({label: '', value: '', cost: 0})),

    },
    selectedOptions: {
      metric: {
        1: { label: 'Imię: ', name: '', value: '' },
        2: { label: 'Nazwisko: ', name: '', value: '' },
        3: { label: 'Data urodzenia: ', name: '', value: '' },
        4: { label: 'Data śmierci: ', name: '', value: '', },
        5: { label: 'Okoliczności śmierci: ', name: '', value: ''},
        6: { label: 'Nazwisko matki: ', name: '', value: '' },
        7: { label: 'Miejsce zamieszkania: ', name: '', value: '' },
        8: { label: 'Czystość krwi: ', name: '', value: '', },
        9: { label: 'Status majątkowy: ', name: '', value: '' },
        10: { label: 'Zawód: ', name: '', value: '' },
        11: { label: 'Wzrost: ', name: '', value: '' },
        12: { label: 'Waga: ', name: '', value: '' },
        13: { label: 'Kolor włosów: ', name: '', value: '' },
        14: { label: 'Kolor oczu: ', name: '', value: '' },
        15: { label: 'Znaki szczególne: ', name: '', value: '' },
        16: { label: 'Cechy charakterystyczne:', name: '', value: ''},
        18: { label: 'Wiek: ', name: '', value: ''},
        19: { label: 'Rok nauki: ', name: '', value: ''},
        20: { label: 'Dom: ', name: '', value: '' },
        22: { label: 'Bogin: ', name: '', value: '' },
        23: { label: 'Amortencja: ', name: '', value: '' },
        24: { label: 'Ain Eingarp: ', name: '', value: '' },
        25: { label: 'Pasja: ', name: '', value: '' },
        26: { label: 'Quidditch: ', name: '', value: '' },
        27: { label: 'Aktywność: ', name: '', value: '' },
        28: { label: 'Muzyka: ', name: '', value: '' },
        29: { label: 'Wizerunek: ', name: '', value: '' },
        35: { label: 'imageURL', name: '', value: ''},
        40: { label: 'Choroba genetyczna: ', name: '', value: '', }
      },
      wand: {
        1: { label: 'Długość różdżki', value: '' },
        2: { label: 'Elastyczność różdżki', value: '' }
    },
    },
    selectedOptionsCredit: {
       0: { label: 'Statystyki:', value: 0, cost: '' },
       1: { label: 'Biegłości:', value: 0, cost: '' },
       2: { label: 'Umiejętności:', name:'', value: '', cost: '' },
       3: { label: 'Przedmioty sklepik MG:', name:'', value: '', cost: '' },
       4: { label: 'Genetyka:', name: '', value: '', cost: '' },
    },
    biography: (''),
    appearance: (''),
    trivia: (''),
    connections: (''),
    checkboxOption: false,
    totalCost: 0,
    addPoints: 0,
    additionalPoints: 0,
    remainingPointsSkill: 30,
    remainingPointsSkillB: 70,
    selectedOptionsEmotions: {},
    selectedHeart: {},
    selectedWood: {},
    wandRegistration: {},
    creditBill: (0),
  });

  const updateFormData = (name, value, group = null) => {
    setFormData((prevData) => {
      if (group) {
        return {
          ...prevData,
          [group]: {
            ...prevData[group],
            [name]: value,
          }
        };
      } else {
        const newValue = typeof value === 'function' ? value(prevData[name]) : value;
        return {
          ...prevData,
          [name]: newValue,
        };
      }
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
