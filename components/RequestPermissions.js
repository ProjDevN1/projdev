import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import * as Location from "expo-location"

// This is where all permission request functions should be written, then exported and used where needed.

// Requests user access to phone camera.
const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera access required',
          message:
            'The application requires using a camera for this',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Requests access to precise and general location
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("No location services")
    } else {
      console.log(status)
    }
  }
  
  export { requestCameraPermission, requestLocationPermission }