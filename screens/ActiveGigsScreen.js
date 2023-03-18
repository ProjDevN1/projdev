import { View, Text, Pressable, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'

import { STYLES } from '../constants/styles'
import { activeGigsData, getClientName } from '../api/api'




//This has the frontend code that shows either a list of active gigs or a text thing. Style accordingly
function List(props) {
  const navRef = props.nav
  //This is the frontend code for an individual list item
  const Item = ({id, title, addInfo, arrivalAddress, arrivalTime, estimatedTime, leaveTime, reward, startAddress, vehicle}) => (
    <View>

      <Pressable onPress={() => onListItemPress(navRef, id)}>

        <Text>{title}</Text>
        <Text>{leaveTime}</Text>
        <Text>{arrivalTime}</Text>
        <Text>{vehicle}</Text>
        <Text>{startAddress}</Text>
        <Text>{arrivalAddress}</Text>
        <Text>{estimatedTime}</Text>
        <Text>{addInfo}</Text>
        <Text>{reward}€</Text>
      </Pressable>

    </View>

  )

  if (activeGigsData.length === 0) {
    return(

      <Text>No active gigs</Text>
    )
  } else {
    return(

      <FlatList
        data={activeGigsData}
        renderItem={({item}) => <Item 
          title={item.title}
          addInfo={item.addInfo}
          arrivalAddress={item.arrivalAddress}
          arrivalTime={item.arrivalTime}
          estimatedTime={item.estimatedTime}
          leaveTime={item.leaveTime}
          reward={item.reward}
          startAddress={item.startAddress}
          vehicle={item.vehicle}
          id={item.id}
        />}
        keyExtractor={item => item.id}
      />
    )
  }
}

const ActiveGigsScreen = ({navigation}) => {

  //The List component is the function above. It returns the forntend code for active gigs list if there are active gigs
  //Otherwise just returns text component telling the user that no gigs are active
  return (

    <SafeAreaView>

      
      <List nav={navigation}/>

      <Pressable style= {STYLES.button} onPress={() => navigation.navigate('GigList')}>
           <Text style={{color: 'black', height: 20, width: 50, marginVertical: 20}}> Search </Text>
        </Pressable>

        <Pressable style= {STYLES.button}>
           <Text style={{color: 'black', height: 20, width: 50, marginVertical: 20}}> Active gigs </Text>
        </Pressable>

        <Pressable style= {STYLES.button}>
           <Text style={{color: 'white'}}> Profile </Text>
        </Pressable>

        
    </SafeAreaView>

  )
}


//This function saves info about which item was clicked, ans well as gets the client name ready for next screen
//Putting the client name function here ensures that the data gets fetched before the next screen renders
let clickedListItem = ''
let clientName = ''
async function onListItemPress(navigation, id){
  clickedListItem = id
  clientName = await getClientName('active', id)
  navigation.navigate('GigStart')
}


export default ActiveGigsScreen
export { clickedListItem, clientName }