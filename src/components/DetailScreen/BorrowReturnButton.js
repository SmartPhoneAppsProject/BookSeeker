import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { borrowReturnButton as styles } from './Styles';

const RenderButton = (props) => {
  const {
    title,
    bgColor,
    action,
    navigate,
  } = props;

  return (
    <View style={[styles.base, styles.buttonContainer]}>
      <Button
        icon={<MaterialCommunityIcons name="keyboard-return" size={30} color="white" />}
        title={title}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{ width: 100, height: 60, backgroundColor: bgColor }}
        iconContainerStyle={{ marginRight: 10 }}
        onPress={() => navigate('LentScan', { action })}
      />
    </View>
  );
};

RenderButton.propTyles = {
  title: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  action: PropTypes.oneOf(['borrow', 'return']).isRequired,
  navigate: PropTypes.object.isRequired,
};

const BorrowReturnButton = ({ status, navigate }) => {
  const title = status ? '返却' : '貸出';
  const bgColor = status ? '#cd5c5c' : '#2e8b57';
  const action = status ? 'return' : 'borrow';

  return (
    <RenderButton
      title={title}
      bgColor={bgColor}
      action={action}
      navigate={navigate}
    />
  );
};

BorrowReturnButton.propTyles = {
  status: PropTypes.bool.isRequired,
  navigate: PropTypes.object.isRequired,
};

export default BorrowReturnButton;
