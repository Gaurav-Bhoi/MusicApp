import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {Settings_Controller} from '../../Controllers/Seetings Controller/settingsController';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Loader from '../Loader/loader';
import SearchBar from '../Search Bar/index';
import styles from './styles';
import {LinearGradient} from 'react-native-svg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function CommonScreen(props) {
  const setSettings = useDispatch();
  const [color, setColor] = useState('');
  const isDarkModeOn = useSelector(state => state.settingsReducer.isDarkModeOn);
  const {headerColor, screenBackground} = useSelector(
    state => state.settingsReducer.useColor,
  );

  useEffect(() => {
    let timer = setInterval(() => {
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');

      setColor(`#${randomColor}`);
    }, 700);

    return () => clearTimeout(timer);
  });

  const renderHomePageHeader = () => {
    return (
      <View style={[styles.headerStyle, {backgroundColor: headerColor}]}>
        <View style={styles.logoContainerStyle}>
          <FontAwesome5
            name="headphones-alt"
            size={25}
            color={color}
            style={{marginRight: 10, marginLeft: 5}}
          />
          <Text style={styles.titleStyle}>Music</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          {renderSearchBar()}
          <TouchableOpacity
            onPress={() =>
              Settings_Controller.updateSettingsStatus(setSettings)
            }
            style={{alignSelf: 'center'}}>
            <Icon name="dots-three-vertical" size={18} color="#FDFDFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSearchBar = () => {
    if (props.screenInfo.route.name == 'home') {
      return <SearchBar props={props} />;
    }
  };

  const renderBackgroundImage = () => {
    if (isDarkModeOn) {
      return (
        <ImageBackground
          source={require('../../Assets/linearGradient2.png')}
          resizeMode="stretch"
          style={{height: '100%'}}>
          {renderHomePageHeader()}
          <Loader />
          {props.children}
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          source={require('../../Assets/linearGradient1.png')}
          resizeMode="stretch"
          style={{height: '100%'}}>
          {renderHomePageHeader()}
          <Loader />
          {props.children}
        </ImageBackground>
      );
    }
  };
  return (
    <GestureHandlerRootView
      style={[styles.windowStyle, {backgroundColor: screenBackground}]}>
      {renderBackgroundImage()}
    </GestureHandlerRootView>
  );
}
