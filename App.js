import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import GetLocation from "react-native-get-location";

//Database related imports
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseConfig.js";

//Under here imports for screens contained in other files in the screens folder

import LoginScreen from "./screens/LoginScreen";
import LandingScreen from "./screens/LandingScreen";
import DevScreen from "./screens/DevScreen";
import GigListScreen from "./screens/GigListScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import ArrivalScreen from "./screens/ArrivalScreen";
import ActiveGigsScreen from "./screens/ActiveGigsScreen";
import DrivingScreen from "./screens/DrivingScreen";
import AddPicsAndInfo from "./screens/AddPicsAndInfo";
import ForgotPassword from "./screens/ForgotPasswordScreen";
import GigApplyScreen from "./screens/GigApplyScreen";
import GigStartScreen from "./screens/GigStartScreen";
import MapsTestScreen from "./screens/MapTestScreen.js";

//Temporary screen for backend work
import DatabaseTestingScreen from "./screens/DatabaseTestingScreen";

//Imports and executes the getActiveGigs and getUser funtions, so that ActiveGigsScreen does not need to wait for data fetching to happen
import { getActiveGigs, getUser, getOngoingGigs } from "./api/api";

async function initializeData() {
	await getUser();
	await getActiveGigs();
	await getOngoingGigs();
}
initializeData();

// Asks for location on start

const curLocation = () => {
	GetLocation.getCurrentPosition(
			{
		enableHighAccuracy: true,
		timeout: 6000,
	})
		.then((location) => {
			console.log(location);
		})
		.catch((error) => {
			const { code, message } = error;
			console.warn(code, message);
		});
};

curLocation();
//Initializes the stack navigator module, used to navigate between screens
const Stack = createNativeStackNavigator();

//This is the main app function
export default function App() {
	//Imported fonts - can't assign weight - each weight is imported seperately
	const [fontsLoaded] = useFonts({
		Raleway: require("./assets/fonts/Raleway/Raleway-VariableFont_wght.ttf"),
		RalewayMedium: require("./assets/fonts/Raleway/static/Raleway-Medium.ttf"),
		RalewayLight: require("./assets/fonts/Raleway/static/Raleway-Light.ttf"),
		RalewayBold: require("./assets/fonts/Raleway/static/Raleway-Bold.ttf"),
		RalewayExtraLight: require("./assets/fonts/Raleway/static/Raleway-ExtraLight.ttf"),
	});

	if (!fontsLoaded) {
		return undefined;
	}

	// This function autenthicates to firebase, allowing the app to access the database
	signInAnonymously(auth)
		.then(() => {
			console.log("Auth successful");
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Dev" component={DevScreen} />
				<Stack.Screen name="Landing" component={LandingScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="GigList" component={GigListScreen} />
				<Stack.Screen name="ActiveGigs" component={ActiveGigsScreen} />
				<Stack.Screen name="Registration" component={RegistrationScreen} />
				<Stack.Screen name="Driving" component={DrivingScreen} />
				<Stack.Screen name="Arrival" component={ArrivalScreen} />
				<Stack.Screen name="AddPicInfo" component={AddPicsAndInfo} />
				<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
				<Stack.Screen name="GigApply" component={GigApplyScreen} />
				<Stack.Screen name="GigStart" component={GigStartScreen} />

				<Stack.Screen name="DBTest" component={DatabaseTestingScreen} />
				<Stack.Screen name="MapTest" component={MapsTestScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
// <Stack.Screen name="MapTest" component={MapsTestScreen}/>
