import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import {
  Octicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { borrowReturnButton as styles } from './Styles';

const ReturnButton = ({ status, navigate }) => (
  <Button
    icon={
      <Octicons
        name="circle-slash"
        size={30}
        color="#ffffff"
      />
    }
    title="返却"
    titleStyle={styles.title}
    buttonStyle={[styles.button, styles.returnColor]}
    onPress={() => navigate('LentScan', { status })}
  />
);

const BorrowButton = ({ status, navigate }) => (
  <Button
    icon={
      <MaterialCommunityIcons
        name="check-circle-outline"
        size={30}
        color="#ffffff"
      />
    }
    title="貸出"
    titleStyle={styles.title}
    buttonStyle={[styles.button, styles.borrowColor]}
    onPress={() => navigate('LentScan', { status })}
  />
);

const BorrowReturnButton = ({ status, navigate }) => (
  <View style={styles.container}>
    {status ?
      <ReturnButton status={status} navigate={navigate} />
      : <BorrowButton status={status} navigate={navigate} />
    }
  </View>
);

BorrowReturnButton.propTyles = {
  status: PropTypes.bool.isRequired,
  navigate: PropTypes.object.isRequired,
};

export default BorrowReturnButton;
