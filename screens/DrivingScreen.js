import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { ELSTYLES } from "../constants/styles";
import { STARTGIG } from "../constants/styles";

const GOOGLE_MAPS_APIKEY = "AIzaSyBP6tdUhVPg34f1PfSR55r_eEZIrDAWsJo"

const DrivingScreen = () => {

	const showContactInfo = () => 
	Alert.alert("Client contact information", "this alert is not yet functional", [
		{text: "Cancel", style: "cancel"},
		{
			text:"Client phone number",
			style: "cancel",
		},
	]);
	return (
		<View style={STARTGIG.screenWrapper}>
			<MapView
				style={STARTGIG.mapWrapper}
				//specify our coordinates.
				provider={PROVIDER_GOOGLE}
				showsUserLocation={true}
				followsUserLocation={true}
				initialRegion={{
					latitude: 60.45167733942584,
					longitude: 22.266609036440343,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}>
					{/*Renders the route for the gig on the map screen*/}
					<MapViewDirections
						origin= "60.436431242849096, 22.264518536084235"
						destination="60.584568433593105, 22.737131310210604"
						apikey={GOOGLE_MAPS_APIKEY}
						strokeWidth={3}
						strokeColor="blue"
						optimizeWaypoints={true}
						onStart={(params) => {
							console.log(`Started routing between "${params.origin}" and "${params.destination}"`)
						}}
						onReady={result => {
							console.log(`Distance: ${result.distance} km`)
							console.log(`Duration: ${result.duration} min`)
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
			<View style={STARTGIG.infoWrapper}>
				<View style={[STARTGIG.textWrapper]}>
					<View style={[STARTGIG.section, { justifyContent: "center" }]}>
						<Text style={ELSTYLES.titleL}>Route:</Text>
						<Text style={ELSTYLES.titleLlight}>From - To</Text>
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
								00:00
							</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "baseline",
							}}>
							<Text style={[STARTGIG.labelM, { flex: 1 }]}>Distance left:</Text>
							<Text style={[STARTGIG.labelL, { flex: 0.5, textAlign: "left" }]}>
								0
							</Text>
						</View>
					</View>
					<View style={[STARTGIG.section, { justifyContent: "space-evenly" }]}>
						<Text style={ELSTYLES.txtAlt}>Departure: 00:00</Text>
						<Text style={ELSTYLES.txtAlt}>Arrival: 00:00</Text>
					</View>
				</View>
				<View style={STARTGIG.buttonWrapper}>
					<Pressable style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}>
						<Text style={ELSTYLES.buttonAltTxt}>Finish gig</Text>
					</Pressable>

					<Pressable style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]} onPress={showContactInfo}>
						<Text style={ELSTYLES.buttonAltTxt}>Contact info</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default DrivingScreen;
