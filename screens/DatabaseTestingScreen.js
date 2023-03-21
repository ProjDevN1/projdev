import { Text, View, SafeAreaView, Pressable, Button, SectionList } from 'react-native'
import React, { useState } from 'react'


import { tempGetGig } from '../api/api.js'
import { getCurrentTime, getCurrentDate } from '../api/DataHandling.js' //IRA'S TEST THINGY 
import { getOngoingGigs, currentUser, switchUser } from '../api/api.js'


//In progress


export default function DatabaseTestingScreen() {


  const [data, setData] = useState('')
  const [currentUserName, setCurrentUserName] = useState('');

    //Gets data for users (and temporarily a gig thing)
    async function getData(){
      const gigData = await tempGetGig()

      setCurrentUserName(currentUser)
      
      setData(gigData)
    }

    //Switches the current user, only works locally atm
    function switchCurrentUser(){
      switchUser();
      setCurrentUserName(currentUser)
      
    }




  return (
    //calling the function on layout is not best practice, using useEffect is better
    //BUT: you need to specify that the useEffect runs only once, otherwise it will run in an infinite loop
    //because of how things get rendered in react. We do not want to do an infinite loop of reads in the database
    <SafeAreaView onLayout={getData}>
        <Text>Screen in progress, will add functionality as needed</Text>
        <Text>Under here is fetched start location from gig_1</Text>
        <Text>{data.startLocation}</Text>

        <Pressable onPress={() => getOngoingGigs()}>
					<Text>IRA'S TEST PRESSABLE (don't remove pls)</Text>
				</Pressable>

        <SafeAreaView style={{marginTop: 20, backgroundColor: '#CCC9E7'}}>
          <Text>Currently active user: (Default = user_1)</Text>
          <Text>{currentUserName.name}</Text>
          <Button title='Switch user' onPress={switchCurrentUser}></Button>
        </SafeAreaView>

        <Button title="Get gigs" onPress={getOngoingGigs}></Button>

        <Button title="Test" onPress={() => console.log(currentUser)}></Button>


    </SafeAreaView>
  )
}


