import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { View, Text, Modal } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'

export default function Loader() {
  const [color, setColor] = useState("")
  const [dots, setdots] = useState("...")
  const showLoader = useSelector(state => state.loaderReducer.showLoader)

  useEffect(() => {
    let timer = setInterval(() => {
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')

      setColor(`#${randomColor}`)

      if (dots.length == 3) {
        setdots("")
      } else {
        setdots(prev => prev + ".")
      }

    }, 700)

    return () => clearTimeout(timer)
  })

  return (
    <Modal style={styles.mainWindow}
      transparent={true}
      visible={showLoader}
    >
      <View style={styles.mainWindow}>
        <View style={styles.card}>
          <FontAwesome5 name='headphones-alt' size={50} color={color} />
          <Text style={styles.loadingTitle}>Loading<Text style={[styles.loadingTitle, styles.loadingTitledots]}> {dots}</Text></Text>
        </View>
      </View>
    </Modal>
  )
}
