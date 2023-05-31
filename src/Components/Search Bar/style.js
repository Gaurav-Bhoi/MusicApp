import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    height: 40,
    width: 200,
    marginRight: 10,
    borderRadius: 5,
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
  },
});

export default styles;
