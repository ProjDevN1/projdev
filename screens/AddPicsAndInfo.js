import { View, Text, Pressable, TextInput, SafeAreaView, Image, StyleSheet, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';

import { ADDPICTURES } from "../constants/styles";
import { ELSTYLES } from "../constants/styles";
import { elastic } from "react-native/Libraries/Animated/Easing";

const AddPicsAndInfo = ({ navigation }) => {

	// Code for camera modal visibility
	const [cameraModal, setCameraVisible] = useState(false);
	const toggleCameraModal = () => {
		setCameraVisible(!cameraModal);
	};

	const [galleryModal, setGalleryVisible] = useState(false)
	const toggleGalleryModal = () => {
		setGalleryVisible(!galleryModal)
	};

	// Camera constants code
	const [hasCameraPermission, setHasCameraPermission] = useState(null); 
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);

	// Camera permission code
    const [type, setType] = useState(Camera.Constants.Type.back);useEffect(() => {
      (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');})();
    }, []);

	// Code for capturing a photo
	const takePicture = async () => {
      if(camera){
          const data = await camera.takePictureAsync(null)
          setImage(data.uri);
      }
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }


	// Code for opening the phone gallery
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
	
		console.log(result);
	
		if (!result.canceled) {
		  setImage(result.assets[0].uri);
		}
	  };

	// Front end code
	return (
		<SafeAreaView style={ADDPICTURES.screenWrapper}>
			<View style={ADDPICTURES.contentWrapperTopBottom}>
				<Text style={ELSTYLES.titleLlight}>Before starting your drive</Text>
				<Pressable style={ELSTYLES.buttonRound}>
					<Text style={ELSTYLES.buttonTxt}>?</Text>
				</Pressable>
			</View>

			<View style={ADDPICTURES.contentWrapperMiddle}>
				<View style={ADDPICTURES.innerContentWrapper1}>
					<Pressable style={[ELSTYLES.button, ADDPICTURES.addPicsBtn]} onPress={toggleCameraModal}>
						<Text style={ELSTYLES.buttonTxt}>Camera</Text>
					</Pressable>
					<Pressable style={[ELSTYLES.button, ADDPICTURES.addPicsBtn]} onPress={pickImage}>
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
			{/* Camera modal */}
			<Modal
				isVisible={cameraModal}
				swipeDirection="down"
				onRequestClose={toggleCameraModal}
				onBackButtonPress={toggleCameraModal}
				scrollOffset={1}
				onSwipeComplete={toggleCameraModal}>
					<Camera
						ref={ref => setCamera(ref)}
						style={styles.fixedRatio}
						type={type}
						ratio={"1:1"}
						/>
				<Pressable style={ELSTYLES.button} onPress={() => takePicture()}>
					<Text style={ELSTYLES.buttonTxt}>Take photo</Text>
				</Pressable>
				<Pressable style={ELSTYLES.button} onPress={toggleCameraModal}>
					<Text>Close camera X</Text>
				</Pressable>

				{/* Shows taken image below the above buttons */}
				{image && <Image source={{uri: image}} style={{flex:1}}/>}
			</Modal>

		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio:{
        flex: 1,
        aspectRatio: 1
    }
  })

export default AddPicsAndInfo;

