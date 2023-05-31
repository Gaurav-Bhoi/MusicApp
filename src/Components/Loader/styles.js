import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainWindow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: 'black'
  },

  loadingTitle: {
    color: '#535353',
    fontWeight: '600',
    fontSize: 16
  },
  loadingTitledots: {
    fontSize: 23
  }
})