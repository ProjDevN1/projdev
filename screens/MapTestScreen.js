import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Geolocation from '@react-native-community/geolocation';

const MapTest = () => {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <MapView
      style={styles.map}
      initialRegion={position}
      showsUserLocation={true}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapTest;