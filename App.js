import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import cordinateDistanceCalculator from "./cordinateDistanceCalculator";
import getDirectionAndAngle from "./getDirectionAndAngle";

export default function App() {
  const [startPoint, setStartPoint] = useState({
    latitude: 11.58222,
    longitude: 37.3860308
  });
  const [endPoint, setEndPoint] = useState({
    latitude: 11.6996684,
    longitude: 37.82
  });

  let latDiff = Math.abs(startPoint.latitude - endPoint.latitude);
  let lonDiff = Math.abs(startPoint.longitude - endPoint.longitude);

  const verticalInitial = {
    latitude: startPoint.latitude - latDiff,
    longitude: startPoint.longitude
  };
  const verticalEnd = {
    latitude: startPoint.latitude + latDiff,
    longitude: startPoint.longitude
  };

  const horizontalInitial = {
    latitude: startPoint.latitude,
    longitude: endPoint.longitude - lonDiff
  };
  const horizontalEnd = {
    latitude: startPoint.latitude,
    longitude: startPoint.longitude + lonDiff
  };

  const [distance, setDistance] = useState(0);
  const [angle, setAngle] = useState(null);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    // Calculate distance when start or end points change
    const newDistance = cordinateDistanceCalculator(
      startPoint.latitude,
      startPoint.longitude,
      endPoint.latitude,
      endPoint.longitude
    );
    setDistance(newDistance);
    const { direction, angle } = getDirectionAndAngle(startPoint, endPoint);
    setAngle(angle);
    setDirection(direction);
  }, [startPoint, endPoint]);

  return (
    <>
      <MapView
        initialRegion={{
          latitude: startPoint.latitude,
          longitude: startPoint.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
        style={styles.map}
      >
        <Marker
          coordinate={startPoint}
          title="Start Point"
          draggable
          onDragEnd={(e) => {
            setStartPoint(e.nativeEvent.coordinate);
          }}
        />
        <Marker
          coordinate={endPoint}
          pinColor="#34a"
          title="End Point"
          draggable
          onDragEnd={(e) => {
            setEndPoint(e.nativeEvent.coordinate);
          }}
        />
        {[startPoint, endPoint].length > 0 && (
          <>
            <Polyline
              coordinates={[startPoint, endPoint]}
              strokeColor="#00F"
              strokeWidth={2}
            />
            <Polyline
              coordinates={[horizontalInitial, horizontalEnd]}
              strokeColor="gray"
              strokeWidth={2}
            />
            <Polyline
              coordinates={[verticalInitial, verticalEnd]}
              strokeColor="gray"
              strokeWidth={2}
            />
          </>
        )}
      </MapView>
      <View style={styles.textContainer}>
        <Text>
          {Math.round(angle * 10) / 10}&deg; degrees to {direction} direction.
        </Text>
        <Text>At distance of {distance}km.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  textContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: 10
  }
});
