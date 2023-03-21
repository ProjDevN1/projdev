import {
	View,
	Text,
	Pressable,
	SafeAreaView,
	FlatList,
	Button,
	Image,
} from "react-native";
import React, { useState } from "react";

import { STYLES } from "../constants/styles";
import { ELSTYLES } from "../constants/styles";
import { GIGLIST } from "../constants/styles";
import { GIGLISTFILTER } from "../constants/styles";
import { availableGigsData, getClientName, getOngoingGigs } from "../api/api";

import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import Slider from "@react-native-community/slider";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

	//From picker
	const [openFrom, setOpenFrom] = useState(false);
	const [valueFrom, setValueFrom] = useState(null);
	const [itemsFrom, setItemsFrom] = useState([
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
	]);

	//To picker
	const [openTo, setOpenTo] = useState(false);
	const [valueTo, setValueTo] = useState(null);
	const [itemsTo, setItemsTo] = useState([
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
	]);

	//state for slider
	const [priceDisplayQuantity, setPriceDisplayQuantity] = useState(0);
	const [priceQuantity, setPriceQuantity] = useState(0);
	//set Date
	const [selectedDate, setSelectedDate] = useState(null);
	const [datePickerVisible, setDatePickerVisible] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisible(false);
	};

	const handleConfirm = (date) => {
		setSelectedDate(date);
		hideDatePicker();
	};

	//setTime
	const [selectedTime, setSelectedTime] = useState(null);
	const [timePickerVisible, setTimePickerVisible] = useState(false);

	const showTimePicker = () => {
		setTimePickerVisible(true);
	};

	const hideTimePicker = () => {
		setTimePickerVisible(false);
	};

	const handleConfirmTime = (time) => {
		setSelectedTime(time);
		hideTimePicker();
	};

	return (
		<SafeAreaView style={GIGLIST.screenWrapper}>
			<View style={GIGLIST.navbar}>
				<View>
					<Pressable
						onPress={() => {
							activeGigs(navigation);
						}}
						style={ELSTYLES.button}>
						<Text style={GIGLIST.searchBtnTxt}>Active gigs</Text>
					</Pressable>
				</View>
				<View style={GIGLIST.navbarR}>
					<Pressable style={ELSTYLES.buttonRound} onPress={toggleModal}>
						<Image
							style={{ width: "50%", height: "50%" }}
							source={require("../assets/icons/searchIco.png")}></Image>
					</Pressable>
					<Pressable style={ELSTYLES.buttonRound}>
						<Image
							style={{ width: "50%", height: "50%" }}
							source={require("../assets/icons/settingIco.png")}></Image>
					</Pressable>
				</View>
			</View>
			<View style={GIGLIST.content}>
				<List nav={navigation} />
			</View>
			{/*overlay menu*/}
			<Modal
				isVisible={isModalVisible}
				style={{ margin: 0, justifyContent: "flex-end" }}
				swipeDirection="down"
				onRequestClose={toggleModal}
    			onBackButtonPress={toggleModal}
    			scrollOffset={1}
				onSwipeComplete={toggleModal}
				>
				
				<View style={GIGLIST.modalWrapper}>
					<View style={{ flex: 1 }}>
						<View>
							<Text style={GIGLISTFILTER.title}>Search:</Text>
						</View>
						<View
							style={{ flexDirection: "row", marginBottom: 16 }}
							zIndex={2000}>
							<View style={{ flex: 1 }}>
								<DropDownPicker
									open={openFrom}
									value={valueFrom}
									items={itemsFrom}
									setOpen={setOpenFrom}
									setValue={setValueFrom}
									setItems={setItemsFrom}
									placeholder={"From:"}
								/>
							</View>
							<View
								style={{
									flex: 0.64,
									justifyContent: "center",
									alignItems: "center",
								}}>
								<Text>-</Text>
							</View>
							<View style={{ flex: 1 }}>
								<DropDownPicker
									open={openTo}
									value={valueTo}
									items={itemsTo}
									setOpen={setOpenTo}
									setValue={setValueTo}
									setItems={setItemsTo}
									placeholder={"To:"}
								/>
							</View>
						</View>
						<View style={{ marginBottom: 16 }}>
							<View style={{ flexDirection: "row" }}>
								<Text>Pay: </Text>
								<Text>{priceDisplayQuantity}</Text>
								<Text> Eur</Text>
							</View>
							<Slider
								style={{ height: 40 }}
								step={1}
								minimumValue={0}
								maximumValue={1000}
								minimumTrackTintColor="#FFFFFF"
								maximumTrackTintColor="#000000"
								onSlidingComplete={(value) => setPriceQuantity(value)}
								onValueChange={(value) => setPriceDisplayQuantity(value)}
							/>
						</View>
						<View>
							<Text>Date and time: </Text>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
								}}>
								<Pressable
									onPress={showDatePicker}
									style={GIGLISTFILTER.dateTimeBtn}>
									<Text>
										{selectedDate
											? selectedDate.toLocaleDateString()
											: "Select date"}
									</Text>
								</Pressable>
								<Pressable
									onPress={showTimePicker}
									style={GIGLISTFILTER.dateTimeBtn}>
									<Text>
										{selectedTime
											? selectedTime.toLocaleTimeString()
											: "Select time"}
									</Text>
								</Pressable>
								<DateTimePickerModal
									value={selectedDate}
									isVisible={datePickerVisible}
									mode="date"
									onConfirm={handleConfirm}
									onCancel={hideDatePicker}
								/>
								<DateTimePickerModal
									value={selectedTime}
									isVisible={timePickerVisible}
									mode="time"
									onConfirm={handleConfirmTime}
									onCancel={hideTimePicker}
								/>
							</View>
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

const activeGigs = (navigation) => {
	navigation.navigate("ActiveGigs");
};

export default GigListScreen;
export { clickedListItem, clientName };
