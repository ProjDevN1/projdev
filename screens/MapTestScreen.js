import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export default function MapsTestScreen() {
  return (
    <View style={styles.container}>
    {/*Render our MapView*/}
      <MapView

        showsUserLocation={true}
        style={styles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: 60.45167733942584,
          longitude: 22.266609036440343,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

    </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
