import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import UserInformationComponent from './user-information';
import ChangePasswordComponent from './change-password'

function UserEdit() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <MainCard title="Thay đổi thông tin người dùng">
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example">
              <Tab
                label="User Informantion"
                value="1"
                icon={<PersonIcon />}
                sx={{ flexDirection: 'row' }}
              />
              <Tab
                label="Change password"
                value="2"
                icon={<EditIcon />}
                sx={{ flexDirection: 'row' }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <UserInformationComponent />
          </TabPanel>
          <TabPanel value="2">
            <ChangePasswordComponent />
          </TabPanel>
        </TabContext>
      </Box>
    </MainCard>
  );
}

export default UserEdit;
