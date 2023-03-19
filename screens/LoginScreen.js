import * as React from "react";
import { Text, View, TextInput, Alert, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ELSTYLES } from "../constants/styles";
import { LOGIN } from "../constants/styles";

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
			<View>
				{/*title*/}
				<Text style={ELSTYLES.title}>Log in</Text>

				{/*container*/}
				<View style={LOGIN.container}>
					<Text style={ELSTYLES.errrorMsg}>
						This is where error will appear if wrong username/password
					</Text>
					<Text style={ELSTYLES.label}>Username:</Text>
					<TextInput style={ELSTYLES.input} placeholder="Username" />
					<Text style={ELSTYLES.label}>Password:</Text>
					<TextInput
						style={ELSTYLES.input}
						secureTextEntry={true}
						placeholder="Password"
					/>
					<Text style={ELSTYLES.forgotPasswordTxt}>Forgot your password?</Text>

					{/*to animate pressable we creat a variable - if there are multiple buttons,
					then diffrent variable names*/}

					<Pressable
						style={({ pressed }) => [
							pressed ? ELSTYLES.buttonPressed : ELSTYLES.button,
							LOGIN.loginBtn,
						]}
						onPress={() => checkLogin(navigation)}>
						{/*we pass the variable to any child elements that need to be changed
						when pressed, in this case the inner text*/}
						{({ pressed }) => (
							<Text
								style={
									pressed ? ELSTYLES.buttonTxtPressed : ELSTYLES.buttonTxt
								}>
								Login
							</Text>
						)}
					</Pressable>
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

{
	/*Export the loginscreen function so it can be used in the navigation stack in the app.js file*/
}
export default LoginScreen;
