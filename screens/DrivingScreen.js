import { 
	View,
	Text, 
	Pressable, 
	Alert, 
	Linking, 
	Platform, 
	SafeAreaView, 
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Modal from "react-native-modal";
import * as Location from 'expo-location';

import { ELSTYLES } from "../constants/styles";
import { STARTGIG } from "../constants/styles";

import { activeGig, currentUser, finishDrive, updateCurrentLocation } from "../api/api.js"
import { getCurrentTime } from "../api/DataHandling";

const GOOGLE_MAPS_APIKEY = "AIzaSyBP6tdUhVPg34f1PfSR55r_eEZIrDAWsJo";


const DrivingScreen = ({ navigation }) => {

	const [distance, setDistance] = useState(false);
	const [duration, setDuration] = useState(false)

	// Sets the estimated arrival to hh:mm format
	const [estimatedArrival, setEstimatedArrival] = useState("")
	const setEstArrival = () =>{
		const timeStamp = Date.now();
		const estimatedDuration = timeStamp + (duration * 60000)
		const newTime = new Date(estimatedDuration)
		const estHours = newTime.getHours().toString().padStart(2,'0')
		const estMinutes = newTime.getMinutes().toString().padStart(2, '0')
		const estArrival = `${estHours}:${estMinutes}`
		console.log(estArrival)
		setEstimatedArrival(estArrival)
	}

	// Get users location coordinates
	// User coordinates are stored here
	const [userCoords, setUserCoords] = useState({
		coords: 60.44969899573153 + "," + 22.26765771615263,
		latitude: 60.44969899573153,
		longitude: 22.26765771615263,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	// Function to get user coordinates and set them to storage and updates estimated arrival time
	const getUserLocation = async () => {
		const { coords } = await Location.getCurrentPositionAsync({});
		const { latitude, longitude } = coords;
		setUserCoords({
			coords: latitude + ", " + longitude,
			latitude: latitude,
			longitude: longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		})
		setEstArrival()
		console.log("Got user location coordinates")
	}
	// Uploads user coordinates to database in the selected gig
	const updateUserLocation = async () => {
		const { coords } = await Location.getCurrentPositionAsync({})
		const { latitude, longitude } = coords
		updateCurrentLocation(activeGig.gigId, `${latitude}, ${longitude}`)
	}

	// Updates user location every 1500 ms
	useEffect(() => {
		const interId = setInterval(() => {
			getUserLocation()
		}, 1500);
		return () => clearInterval(interId)
		},)
	
	// Updates user location to database every x minutes
	useEffect(() => {
		const interId = setInterval(() => {
			updateUserLocation()
		}, 45000);
		return () => clearInterval(interId)
	},)


	// Code for finish gig modal visibility
	const [finishModalVisible, setFinishVisible] = useState(false);
	const toggleFinishModal = () => {
		setFinishVisible(!finishModalVisible);
	};

	// Code for contact info modal visibility
	const [contactModalVisible, setContactVisible] = useState(false);
	const toggleContactModal = () => {
		setContactVisible(!contactModalVisible)
	}


	// Code for opening maps navigation to start address
	const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
	const sLatLng = `${activeGig.startLat},${activeGig.startLon}`;
	const startLabel = `${activeGig.startAddress}`;
	const startURL = Platform.select({
	  ios: `${scheme}${startLabel}@${sLatLng}`,
	  android: `${scheme}${sLatLng}(${startLabel})`
	});
	// Code for opening maps navigation to end address
	const eLatLng = `${activeGig.endLat},${activeGig.endLon}`;
	const endLabel = `${activeGig.arrivalAddress}`
	const endURL = Platform.select({
	  ios: `${scheme}${endLabel}@${eLatLng}`,
	  android: `${scheme}${eLatLng}(${endLabel})`
	});


	// Code used for moving the map to the start and end locations
	const mapRef = useRef(null);
	const [region, setRegion] = useState({
		latitude: 51.5079145,
		longitude: -0.0899163,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	});
	const startData = {
		latitude: activeGig.startLat,
		longitude: activeGig.startLon,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};
	const endData = {
		latitude: activeGig.endLat,
		longitude: activeGig.endLon,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};

	const goToStart = () => {
		mapRef.current.animateToRegion(startData, 3000);
	};
	const goToEnd = () => {
		mapRef.current.animateToRegion(endData, 3000);
	};
	const goToUser= () => {
		mapRef.current.animateToRegion(userCoords, 3000)
	}

	return (
		<SafeAreaView style={STARTGIG.screenWrapper}>
			<MapView
				ref={mapRef}
				style={STARTGIG.mapWrapper}
				//specify our coordinates.
				showsUserLocation={true}
				followsUserLocation={true}
				showsMyLocationButton={false}
				initialRegion={{
					latitude: activeGig.startLat,
					longitude: activeGig.startLon,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				onRegionChangeComplete={(region) => setRegion(region)}>
				<Marker coordinate={startData} />
				<Marker coordinate={endData} />
				{/*Renders the route for the gig on the map screen*/}
				<MapViewDirections
					origin={userCoords}
					destination={activeGig.endCoord}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={3}
					strokeColor="blue"
					optimizeWaypoints={true}
					onStart={(params) => {
						console.log(
							`Started routing between "${params.origin}" and "${params.destination}"`
						);
					}}
					onReady={(result) => {
						setDistance(result.distance.toFixed(2));
						setDuration(result.duration);
						console.log(`Distance: ${result.distance} km`);
						console.log(`Duration: ${result.duration} min`);
					}}
				/>
			</MapView>
			{/*Search/info buttons - absolute element */}
			<View style={STARTGIG.infoBtnWrapper}>
				<Pressable style={ELSTYLES.buttonRound}>
					<Text>S</Text>
				</Pressable>

				<Pressable style={ELSTYLES.buttonRound}>
					<Text>F</Text>
				</Pressable>
			</View>
			<View style={STARTGIG.mapNavBtnWarpper}>
				<Pressable
					style={[ELSTYLES.button, { padding: 4 }]}
					onPress={() => goToStart()}>
					<Text style={{ textAlign: "center" }}>Origin</Text>
				</Pressable>
				<Pressable
					style={[ELSTYLES.button, { padding: 4 }]}
					onPress={() => goToEnd()}>
					<Text>Destination</Text>
				</Pressable>
				<Pressable
					style={[ELSTYLES.button, { padding: 4 }]}
					onPress={() => goToUser()}>
					<Text>User Location</Text>
				</Pressable>
			</View>
			<View style={STARTGIG.infoWrapper}>
				<View style={[STARTGIG.textWrapper]}>
					<View style={[STARTGIG.section, { justifyContent: "center" }]}>
						<Text style={ELSTYLES.titleL}>Route:</Text>
						{/* Pressing the city name will open maps with navigation to the gig address, either start or end */}
						<Pressable style={ELSTYLES.titleLlight} onPress = {() => Linking.openURL(startURL) }>
							<Text style={ELSTYLES.titleLlight}>{activeGig.startLocation}</Text>
						</Pressable>
						<Pressable style={ELSTYLES.titleLlight} onPress = {() => Linking.openURL(endURL) }>
							<Text style={ELSTYLES.titleLlight}>{activeGig.endLocation}</Text>
						</Pressable>
					</View>
					<View
						style={[
							STARTGIG.section,
							{ justifyContent: "space-evenly", alignItems: "flex-start" },
						]}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "baseline",
							}}>
							<Text style={[STARTGIG.labelM, { flex: 1 }]}>
								Estimated arrival:
							</Text>
							<Text style={[STARTGIG.labelL, { flex: 0.5, textAlign: "left" }]}>
								{estimatedArrival}
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "baseline",
							}}>
							<Text style={[STARTGIG.labelM, { flex: 1 }]}>Distance left:</Text>
							<Text style={[STARTGIG.labelL, { flex: 0.5, textAlign: "left" }]}>
								{distance} KM
							</Text>
						</View>
					</View>
					<View style={[STARTGIG.section, { justifyContent: "space-evenly" }]}>
						<Text style={ELSTYLES.txtAlt}>Departure: {activeGig.leaveTime}</Text>
						<Text style={ELSTYLES.txtAlt}>Arrival: {activeGig.arrivalTime}</Text>
					</View>
				</View>
				<View style={STARTGIG.buttonWrapper}>
					<Pressable style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]} onPress={toggleFinishModal}>
						<Text style={ELSTYLES.buttonAltTxt}>Finish gig</Text>
					</Pressable>


					<Pressable
						style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}
						onPress={toggleContactModal}>
						<Text style={ELSTYLES.buttonAltTxt}>Contact info</Text>
					</Pressable>
				</View>
			</View>
			<Modal 				
				isVisible={finishModalVisible}
				style={{ margin: 0, justifyContent: "flex-end" }}
				swipeDirection="down"
				onRequestClose={toggleFinishModal}
				onBackButtonPress={toggleFinishModal}
				scrollOffset={1}
				onSwipeComplete={toggleFinishModal}>
				<View>
					<Text>You have arrived at your destination</Text>
					<Text>Arrival time: CURRENTTIME</Text>
					<Text>Reward: {activeGig.reward}€</Text>
				</View>
				<View>
					<Pressable style={{borderColor: "black", borderWidth: 5}} onPress={() => finishGig(navigation, activeGig)}>
						<Text> Finish drive </Text>
					</Pressable>
					<Pressable style={{borderColor: 'black', borderWidth: 5}} onPress={toggleFinishModal}>
       					<Text>CLOSE MODAL</Text>
      				</Pressable>
				</View>
			</Modal>
			<Modal
				isVisible={contactModalVisible}
				style={{ margin: 0, justifyContent: "flex-end" }}
				swipeDirection="down"
				onRequestClose={toggleContactModal}
				onBackButtonPress={toggleContactModal}
				scrollOffset={1}
				onSwipeComplete={toggleContactModal}>
				<View>
					<Text>Client name goes here</Text>
					<Pressable style={{borderColor: "blue", borderWidth: 5}}>
						<Text>number goes here</Text>
					</Pressable>
					<Pressable style={{borderColor: "red", borderWidth: 5}} onPress={toggleContactModal}>
						<Text>Close</Text>
					</Pressable>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

// Finishing drive function 
function finishGig( navigation ){
	finishDrive(activeGig.gigId, activeGig.id)
	navigation.navigate("ActiveGigs")
}

export default DrivingScreen;
