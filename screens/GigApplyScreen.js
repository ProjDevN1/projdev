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
import React, { useRef, useState } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Modal from "react-native-modal";

import { clickedListItem, clientName } from "../screens/GigListScreen";
import { availableGigsData, applyForGig } from "../api/api";

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
						<Text>Destination</Text>
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
						<Text style={STARTGIG.ratingTxt}>☆ 0/0</Text>
					</View>
				</View>
				<View style={[STARTGIG.textWrapper]}>
					<View style={[STARTGIG.section, { justifyContent: "center" }]}>
						<Text style={ELSTYLES.titleXL}>Route:</Text>
						{/*need seperate routes - origin and destination*/}
						<Text style={ELSTYLES.titleLlight} numberOfLines={1}>
							{currentGig.route}
						</Text>
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
						<Text style={ELSTYLES.txtAlt}>Fuel budget: 69 €</Text>
						<Text style={ELSTYLES.txtAlt}>Client name: {clientName}</Text>
					</View>
				</View>

				<View style={STARTGIG.buttonWrapper}>
					<Ripple
						rippleColor={ELSTYLES.rippleColors().colorAccent}
						style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}
						onPress={() => applyForGig(currentGig.gigId, currentGig.id)}>
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
				style={{ margin: 0, justifyContent: "flex-end" }}
				swipeDirection="down"
				onRequestClose={toggleContactModal}
				onBackButtonPress={toggleContactModal}
				scrollOffset={1}
				onSwipeComplete={toggleContactModal}>
				<View>
					<Text>Client name goes here</Text>
					<Pressable style={{ borderColor: "blue", borderWidth: 5 }}>
						<Text>Client phone number</Text>
					</Pressable>
					<Pressable
						style={{ borderColor: "red", borderWidth: 5 }}
						onPress={toggleContactModal}>
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
const Apply = (navigation) => {
	navigation.navigate("AddPicInfo");
};

export default GigApplyScreen;
