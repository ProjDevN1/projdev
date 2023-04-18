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
import { availableGigsData, getClientName, getFilteredItems, getClientPhone, getClientEmail } from "../api/api";

import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import Slider from "@react-native-community/slider";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ripple from "react-native-material-ripple";

let filteredItems = [];

//This has the frontend code that shows either a list of available gigs or a text thing. Style accordingly
function List(props) {
	const navRef = props.nav;
	const showFilteredList = props.filtered;

	function decideShownData(filteredItems, availableGigsData, showFilteredList) {
		if (showFilteredList === true) {
			return filteredItems;
		} else {
			return availableGigsData;
		}
	}

	//This is the frontend code for an individual list item
	const Item = ({
		id,
		startLocation,
		endLocation,
		reward,
		startTime,
		date,
	}) => (
		<View>
			<Ripple
				onPress={() => onListItemPress(navRef, id)}
				style={GIGLIST.listBtn}
				rippleColor={ELSTYLES.rippleColors().colorBase}>
				<View style={{ flexDirection: "row" }}>
					<View
						style={{
							flex: 1,
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
							paddingVertical: 4,
						}}>
						<View
							style={{
								width: "100%",
							}}>
							<Text style={GIGLIST.listBtnTitle} numberOfLines={1}>
								{startLocation} - {endLocation}
							</Text>
						</View>
						<View
							style={{ flex: 1, flexDirection: "row", alignItems: "baseline" }}>
							<Text style={GIGLIST.date}>{date}</Text>
							<Text style={GIGLIST.departure} numberOfLines={1}>
								({startTime})
							</Text>
						</View>
					</View>
					<View
						style={{
							flex: 0.4,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}>
						{/*number needs to be rounded before sending*/}
						<Text style={GIGLIST.reward} numberOfLines={1}>
							{reward}
						</Text>
						<Text style={GIGLIST.reward}>€</Text>
					</View>
				</View>
			</Ripple>
		</View>
	);
	if (availableGigsData.length === 0) {
		return <Text style={ELSTYLES.txtAlt}>No available gigs</Text>;
	} else {
		return (
			<FlatList
				data={decideShownData(
					filteredItems,
					availableGigsData,
					showFilteredList
				)}
				renderItem={({ item }) => (
					<Item
						startLocation={item.startLocation}
						endLocation={item.endLocation}
						reward={item.reward}
						startTime={item.startTime}
						date={item.date}
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

	//State for controlling whether to show full list of gigs or a filtered version
	const [showFilteredList, setShowFilteredList] = useState(false);

	//state for controlling the filter menu
	const [isModalVisible, setModalVisible] = useState(false);
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	function getPossibleStartLocations(availableGigsData) {
		const possibleStartLocations = [];

		availableGigsData.forEach((gig) => {
			// Check if the label already exists in the possibleStartLocations array
			const labelExists = possibleStartLocations.some(
				(location) => location.label === gig.startLocation
			);

			// If the label doesn't exist, add the current gig to the possibleStartLocations array
			if (!labelExists) {
				const obj = { label: gig.startLocation, value: gig.startLocation };
				possibleStartLocations.push(obj);
			}
		});

		return possibleStartLocations;
	}

	function getPossibleEndLocations(availableGigsData) {
		const possibleEndLocations = [];

		availableGigsData.forEach((gig) => {
			// Check if the label already exists in the possibleStartLocations array
			const labelExists = possibleEndLocations.some(
				(location) => location.label === gig.endLocation
			);

			// If the label doesn't exist, add the current gig to the possibleStartLocations array
			if (!labelExists) {
				const obj = { label: gig.endLocation, value: gig.endLocation };
				possibleEndLocations.push(obj);
			}
		});

		return possibleEndLocations;
	}

	//From picker
	const [openFrom, setOpenFrom] = useState(false);
	const [valueFrom, setValueFrom] = useState(null);
	const [itemsFrom, setItemsFrom] = useState(
		getPossibleStartLocations(availableGigsData)
	);

	//To picker
	const [openTo, setOpenTo] = useState(false);
	const [valueTo, setValueTo] = useState(null);
	const [itemsTo, setItemsTo] = useState(
		getPossibleEndLocations(availableGigsData)
	);

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

	//setDateEnd
	const [selectedDateEnd, setSelectedDateEnd] = useState(null);
	const [dateEndPickerVisible, setDateEndPickerVisible] = useState(false);

	const showDateEndPicker = () => {
		setDateEndPickerVisible(true);
	};

	const hideDateEndPicker = () => {
		setDateEndPickerVisible(false);
	};

	const handleConfirmDateEnd = (dateEnd) => {
		setSelectedDateEnd(dateEnd);
		hideDateEndPicker();
	};

	function searchButtonPressHandler(
		valueFrom,
		valueTo,
		selectedDate,
		selectedDateEnd,
		priceQuantity
	) {
		if (valueFrom != null || valueTo != null || selectedDate != null || selectedDateEnd != null || priceQuantity != 0){
			filteredItems = getFilteredItems(
				valueFrom,
				valueTo,
				selectedDate,
				selectedDateEnd,
				priceQuantity
			);
			setShowFilteredList(true);
			toggleModal();
		}
	}

	return (
		<SafeAreaView style={GIGLIST.screenWrapper}>
			<View style={GIGLIST.navbar}>
				<View>
					<Ripple
						rippleColor={ELSTYLES.rippleColors().colorAccent}
						onPress={() => {
							activeGigs(navigation);
						}}
						style={ELSTYLES.button}>
						<Text style={GIGLIST.searchBtnTxt}>Active gigs</Text>
					</Ripple>
				</View>
				<View style={GIGLIST.navbarR}>
					<Ripple
						rippleColor={ELSTYLES.rippleColors().colorAccent}
						style={ELSTYLES.buttonRound}
						onPress={toggleModal}>
						<Image
							style={{ width: "50%", height: "50%" }}
							source={require("../assets/icons/searchIco.png")}></Image>
					</Ripple>
					<Ripple
						rippleColor={ELSTYLES.rippleColors().colorAccent}
						style={ELSTYLES.buttonRound}>
						<Image
							style={{ width: "50%", height: "50%" }}
							source={require("../assets/icons/settingIco.png")}></Image>
					</Ripple>
				</View>
			</View>
			<View style={GIGLIST.content}>
				<List nav={navigation} filtered={showFilteredList} />
			</View>
			{/*overlay menu*/}
			<Modal
				isVisible={isModalVisible}
				style={{ margin: 0, justifyContent: "flex-end" }}
				swipeDirection="down"
				onRequestClose={toggleModal}
				onBackButtonPress={toggleModal}
				scrollOffset={1}
				onSwipeComplete={toggleModal}>
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
									style={GIGLIST.dropdown}
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
									style={GIGLIST.dropdown}
								/>
							</View>
						</View>
						<View style={{ marginBottom: 16 }}>
							<View style={{ flexDirection: "row", alignItems: "baseline" }}>
								<Text style={ELSTYLES.txt}>Minimum reward: </Text>
								<Text>{priceDisplayQuantity}</Text>
								<Text style={ELSTYLES.txt}> €</Text>
							</View>
							<Slider
								style={{ height: 40 }}
								step={1}
								minimumValue={0}
								maximumValue={1000}
								minimumTrackTintColor={ELSTYLES.rippleColors().colorAccent}
								onSlidingComplete={(value) => setPriceQuantity(value)}
								onValueChange={(value) => setPriceDisplayQuantity(value)}
							/>
						</View>
						<View>
							<Text style={ELSTYLES.txt}>Date between: </Text>
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
											: "Start date"}
									</Text>
								</Pressable>
								<Pressable
									onPress={showDateEndPicker}
									style={GIGLISTFILTER.dateTimeBtn}>
									<Text>
										{selectedDateEnd
											? selectedDateEnd.toLocaleDateString()
											: "End date"}
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
									value={selectedDateEnd}
									isVisible={dateEndPickerVisible}
									mode="date"
									onConfirm={handleConfirmDateEnd}
									onCancel={hideDateEndPicker}
								/>
							</View>
						</View>
					</View>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flex: 1 }}>
							<Button
								title="Search"
								onPress={() => {
									searchButtonPressHandler(
										valueFrom,
										valueTo,
										selectedDate,
										selectedDateEnd,
										priceQuantity
									);
								}}
							/>
						</View>
						<View style={{ flex: 1 }}>
							<Button
								title="Clear"
								onPress={() => setShowFilteredList(false)}
							/>
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
let clientPhone = "";
let clientEmail = "";

async function onListItemPress(navigation, id) {
	clickedListItem = id;
	clientName = await getClientName("available", id);
	clientPhone = await getClientPhone("available", id);
	clientEmail = await getClientEmail("available", id);
	navigation.navigate("GigApply");
}

const activeGigs = (navigation) => {
	navigation.navigate("ActiveGigs");
};

export default GigListScreen;
export { clickedListItem, clientName, clientEmail, clientPhone };
