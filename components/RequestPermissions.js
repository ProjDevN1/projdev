import React from 'react';
import { PermissionsAndroid } from 'react-native';

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
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location access needed",
                message: "Location access required",
                buttonNeutral: "Ask me later",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Location services enabled");
        } else {
            console.log("Denied");
        }
    } catch(err) {
        console.warn(err);
    }
  }

  
  export { requestCameraPermission, requestLocationPermission }