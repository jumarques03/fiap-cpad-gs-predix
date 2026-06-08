import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native"; 
import MaskInput from 'react-native-mask-input';

export default function MissionDataCard({ children }) {
  return (
    <View style={styles.containerMissao}>
      <Text style={styles.textoInterno}>Dados da missão:</Text>
      {children}
    </View>
  );
}

export function DetailsMissionInput({ tituloInput, placeholder, value, onChangeText, secureTextEntry, keyboardType, erro, ...props}) {
  return (
    <View style={styles.containerCampo}>
      <Text style={styles.tituloInput}>{tituloInput}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#dadada"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={[styles.input, erro && styles.inputErro]}
          {...props}
        />
      </View>
      {erro && <Text style={styles.erroTexto}>{erro}</Text>}
    </View>
  );
}

export function DateInput({ tituloInput, placeholder, value, onChangeText, keyboardType, erro, ...props}) {
  return (
    <View style={styles.containerCampo}>
      <Text style={styles.tituloInput}>{tituloInput}</Text>
      <View style={styles.inputContainer}>
        <MaskInput
          style={[styles.input, erro && styles.inputErro]}
          placeholder={placeholder}
          placeholderTextColor="#dadada"
          value={value}
          onChangeText={onChangeText}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          keyboardType={keyboardType}
          {...props}
        />
      </View>
      {erro && <Text style={styles.erroTexto}>{erro}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  containerMissao: {
    backgroundColor: "#b870135c",
    width: "100%",
    padding: 16,   
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#6d41089c"
  },
  textoInterno: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  containerCampo: {
    width: "100%",
    marginBottom: 4,
  },
  tituloInput: {
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "#4d2c01",
    borderWidth: 1,
    borderColor: "#906233",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#FFFFFF",
  },
  inputErro: {
    borderColor: "#FF4D4D",
    borderWidth: 1.5,
  },
  erroTexto: {
    color: "#FF4D4D",
    marginTop: 4,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
  },
});