import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";

import { STYLES } from "../constants/styles";
import { activeGigsData, getClientName } from "../api/api";

import { ELSTYLES } from "../constants/styles";
import { GIGLIST } from "../constants/styles";

//This has the frontend code that shows either a list of active gigs or a text thing. Style accordingly
function List(props) {
	const navRef = props.nav;
	//This is the frontend code for an individual list item
	const Item = ({
		id,
		title,
		addInfo,
		arrivalAddress,
		arrivalTime,
		estimatedTime,
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
						alignItems: "baseline",
						marginBottom: 8,
					}}>
					<Text style={GIGLIST.listBtnTitle}>{title} |</Text>
					<Text style={GIGLIST.departure}> {vehicle}</Text>
				</View>
				<View style={{ flexDirection: "row" }}>
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
						<Text>{estimatedTime}</Text>
						<Text>{addInfo}</Text>
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
					<Pressable
						style={ELSTYLES.buttonRound}
						onPress={() => {
							Search(navigation);
						}}>
						<Text>{"<"}</Text>
					</Pressable>
				</View>
				{/*} Niko said we are not using this
				<Pressable
					style={STYLES.button}
					onPress={() => navigation.navigate("GigList")}>
					<Text
						style={{
							color: "black",
							height: 20,
							width: 50,
							marginVertical: 20,
						}}>
						Search
					</Text>
				</Pressable>
          {*/}

				{/*What is this even supposed to be?}
				<Pressable style={STYLES.button}>
					<Text
						style={{
							color: "black",
							height: 20,
							width: 50,
							marginVertical: 20,
						}}>
						Active gigs
					</Text>
				</Pressable>
          */}

				<Pressable style={ELSTYLES.buttonRound}>
					<Text>Profile?</Text>
				</Pressable>
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
async function onListItemPress(navigation, id) {
	clickedListItem = id;
	clientName = await getClientName("active", id);
	navigation.navigate("GigStart");
}

const Search = (navigation) => {
	navigation.navigate("GigList");
};

export default ActiveGigsScreen;
export { clickedListItem, clientName };
