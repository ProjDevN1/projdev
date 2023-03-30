import { View, Text, Pressable, TextInput } from "react-native";
import React from "react";
import { ADDPICTURES } from "../constants/styles";
import { ELSTYLES } from "../constants/styles";
import { elastic } from "react-native/Libraries/Animated/Easing";

const AddPicsAndInfo = ({ navigation }) => {
	return (
		<View style={ADDPICTURES.screenWrapper}>
			<View style={ADDPICTURES.contentWrapperTopBottom}>
				<Text style={ELSTYLES.titleLlight}>Before starting your drive</Text>
				<Pressable style={ELSTYLES.buttonRound}>
					<Text style={ELSTYLES.buttonTxt}>?</Text>
				</Pressable>
			</View>

			<View style={ADDPICTURES.contentWrapperMiddle}>
				<View style={ADDPICTURES.innerContentWrapper1}>
					<Pressable style={[ELSTYLES.button, ADDPICTURES.addPicsBtn]}>
						<Text style={ELSTYLES.buttonTxt}>Camera</Text>
					</Pressable>
					<Pressable style={[ELSTYLES.button, ADDPICTURES.addPicsBtn]}>
						<Text style={ELSTYLES.buttonTxt}>Gallery</Text>
					</Pressable>
				</View>

				<View style={ADDPICTURES.innerContentWrapper2}>
					<TextInput
						placeholder="Give additional info about the vehicle"
						style={ADDPICTURES.input}></TextInput>
				</View>
			</View>
			<View style={ADDPICTURES.contentWrapperTopBottom}>
				<Pressable style={ELSTYLES.buttonRound}>
					<Text style={ELSTYLES.buttonTxt}>Back</Text>
				</Pressable>
				<Pressable style={ELSTYLES.buttonRound}
				onPress={() => navigation.navigate('Driving')}
				>
					<Text style={ELSTYLES.buttonTxt}>Next</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default AddPicsAndInfo;
