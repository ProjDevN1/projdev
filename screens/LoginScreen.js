import * as React from "react";
import { Text, View, TextInput, Alert, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ELSTYLES } from "../constants/styles";
import { LOGIN } from "../constants/styles";
import Ripple from "react-native-material-ripple";

{
	/*Placeholder variable for checking login details*/
}
const correctLogin = true;

{
	/*Main loginscreen function*/
}
const LoginScreen = ({ navigation, route }) => {
	//Gradient object
	let [gradientOptions, setGradientOptions] = React.useState({
		colors: [LOGIN.bgColors().color1, LOGIN.bgColors().color2],
		start: { x: 0, y: 0 },
		end: { x: 0.5, y: 1 },
	});

	return (
		<LinearGradient
			style={LOGIN.contentWrapper}
			colors={gradientOptions.colors}
			start={gradientOptions.start}
			end={gradientOptions.end}>
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

			<View>
				{/*title*/}
				<Text style={[ELSTYLES.title, { marginBottom: 32 }]}>Log in</Text>

				{/*container*/}
				<View style={LOGIN.container}>
					{/*
					<Text style={ELSTYLES.errrorMsg}>
						This is where error will appear if wrong username/password
			</Text>*/}
					<Text style={ELSTYLES.label}>Username:</Text>
					<TextInput style={ELSTYLES.input} placeholder="Username" />
					<Text style={ELSTYLES.label}>Password:</Text>
					<TextInput
						style={ELSTYLES.input}
						secureTextEntry={true}
						placeholder="Password"
					/>
					<Pressable onPress={() => openForgot(navigation)}>
						<Text style={ELSTYLES.forgotPasswordTxt}>
							Forgot your password?
						</Text>
					</Pressable>

					<Ripple
						rippleColor={ELSTYLES.rippleColors().colorAccent}
						style={[ELSTYLES.button, LOGIN.loginBtn]}
						onPress={() => checkLogin(navigation)}>
						<Text style={ELSTYLES.buttonTxt}>Login</Text>
					</Ripple>
				</View>
			</View>
		</LinearGradient>
	);
};

const checkLogin = (navigation) => {
	{
		/*Checks whether login details are correct, alert pops up if they are not*/
	}
	if (correctLogin == true) {
		{
			/*Atm always true because the correctLogin thing hardcoded in*/
		}
		{
			/*Uses the navigation module to switch to the home screen in the navigation stack*/
		}
		navigation.navigate("GigList");
	} else {
		Alert.alert(
			"Incorrect login",
			"Wrong password or username",
			[{ text: "OK" }],
			{ cancelable: true }
		);
	}
};
const openLanding = (navigation) => {
	navigation.navigate("Landing");
};
const openForgot = (navigation) => {
	navigation.navigate("ForgotPassword");
};
{
	/*Export the loginscreen function so it can be used in the navigation stack in the app.js file*/
}
export default LoginScreen;
