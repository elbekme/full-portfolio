import * as React from 'react';
import Skill from "../../types/skill";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import '../../pages/skills.css';


interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({deleteSkill, editSkill, skill }) => {
    const handleDelete = () => {
        deleteSkill(skill._id);
    };
    const handleEdit = () => {
        editSkill(skill._id);
    }

  return (
      <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h1>{skill.name}</h1>
          <h1>{skill.percent}</h1>
        </div>
        <div className="flip-card-back">
        <Button variant="outlined" color="primary" endIcon={<EditIcon />} onClick={handleEdit}>
            Edit
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
            Delete
        </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;