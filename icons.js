import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Octicons,
  MaterialCommunityIcons,

} from '@expo/vector-icons';

export const IconRuby = ({size}) => {
  return <Octicons name='ruby' size={size} color='#808080' />;
};

export const IconAndroid = ({size}) => {
  return <MaterialCommunityIcons name='android' size={size} color='#808080' />;
};

export const IconSwift = ({size}) => {
  return <MaterialCommunityIcons name='language-swift' size={size} color='#808080' />;
};

export const IconGo = ({size}) => {
  return <MaterialCommunityIcons name='language-go' size={size} color='#808080' />;
};

export const IconPython = ({size}) => {
  return <MaterialCommunityIcons name='language-python' size={size} color='#808080' />;
};

export const IconC = ({size}) => {
  return <MaterialCommunityIcons name='language-c' size={size} color='#808080' />;
};

export const IconHTML = ({size}) => {
  return <MaterialCommunityIcons name='language-html5' size={size} color='#808080' />;
};

export const IconCSS = ({size}) => {
  return <MaterialCommunityIcons name='language-css3' size={size} color='#808080' />;
};

export const IconJS = ({size}) => {
  return <MaterialCommunityIcons name='language-javascript' size={size} color='#808080' />;
};

export const IconTS = ({size}) => {
  return <MaterialCommunityIcons name='language-typescript' size={size} color='#808080' />;
};

export const IconPHP = ({size}) => {
  return <MaterialCommunityIcons name='language-php' size={size} color='#808080' />;
};

export const IconPeople = ({size}) => {
  return <Ionicons name='ios-people' size={size} color='#808080' />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
