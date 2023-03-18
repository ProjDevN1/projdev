import { View, Text, Pressable } from 'react-native'
import React from 'react'
import MapView from "react-native-maps";

import { clickedListItem, clientName } from "../screens/GigListScreen"
import { availableGigsData } from '../api/api'

const GigApplyScreen = () => {

  const currentGig = availableGigsData[clickedListItem]
  return (
    <View>
    {/*Render our MapView*/}
    <MapView
      style={{width:300, height: 300}}
        //specify our coordinates.
        initialRegion={{
          latitude: 60.45167733942584,
          longitude: 22.266609036440343,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Pressable>
        <Text>Settings icon here</Text>  
      </Pressable>

      <Pressable>
        <Text>Find icon here </Text>  
      </Pressable>

      <Text>Rating goes here</Text>
      <Text>Route:</Text>
      <Text>{currentGig.route}</Text>
      <Text>Pickup time: {currentGig.startTime}</Text>
      <Text>Delivery time: {currentGig.endTime}</Text>
      <Text>Pay: {currentGig.reward} €</Text>
      <Text>Fuel budget: 69eur</Text>
      <Text>Client name: {clientName}</Text>

      <Pressable>
        <Text>Apply</Text>  
      </Pressable>

      <Pressable>
        <Text>Contact info</Text>  
      </Pressable>

    </View>
  )
}

export default GigApplyScreen