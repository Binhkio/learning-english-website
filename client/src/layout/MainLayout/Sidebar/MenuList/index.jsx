import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import userUtils from 'utils/user';
import { useState } from 'react';
import _ from 'lodash'
import { useNavigate } from 'react-router';

const MenuList = () => {
  const [user, setUser] = useState(userUtils.getSessionStorage());
  const navigate = useNavigate()
  if(_.isNil(user)){
    return navigate('/auth/login')
  }

  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        if (user.role === 1 && !_.isNil(user)) {
          return (
            <NavGroup
              key={item.id}
              item={item}
            />
          );
        } else if (item.id !== 'manage')
          return (
            <NavGroup
              key={item.id}
              item={item}
            />
          );
        break;
      default:
        return (
          <Typography
            key={item.id}
            variant="h6"
            color="error"
            align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
