import {StyleSheet, Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
const maxHeight = height * 0.8;
const minHeight = height * 0.5;
export const styles = StyleSheet.create({
  windowStyle: {
    position: 'absolute',
    width: '100%',
    height: height,
    bottom: -(height / 4),
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    // opacity: 0.9,
    borderColor: '#808589',
  },
  textColor: {
    backgroundColor: 'red',
    color: 'green',
  },
  grabber: {
    height: 10,
    width: 100,
    backgroundColor: 'red',
  },
  invisibleMainWindow: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: height,
  },
  grabberIcon: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
