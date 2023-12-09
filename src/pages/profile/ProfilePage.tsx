import * as React from 'react';
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import AppBar from '@mui/material/AppBar';
import BootstrapCard  from 'react-bootstrap/Card';
// import Card from '@mui/material/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

import '../profile/profile.css';
import useSkill from '../../store/skill';
import Skill from '../../types/skill';
import useEducation from '../../store/education';
import Education from '../../types/education';
import useExperience from '../../store/experience';
import Experience from '../../types/experience';
import usePortfolio from '../../store/portfolio';
import Portfolio from '../../types/portfolio';
import useMessage from '../../store/message';
import Message from '../../types/message';
import useAccount from '../../store/account';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// const bull=(
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', backgroundColor: 'black', }}
//   >
//     •
//   </Box>
// );

const ProfilePage: React.FC = () => {
  const {
    user,
    skills,
    loading,
    getSkills,
  } = useSkill();

  const {
    educations,
    loading: educationLoading,
    getEducations,
  } = useEducation();

  const {
    experiences,
    loading: experienceLoading,
    getExperiences,
  } = useExperience();

  const {
    messages,
    loading: messageLoading,
    getMessages,
  } = useMessage();

  const {
    portfolios,
    loading: portfolioLoading,
    getPortfolios,
  } = usePortfolio();
  
  const userInfo = localStorage.getItem("PORTFOLIO_USER")
  ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
  : null;
  console.log(userInfo);

  const{
    account,
    getAccount,
  } = useAccount();



  useEffect(() => {
    getSkills();
    getEducations();
    getExperiences();
    getPortfolios();
    getMessages();
    getAccount();
  }, [getSkills, getMessages, getEducations, getExperiences, getPortfolios, getAccount, user]);


  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        <AppBar>
          <Toolbar className="profile-header" >
            <Typography className="profile-header-item" variant="h6" component="div">
                  <a className="profile-link" href="#education">education</a>
                  <a className="profile-link" href="#skill">skills</a>
                  <a className="profile-link" href="#experience">experience</a>
                  <a className="profile-link" href="#portfolio">portfolios</a>
                  <a className="profile-link" href="#messages">message</a>
                  <NavLink to="/home">
                    <button className="btn-back">go back</button>
                </NavLink>
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container sx={{ marginBottom: '40px' }}>
        <Box sx={{ my: 2 }}>
            <div className="header-info">
              <div className="header-info-text">
                <div className="header-info_user">Hi! My name is {userInfo.firstName}. My last name is {userInfo.lastName}. 
                My user name {userInfo.username}. 
                My role is {userInfo.role}.</div>
              </div>
              <div className="header-info-img">
                <img className="header-image" src={`https://ap-portfolio-backend.up.railway.app/upload/${account.photo}`} alt="image" />
              </div>
            </div>
        </Box>


            <h1 className="skills-heading" id="skill">Skills</h1>
            <div className="profile-skill">
              <Box sx={{my: 2, width:'100%'}}>
              {loading ? (
                <div className="loader"></div>
              ) : (
                <Carousel     
                // autoPlay={true}
                interval={1500}
                controls={true}
                indicators={false} 
                variant="dark" data-bs-theme="dark">
                  {skills.map((skill: Skill) => (
                    <Carousel.Item key={skill._id} >
                      <div className="carousel-text"> 
                      <BootstrapCard className="carousel-text " style={{ minWidth: '300px'}}>
                        <ListGroup variant="flush">
                        <ListGroup.Item style={{ fontWeight: 'bold' }}>Name:  {skill.name}</ListGroup.Item>
                        <ListGroup.Item>Percent:  {skill.percent}</ListGroup.Item>
                        </ListGroup>
                      </BootstrapCard>
                    </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
              </Box>
            </div>

            <hr />
            <h1 className="skills-heading" id="education">Education</h1>
            <div className="profile-skill">
              <Box sx={{my: 2, width:'100%'}}>
              {educationLoading ? (
                <div className="loader"></div>
              ) : (
                <Carousel     
                // autoPlay={true}
                interval={1500}
                controls={true}
                indicators={false} 
                variant="dark" data-bs-theme="dark">
                  {educations.map((education: Education) => (
                    <Carousel.Item key={education._id} >
                      <div className="carousel-text"> 
                      <BootstrapCard className="carousel-text" style={{ minWidth: '300px'}}>
                        <ListGroup variant="flush">
                        <ListGroup.Item style={{ fontWeight: 'bold' }}>Name: {education.name}</ListGroup.Item>
                        <ListGroup.Item>Level: {education.level}</ListGroup.Item>
                        <ListGroup.Item>Description: {education.description}</ListGroup.Item>
                        <ListGroup.Item>Start date: {education.startDate}</ListGroup.Item>
                        <ListGroup.Item>End date: {education.endDate}</ListGroup.Item>
                        </ListGroup>
                      </BootstrapCard>
                    </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
              </Box>
            </div>
            
            <hr />
            <h1 className="skills-heading" id="experience">Experience</h1>
            <div className="profile-skill">
              <Box sx={{my: 2, width:'100%'}}>
              {experienceLoading ? (
                <div className="loader"></div>
              ) : (
                <Carousel     
                // autoPlay={true}
                interval={1500}
                controls={true}
                indicators={false} 
                variant="dark" data-bs-theme="dark">
                  {experiences.map((experience: Experience) => (
                    <Carousel.Item key={experience._id} >
                      <div className="carousel-text"> 
                      <BootstrapCard className="carousel-text " style={{ minWidth: '300px'}}>
                        <ListGroup variant="flush">
                        <ListGroup.Item style={{ fontWeight: 'bold' }}>Company name: {experience.companyName}</ListGroup.Item>
                        <ListGroup.Item>Work name: {experience.workName}</ListGroup.Item>
                        <ListGroup.Item>Description: {experience.description}</ListGroup.Item>
                        <ListGroup.Item>Staet date: {experience.startDate}</ListGroup.Item>
                        <ListGroup.Item>End date: {experience.endDate}</ListGroup.Item>
                        </ListGroup>
                      </BootstrapCard>
                    </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
              </Box>
            </div>
            
            <hr />
            <h1 className="skills-heading" id="portfolio">Portfolio</h1>
            <div className="profile-skill">
              <Box sx={{my: 2, width:'100%'}}>
              {portfolioLoading ? (
                <div className="loader"></div>
              ) : (
                <Carousel     
                interval={1500}
                controls={true}
                indicators={false} 
                variant="dark" data-bs-theme="dark">
                  {portfolios.map((portfolio: Portfolio) => (
                    <Carousel.Item key={portfolio._id} >
                      <div className="carousel-text"> 
                      <BootstrapCard className="carousel-text " style={{ minWidth: '200px', maxWidth: '300px'}}>
                        <BootstrapCard.Img variant="top" style={{width:'100%',maxHeight:"200px"}} src={`https://ap-portfolio-backend.up.railway.app/upload/${portfolio.photo._id}.${portfolio.photo.name.split(".")[1]}`}  />
                        <BootstrapCard.Body>
                          <BootstrapCard.Title>Name: {portfolio.name}</BootstrapCard.Title>
                        </BootstrapCard.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>Description: {portfolio.description}</ListGroup.Item>
                          <BootstrapCard.Link style={{padding:'5px 15px'}} target="_blank" href={portfolio.url}>Portfolio url</BootstrapCard.Link>
                        </ListGroup>
                      </BootstrapCard>
                    </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
              </Box>
            </div>
            
            <hr />
            <h1 className="skills-heading" id="messages">Messages</h1>
            <div className="profile-skill">
              <Box sx={{my: 2, width:'100%'}}>
              {messageLoading ? (
                <div className="loader"></div>
              ) : (
                <Carousel     
                // autoPlay={true}
                interval={1500}
                controls={true}
                indicators={false} 
                variant="dark" data-bs-theme="dark">
                  {messages.map((message: Message) => (
                    <Carousel.Item key={message._id} >
                      <div className="carousel-text"> 
                      <BootstrapCard className="carousel-text" style={{ minWidth: '300px'}}>
                        <ListGroup variant="flush">
                        <ListGroup.Item style={{ fontWeight: 'bold' }}>Title: {message.title}</ListGroup.Item>
                        <ListGroup.Item>User: {message.user}</ListGroup.Item>
                        <ListGroup.Item>Message: {message.message}</ListGroup.Item>
                        <ListGroup.Item>Answer: {message.answer}</ListGroup.Item>
                        </ListGroup>
                      </BootstrapCard>
                    </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
              </Box>
            </div>
        
      <Box sx={{my: 2}}>
        <div className="footer-profile">
            <div className="footer-profile-info">
              <h4>This site was created by Elbek Juraqulov</h4>
            </div>
            <div className="footer-profile-contact">
              <a className="footer-logo" href="https://github.com/elbekme/full-portfolio" target="_blank" rel="noopener noreferrer">
                <GitHubIcon fontSize="large" />
              </a>
              <a className="footer-logo" href="https://instagram.com/eldorov1c_?igshid=NGVhN2U2NjQ0Yg==" target="_blank" rel="noopener noreferrer">
                <InstagramIcon fontSize="large" />
              </a>
              <a className="footer-logo" href="https://t.me/Im_elbek" target="_blank" rel="noopener noreferrer">
                <TelegramIcon fontSize="large" />
              </a>
            </div>
          </div>
      </Box>
      </Container>
    </React.Fragment>
  );
};

export default ProfilePage;
