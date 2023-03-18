import {
	View,
	Text,
	Pressable,
	SafeAreaView,
	FlatList,
	Button,
} from "react-native";
import React, { useState } from "react";

import { STYLES } from "../constants/styles";
import { ELSTYLES } from "../constants/styles";
import { GIGLIST } from "../constants/styles";
import { availableGigsData, getClientName } from "../api/api";

import Modal from "react-native-modal";

//This has the frontend code that shows either a list of available gigs or a text thing. Style accordingly
function List(props) {
	const navRef = props.nav;
	//This is the frontend code for an individual list item
	const Item = ({
		id,
		startLocation,
		endLocation,
		reward,
		startTime,
		endTime,
	}) => (
		<View>
			<Pressable
				onPress={() => onListItemPress(navRef, id)}
				style={GIGLIST.listBtn}>
				<View style={{ flexDirection: "row" }}>
					<View
						style={{
							flex: 1,
							flexDirection: "column",
							justifyContent: "space-between",
						}}>
						<Text style={GIGLIST.listBtnTitle}>
							{startLocation} - {endLocation}
						</Text>
						<Text style={GIGLIST.departure}>Departure: {startTime}</Text>
					</View>
					<View
						style={{
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Text style={GIGLIST.reward}>{reward}€</Text>
					</View>
				</View>
			</Pressable>
		</View>
	);
	if (availableGigsData.length === 0) {
		return <Text>No available gigs</Text>;
	} else {
		return (
			<FlatList
				data={availableGigsData}
				renderItem={({ item }) => (
					<Item
						startLocation={item.startLocation}
						endLocation={item.endLocation}
						reward={item.reward}
						startTime={item.startTime}
						endTime={item.endTime}
						id={item.id}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
		);
	}
}

const GigListScreen = ({ navigation }) => {
	//The List component is the function above. It returns the forntend code for available gigs list if there are available gigs
	//Otherwise just returns text component telling the user that no gigs are available

	//state for controlling the filter menu
	const [isModalVisible, setModalVisible] = useState(false);
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	return (
		<SafeAreaView style={GIGLIST.screenWrapper}>
			<View style={GIGLIST.navbar}>
				<View>
					<Button title="Search" onPress={toggleModal} />
				</View>
				<View style={GIGLIST.navbarR}>
					<Pressable style={ELSTYLES.buttonRound}>
						<Text>S</Text>
					</Pressable>
				</View>
			</View>
			<View style={GIGLIST.content}>
				<List nav={navigation} />
			</View>
			<Modal
				isVisible={isModalVisible}
				style={{ margin: 0, justifyContent: "flex-end" }}
				swipeDirection="down">
				<View style={GIGLIST.modalWrapper}>
					<View>
						<View>
							<Text>From-to filter</Text>
						</View>
						<View>
							<Text>Pay filter</Text>
						</View>
						<View>
							<Text>date filter</Text>
						</View>
					</View>

					<View style={{ alignSelf: "stretch" }}>
						<Button title="Close" onPress={toggleModal} />
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

//This function saves info about which item was clicked, ans well as gets the client name ready for next screen
//Putting the client name function here ensures that the data gets fetched before the next screen renders
let clickedListItem = "";
let clientName = "";
async function onListItemPress(navigation, id) {
	clickedListItem = id;
	clientName = await getClientName("available", id);
	navigation.navigate("GigApply");
}

export default GigListScreen;
export { clickedListItem, clientName };
