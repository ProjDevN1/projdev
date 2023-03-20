import { View, Text, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView from "react-native-maps";


const ArrivalScreen = () => {

    // Sets arrival time to the moment the screen is loaded

  const [arrivalTime, setArrival] = useState('');

  // Gets current hours:minutes from device

  useEffect(() => {

    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    setArrival(
      hours + ':' + min
    );
  }, []);

  const finishAlert = () =>
  Alert.alert("Congrats on finishing the drive", "This button is not yet fully functional", [
    {text:"Done", style:"cancel"}
  ])
  
  // Screen itself


  return (
    <View>
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
      <Text>You have arrived at your destination</Text>
      <Text>Arrival Time: {arrivalTime} </Text>
      <Text>Location: </Text>
      <Text>Reward: </Text>
      <Pressable style={{borderColor: 'black', borderWidth: 5}} onPress={finishAlert}>
        <Text>Finish drive</Text>
      </Pressable>
    </View>
  )
};

export default ArrivalScreen