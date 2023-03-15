import { View, Text, Pressable, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'

import { STYLES } from '../constants/styles'
import { availableGigsData } from '../api/api'



//This is the frontend code for an individual list item
const Item = ({gig_id, startLocation, endLocation, reward, date, startTime, endTime}) => (
  <SafeAreaView>
    <Text>{gig_id}</Text> 
    <Text>From {startLocation}</Text>
    <Text>To {endLocation}</Text>
    <Text>Reward {reward}€</Text>
    <Text>Departure time: {startTime}</Text>
    <Text>Arrival time: {endTime}</Text>
  </SafeAreaView>
)

//This has the frontend code that shows either a list of available gigs or a text thing. Style accordingly
function List() {
  if (availableGigsData.length === 0) {
    return ( 
      <Text>No available gigs</Text> 
    )
  } else {
    return(
      <FlatList
      data={availableGigsData}
      renderItem={({item}) => <Item 
        startLocation={item.startLocation}
        endLocation={item.endLocation}
        reward={item.reward}
        startTime={item.startTime}
        endTime={item.endTime}
      />}
      keyExtractor={item => item.id}
      />
    )
  }
}
console.log(availableGigsData)
const GigListScreen = () => {
  
  //The List component is the function above. It returns the forntend code for available gigs list if there are available gigs
  //Otherwise just returns text component telling the user that no gigs are available
  return(
    <SafeAreaView>
      <List/>
    </SafeAreaView>
  )
}
export default GigListScreen