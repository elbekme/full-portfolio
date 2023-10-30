import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import '../../pages/skills.css'
import Portfolio from '../../types/portfolio';


interface PortfolioCardProps {
    portfolio: Portfolio;
    editPortfolio: (id: string) => void;
    deletePortfolio: (id: string) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({editPortfolio, deletePortfolio, portfolio }) => {
    const handleDelete = () => {
        deletePortfolio(portfolio._id);
    };
    const handleEdit = () => {
        editPortfolio(portfolio._id);
    }

  return (
    <Card sx={{ maxWidth: 200 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={`https://ap-portfolio-backend.up.railway.app/upload/${portfolio.photo._id}.${portfolio.photo.name.split(".")[1]}`}
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
      {portfolio.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      <Link to={portfolio.url} target="_blank" rel="noopener noreferrer">
          {portfolio.url}
      </Link>
      </Typography>
      <Typography variant="body2" >
        {portfolio.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button color="primary" variant="outlined" endIcon={<EditIcon />} onClick={handleEdit}>
        Edit
      </Button>
      <Button  color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>
          Delete
      </Button>
    </CardActions>
  </Card>
  );
};

export default PortfolioCard;