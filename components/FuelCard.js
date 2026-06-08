import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function FuelCard({porcentagem, capacidadeTotal}) {
  const raio = 50;
  const circunferencia = 2 * Math.PI * raio;
  const strokeDashoffset = circunferencia - (porcentagem / 100) * circunferencia;

  return (
    <View style={[styles.card, styles.cardErro]}>
      <Text style={styles.cardTitulo}>Nível de combustível</Text>
      
      <View style={styles.chartContainer}>
        <Svg width={140} height={140} viewBox="0 0 120 120">
          {/* Círculo de Fundo (Apagado) */}
          <Circle
            cx="60"
            cy="60"
            r={raio}
            stroke="rgba(253, 182, 182, 0.14)"
            strokeWidth="8"
            fill="none"
          />
          {/* Círculo de Progresso Ativo */}
          <Circle
            cx="60"
            cy="60"
            r={raio}
            stroke="#4dff50"
            strokeWidth="8"
            strokeDasharray={circunferencia}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            transform="rotate(-90 60 60)"
          />
        </Svg>
        
        {/* Textos Centralizados */}
        <View style={styles.textOverlay}>
          <Text style={styles.porcentagemTexto}>{porcentagem}%</Text>
          <Text style={styles.subtextoInterno}>Restante</Text>
        </View>
      </View>

      <Text style={styles.capacidadeTexto}>Capacidade total: {capacidadeTotal}</Text>
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
  cardErro: {
    borderColor: "#05720652",
    backgroundColor: "#4dff502b",
  },
  cardTitulo: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  textOverlay: {
    position: "absolute",
    alignItems: "center",
  },
  porcentagemTexto: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtextoInterno: {
    color: "#ffffff",
    fontSize: 12,
    marginTop: 2,
  },
  capacidadeTexto: {
    color: "#ffffff",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },
});