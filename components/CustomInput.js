import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  isPassword,
  senhaVisivel,
  setSenhaVisivel,
  erro,
  ...props
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.tituloInput}>{label}</Text>}
      
      <View style={[styles.inputContainer, isPassword && styles.senhaContainer]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#dadada"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={isPassword ? styles.senhaInput : styles.input}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <Ionicons 
              name={senhaVisivel ? "eye-off" : "eye"} 
              color="#4e21ca" 
              size={24} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {erro && <Text style={styles.erro}>{erro}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    marginTop: 10,
  },
  tituloInput: {
    color: "#ffff",
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "rgba(78, 33, 202, 0.15)",
    borderWidth: 1,
    borderColor: "#4e21ca",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#FFFFFF",
  },
  inputContainer: {
    width: "100%",
  },
  senhaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(78, 33, 202, 0.15)",
    borderWidth: 1,
    borderColor: "#4e21ca",
    borderRadius: 12,
    paddingRight: 10,
  },
  senhaInput: {
    flex: 1,
    padding: 14,
    fontSize: 14,
    color: "#FFFFFF",
  },
  erro: {
    color: "#FF4D4D",
    marginTop: 4,
    marginLeft: 4,
    fontSize: 14,
  },
});