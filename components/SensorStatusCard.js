import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";

export default function SensorStatusCard({ quantidadeAtivos = 24 }) {
  return (
    <View style={[styles.card, styles.cardSucesso]}>
      <Text style={styles.cardTitulo}>Status dos sensores</Text>
      
      <Text style={styles.grandeNumero}>{quantidadeAtivos}</Text>
      <Text style={styles.subtexto}>Sensores ativos</Text>

      {/* Onda suave de estabilidade dos sensores */}
      <View style={styles.chartContainer}>
        <Svg width="100%" height="50" viewBox="0 0 300 50">
          <Path
            d="M 0 40 Q 30 45, 60 35 T 120 42 T 180 20 T 240 38 T 300 15"
            fill="none"
            stroke="#eb8808"
            strokeWidth="2"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#030d1d",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  cardSucesso: {
    borderColor: "#6d41089c",
    backgroundColor: "#b870135c",
  },
  cardTitulo: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  grandeNumero: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
  },
  subtexto: {
    color: "#ffffff",
    fontSize: 14,
    marginTop: 2,
  },
  chartContainer: {
    marginTop: 10,
    overflow: "hidden",
  },
});