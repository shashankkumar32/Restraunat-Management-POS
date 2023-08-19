
import React from 'react';
import * as MaterialIcons from '@mui/icons-material';



const CustomIcon= ({ iconName }) => {
  const ans=iconName
  const IconComponent = MaterialIcons[ans];

  if (IconComponent) {
    return <IconComponent />;
  }

  return null;
};

export default CustomIcon;

