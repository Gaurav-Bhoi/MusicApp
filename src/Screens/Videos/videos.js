import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';

export default function videos() {
  const [height, setHeight] = useState(0);
  const a = ['1', '2', '3', '4'];

  const renderItem = item => {
    return (
      <View style={[styles.boxView, {height: height}]}>
        <Text style={styles.textStyle}>Box {item.item.toString()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screenStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.textStyle}>Header</Text>
      </View>
      <FlatList
        data={a}
        onLayout={event => {
          var {x, y, width1, height} = event.nativeEvent.layout;
          setHeight(height / 2);
        }}
        renderItem={item => renderItem(item)}
        keyExtractor={index => index.toString()}
        style={styles.flatlistStyle}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          display: 'flex',
          margin: 5,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    height: '20%',
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxView: {
    flex: 2,
    backgroundColor: 'gray',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistStyle: {
    height: '100%',
    flexDirection: 'row',
  },
  screenStyle: {
    height: '100%',
    width: '100%',
  },
  textStyle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
  },
});
