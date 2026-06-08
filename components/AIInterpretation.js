import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AIInterpretation({ textoAnalise }) {

  return (
    <View style={[styles.containerAI]}>
      <Text style={styles.titulo}>Interpretação PredixAI: </Text>

      <View style={[styles.subcontainer]}>
        <Text style={[styles.textoInterpretacaoAI]}>
          {textoAnalise || "Aguardando leitura de parâmetros operacionais..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerAI: {
    backgroundColor: "rgba(78, 33, 202, 0.15)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subcontainer: {
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 19, 104, 0.57)'
  },
  textoInterpretacaoAI: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: '450',
    textAlign: 'center',
    lineHeight: 20, 
  }
});