import {
	View,
	Text,
	Pressable,
	TextInput,
	StyleSheet,
	ScrollView,
	Image,
} from "react-native";
import React from "react";
import { STYLES } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";

import { REGISTER } from "../constants/styles";
import { ELSTYLES } from "../constants/styles";
import Ripple from "react-native-material-ripple";

// Welcome message from registration button, needs function to work properly only shows popup "Welcome"

const verifyRegistration = () => {
	alert("Welcome");
};

// Main user interface, different fields for all needed inputs

const RegistrationScreen = ({ navigation }) => {
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
								style={ELSTYLES.input}></TextInput>

							<Text style={ELSTYLES.label}>Password:</Text>
							<TextInput
								placeholder="password"
								style={ELSTYLES.input}></TextInput>

							<Text style={ELSTYLES.label}>Re-enter password</Text>
							<TextInput
								placeholder="password"
								style={ELSTYLES.input}></TextInput>

							<Text style={ELSTYLES.label}>Email:</Text>
							<TextInput placeholder="email" style={ELSTYLES.input}></TextInput>

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
								onPress={() => verifyRegistration()}>
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
