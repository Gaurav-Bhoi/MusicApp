import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  soundTrackContainer: {
    width: '97%',
    alignSelf: 'center',
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'black',
  },

  vinylRecord: {
    height: '100%',
  },
  vinylRecordContainer: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#41C8C6',
    margin: 5,
    padding: 3,
    borderRadius: 5,
  },
  musicController: {
    alignSelf: 'center',
    marginRight: 5,
  },
});

export default styles;
