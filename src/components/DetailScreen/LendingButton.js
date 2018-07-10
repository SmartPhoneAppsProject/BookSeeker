import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { lendingButton as styles } from './Styles';

const LendingButton = ({ status, navigate }) => {
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

LendingButton.propTyles = {
  status: PropTypes.bool.isRequired,
  navigate: PropTypes.object.isRequired,
};

export default LendingButton;
