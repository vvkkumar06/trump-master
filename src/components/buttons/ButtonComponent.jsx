import React from 'react';
import { Button } from 'react-native-paper';
import colors from './../../assets/styles/_variables';

const TMButton = ({label, type, icon, style, labelStyle, dark=true, onPressHandler}) => {
  return (
    <Button 
      icon={icon} 
      mode="elevated" 
      dark={dark} 
      onPress={onPressHandler} 
      buttonColor={colors[type]} 
      style ={style}
      labelStyle={labelStyle}
    >
      {label}
    </Button>
  );
}
export default TMButton;