import PropTypes from 'prop-types';

function AllChooseSkill({ selectedSkillsDetails = [] }) {

  const skillsByCategory = selectedSkillsDetails.reduce((acc, skill) => {
    if (skill && skill.category) {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
    }
    return acc;
  }, {});

  return (
    <div className="selected-skills-summary">
      <div className="h5">Wybrane Umiejętności</div>
      {Object.entries(skillsByCategory).map(([category, skills]) => (
        <div key={category}>
          <div className="h8">{category}:</div>
          <ul>
            {skills.map((skill, index) => (
              skill && (
                <li key={index}>{skill?.name} - Poziom: {skill?.value}, Koszt: {skill?.cost} PB</li>
              )
            ))}

          </ul>
        </div>
      ))}
    </div>
  );
}

AllChooseSkill.propTypes = {
  selectedSkillsDetails: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      cost: PropTypes.number,
      category: PropTypes.string,
    })
  ),
};

export default AllChooseSkill;
