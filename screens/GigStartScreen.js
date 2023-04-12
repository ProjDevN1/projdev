import {
	View,
	Text,
	Pressable,
	Linking,
	Alert,
	Button,
	Image,
	Platform,
	SafeAreaView
} from "react-native";
import { ELSTYLES } from "../constants/styles";
import { STARTGIG } from "../constants/styles";
import React, { useState, useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Modal from "react-native-modal";


import { clickedListItem, clientName } from "../screens/ActiveGigsScreen";
import { activeGig, activeGigsData, setActiveGig, addStartingTime } from "../api/api";

const GOOGLE_MAPS_APIKEY = "AIzaSyBP6tdUhVPg34f1PfSR55r_eEZIrDAWsJo";

/*This screen is very similar to the GigApplyScreen, because apparently the 
only thing changing is that the apply-button changes to start-button*/

const GigStartScreen = ({ navigation }) => {

	const currentGig = activeGigsData[clickedListItem];
	console.log(clickedListItem);

	// Code for navigation line on ios and android
	const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
	const sLatLng = `${currentGig.startLat},${currentGig.startLon}`;
	const startLabel = `${currentGig.startAddress}`;
	const startURL = Platform.select({
	  ios: `${scheme}${startLabel}@${sLatLng}`,
	  android: `${scheme}${sLatLng}(${startLabel})`
	});

	const eLatLng = `${currentGig.endLat},${currentGig.endLon}`;
	const endLabel = `${currentGig.arrivalAddress}`
	const endURL = Platform.select({
	  ios: `${scheme}${endLabel}@${eLatLng}`,
	  android: `${scheme}${eLatLng}(${endLabel})`
	});

	// Code for contact info modal visibility
	const [contactModalVisible, setContactVisible] = useState(false);
	const toggleContactModal = () => {
		setContactVisible(!contactModalVisible)
	}


	// Code used for moving the map to the start and end locations
	const mapRef = useRef(null);
	const [region, setRegion] = useState({
		latitude: 51.5079145,
		longitude: -0.0899163,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	});
	const startData = {
		latitude: currentGig.startLat,
		longitude: currentGig.startLon,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};
	const endData = {
		latitude: currentGig.endLat,
		longitude: currentGig.endLon,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	};
	const goToStart = () => {
		mapRef.current.animateToRegion(startData, 3000);
	};
	const goToEnd = () => {
		mapRef.current.animateToRegion(endData, 3000);
	};

	return (
		<SafeAreaView style={STARTGIG.screenWrapper}>
			{/*Render our MapView*/}
			<View style={STARTGIG.mapWrapper}>
				<MapView
					ref={mapRef}
					style={STARTGIG.mapWrapper}
					//specify our coordinates.
					showsUserLocation={true}
					showsMyLocationButton={true}
					initialRegion={{
						latitude: currentGig.startLat,
						longitude: currentGig.startLon,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}}
					onRegionChangeComplete={(region) => setRegion(region)}>
					<Marker coordinate={startData} />
					<Marker coordinate={endData} />
					{/*Renders the route for the gig on the map screen*/}
					<MapViewDirections
						origin={currentGig.startCoord}
						destination={currentGig.endCoord}
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
							console.log(`Distance: ${result.distance} km`);
							console.log(`Duration: ${result.duration} min`);
						}}
					/>
				</MapView>
			</View>
			{/*Search/info buttons - absolute element */}
			<View style={STARTGIG.infoBtnWrapper}>
				<Pressable
					style={ELSTYLES.buttonRound}
					onPress={() => {
						Search(navigation);
					}}>
					<Image
						style={{ width: "50%", height: "50%" }}
						source={require("../assets/icons/searchIco.png")}></Image>
				</Pressable>

				<Pressable style={ELSTYLES.buttonRound}>
					<Image
						style={{ width: "50%", height: "50%" }}
						source={require("../assets/icons/settingIco.png")}></Image>
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
			</View>

			{/*bottom half*/}
			<View style={STARTGIG.infoWrapper}>
				{/*rating - absolute element*/}
				<View style={STARTGIG.ratingWrapper}>
					<View style={STARTGIG.rating}>
						<Text>R</Text>
					</View>
				</View>
				<View style={[STARTGIG.textWrapper]}>
					<View style={[STARTGIG.section, { justifyContent: "center" }]}>
						<Text style={ELSTYLES.titleL}>Route:</Text>
						{/* Pressing the city name will open maps with navigation to the gig address, either start or end */}
						<Pressable style={ELSTYLES.titleLlight} onPress = {() => Linking.openURL(startURL) }>
							<Text style={ELSTYLES.titleLlight}>{currentGig.startLocation}</Text>
						</Pressable>
						<Pressable style={ELSTYLES.titleLlight} onPress = {() => Linking.openURL(endURL) }>
							<Text style={ELSTYLES.titleLlight}>{currentGig.endLocation}</Text>
						</Pressable>
					</View>
					<View style={[STARTGIG.section, { justifyContent: "space-evenly" }]}>
						<Text style={ELSTYLES.txtAlt}>Leave: {currentGig.leaveTime}</Text>
						<Text style={ELSTYLES.txtAlt}>
							Arrive: {currentGig.arrivalTime}
						</Text>
						<Text style={ELSTYLES.txtAlt}>Pay: {currentGig.reward} €</Text>
					</View>
					<View style={[STARTGIG.section, { justifyContent: "space-evenly" }]}>
						<Text style={ELSTYLES.txtAlt}>Fuel budget: 69 €</Text>
						<Text style={ELSTYLES.txtAlt}>Client name: {clientName}</Text>
					</View>
				</View>

				<View style={STARTGIG.buttonWrapper}>
					<Pressable style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}
						onPress={() => startDrive(navigation, currentGig)}
					>
						<Text style={ELSTYLES.buttonAltTxt}>Start</Text>
					</Pressable>

					<Pressable
						style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}
						onPress={toggleContactModal}>
						<Text style={ELSTYLES.buttonAltTxt}>Contact info</Text>
					</Pressable>
				</View>
			</View>
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
						<Text>Client phone number</Text>
					</Pressable>
					<Pressable style={{borderColor: "red", borderWidth: 5}} onPress={toggleContactModal}>
						<Text>Close</Text>
					</Pressable>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const Search = (navigation) => {
	navigation.navigate("GigList");
};

function startDrive(navigation, gig){
	setActiveGig(gig)
	const currentGig = activeGigsData[clickedListItem]
	addStartingTime(currentGig.gigId) //calls function to add starting time w/ gig id
	navigation.navigate('AddPicInfo')
	
}

export default GigStartScreen;
