import React from 'react';
import {
  Octicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
} from '@expo/vector-icons';

const size = 14;
const color = '#808080';

export const icon = (name) => {
  let language;

  switch (name) {
  case 'Ruby':
    language = IconRuby();
    break;
  case 'Android':
    language = IconAndroid();
    break;
  case 'Swift':
    language = IconSwift();
    break;
  case 'Go':
    language = IconGo();
    break;
  case 'Python':
    language = IconPython();
    break;
  case 'C':
    language = IconC();
    break;
  case 'HTML':
    language = IconHTML();
    break;
  case 'CSS':
    language = IconCSS();
    break;
  case 'JavaScript':
    language = IconJS();
    break;
  case 'TypeScript':
    language = IconTS();
    break;
  case 'PHP':
    language = IconPHP();
    break;
  case 'People':
    language = IconPeople();
    break;
  default:
    language = IconOther();
  }
  return language;
};

export const IconRuby = () => <Octicons name="ruby" size={size} color={color} />;

export const IconAndroid = () => <MaterialCommunityIcons name="android" size={size} color={color} />;

export const IconSwift = () => <MaterialCommunityIcons name="language-swift" size={size} color={color} />;

export const IconGo = () => <MaterialCommunityIcons name="language-go" size={size} color={color} />;

export const IconPython = () => <MaterialCommunityIcons name="language-python" size={size} color={color} />;

export const IconC = () => <MaterialCommunityIcons name="language-c" size={size} color={color} />;

export const IconHTML = () => <MaterialCommunityIcons name="language-html5" size={size} color={color} />;

export const IconCSS = () => <MaterialCommunityIcons name="language-css3" size={size} color={color} />;

export const IconJS = () => <MaterialCommunityIcons name="language-javascript" size={size} color={color} />;

export const IconTS = () => <MaterialCommunityIcons name="language-typescript" size={size} color={color} />;

export const IconPHP = () => <MaterialCommunityIcons name="language-php" size={size} color={color} />;

export const IconPeople = () => <Ionicons name="ios-people" size={size} color={color} />;

export const IconOther = () => <SimpleLineIcons name="question" size={size} color={color} />;
