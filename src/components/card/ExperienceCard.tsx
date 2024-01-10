import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import '../../pages/skills.css';
import Experience from '../../types/experience';


interface ExperinceCardProps {
    experience: Experience;
    editExperience: (id: string) => void;
    deleteExperience: (id: string) => void;
}

const ExperienceCard: React.FC<ExperinceCardProps> = ({editExperience, deleteExperience, experience }) => {
    const handleDelete = () => {
        deleteExperience(experience._id);
    };
    const handleEdit = () => {
        editExperience(experience._id);
    }

  return (
      <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2>{experience.workName}</h2>
          <h4>{experience.companyName}</h4>
          <p style={{color:"white"}}>{experience.description}</p>
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

export default ExperienceCard;