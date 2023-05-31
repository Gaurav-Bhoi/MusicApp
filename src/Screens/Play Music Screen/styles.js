import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  vinylRecordContainer: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#41C8C6',
    margin: 5,
    padding: 3,
    borderRadius: 5,
  },

  thubnailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlContainer: {
    height: 100,
    marginBottom: 20,
  },
  soundController: {
    position: 'absolute',
    top: 0,
    marginTop: '12%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    // borderColor: '#41C8C6',
    margin: 5,
    padding: 3,
    borderRadius: 5,
  },
  soundBar: {
    height: 7,
  },
  iconStyle: {
    marginRight: 10,
  },
  musicProgressBarContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  timeStamp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  songTitle: {
    marginTop: 5,
    width: '90%',
    alignSelf: 'center',
  },
  musicControllerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});
