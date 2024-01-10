import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import '../../pages/skills.css';
import Message from '../../types/message';


interface MessageCardProps {
    message: Message;
    userId: string;
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
    const userId = localStorage.getItem("PORTFOLIO_USER")
    ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
    : null;
  return (
      <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2>{message.title}</h2>
          <h4>{message.user}</h4>
          <h4>{message.answer}</h4>
          <p style={{color:"white"}}>{message.message}</p>
        </div>
        {userId.role === 'client' ? "" : 
                <div className="flip-card-back">
                <Button variant="outlined" color="primary" endIcon={<EditIcon />} onClick={handleEdit}>
                    Edit
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
                    Delete
                </Button>
                </div>}
      </div>
    </div>
  );
};

export default MessageCard;