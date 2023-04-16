import * as React from "react";
import { Text, View, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ELSTYLES } from "../constants/styles";
import { LANDING } from "../constants/styles";
import Ripple from "react-native-material-ripple";
var coef = 1;

const LandingScreen = ({ navigation }) => {
	//Gradient object - default state
	const GRADIENT_START = { x: 0, y: 0 };
	const GRADIENT_END = { x: 0.5, y: 1 };
	const GRADIENT_LOCATIONS = [0.5, 0.5];
	const GRADIENT_COLORS = [
		LANDING.bgColors().color1,
		LANDING.bgColors().color2,
	];
	const MOVEMENT = -0.1;
	const INTERVAL = 1000;
	let [gradientOptions, setGradientOptions] = React.useState({
		colors: GRADIENT_COLORS,
		start: GRADIENT_START,
		end: GRADIENT_END,
		locations: GRADIENT_LOCATIONS,
	});
	//declaring gradient timeout for later use
	let timeout = undefined;
	//current gradient value
	const gradientOptionsRef = React.useRef(gradientOptions);
	gradientOptionsRef.current = gradientOptions;

	//attempt of animating the gradient
	/*
	React.useEffect(() => {
		const timeout = setInterval(() => {
			let updatedLocations = gradientOptionsRef.current.locations.map(
				(item, index) => {
					return parseFloat(Math.max(0, item - MOVEMENT).toFixed(2));
				}
			);
			setGradientOptions({
				colors: [...gradientOptionsRef.current.colors],
				locations: updatedLocations,
				start: GRADIENT_START,
				end: GRADIENT_END,
			});
			console.log(updatedLocations);
		}, 10);

		return () => clearTimeout(timeout);
	});*/
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
			<Image
				style={{
					width: "100%",
					height: "40%",
					position: "absolute",
					top: "28%",
					left: "12%",
					opacity: 0.7,
				}}
				source={require("../assets/LOGO.png")}></Image>

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
