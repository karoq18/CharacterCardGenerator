
const characterConfig = {
    wizard: {
        excludeFields: ['4', '5', '19', '16'],
        includeSections: ['CharacterMetric', 'Wand', 'ImageCard', 'Biography', 'Credit', 'Skills', 'SkillsB'],
        includeSkillsB: ['lang', 'social', 'basic', 'special', 'story', 'craft', 'sport', 'genetic', 'other'],
        pointsSkillsLimit: 40,
        pointsSkillsBLimit: 70,
      },
    child: {
        excludeFields: ['4', '5', '19', '16'],
        includeSections: ['CharacterMetric', 'Wand', 'ImageCard', 'Biography', 'SkillsB', 'ChildSkill'],
        includeSkillsB: ['lang', 'social', 'basic', 'special', 'story', 'craft', 'sport', 'genetic', 'other'],
        pointsSkillsBLimit: 70,
        maxAge: 10,
    },
    student: {
        excludeFields: ['4', '5', '16'],
        includeSections: ['CharacterMetric', 'Wand', 'ImageCard', 'Biography', 'Skills', 'SkillsB'],
        includeSkillsB: ['lang', 'social', 'basic', 'special', 'story', 'craft', 'sport', 'genetic', 'other'],
        pointsSkillsLimit: 40,
        pointsSkillsBLimit: 70,
        maxAge: 17,
    },
    ghost: {
        excludeFields: ['18', '19', '16'],
        includeSections: ['CharacterMetric', 'ImageCard', 'Biography', 'SkillsB'],
        includeSkillsB: ['psychoGhost', 'othersGhost'],
        pointsSkillsBLimit: 15,
    },
    muggle: {
        excludeFields: ['4', '5', '18', '19', '16', 'dada', 'charms', 'blackMagic', 'healing', 'transmutation', 'alchemy'],
        includeSections: ['CharacterMetric', 'ImageCard', 'Biography', 'Skills','SkillsB'],
        includeSkillsB: ['lang', 'social', 'basic', 'special', 'story', 'craft', 'sport', 'genetic', 'other'],
        pointsSkillsLimit: 10,
        pointsSkillsBLimit: 30,
    },
    dependentCharacter: {
        excludeFields: ['4', '5', '6', '7', '13', '14', '15', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '35', '40'],
        includeSections: ['CharacterMetric', 'Biography', 'SpecificCharacter', 'Skills', 'SkillsB'],
        includeSkillsB: ['lang', 'social', 'basic', 'special', 'story', 'craft', 'sport', 'genetic', 'other'],
        pointsSkillsLimit: 25,
        pointsSkillsBLimit: 50,
    },
    independentCharacter: {
        excludeFields: ['4', '5', '6', '7', '9', '13', '14', '15', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '35', '40'],
        includeSections: ['CharacterMetric','Biography', 'SpecificCharacter'],
        includeSkillsB: ['lang', 'social', 'basic', 'special', 'story', 'craft', 'sport', 'genetic', 'other'],
        pointsSkillsLimit: 30,
        pointsSkillsBLimit: 70,
    },
  };
  
  export default characterConfig;
  