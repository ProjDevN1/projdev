import { View, Text, Pressable } from "react-native";
import React from "react";
import MapView from "react-native-maps";

import { ELSTYLES } from "../constants/styles";
import { STARTGIG } from "../constants/styles";

const DrivingScreen = () => {
	return (
		<View style={STARTGIG.screenWrapper}>
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
								0m
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

					<Pressable style={[ELSTYLES.buttonAlt, STARTGIG.buttonStart]}>
						<Text style={ELSTYLES.buttonAltTxt}>Contact info</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default DrivingScreen;
