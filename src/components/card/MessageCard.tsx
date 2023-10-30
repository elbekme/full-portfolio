import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import '../../pages/skills.css';
import Message from '../../types/message';


interface MessageCardProps {
    message: Message;
    editMessage: (id: string) => void;
    deleteMessage: (id: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({editMessage, deleteMessage, message }) => {
    const handleDelete = () => {
        deleteMessage(message._id);
    };
    const handleEdit = () => {
        editMessage(message._id);
    }

  return (
      <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2>{message.title}</h2>
          <h2>{message.user}</h2>
          <h2>{message.answer}</h2>
          <p style={{color:"white"}}>{message.message}</p>
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

export default MessageCard;