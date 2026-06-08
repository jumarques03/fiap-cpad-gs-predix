// components/OrbitalStabilityChart.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Path, Circle, Text as SvgText } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function OrbitalStabilityChart() {
  // Coordenadas da linha do gráfico (Tempo x km/min)
  // Ponto 1 (2 min atrás):  (20, 75)  -> Valor: 458 km/min
  // Ponto 2 (1:30 min atrás):(80, 45)  -> Valor: 462 km/min
  // Ponto 3 (1 min atrás):   (140, 60) -> Valor: 460 km/min
  // Ponto 4 (30 s atrás):    (200, 35) -> Valor: 464 km/min
  // Ponto 5 (Tempo Atual):   (260, 50) -> Valor: 461 km/min
  const caminhoLinha = "M 20 75 Q 50 45, 80 45 T 140 60 T 200 35 T 260 50";

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <MaterialCommunityIcons name="chart-bell-curve-cumulative" size={18} color="#08baeb" />
        <Text style={styles.cardTitulo}>Estabilidade Orbital (km/min)</Text>
      </View>

      {/* Gráfico Linear Vetorial com Tags de Valores */}
      <View style={styles.chartContainer}>
        <Svg width="100%" height="110" viewBox="0 0 300 110">
          {/* Linha de Tendência */}
          <Path
            d={caminhoLinha}
            fill="none"
            stroke="#08baeb"
            strokeWidth="3"
          />
          
          {/* Nó 1: 2 min atrás */}
          <Circle cx="20" cy="75" r="4" fill="#08baeb" />
          <SvgText x="20" y="65" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">458</SvgText>

          {/* Nó 2: 1:30 min atrás */}
          <Circle cx="80" cy="45" r="4" fill="#08baeb" />
          <SvgText x="80" y="35" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">462</SvgText>

          {/* Nó 3: 1 min atrás */}
          <Circle cx="140" cy="60" r="4" fill="#08baeb" />
          <SvgText x="140" y="50" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">460</SvgText>

          {/* Nó 4: 30 s atrás */}
          <Circle cx="200" cy="35" r="4" fill="#08baeb" />
          <SvgText x="200" y="25" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">464</SvgText>

          {/* Nó 5: Tempo Atual */}
          <Circle cx="260" cy="50" r="4" fill="#08baeb" />
          <SvgText x="260" y="40" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">461</SvgText>
        </Svg>
      </View>

      {/* Legenda Limpa: Sem sinais negativos, formato direto de leitura */}
      <View style={styles.eixoXRow}>
        <Text style={styles.eixoXTexto}>2 min</Text>
        <Text style={styles.eixoXTexto}>1:30 min</Text>
        <Text style={styles.eixoXTexto}>1 min</Text>
        <Text style={styles.eixoXTexto}>30 s</Text>
        <Text style={styles.eixoXTextoDestaque}>Agora</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: "#1368b85c", 
    borderRadius: 16, 
    padding: 18, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: "rgba(0, 109, 124, 0.31)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeaderRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  cardTitulo: { color: "#ffffff", fontSize: 14, fontWeight: "700", marginLeft: 8, textTransform: "uppercase", opacity: 0.9 },
  chartContainer: {
    marginVertical: 5,
    alignItems: "center"
  },
  eixoXRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: 6
  },
  eixoXTexto: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600"
  },
  eixoXTextoDestaque: {
    color: "#08baeb",
    fontSize: 12,
    fontWeight: "700"
  }
});