import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    height: 30,
    width: 200,
    marginRight: 10,
    borderRadius: 5,
    justifyContent: 'flex-end',
  },
  searchIcon: {
    alignSelf: 'flex-end',
    height: '100%',
    justifyContent: 'center',
    paddingRight: 8,
    borderTopRightRadius: 4,
    borderBottomEndRadius: 4,
  },
  textInputStyle: {
    height: '100%',
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    padding: 0,

    paddingLeft: 7,
  },
});

export default styles;
