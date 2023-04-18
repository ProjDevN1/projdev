import {
	View,
	Text,
	Pressable,
	SafeAreaView,
	FlatList,
	Image,
} from "react-native";
import React, { useState } from "react";

import { STYLES } from "../constants/styles";
import { activeGigsData, getClientName, getClientPhone, getClientEmail } from "../api/api";

import { ELSTYLES } from "../constants/styles";
import { GIGLIST } from "../constants/styles";
import Ripple from "react-native-material-ripple";

//This has the frontend code that shows either a list of active gigs or a text thing. Style accordingly
function List(props) {
	const navRef = props.nav;
	//This is the frontend code for an individual list item
	const Item = ({
		id,
		title,
		arrivalAddress,
		arrivalTime,
		leaveTime,
		reward,
		startAddress,
		vehicle,
	}) => (
		<View>
			<Pressable
				onPress={() => onListItemPress(navRef, id)}
				style={GIGLIST.listBtn}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						overflow: "hidden",
						paddingVertical: 8,
					}}>
					<Text style={[GIGLIST.listBtnTitle]}>{title}</Text>
					<View style={GIGLIST.separator}></View>
					<View
						style={{
							justifyContent: "center",
						}}>
						<Text style={GIGLIST.vehicle} numberOfLines={1}>
							{vehicle}
						</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row", marginVertical: 8 }}>
					<View style={{ flex: 1 }}>
						<Text style={GIGLIST.departure}>Leave: {leaveTime}</Text>
						<Text style={GIGLIST.departure}>Arrive: {arrivalTime}</Text>
					</View>
					<View style={{ flex: 1 }}>
						<Text style={GIGLIST.departure}>{startAddress}</Text>
						<Text style={GIGLIST.departure}>{arrivalAddress}</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row" }}>
					<View>
					</View>
					<View
						style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
						<Text style={GIGLIST.reward}>{reward}€</Text>
					</View>
				</View>
			</Pressable>
		</View>
	);

	if (activeGigsData.length === 0) {
		return <Text>No active gigs</Text>;
	} else {
		return (
			<FlatList
				data={activeGigsData}
				renderItem={({ item }) => (
					<Item
						title={item.title}
						addInfo={item.addInfo}
						arrivalAddress={item.arrivalAddress}
						arrivalTime={item.arrivalTime}
						estimatedTime={item.estimatedTime}
						leaveTime={item.leaveTime}
						reward={item.reward}
						startAddress={item.startAddress}
						vehicle={item.vehicle}
						id={item.id}
					/>
				)}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
			/>
		);
	}
}

const ActiveGigsScreen = ({ navigation }) => {
	//The List component is the function above. It returns the forntend code for active gigs list if there are active gigs
	//Otherwise just returns text component telling the user that no gigs are active
	return (
		<SafeAreaView style={GIGLIST.screenWrapper}>
			<View style={GIGLIST.navbar}>
				<View style={GIGLIST.navbarR}>
					<Ripple
						rippleColor={ELSTYLES.rippleColors().colorAccent}
						style={ELSTYLES.buttonRound}
						onPress={() => {
							Search(navigation);
						}}>
						<Image
							style={ELSTYLES.buttonFitImg}
							source={require("../assets/icons/arrowLico.png")}></Image>
					</Ripple>
				</View>
				<Text style={ELSTYLES.titleLalt}>Active Gigs</Text>
				<Ripple
					style={ELSTYLES.buttonRound}
					rippleColor={ELSTYLES.rippleColors().colorAccent}>
					<Image
						style={ELSTYLES.buttonFitImg}
						source={require("../assets/icons/settingIco.png")}></Image>
				</Ripple>
			</View>
			<View style={GIGLIST.content}>
				<List nav={navigation} />
			</View>
		</SafeAreaView>
	);
};

//This function saves info about which item was clicked, ans well as gets the client name ready for next screen
//Putting the client name function here ensures that the data gets fetched before the next screen renders
let clickedListItem = "";
let clientName = "";
let clientPhone = "";
let clientEmail = "";

async function onListItemPress(navigation, id) {
	clickedListItem = id;
	clientName = await getClientName("active", id);
	clientPhone = await getClientPhone("active", id);
	clientEmail = await getClientEmail("active", id);
	navigation.navigate("GigStart");
}

const Search = (navigation) => {
	navigation.navigate("GigList");
};

export default ActiveGigsScreen;
export { clickedListItem, clientName, clientPhone, clientEmail };
