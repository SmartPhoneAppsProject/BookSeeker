import React, {
  View,
  Text,
} from 'react';
import { StyleSheet } from 'react-native';
import {
  Octicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
} from '@expo/vector-icons';

const size = 14;
const color = '#808080';

export const icon = name => {
  let icon;

  switch (name) {
    case 'Ruby':
      icon = IconRuby();
      break;
    case 'Android':
      icon = IconAndroid();
      break;
    case 'Swift':
      icon = IconSwift();
      break;
    case 'Go':
      icon = IconGo();
      break;
    case 'Python':
      icon = IconPython();
      break;
    case 'C':
      icon = IconC();
      break;
    case 'HTML':
      icon = IconHTML();
      break;
    case 'CSS':
      icon = IconCSS();
      break;
    case 'JavaScript':
      icon = IconJS();
      break;
    case 'TypeScript':
      icon = IconTS();
      break;
    case 'PHP':
      icon = IconPHP();
      break;
    case 'People':
      icon = IconPeople();
      break;
    default:
      icon = IconOther();
  }
  return icon;
};

export const IconRuby = () => {
  return <Octicons name='ruby' size={size} color={color} />;
};

export const IconAndroid = () => {
  return <MaterialCommunityIcons name='android' size={size} color={color} />;
};

export const IconSwift = () => {
  return <MaterialCommunityIcons name='language-swift' size={size} color={color} />;
};

export const IconGo = () => {
  return <MaterialCommunityIcons name='language-go' size={size} color={color} />;
};

export const IconPython = () => {
  return <MaterialCommunityIcons name='language-python' size={size} color={color} />;
};

export const IconC = () => {
  return <MaterialCommunityIcons name='language-c' size={size} color={color} />;
};

export const IconHTML = () => {
  return <MaterialCommunityIcons name='language-html5' size={size} color={color} />;
};

export const IconCSS = () => {
  return <MaterialCommunityIcons name='language-css3' size={size} color={color} />;
};

export const IconJS = () => {
  return <MaterialCommunityIcons name='language-javascript' size={size} color={color} />;
};

export const IconTS = () => {
  return <MaterialCommunityIcons name='language-typescript' size={size} color={color} />;
};

export const IconPHP = () => {
  return <MaterialCommunityIcons name='language-php' size={size} color={color} />;
};

export const IconPeople = () => {
  return <Ionicons name='ios-people' size={size} color={color} />;
};

export const IconOther = () => {
  return <SimpleLineIcons name='question' size={size} color={color} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
