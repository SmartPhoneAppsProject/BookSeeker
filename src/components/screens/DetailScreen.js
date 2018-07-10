import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';
import {
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons';

import { icon } from '../../utils/Icons';

const renderTags = (tags) => {
  const formatted = [];

  for (let i = 0; i < tags.length; i += 1) {
    const container = (
      <View
        style={styles.tag}
        key={tags[i].id}
      >
        <Text style={styles.tagText}>
          {icon(tags[i].name)}{tags[i].name}
        </Text>;
      </View>
    );

    formatted.push(container);
  }

  return (
    <View style={[styles.base, styles.tagContainer]}>
      <ScrollView horizontal>
        {formatted}
      </ScrollView>
    </View>
  );
};

const renderImage = (uri) => {
  let imageUri = uri;
  if (imageUri === 'none') {
    imageUri = 'https://facebook.github.io/react/logo-og.png';
  }

  return (
    <View style={[styles.base, styles.imgContainer]}>
      <Image style={styles.img} source={{ uri: imageUri }} />
    </View>
  );
};

const renderIcon = (status) => {
  if (status === true) {
    return (
      <View style={[styles.base, styles.status]}>
        <Octicons name="circle-slash" size={40} color="#cd5c5c" />
      </View>
    );
  }

  return (
    <View style={[styles.base, styles.status]}>
      <MaterialCommunityIcons name="check-circle-outline" size={40} color="#2e8b57" />
    </View>
  );
};

const renderButton = (status, navigate) => {
  if (status === true) {
    return (
      <View style={[styles.base, styles.buttonContainer]}>
        <Button
          icon={<MaterialCommunityIcons name="keyboard-return" size={30} color="white" />}
          title="返却"
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={{ width: 100, height: 60, backgroundColor: '#cd5c5c' }}
          iconContainerStyle={{ marginRight: 10 }}
          onPress={() => navigate('LentScan', { action: 'return' })}
        />
      </View>
    );
  }

  return (
    <View style={[styles.base, styles.buttonContainer]}>
      <Button
        icon={<MaterialCommunityIcons name="book-open-page-variant" size={30} color="white" />}
        title="貸出"
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{ width: 100, height: 60, backgroundColor: '#2e8b57' }}
        iconContainerStyle={{ marginRight: 10 }}
        onPress={() => navigate('LentScan', { action: 'lend' })}
      />
    </View>
  );
};

export default class DetailScreen extends Component {
  static navigationOptions = {
    title: '詳細',
  };

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { tags, status, image } = this.props.navigation.state.params.item;

    return (
      <View style={styles.container}>
        {renderImage(image)}
        <View style={styles.mainContainer}>
          {renderTags(tags)}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{params.item.title}</Text>
            <Text style={styles.date}>出版日：{params.item.published_at}</Text>
          </View>
          <View style={styles.statusContainer}>
            {renderIcon(status)}
            {renderButton(status, navigate)}
          </View>
        </View>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    flex: 1,
  },
  img: {
    height: 300,
    width,
  },
  mainContainer: {
    flex: 1,
  },
  tagContainer: {
    flex: 0.5,
    margin: 10,
  },
  tag: {
    margin: 3,
    paddingVertical: 8,
  },
  tagText: {
    paddingRight: 5,
    color: '#808080',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  dateContainer: {
    flex: 0.4,
  },
  date: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  status: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    width: 70,
  },
});
