import { View, Text, Pressable } from "react-native";
import React from "react";
import MapView from "react-native-maps";

import { clickedListItem, clientName } from "../screens/GigListScreen";
import { availableGigsData } from "../api/api";

import { ELSTYLES } from "../constants/styles";
import { STARTGIG } from "../constants/styles";

const GigApplyScreen = ({ navigation }) => {
	const currentGig = availableGigsData[clickedListItem];
	return (
		<View style={STARTGIG.screenWrapper}>
			{/*Render our MapView*/}
			<View style={STARTGIG.mapWrapper}>
				<MapView
					style={STARTGIG.mapWrapper}
					//specify our coordinates.
					initialRegion={{
						latitude: 60.45167733942584,
						longitude: 22.266609036440343,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			</View>
			{/*Search/info buttons - absolute element */}
			<View style={STARTGIG.infoBtnWrapper}>
				<Pressable style={ELSTYLES.buttonRound}>
					<Text>S</Text>
				</Pressable>

				<Pressable
					style={ELSTYLES.buttonRound}
					onPress={() => {
						Search(navigation);
					}}>
					<Text>F</Text>
				</Pressable>
			</View>
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
						<Text style={ELSTYLES.titleLlight}>{currentGig.route}</Text>
					</View>
					<View style={[STARTGIG.section, { justifyContent: "space-evenly" }]}>
						<Text style={ELSTYLES.txtAlt}>
							Departure: {currentGig.startTime}
						</Text>
						<Text style={ELSTYLES.txtAlt}>Arrival: {currentGig.endTime}</Text>
						<Text style={ELSTYLES.txtAlt}>Pay: {currentGig.reward} €</Text>
					</View>

					<View style={[STARTGIG.section, { justifyContent: "space-evenly" }]}>
						<Text style={ELSTYLES.txtAlt}>Fuel budget: 69 €</Text>
						<Text style={ELSTYLES.txtAlt}>Client name: {clientName}</Text>
					</View>
				</View>

				<View style={STARTGIG.buttonWrapper}>
					<Pressable style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}>
						<Text style={ELSTYLES.buttonAltTxt}>Apply</Text>
					</Pressable>

					<Pressable style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}>
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

export default GigApplyScreen;
