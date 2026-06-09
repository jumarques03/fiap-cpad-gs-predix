import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TrajectoryCard({ velocidade, altitude, desvioAtual }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <MaterialCommunityIcons name="orbit" size={18} color="#4e21ca" />
        <Text style={styles.cardTitulo}>Parâmetros de Trajetória</Text>
      </View>
      
      <View style={styles.metricasRow}>
        <View style={styles.metricaItem}>
          <Text style={styles.metricaValor}>{velocidade}</Text>
          <Text style={styles.metricaLabel}>Velocidade</Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.metricaItem}>
          <Text style={styles.metricaValor}>{altitude}</Text>
          <Text style={styles.metricaLabel}>Altitude</Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.metricaItem}>
          <Text style={styles.metricaValor}>{desvioAtual} km</Text>
          <Text style={styles.metricaLabel}>Desvio Atual</Text>
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
    borderColor: "rgba(78, 33, 202, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeaderRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  cardTitulo: { color: "#ffffff", fontSize: 14, fontWeight: "700", marginLeft: 8, textTransform: "uppercase", opacity: 0.9 },
  metricasRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  metricaItem: { flex: 1, alignItems: "center" },
  metricaValor: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  metricaLabel: { color: "#94a3b8", fontSize: 10, fontWeight: "500", marginTop: 6 },
  verticalDivider: { width: 1, height: 30, backgroundColor: "rgba(255, 255, 255, 0.08)" }
});