import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";

import { STYLES } from "../constants/styles";
import { availableGigsData } from "../api/api";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

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
			<Pressable onPress={() => onListItemPress(navRef)}>
				<Text>From {startLocation}</Text>
				<Text>To {endLocation}</Text>
				<Text>Reward {reward}€</Text>
				<Text>Departure time: {startTime}</Text>
				<Text>Arrival time: {endTime}</Text>
			</Pressable>
		</View>
	);
	if (1) {
		//back in if availableGigsData.length === 0
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

function Feed(nav) {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<SafeAreaView>
				<List />
				<Text> {/*nav={navigation}*/}</Text>
			</SafeAreaView>
		</View>
	);
}

function Article() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Article Screen</Text>
		</View>
	);
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
	return (
		<Drawer.Navigator useLegacyImplementation>
			<Drawer.Screen name="Feed" component={Feed} />
			<Drawer.Screen name="Article" component={Article} />
		</Drawer.Navigator>
	);
}

const GigListScreen = ({ navigation }) => {
	//The List component is the function above. It returns the forntend code for available gigs list if there are available gigs
	//Otherwise just returns text component telling the user that no gigs are available
	return <MyDrawer />;
};

function onListItemPress(navigation) {
	navigation.navigate("GigApply");
}

export default GigListScreen;
