import { View, Text, Pressable, Alert, Linking, Platform } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import GetLocation from "react-native-get-location";
import { getCurrentTime } from "../api/DataHandling";

import { ELSTYLES } from "../constants/styles";
import { STARTGIG } from "../constants/styles";

import { activeGig } from "../api/api.js"


const GOOGLE_MAPS_APIKEY = "AIzaSyBP6tdUhVPg34f1PfSR55r_eEZIrDAWsJo";

const DrivingScreen = () => {
	getCurrentTime()
	// Gets user location coordinates for estimated arrival and distance
	// const [userLocation, setUserLocation] = useState("null");
	// useEffect(() => {
	// 	GetLocation.getCurrentPosition(
	// 		position => {
	// 			const { latitude, longitude } = position.coords
	// 			setUserLocation({ latitude, longitude })
	// 			console.log("success")
	// 		},
	// 		error => {
	// 			console.log(error.code, error.message)
	// 		},
	// 		{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
	// 	)
	// }, [])

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
	
		const [distance, setDistance] = useState(false);
		const [duration, setDuration] = useState(false)


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

	return (
		<View style={STARTGIG.screenWrapper}>
			<MapView
				ref={mapRef}
				style={STARTGIG.mapWrapper}
				//specify our coordinates.
				showsUserLocation={true}
				followsUserLocation={true}
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
					origin={activeGig.startCoord}
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
						setDistance(result.distance);
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
								{duration}
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
					<Pressable style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}>
						<Text style={ELSTYLES.buttonAltTxt}>Finish gig</Text>
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

export default DrivingScreen;
