import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage_Services {
  static setItem = async (...args) => {
    let data = args[0]
    const _key = args[1]

    data = typeof data == "object" ? JSON.stringify(data) : data

    try {
      await AsyncStorage.setItem(_key, data)
    } catch (error) {
      alert("error setting data")
    }
  }

  static getItem = async (...args) => {
    const _key = args[0]

    try {
      const data = await AsyncStorage.getItem(_key)
      return data
    } catch (error) {
      alert("error getting data")
    }
  }
}