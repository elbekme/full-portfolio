import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import '../../pages/skills.css';
import Education from '../../types/education';


interface EducationCardProps {
    education: Education;
}

const EducationCard: React.FC<EducationCardProps> = ({editEducation, deleteEducation, education }) => {
    const handleDelete = () => {
        deleteEducation(education._id);
    };
    const handleEdit = () => {
        editEducation(education._id);
    }

  return (
      <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2>{education.name}</h2>
          <h2>{education.level}</h2>
          <p style={{color:"white"}}>{education.description}</p>
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

export default EducationCard;