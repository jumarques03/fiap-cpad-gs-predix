import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientButton({ title, onPress }) {
  return (
    <LinearGradient
      colors={['#351886', '#401ca5', '#4e21ca']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <TouchableOpacity style={styles.botao} onPress={onPress}>
        <Text style={styles.botaoTexto}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  botao: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});