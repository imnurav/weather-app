import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import SearchBar from "./SearchBar";
import { haze, rainy, snow, sunny } from "../assets/backgroundImages/index";

export default function Weather({ weatherData, fetchWeatherData }) {
  const [backgroundImage, setBackgroundImage] = useState(null);

  const {
    weather,
    name,
    main: { temp, humidity },
    wind: { speed },
    sys: { country, sunrise, sunset },
  } = weatherData;
  const [{ main }] = weather;

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(main));
  }, [weatherData]);

  function getBackgroundImg(weather) {
    if (weather === "Snow") return snow;
    if (weather === "Clear") return sunny;
    if (weather === "Rain") return rainy;
    if (weather === "Haze") return haze;
    return haze;
  }

  let textColor = backgroundImage !== sunny ? "white" : "black";
  let date = new Date(sunrise * 1000);
  let sunsetTime = new Date(sunset * 1000);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="darkgray" />
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImg}
        resizeMode="cover"
      >
        <SearchBar fetchWeatherData={fetchWeatherData} />

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
              fontSize: 46,
            }}
          >
            City : {name}
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
            }}
          >
            Weather : {main}
          </Text>

          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
            }}
          >
            Temperature : {temp} °C
          </Text>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white" }}>Humidity</Text>
            <Text style={{ fontSize: 22, color: "white" }}>{humidity} %</Text>
          </View>

          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white" }}>Wind Speed</Text>
            <Text style={{ fontSize: 22, color: "white" }}>{speed} m/s</Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white" }}>Sunrise (IST)</Text>
            <Text style={{ fontSize: 22, color: "white" }}>
              {date.getHours()}:{date.getMinutes()}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white" }}>Sunset (IST)</Text>
            <Text style={{ fontSize: 22, color: "white" }}>
              {sunsetTime.getHours()}:{date.getMinutes()}
            </Text>
          </View>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: "white" }}>Country</Text>
            <Text style={{ fontSize: 22, color: "white" }}>
              {country == "IN" ? "India" : country}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    padding: 10,
  },
  info: {
    width: Dimensions.get("screen").width / 2.5,
    backgroundColor: "rgba(0,0,0, 0.5)",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
});
