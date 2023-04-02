import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native'
import React from 'react'
import { requestCameraPermission } from '../components/RequestPermissions'

//There should be no reason to edit this screen other than to add a button to navigate to a new screen
//Also btw you can comment with just // if the comment is outside of a react component. If it's inside one, there are different rules

const DevScreen = ({navigation}) => {
  return (
    <View>
        <Text style= {devStyles.infoText}>This screen will have buttons to all other screens in one place to make it easier to navigate to them during development</Text>
        <Text style= {devStyles.infoText}>There is no need to style it in any way, and it will be deleted when it is no longer necessary</Text>
        <Text style= {devStyles.infoText}>Navigation between the actual screens in the app will still work as intended</Text>
        <Button title="Landing Screen" onPress={() => navigation.navigate('Landing')}/>
        <Button title="Login Screen" onPress={() => navigation.navigate('Login')}/>
        <Button title="Gig list" onPress={() => navigation.navigate('GigList')}/>
        <Button title="Active Gigs" onPress={() => navigation.navigate('ActiveGigs')}/>
        <Button title="Register" onPress={() => navigation.navigate('Registration')}/>
        <Button title="Driving screen" onPress={() => navigation.navigate('Driving')}/>
        <Button title="Arrival" onPress={() => navigation.navigate('Arrival')}/>
        <Button title="Add pics and info" onPress={() => navigation.navigate('AddPicInfo')}/>
        <Button title="Forgot password screen" onPress={() => navigation.navigate('ForgotPassword')}/>
        <Button title="Gig apply screen" onPress={() => navigation.navigate('GigApply')}/>
        <Button title="Start gig screen" onPress={() => navigation.navigate('GigStart')}/>

        <Text>Danger zone, don't touch unless you know what you are doing</Text>
        <Button title="DB Testing" onPress={() => navigation.navigate('DBTest')}/>
        <Button title="Camera permission" onPress={requestCameraPermission}/>
    </View>
  )
}


//No need to touch this, exists just to make the info text more readable
const devStyles = StyleSheet.create({
    infoText: {
        fontSize: 18,
        textAlign: 'center',
    }
})
// <Button title="Map testing" onPress={() => navigation.navigate('MapTest')}/>

export default DevScreen