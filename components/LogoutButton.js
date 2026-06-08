import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LogoutButton({ onPress, title = "Sair da Conta" }) {
  return (
    <TouchableOpacity style={styles.botaoLogout} onPress={onPress}>
      <Ionicons name="log-out-outline" size={20} color="#ffabab" style={styles.icone} />
      <Text style={styles.botaoTexto}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botaoLogout: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    backgroundColor: "#d5404039",
    borderWidth: 1,
    borderColor: "#d54040",
    borderRadius: 12,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icone: {
    marginRight: 8,
  },
  botaoTexto: {
    color: "#ffabab",
    fontSize: 16,
    fontWeight: "bold",
  },
});