import React from 'react';
import { Image, View } from 'react-native';

export const Logo = () => (
  <View style={{ justifyContent: 'left', alignItems: 'left' }}>
    <Image
      source={require('../assets/logo.png')}
      style={{ width: 100, height: 100 }}
    />
  </View>
);
