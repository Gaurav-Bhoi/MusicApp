import React, {useEffect, useState, useRef} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {updateShowSettings} from '../../Store/Reducers/settingsReducer';

export default function Settings(props) {
  useEffect(() => {
    Animated.spring(animationValue, {
      toValue: 10,
      friction: 5,
      tension: 300,
      useNativeDriver: true,
    }).start();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      dispatchSetting(updateShowSettings()),
    );

    return () => backHandler.remove();
  }, []);
  const dispatchSetting = useDispatch();
  const animationValue = useRef(new Animated.Value(0)).current;
  const {screenBackground} = useSelector(
    state => state.settingsReducer.useColor,
  );
  const lastGesture = useRef(0);
  var {height} = Dimensions.get('window');
  const dragThreshold = 40;

  const trans = {
    transform: [
      {
        translateY: animationValue.interpolate({
          inputRange: [-(height / 4), height],
          outputRange: [-(height / 4), height],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const panResp = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animationValue.setOffset(lastGesture.current);
      },
      onPanResponderMove: (event, gesture) => {
        animationValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (event, gesture) => {
        lastGesture.current += gesture.dy;

        if (gesture.dy > 0) {
          if (gesture.dy < dragThreshold) {
            AnimateSpring('up');
          } else {
            AnimateSpring('down');
            dispatchSetting(updateShowSettings());
          }
        } else {
          if (gesture.dy < dragThreshold) {
            AnimateSpring('up');
          } else {
            AnimateSpring('down');
            dispatchSetting(updateShowSettings());
          }
        }
      },
    }),
  ).current;

  const AnimateSpring = direction => {
    if (direction == 'down') {
      lastGesture.current = height;
    } else {
      lastGesture.current = -(height / 4);
    }
    Animated.spring(animationValue, {
      toValue: lastGesture.current,
      friction: 5,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.windowStyle, trans, {backgroundColor: screenBackground}]}>
      <View {...panResp.panHandlers} style={styles.grabberIcon}>
        <Icon name="drag-horizontal-variant" size={40} color="#41C8C6" />
      </View>
      {props.children}
    </Animated.View>
  );
}
