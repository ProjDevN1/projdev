import {
	View,
	Text,
	Pressable,
	TextInput,
	StyleSheet,
	ScrollView,
	Image,
} from "react-native";
import React, { useState } from "react";
import { STYLES } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../firebaseConfig.js";
import {
	collection,
	addDoc,
	getCountFromServer,
	QuerySnapshot,
} from "firebase/firestore";

import { REGISTER } from "../constants/styles";
import { ELSTYLES } from "../constants/styles";
import Ripple from "react-native-material-ripple";

// Welcome message from registration button, needs function to work properly only shows popup "Welcome"

const verifyRegistration = () => {
	alert("Welcome");
};

// Main user interface, different fields for all needed inputs

const RegistrationScreen = ({ navigation }) => {
	// Adding a user to the database
	const [userName, setUsername] = useState(""); //Setting username
	const [userPass, setPass] = useState(""); //Setting password in cleartext
	const [userEmail, setEmail] = useState(""); //Setting user email
	const [userData, setUserData] = useState({
		gigsActive: [],
		gigsCompleted: [],
		phone: 0,
	}); //Adds fields for active/completed gigs and phone number on database

	// Code to add the inputted data to the database
	const addUser = async (e) => {
		try {
			const docRef = await addDoc(collection(db, "users"), {
				name: userName,
				email: userEmail,
				password: userPass,
				gigsActive: userData.gigsActive,
				gigsCompleted: userData.gigsCompleted,
				phone: userData.phone,
			});
			console.log("User registered", docRef.id);
			verifyRegistration();
		} catch (e) {
			console.error("Error adding user", e);
		}
	};
	//Gradient object - default state
	let [gradientOptions, setGradientOptions] = React.useState({
		colors: [REGISTER.bgColors().color1, REGISTER.bgColors().color2],
		start: { x: 0, y: 0 },
		end: { x: 0.5, y: 1 },
	});

	return (
		<LinearGradient
			style={REGISTER.screenWrapper}
			colors={gradientOptions.colors}
			start={gradientOptions.start}
			end={gradientOptions.end}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ width: "100%" }}>
				{/*back btn*/}
				<Ripple
					style={[
						ELSTYLES.buttonRound,
						{ position: "absolute", right: 0, top: 0, margin: 8, opacity: 0.9 },
					]}
					rippleColor={ELSTYLES.rippleColors().colorAccent}
					rippleCentered={true}
					onPress={() => openLanding(navigation)}>
					<Image
						style={ELSTYLES.buttonFitImg}
						source={require("../assets/icons/arrowLico.png")}></Image>
				</Ripple>

				<View style={{ flex: 1, alignItems: "center" }}>
					<View style={{ width: "78%" }}>
						<Text
							style={[
								ELSTYLES.title,
								{ marginTop: 64, marginBottom: 32, marginHorizontal: 0 },
							]}>
							Register
						</Text>
						<View style={REGISTER.inputContainer}>
							<Text style={ELSTYLES.label}>Username:</Text>
							<TextInput
								placeholder="username"
								style={ELSTYLES.input}
								onChangeText={(value) => setUsername(value)}></TextInput>

							<Text style={ELSTYLES.label}>Password:</Text>
							<TextInput
								placeholder="password"
								style={ELSTYLES.input}
								secureTextEntry={true}
								onChangeText={(value) => setPass(value)}></TextInput>

							<Text style={ELSTYLES.label}>Re-enter password</Text>
							<TextInput
								placeholder="password"
								secureTextEntry={true}
								style={ELSTYLES.input}></TextInput>

							<Text style={ELSTYLES.label}>Email:</Text>
							<TextInput
								placeholder="email"
								style={ELSTYLES.input}
								onChangeText={(value) => setEmail(value)}></TextInput>

							<Ripple
								rippleColor={ELSTYLES.rippleColors().colorAccent}
								style={[ELSTYLES.button, { marginVertical: 16 }]}>
								<Text style={[ELSTYLES.buttonTxt, REGISTER.addLicenceBtn]}>
									Add drivers licence
								</Text>
							</Ripple>

							<Ripple
								rippleColor={ELSTYLES.rippleColors().colorAccent}
								style={[ELSTYLES.button, REGISTER.registerBtn]}
								onPress={() => addUser()}>
								<Text style={ELSTYLES.buttonTxt}>Register</Text>
							</Ripple>
						</View>
					</View>
				</View>
			</ScrollView>
		</LinearGradient>
	);
};
const openLanding = (navigation) => {
	navigation.navigate("Landing");
};

export default RegistrationScreen;
