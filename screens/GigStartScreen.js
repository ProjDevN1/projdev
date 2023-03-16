import { View, Text, Pressable } from "react-native";
import { ELSTYLES } from "../constants/styles";
import { STARTGIG } from "../constants/styles";
import React from "react";
import MapView from "react-native-maps";


/*This screen is very similar to the GigApplyScreen, because apparently the 
only thing changing is that the apply-button changes to start-button*/

const GigStartScreen = () => {
	return (
		<View style={STARTGIG.screenWrapper}>
			{/*Actual map*/}
			<View style={STARTGIG.mapWrapper}>
			<MapView style={STARTGIG.mapWrapper}
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

				<Pressable style={ELSTYLES.buttonRound}>
					<Text>F</Text>
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
						<Text style={ELSTYLES.titleLlight}>Turku–Helsinki</Text>
					</View>
					<View style={[STARTGIG.section, { justifyContent: "space-evenly" }]}>
						<Text style={ELSTYLES.txtAlt}>Pickup time 00:00–14:00</Text>
						<Text style={ELSTYLES.txtAlt}>Delivery time 00:00–14:00</Text>
						<Text style={ELSTYLES.txtAlt}>Pay: 69eur</Text>
					</View>
					<View style={[STARTGIG.section, { justifyContent: "space-evenly" }]}>
						<Text style={ELSTYLES.txtAlt}>Fuel budget 69eur</Text>
						<Text style={ELSTYLES.txtAlt}>Client name</Text>
					</View>
				</View>

				<View style={STARTGIG.buttonWrapper}>
					<Pressable style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}>
						<Text style={ELSTYLES.buttonAltTxt}>Start</Text>
					</Pressable>

					<Pressable style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}>
						<Text style={ELSTYLES.buttonAltTxt}>Contact info</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default GigStartScreen;
