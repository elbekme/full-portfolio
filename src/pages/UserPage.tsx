import { NavLink } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import '../pages/userPage.css';

const userPage = () => {
  return (<div className="user">
    <div className="cardd ">
        <div className="card-body">
            <h2 className="card-title ">You are User !</h2>
            <p className="card-line"></p>
            <p className="card-text">If you want to use our site, contact the client or Admin</p>
            <p className="card-line"></p>
            <div className="card-footer">
                <NavLink to="/home">
                    <Button variant="contained">Go Back</Button>
                </NavLink>
                <Button endIcon={<SendIcon />} variant="outlined" href="https://t.me/Im_elbek">
                    Contact the Client 
                </Button>
            </div>
        </div>
    </div>
  </div>
  )
}

export default userPage