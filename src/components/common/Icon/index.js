import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';


const getIconFont = (type) => {
  switch (type) {
    
    case 'material':
      return MaterialIcon;
    default:
      return FAIcon;
  }
};

const Icon = ({type, ...props}) => {
  const FontICon = getIconFont(type);

  return <FontICon {...props} />;
};

export default Icon;
