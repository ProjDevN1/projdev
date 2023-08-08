import {
	View,
	Text,
	Pressable,
	Alert,
	Linking,
	Platform,
	SafeAreaView,
	Image,
	Button,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Modal from "react-native-modal";
import * as Location from "expo-location";

import { ELSTYLES } from "../constants/styles";
import { STARTGIG } from "../constants/styles";
import Ripple from "react-native-material-ripple";

import {
	activeGig,
	currentUser,
	finishDrive,
	updateCurrentLocation,
} from "../api/api.js";
import { clientName, clientEmail, clientPhone } from "../screens/ActiveGigsScreen";
import { getCurrentTime } from "../api/DataHandling";
import { SearchBar } from "react-native-screens";


const DrivingScreen = ({ navigation }) => {
	const [distance, setDistance] = useState(false);
	const [duration, setDuration] = useState(false);


	// Sets the estimated arrival to hh:mm format
	const [estimatedArrival, setEstimatedArrival] = useState("");
	const setEstArrival = () => {
		const timeStamp = Date.now();
		const estimatedDuration = timeStamp + duration * 60000;
		const newTime = new Date(estimatedDuration);
		const estHours = newTime.getHours().toString().padStart(2, "0");
		const estMinutes = newTime.getMinutes().toString().padStart(2, "0");
		const estArrival = `${estHours}:${estMinutes}`;
		console.log(estArrival);
		setEstimatedArrival(estArrival);
	};

	const [arrivalTime, setArrivalTime] = useState("")
	const setArrival = () => {
		var hours = new Date().getHours()
		var minutes = new Date().getMinutes()
		setArrivalTime(hours + ":" + minutes)
	}

	// Code for opening dialling screen on phone with client phone number set ready.
	const dialCall = () => {
		let phoneNumber = ""
		if (Platform.OS === 'android') {
			phoneNumber = `tel:${clientPhone}`
		}
		else {
			phoneNumber = `telprompt:${clientPhone}`
		}
		Linking.openURL(phoneNumber)
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
			longitudeDelta: 0.0421,
		});
		setEstArrival();
		console.log("Got user location coordinates");
	};
	// Uploads user coordinates to database in the selected gig
	const updateUserLocation = async () => {
		const { coords } = await Location.getCurrentPositionAsync({});
		const { latitude, longitude } = coords;
		updateCurrentLocation(activeGig.gigId, `${latitude}, ${longitude}`);
	};

	// Updates user location every 1500 ms
	useEffect(() => {
		const interId = setInterval(() => {
			getUserLocation();
		}, 1500);
		return () => clearInterval(interId);
	});

	// Updates user location to database every x minutes
	useEffect(() => {
		const interId = setInterval(() => {
			updateUserLocation();
		}, 45000);
		return () => clearInterval(interId);
	});

	// Code for finish gig modal visibility
	const [finishModalVisible, setFinishVisible] = useState(false);
	const toggleFinishModal = () => {
		setFinishVisible(!finishModalVisible);
	};

	// Code for contact info modal visibility
	const [contactModalVisible, setContactVisible] = useState(false);
	const toggleContactModal = () => {
		setContactVisible(!contactModalVisible);
	};

	// Code for opening maps navigation to start address
	const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
	const sLatLng = `${activeGig.startLat},${activeGig.startLon}`;
	const startLabel = `${activeGig.startAddress}`;
	const startURL = Platform.select({
		ios: `${scheme}${startLabel}@${sLatLng}`,
		android: `${scheme}${sLatLng}(${startLabel})`,
	});
	// Code for opening maps navigation to end address
	const eLatLng = `${activeGig.endLat},${activeGig.endLon}`;
	const endLabel = `${activeGig.arrivalAddress}`;
	const endURL = Platform.select({
		ios: `${scheme}${endLabel}@${eLatLng}`,
		android: `${scheme}${eLatLng}(${endLabel})`,
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
	const goToUser = () => {
		mapRef.current.animateToRegion(userCoords, 3000);
	};

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
				<Ripple
					rippleColor={ELSTYLES.rippleColors().colorAccent}
					rippleCentered={true}
					style={ELSTYLES.buttonRound}
					rippleContainerBorderRadius={40}
					onPress={() => goToUser()}>
					<Image
						style={{ width: "50%", height: "50%" }}
						source={require("../assets/icons/locIco.png")}></Image>
				</Ripple>

				<Ripple
					style={ELSTYLES.buttonRound}
					rippleColor={ELSTYLES.rippleColors().colorAccent}
					rippleCentered={true}
					rippleContainerBorderRadius={40}>
					<Image
						style={ELSTYLES.buttonFitImg}
						source={require("../assets/icons/settingIco.png")}></Image>
				</Ripple>
			</View>
			<View style={STARTGIG.mapNavBtnWarpper}>
				<Ripple
					rippleColor={ELSTYLES.rippleColors().colorAccent}
					rippleCentered={true}
					style={[ELSTYLES.button, { padding: 4 }]}
					onPress={() => goToStart()}>
					<Text style={{ textAlign: "center" }}>Origin</Text>
				</Ripple>
				<Ripple
					rippleColor={ELSTYLES.rippleColors().colorAccent}
					rippleCentered={true}
					style={[ELSTYLES.button, { padding: 4 }]}
					onPress={() => goToEnd()}>
					<Text style={{ textAlign: "center" }}>Destination</Text>
				</Ripple>
			</View>
			<View style={STARTGIG.infoWrapper}>
				<View style={[STARTGIG.textWrapper]}>
					<View
						style={[
							STARTGIG.section,
							{ justifyContent: "center", marginVertical: 16 },
						]}>
						<Text style={ELSTYLES.titleLlight} numberOfLines={1}>
							Route:
						</Text>
						{/* Pressing the city name will open maps with navigation to the gig address, either start or end */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 8,
							}}>
							<Pressable
								style={ELSTYLES.buttonBorder}
								onPress={() => Linking.openURL(startURL)}>
								<Text style={[ELSTYLES.titleL]}>{activeGig.startLocation}</Text>
							</Pressable>
							<Text style={ELSTYLES.titleL}> - </Text>

							<Pressable
								style={ELSTYLES.buttonBorder}
								onPress={() => Linking.openURL(endURL)}>
								<Text style={ELSTYLES.titleL}>{activeGig.endLocation}</Text>
							</Pressable>
						</View>
					</View>
					<View style={STARTGIG.section}>
						<View
							style={{
								flexDirection: "row",
								alignItems: "baseline",
							}}>
							<Text style={[STARTGIG.labelM, { flex: 0.8 }]}>
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
							<Text style={[STARTGIG.labelM, { flex: 0.8 }]}>
								Distance left:
							</Text>
							<Text style={[STARTGIG.labelL, { flex: 0.5, textAlign: "left" }]}>
								{distance} KM
							</Text>
						</View>
					</View>
					<View style={{ flex: 0.5, justifyContent: "flex-start" }}>
						{/*
						Do we need this - they already accepted it they know when they started
						<Text style={ELSTYLES.txtAlt}>
							Departure: {activeGig.leaveTime}
						</Text>*/}
						<Text style={ELSTYLES.txtAlt}>
							Arrival: {activeGig.arrivalTime}
						</Text>
					</View>
				</View>
				<View style={STARTGIG.buttonWrapper}>
					<Pressable
						style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}
						onPress={toggleFinishModal}>
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
				style={{ marginBottom: "40%", justifyContent: "flex-end", margin: 12 }}
				swipeDirection="down"
				onRequestClose={toggleFinishModal}
				onBackButtonPress={toggleFinishModal}
				scrollOffset={1}
				onSwipeComplete={toggleFinishModal}
				onLayout={setArrival}>
				<View style={STARTGIG.finishDriveModal}>
					<View>
						<Text style={[ELSTYLES.titleXLlight, { marginBottom: 16 }]}>
							You have arrived!
						</Text>
						<View
							style={{
								flexDirection: "row",
								marginVertical: 8,
								alignItems: "center",
							}}>
							<Text style={[ELSTYLES.txtAltL, { flex: 1 }]}>Arrival time:</Text>
							<Text style={[ELSTYLES.txtAltXL, { flex: 0.6 }]}>{arrivalTime}</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								marginVertical: 8,
								alignItems: "center",
							}}>
							<Text style={[ELSTYLES.txtAltL, { flex: 1 }]}>Payment:</Text>
							<Text style={[ELSTYLES.txtAltXL, { flex: 0.6 }]}>
								{activeGig.reward} €
							</Text>
						</View>
					</View>
					<View style={{}}>
						<Ripple
							style={[ELSTYLES.buttonAlt, STARTGIG.finishDriveBtn]}
							onPress={() => finishGig(navigation, activeGig)}>
							<Text style={[ELSTYLES.buttonAltTxt, STARTGIG.finishDriveBtnTxt]}>
								Finish drive
							</Text>
						</Ripple>
						<Ripple style={[ELSTYLES.buttonBorder]} onPress={toggleFinishModal}>
							<Text
								style={[
									ELSTYLES.buttonBorderTxt,
									STARTGIG.closefinishModalBtn,
								]}>
								Close
							</Text>
						</Ripple>
					</View>
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
				<View style={STARTGIG.contactInfoModal}>
					<Text style={ELSTYLES.titleLalt}>Contact information:</Text>
					<View style={{ flexDirection: "row" }}>
						<View>
							{/*ROW FOR USER DATA */}
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginVertical: 4,
								}}>
								<Image
									style={[
										ELSTYLES.buttonFitImg,
										{ width: 36, height: 36, marginRight: 16 },
									]}
									source={require("../assets/icons/userIco.png")}></Image>
								<Text style={ELSTYLES.txtL}>{clientName}</Text>
							</View>
							{/*ROW FOR USER DATA END */}
							{/*ROW FOR USER DATA */}
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginVertical: 4,
								}}>
								<Image
									style={[
										ELSTYLES.buttonFitImg,
										{ width: 36, height: 36, marginRight: 16 },
									]}
									source={require("../assets/icons/emailIco.png")}></Image>
								<Text style={ELSTYLES.txtL}>clientEmail</Text>
							</View>
							{/*ROW FOR USER DATA END */}
							{/*ROW FOR USER DATA */}
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									marginVertical: 4,
								}}>
								<Image
									style={[
										ELSTYLES.buttonFitImg,
										{ width: 36, height: 36, marginRight: 16 },
									]}
									source={require("../assets/icons/phoneIco.png")}></Image>
								<Pressable onPress={dialCall}>
									<Text style={ELSTYLES.txtL}>{clientPhone}</Text>
								</Pressable>
							</View>
							{/*ROW FOR USER DATA END */}
						</View>
					</View>
					<View style={{ alignSelf: "stretch" }}>
						<Button title="Close" onPress={toggleContactModal} />
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

// Finishing drive function
function finishGig(navigation) {
	finishDrive(activeGig.gigId, activeGig.id);
	navigation.navigate("ActiveGigs");
}

export default DrivingScreen;
