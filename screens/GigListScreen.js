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
			<Pressable onPress={() => onListItemPress(navRef, id)}>
				<Text>From {startLocation}</Text>
				<Text>To {endLocation}</Text>
				<Text>Reward {reward}€</Text>
				<Text>Departure time: {startTime}</Text>
				<Text>Arrival time: {endTime}</Text>
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
		<SafeAreaView>
			<View style={GIGLIST.navbar}>
				<View>
					<Button title="Show modal" onPress={toggleModal} />
				</View>
				<View style={GIGLIST.navbarR}>
					<Pressable style={ELSTYLES.buttonRound}>
						<Text>S</Text>
					</Pressable>

					<Pressable style={ELSTYLES.buttonRound}>
						<Text>F</Text>
					</Pressable>
				</View>
			</View>
			<List nav={navigation} />

			<Modal isVisible={isModalVisible}>
				<View style={{ flex: 1 }}>
					<Text>Hello!</Text>

					<Button title="Hide modal" onPress={toggleModal} />
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
