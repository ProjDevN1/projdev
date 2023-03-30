import { View, Text, TextInput, Pressable, Image } from "react-native";
import React from "react";
import { FORGOTPASS } from "../constants/styles";
import { ELSTYLES, LOGIN } from "../constants/styles";
import Ripple from "react-native-material-ripple";
import { LinearGradient } from "expo-linear-gradient";

const ForgotPasswordScreen = ({ navigation, route }) => {
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
			<Ripple
				style={[
					ELSTYLES.buttonRound,
					{ position: "absolute", right: 0, top: 0, margin: 8, opacity: 0.9 },
				]}
				rippleColor={ELSTYLES.rippleColors().colorAccent}
				rippleCentered={true}
				onPress={() => openLogin(navigation)}>
				<Image
					style={ELSTYLES.buttonFitImg}
					source={require("../assets/icons/arrowLico.png")}></Image>
			</Ripple>

			<Text style={[ELSTYLES.titleLlight, { marginBottom: 16 }]}>
				Forgot your password?
			</Text>
			<View style={FORGOTPASS.contentWrapper}>
				<Text style={[ELSTYLES.txtLight, { marginBottom: 8 }]}>
					We will send you a message to recover your account
				</Text>
				<Text style={ELSTYLES.label}>Email:</Text>

				<TextInput
					style={ELSTYLES.input}
					placeholder="Typed email address goes here"></TextInput>

				<Ripple
					rippleColor={ELSTYLES.rippleColors().colorAccent}
					style={[ELSTYLES.button, FORGOTPASS.submitBtn, { marginTop: 16 }]}>
					<Text style={ELSTYLES.buttonTxt}>Recover account</Text>
				</Ripple>
			</View>
		</LinearGradient>
	);
};
const openLogin = (navigation) => {
	navigation.navigate("Login");
};
export default ForgotPasswordScreen;
