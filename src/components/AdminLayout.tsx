// import * as React from 'react';
// import { Outlet, useNavigate, NavLink, Link } from "react-router-dom";
// import Cookies from 'js-cookie';
// import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import BookIcon from '@mui/icons-material/Book';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import AssignmentIcon from '@mui/icons-material/Assignment';  
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import MailIcon from '@mui/icons-material/Mail';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

// import { TOKEN } from '../constants/index';
// import './adminLayout.css';


// const drawerWidth = 200;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(6)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 0),

//   ...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );



// const AdminLayout: React.FC = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

//   const handleDrawerOpen: () => void = () => {
//     setOpen(true);
//   };
  
//   const handleDrawerClose: () => void = () => {
//     setOpen(false);
//   };
  
//   const logout: () => void = () => {
//     Cookies.remove(TOKEN);
//     navigate('/');
//   };

//   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
  
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: 'none' }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//             <div className="header">
//               <div>
//               <IconButton
//                 size="large"
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleMenu}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}><NavLink className="header-acc" to="/profile">Profile</NavLink></MenuItem>
//                 <MenuItem onClick={handleClose}><NavLink className="header-acc" to="/account">My account</NavLink></MenuItem>
//               </Menu>
//             </div>
//             </div>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {[{ text: "Home", link: "/home", icon: <HomeIcon /> },
//           { text: "Skills", link: "/skills", icon: <AssignmentIndIcon /> },
//           { text: "Portfolios", link: "/portfolio", icon: <AssignmentIcon /> },
//           { text: "Educations", link: "/education", icon: <BookIcon /> },
//           { text: "Experience", link: "/experience", icon: <LibraryBooksIcon /> },
//           { text: "Messages", link: "/message", icon: <MailIcon /> },
//           { text: "Logout", link:'/', icon:<LogoutIcon  onClick={logout} style={{ border: "none", background: "none", cursor: "pointer" }}/>}]
//           .map((item) => (
//             <ListItem key={item.text} disablePadding>
//             <ListItemButton  key={item.text} component={Link} to={item.link}>
//               <ListItemIcon >{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <Outlet />
        
//       </Box>
//     </Box>
//   );
// };

// export default AdminLayout;

import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LineChartOutlined,
  LogoutOutlined,
  ProfileOutlined,
  BookOutlined,
  ProjectOutlined,
  MessageOutlined,
  BarChartOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './adminLayout.css';
import { TOKEN } from '../constants';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

  const logout: () => void = () => {
    Cookies.remove(TOKEN);
    navigate('/');
  };


  return (
    <Layout className="admin-layout" style={{ background: 'black' }}>
      <Sider style={{ background: 'white' }} trigger={null} collapsible collapsed={collapsed}>
      {/* <div className="admin-logo">Portfolio Client</div> */}
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: '/profile',
              icon: <UserOutlined />,
              label: <Link style={{textDecoration: 'none'}} to="/profile">Profile</Link>,
            },
            {
              key: '/account',
              icon: <IdcardOutlined />,
              label: <Link style={{textDecoration: 'none'}} to="/account">My Account</Link>,
            },
            {
              key: '/dashboard',
              icon: <BarChartOutlined />,
              label: <Link style={{textDecoration: 'none'}} to="/dashboard">Dashboard</Link>,
            },
            {
              key: '/skills',
              icon: <LineChartOutlined />,
              label: <Link style={{textDecoration: 'none'}} to="/skills">Skills</Link>,
            },
            {
              key: '/portfolio',
              icon: <ProfileOutlined />,
              label: <Link style={{textDecoration: 'none'}} to="/portfolio">Portfolios</Link>,
            },
            {
              key: '/education',
              icon: <BookOutlined />,
              label: <Link style={{textDecoration: 'none'}} to="/education">Educations</Link>,
            },
            {
              key: '/experience',
              icon: <ProjectOutlined />,
              label: <Link style={{textDecoration: 'none'}} to="/experience">Experiences</Link>,
            },
            {
              key: '/message',
              icon: <MessageOutlined />,
              label: <Link style={{textDecoration: 'none'}} to="/message">Messages</Link>,
            },
            {
              key: '/',
              icon: <LogoutOutlined />,
              label: <Button onClick={logout} type="primary" danger>Log out</Button>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;