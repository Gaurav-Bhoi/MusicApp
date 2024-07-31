import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  settingsComponent: {
    height: 90,
    width: 90,
    backgroundColor: 'white',
    borderRadius: 10,
    opacity: 0.9,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    margin: 10

  },
  settingTitleStyle: {
    marginTop: 5,
  },
  mainWindow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: "85%",
    // height: "25%",
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'gray',
    padding: 15
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  button: {
    // backgroundColor: 'red',
    width: '48%',
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 5
  }
})