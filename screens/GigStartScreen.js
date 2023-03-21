import {
	View,
	Text,
	Pressable,
	Linking,
	Alert,
	Button,
	Image,
} from "react-native";
import { ELSTYLES } from "../constants/styles";
import { STARTGIG } from "../constants/styles";
import React, { useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { clickedListItem, clientName } from "../screens/ActiveGigsScreen";
import { activeGigsData, setActiveGig } from "../api/api";

const GOOGLE_MAPS_APIKEY = "AIzaSyBP6tdUhVPg34f1PfSR55r_eEZIrDAWsJo";

/*This screen is very similar to the GigApplyScreen, because apparently the 
only thing changing is that the apply-button changes to start-button*/

const GigStartScreen = ({ navigation }) => {
	const currentGig = activeGigsData[clickedListItem];
	console.log(clickedListItem);

	// Here we will have a prompt with the phone number of the client
	const showContactInfo = () =>
		Alert.alert(
			"Client contact information",
			"this alert is not yet functional",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Client phone number",
					style: "cancel",
				},
			]
		);
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
		<View style={STARTGIG.screenWrapper}>
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
						<Text style={ELSTYLES.titleLlight}>{currentGig.title}</Text>
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
						onPress={showContactInfo}>
						<Text style={ELSTYLES.buttonAltTxt}>Contact info</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

const Search = (navigation) => {
	navigation.navigate("GigList");
};

function startDrive(navigation, gig){
	setActiveGig(gig)
	navigation.navigate('AddPicInfo')

}

export default GigStartScreen;
