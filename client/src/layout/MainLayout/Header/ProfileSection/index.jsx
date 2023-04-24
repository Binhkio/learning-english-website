import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IconLogout, IconSettings } from '@tabler/icons';
import MainCard from '../../../../ui-component/cards/MainCard';
import Transitions from '../../../../ui-component/extended/Transitions';
import User1 from '../../../../assets/images/users/user-round.svg';
import token from 'utils/token';
import userUtils from 'utils/user';

function ProfileSection() {
  const theme = useTheme();

  const customization = useSelector((state) => state.customization);

  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(userUtils.getSessionStorage())

  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = async () => {
    token.removeSessionStorage();
    navigate('/auth/login');
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const chipStyle = () => {
    return {
      height: '48px',
      alignItems: 'center',
      borderRadius: '27px',
      transition: 'all .2s ease-in-out',
      borderColor: theme.palette.primary.light,
      backgroundColor: theme.palette.primary.light,
      '&[aria-controls="menu-list-grow"], &:hover': {
        borderColor: theme.palette.primary.main,
        background: `${theme.palette.primary.main}!important`,
        color: theme.palette.primary.light,
        '& svg': {
          stroke: theme.palette.primary.light,
        },
      },
      '& .MuiChip-label': {
        lineHeight: 0,
      },
    };
  };

  return (
    <>
      <Chip
        sx={chipStyle}
        icon={
          <Avatar
            src={User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}>
        {({ TransitionProps }) => (
          <Transitions
            in={open}
            {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center">
                        <Typography variant="h4">Good Morning,</Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}>
                          { userData.name }
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">{ userData.role === 0 ? 'User' : 'Admin' }</Typography>
                    </Stack>
                    <Divider />
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: '100%',
                      maxHeight: 'calc(100vh - 250px)',
                      overflowX: 'hidden',
                    }}>
                    <Box sx={{ p: 2 }}>
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%',
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5,
                          },
                        }}>
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 0}
                          onClick={(event) =>
                            handleListItemClick(event, 0, '/user/edit')
                          }>
                          <ListItemIcon>
                            <IconSettings
                              stroke={1.5}
                              size="1.3rem"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={<Typography variant="body2">Account Settings</Typography>}
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}>
                          <ListItemIcon>
                            <IconLogout
                              stroke={1.5}
                              size="1.3rem"
                            />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
}

export default ProfileSection;
