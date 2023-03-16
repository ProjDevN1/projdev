import { View, Text } from 'react-native'
import React from 'react'
import MapView from "react-native-maps";

const DrivingScreen = () => {
  return (
    <View>

      <MapView
        style={{width: 300, height: 300}}
        //specify our coordinates.
        initialRegion={{
          latitude: 60.45167733942584,
          longitude: 22.266609036440343,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
        <Text>Drive started:</Text>
        <Text>Estimated arrival:</Text>
        <Text>Distance left:</Text>
        <Text>Current location: (You can see in map no?) </Text>
        <Text>Destination:</Text>

    </View>
  )
}

export default DrivingScreen