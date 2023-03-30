import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ELSTYLES } from "../constants/styles";
import { LANDING } from "../constants/styles";
import Ripple from "react-native-material-ripple";

const LandingScreen = ({ navigation }) => {
	//Gradient object
	let [gradientOptions, setGradientOptions] = React.useState({
		colors: [LANDING.bgColors().color1, LANDING.bgColors().color2],
		start: { x: 0, y: 0 },
		end: { x: 0.5, y: 1 },
	});
	return (
		<LinearGradient
			style={LANDING.contentWrapper}
			colors={gradientOptions.colors}
			start={gradientOptions.start}
			end={gradientOptions.end}>
			{/*Title container*/}
			<View style={LANDING.titleWrapper}>
				<Text style={[ELSTYLES.titleXXLlight, { marginBottom: 16 }]}>
					Toimauto
				</Text>
				<Text style={[ELSTYLES.titleMlight, { paddingLeft: 8 }]}>
					Lorem ipsum etc
				</Text>
			</View>

			{/*Buttons*/}
			<View style={LANDING.buttonWrapper}>
				<Ripple
					style={[ELSTYLES.button, LANDING.buttonLanding]}
					onPress={() => openLogin(navigation)}
					rippleColor={ELSTYLES.rippleColors().colorAccent}>
					<Text style={[ELSTYLES.buttonTxt, ELSTYLES.txtL]}>Login</Text>
				</Ripple>
				<Ripple
					style={[ELSTYLES.button, LANDING.buttonLanding]}
					onPress={() => openRegister(navigation)}
					rippleColor={ELSTYLES.rippleColors().colorAccent}>
					<Text style={[ELSTYLES.buttonTxt, ELSTYLES.txtL]}>Register</Text>
				</Ripple>
			</View>
		</LinearGradient>
	);
};

const openLogin = (navigation) => {
	navigation.navigate("Login");
};

const openRegister = (navigation) => {
	navigation.navigate("Registration");
};

export default LandingScreen;
