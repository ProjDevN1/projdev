import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import React from "react";
import { STYLES } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";

import { REGISTER } from "../constants/styles";
import { ELSTYLES } from "../constants/styles";

// Welcome message from registration button, needs function to work properly only shows popup "Welcome"

const verifyRegistration = () => {
	alert("Welcome");
};

// Main user interface, different fields for all needed inputs

const RegistrationScreen = () => {
	//Gradient object
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
			<Text style={ELSTYLES.title}>Register</Text>
			<View style={REGISTER.inputContainer}>
				<Text style={ELSTYLES.label}>Username:</Text>
				<TextInput placeholder="username" style={ELSTYLES.input}></TextInput>

				<Text style={ELSTYLES.label}>Password:</Text>
				<TextInput placeholder="password" style={ELSTYLES.input}></TextInput>

				<Text style={ELSTYLES.label}>Re-enter password</Text>
				<TextInput placeholder="password" style={ELSTYLES.input}></TextInput>

				<Text style={ELSTYLES.label}>Email:</Text>
				<TextInput placeholder="email" style={ELSTYLES.input}></TextInput>

				<Pressable style={ELSTYLES.button}>
					<Text style={[ELSTYLES.buttonTxt, REGISTER.addLicenceBtn]}>
						Add drivers licence
					</Text>
				</Pressable>


				<Pressable
					style={[ELSTYLES.button, REGISTER.registerBtn]}
					onPress={() => verifyRegistration()}>
					<Text style={ELSTYLES.buttonTxt}>Register</Text>
				</Pressable>
			</View>
		</LinearGradient>
	);
};

export default RegistrationScreen;
