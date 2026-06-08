import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SensorsSummaryCard({ 
  combustivel, 
  temperatura, 
  pressao, 
  umidade, 
  radiacao,
  desvioOrbital
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <MaterialCommunityIcons name="pulse" size={18} color="#4e21ca" />
        <Text style={styles.cardTitulo}>Monitoramento de Telemetria Geral</Text>
      </View>
      
      {/* LINHA 1: Parâmetros Principais e Térmicos */}
      <View style={styles.metricasRow}>
        <View style={styles.metricaItem}>
          <Text style={styles.metricaValor}>{combustivel} <Text style={styles.unidadeMini}>%</Text></Text>
          <Text style={styles.metricaLabel}>Combustível</Text>
        </View>
        
        <View style={styles.verticalDivider} />
        
        <View style={styles.metricaItem}>
          <Text style={styles.metricaValor}>{temperatura} <Text style={styles.unidadeMini}>°C</Text></Text>
          <Text style={styles.metricaLabel}>Temperatura</Text>
        </View>
        
        <View style={styles.verticalDivider} />
        
        <View style={styles.metricaItem}>
          <Text style={styles.metricaValor}>{pressao} <Text style={styles.unidadeMini}>hPa</Text></Text>
          <Text style={styles.metricaLabel}>Pressão</Text>
        </View>
      </View>

      <View style={styles.horizontalDivider} />

      {/* LINHA 2: Ambiente e Trajetória Orbital */}
      <View style={styles.metricasRow}>
        <View style={styles.metricaItem}>
          <Text style={styles.metricaValor}>{umidade} <Text style={styles.unidadeMini}>%</Text></Text>
          <Text style={styles.metricaLabel}>Umidade</Text>
        </View>
        
        <View style={styles.verticalDivider} />
        
        <View style={styles.metricaItem}>
          <Text style={styles.metricaValor}>{radiacao} <Text style={styles.unidadeMini}>mSv</Text></Text>
          <Text style={styles.metricaLabel}>Radiação</Text>
        </View>
        
        <View style={styles.verticalDivider} />
        
        <View style={styles.metricaItem}>
          <Text style={styles.metricaValor}>{desvioOrbital} <Text style={styles.unidadeMini}>km</Text></Text>
          <Text style={styles.metricaLabel}>Desvio</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: "rgba(22, 13, 60, 0.65)", 
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
  cardTitulo: { color: "#ffffff", fontSize: 14, fontWeight: "700", marginLeft: 8, letterSpacing: 0.5, textTransform: "uppercase", opacity: 0.9 },
  metricasRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  metricaItem: { flex: 1, alignItems: "center" },
  metricaValor: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", letterSpacing: -0.5 },
  unidadeMini: { fontSize: 13, fontWeight: "500", color: "#ffffff" },
  metricaLabel: { color: "#94a3b8", fontSize: 10, fontWeight: "500", marginTop: 6, textAlign: "center" },
  verticalDivider: { width: 1, height: 30, backgroundColor: "rgba(255, 255, 255, 0.08)" },
  horizontalDivider: { height: 1, backgroundColor: "rgba(255, 255, 255, 0.05)", marginVertical: 14 }
});