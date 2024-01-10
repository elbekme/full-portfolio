import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';

import Skill from "../../types/skill";
import '../../pages/skills.css';


interface SkillCardProps {
  skill: Skill;
  editSkill: (id: string) => void;
  deleteSkill: (id: string) => void;
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
          <h2>{skill.name}</h2>
          <h3>{skill.percent}</h3>
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


        // <tbody style={{backgroundColor: 'white'}}>
        //   <tr style={{background: 'white'}}>
        //         <td style={{background: 'white'}}>{skill.name}</td>
        //         <td>{skill.percent}</td>
        //         <td style={{ display: 'flex', gap: '15px' }}>
        //         <Button variant="outlined" color="primary" endIcon={<EditIcon />} onClick={handleEdit}>
        //             Edit
        //         </Button>
        //         <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
        //             Delete
        //         </Button>
        //         </td>
        //   </tr>
        // </tbody>
  );
};

export default SkillCard;
