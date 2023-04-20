import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import userUtils from 'utils/user';
// import { useEffect } from 'react';
import { useState } from 'react';

const MenuList = () => {
  const [user, setUser] = useState(userUtils.getSessionStorage());

  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        if (user.role === 1) {
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
