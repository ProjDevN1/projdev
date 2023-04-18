import {
	View,
	Text,
	Pressable,
	Alert,
	Linking,
	Button,
	Image,
	SafeAreaView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Modal from "react-native-modal";
import * as Location from "expo-location";

import { clickedListItem, clientName, clientEmail, clientPhone } from "../screens/GigListScreen";
import { availableGigsData, applyForGig, } from "../api/api";

import { ELSTYLES } from "../constants/styles";
import { STARTGIG } from "../constants/styles";
import Ripple from "react-native-material-ripple";

const GOOGLE_MAPS_APIKEY = "AIzaSyBP6tdUhVPg34f1PfSR55r_eEZIrDAWsJo";

const GigApplyScreen = ({ navigation }) => {
	const currentGig = availableGigsData[clickedListItem];

	// Code for contact info modal visibility
	const [contactModalVisible, setContactVisible] = useState(false);
	const toggleContactModal = () => {
		setContactVisible(!contactModalVisible);
	};
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
	// Code for getting and setting user location
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
		console.log("Got user location coordinates");
	};
	// Code for running getUserLocation once
	useEffect(() => {
		getUserLocation();
	}, []);

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
	const goToUser = () => {
		mapRef.current.animateToRegion(userCoords, 3000);
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
					showsMyLocationButton={false}
					initialRegion={{
						latitude: currentGig.startLat,
						longitude: currentGig.startLon,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
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
			</View>
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
					rippleColor={ELSTYLES.rippleColors().colorAccent}
					rippleCentered={true}
					style={ELSTYLES.buttonRound}
					rippleContainerBorderRadius={40}
					onPress={() => {
						Search(navigation);
					}}>
					<Image
						style={ELSTYLES.buttonFitImg}
						source={require("../assets/icons/searchIco.png")}></Image>
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
			<View style={STARTGIG.infoWrapper}>
				{/*rating - absolute element*/}
				<View style={STARTGIG.ratingWrapper}>
					<View style={STARTGIG.rating}>
						<Text style={STARTGIG.ratingTxt}>0/0</Text>
						<Image
							style={[
								ELSTYLES.buttonFitImg,
								{ height: 32, width: 32, margin: 2 },
							]}
							source={require("../assets/icons/starIco.png")}></Image>
					</View>
				</View>
				<View style={[STARTGIG.textWrapper]}>
					<View style={[STARTGIG.section, { justifyContent: "center" }]}>
						<Text style={ELSTYLES.titleLlight} numberOfLines={1}>
							Route:
						</Text>

						<Text style={ELSTYLES.titleL}>{currentGig.route}</Text>
						{/*need seperate routes - origin and destination*/}
					</View>
					<View style={STARTGIG.section}>
						<View style={{ flexDirection: "row", flex: 1, marginBottom: 4 }}>
							<View style={{ flexDirection: "column", flex: 1 }}>
								<Text style={ELSTYLES.txtAltM}>Departure: </Text>
								<Text style={ELSTYLES.txtAltM}>Arrival: </Text>
								<Text style={ELSTYLES.txtAltM}>Pay: </Text>
							</View>
							<View
								style={{
									flexDirection: "column",
									flex: 2,
								}}>
								<Text style={ELSTYLES.numtxtAltM} numberOfLines={1}>
									{currentGig.startTime}
								</Text>
								<Text style={ELSTYLES.numtxtAltM} numberOfLines={1}>
									{currentGig.endTime}
								</Text>
								<View style={{ flexDirection: "row" }}>
									<Text style={ELSTYLES.numtxtAltM} numberOfLines={1}>
										{currentGig.reward}
									</Text>
									<Text style={ELSTYLES.numtxtAltM}> €</Text>
								</View>
							</View>
						</View>
					</View>

					<View
						style={[
							{ flex: 0.5, justifyContent: "space-between", marginTop: 8 },
						]}>
						<Text style={ELSTYLES.txtAlt}>Fuel budget: 70 €</Text>
						<Text style={ELSTYLES.txtAlt}>Client name: {clientName}</Text>
					</View>
				</View>

				<View style={STARTGIG.buttonWrapper}>
					<Ripple
						rippleColor={ELSTYLES.rippleColors().colorAccent}
						style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}
						onPress={() => gigApplyButton(navigation, currentGig)}>
						<Text style={ELSTYLES.buttonAltTxt}>Apply</Text>
					</Ripple>

					<Ripple
						rippleColor={ELSTYLES.rippleColors().colorAccent}
						style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}
						onPress={toggleContactModal}>
						<Text style={ELSTYLES.buttonAltTxt}>Contact info</Text>
					</Ripple>
				</View>
			</View>
			<Modal
				isVisible={contactModalVisible}
				style={{ justifyContent: "flex-end", margin: 0 }}
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
								<Text style={ELSTYLES.txtL}>{clientEmail}</Text>
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
// Apply button function to update available and current gigs then navigates user to Active gigs screen
function gigApplyButton(navigation) {
	const currentGig = availableGigsData[clickedListItem];
	applyForGig(currentGig.gigId, currentGig.id);
	navigation.navigate("ActiveGigs");
}

// Moves to gig list
const Search = (navigation) => {
	navigation.navigate("GigList");
};

export default GigApplyScreen;
