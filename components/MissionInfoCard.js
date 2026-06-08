import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MissionInfoCard({ descricao, inicio, fim }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <FontAwesome5 name="space-shuttle" size={16} color="#9d81f5" />
        <Text style={styles.cardTitulo}>Informações da Missão</Text>
      </View>
      
      <Text style={styles.missaoTextoDestaque}>
        <Text style={styles.labelFosco}>Objetivo: {descricao}</Text>
      </Text>
      
      <View style={styles.divider} />
      
      <View style={styles.datasRow}>
        <View style={styles.dataItem}>
          <Text style={styles.labelFoscoMini}>INÍCIO</Text>
          <Text style={styles.dataValor}>{inicio}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.labelFoscoMini}>TÉRMINO</Text>
          <Text style={styles.dataValor}>{fim}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: "rgba(78, 33, 202, 0.15)", 
    borderRadius: 16, 
    padding: 18, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: "rgba(157, 129, 245, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeaderRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  cardTitulo: { color: "#ffffff", fontSize: 14, fontWeight: "700", marginLeft: 8, letterSpacing: 0.5, textTransform: "uppercase", opacity: 0.9 },
  missaoTextoDestaque: { color: "#e2e8f0", fontSize: 14, lineHeight: 22 },
  labelFosco: { color: "#94a3b8", fontWeight: "500" },
  labelFoscoMini: { color: "#64748b", fontSize: 10, fontWeight: "700", letterSpacing: 1 },
  divider: { height: 1, backgroundColor: "rgba(255, 255, 255, 0.05)", marginVertical: 12 },
  datasRow: { flexDirection: "row", justifyContent: "space-between" },
  dataItem: { flex: 1 },
  dataValor: { color: "#ffffff", fontSize: 14, fontWeight: "600", marginTop: 2 },
});