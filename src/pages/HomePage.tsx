import * as React from 'react';
import { Fragment, useEffect } from "react";
import { CircularProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// import AdminLayout from "../components/AdminLayout";
import useEducation from "../store/education";
import useExperience from "../store/experience";
import usePortfolio from "../store/portfolio";
import useSkill from "../store/skill";
import useMessage from '../store/message';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

const HomePage = () => {
  const [progress, setProgress] = React.useState(0);
  const {
    user,
    getSkills,
    total: skillTotal,
  } = useSkill();

  const {
    total: educationTotal,
    getEducations,
  } = useEducation();

  const {
    total: experienceTotal,
    getExperiences,
  } = useExperience();

  const {
    total: portfolioTotal,
    getPortfolios,
  } = usePortfolio();

  const {
    total: messageTotal,
    getMessages,
  } = useMessage();

  useEffect(() => {
    getSkills();
    getEducations();
    getExperiences();
    getPortfolios();
    getMessages();
  }, [getSkills, user, getEducations, getExperiences, getPortfolios, getMessages]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Fragment>
      <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Stack spacing={4} direction="row">
        <h2>Skills {skillTotal}</h2>
        {/* <CircularProgress variant="determinate" value={skillTotal} /> */}
        <CircularProgress variant="determinate" value={progress} />
      </Stack>
      </CardContent>
      </Card>
      <br />
      <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Stack spacing={4} direction="row">
        <h2>Portfolios {portfolioTotal}</h2>
        {/* <CircularProgress variant="determinate" value={portfolioTotal} /> */}
        <CircularProgress variant="determinate" value={progress} />
      </Stack>
      </CardContent>
      </Card>
      <br/>
      <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Stack spacing={4} direction="row">
        <h2>Educations {educationTotal}</h2>
        {/* <CircularProgress variant="determinate" value={educationTotal} /> */}
        <CircularProgress variant="determinate" value={progress} />
      </Stack>
      </CardContent>
      </Card>
      <br/>
      <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Stack spacing={4} direction="row">
        <h2>Experiences {experienceTotal}</h2>
        {/* <CircularProgress variant="determinate" value={experienceTotal} /> */}
        <CircularProgress variant="determinate" value={progress} />
      </Stack>
      </CardContent>
      </Card>
      <br/>
      <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Stack spacing={4} direction="row">
        <h2>Messages {messageTotal}</h2>
        {/* <CircularProgress variant="determinate" value={messageTotal} /> */}
        <CircularProgress variant="determinate" value={progress} />
      </Stack>
      </CardContent>
      </Card>

      {/* <AdminLayout /> */}
    </Fragment>
  );
};

export default HomePage;
