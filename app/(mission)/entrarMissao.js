import { useState, useContext, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  ImageBackground
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { missaoContext } from "../../context/MissionContext";
import CustomInput from "../../components/CustomInput";
import GradientButton from "../../components/GradientButton";

export default function EntrarMissao() {
  const router = useRouter();
  const [id, setID] = useState("");
  const [erros, setErros] = useState({});
  const { missoes, salvarSessaoMissao } = useContext(missaoContext);

  useFocusEffect(
    useCallback(() => {
      setErros({}); 
    }, [])
  );

  const validar = () => {
    const novosErros = {};

    if (!id) {
      novosErros.id = "O ID é obrigatório"; 
    } else if (id.length < 6) {
      novosErros.id = "O ID deve ter no mínimo 6 caracteres"; 
    }

    // Busca correta pelo ID da missão na lista do Context
    const missaoEncontrada = missoes?.find((m) => m.id === id);

    if (!missaoEncontrada) {
      novosErros.login = "Missão não encontrada. Verifique o ID digitado."; 
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleEntrarMissao = async () => {
      const missaoEncontrada = missoes?.find((m) => m.id === id);

      if (validar() && missaoEncontrada) {
        await salvarSessaoMissao(missaoEncontrada); 
        
        
        router.replace("/(tabs)/principal"); 
      } else {
        startShake();
      }
  };

  return (
    <ImageBackground 
      source={require('../../assets/background.png')} 
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          style={{ flex: 1}}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.titulo}>Entre em uma missão</Text> 
            <Text style={styles.subtitulo}>Acesse as informações da sua missão do seu celular</Text> 

            {erros.login && (
              <View style={styles.containerErroLogin}>
                <Text style={styles.erroLoginTexto}>{erros.login}</Text>
              </View>
            )}

            
            <CustomInput
              label="ID da missão:"
              placeholder="Insira o ID da missão"
              value={id}
              onChangeText={(text) => {
                setID(text);
                setErros({}); // Limpa erros dinamicamente ao digitar
              }}
              keyboardType="numeric"
              erro={erros.id} 
            />

            <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
              <GradientButton title="Entrar" onPress={handleEntrarMissao} />
            </Animated.View>
  
            <Text style={styles.linkCadastro} onPress={() => router.push("(mission)/cadastrarMissao")}>
              Cadastre uma missão aqui!
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  scrollContainer: { 
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: 'Black Ops One',
    letterSpacing: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: 'Black Ops One',
  },
  containerErroLogin: {
    backgroundColor: "rgba(255, 77, 77, 0.1)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FF4D4D",
  },
  erroLoginTexto: {
    color: "#FF4D4D",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  linkCadastro: {
    color: "#ffffff",
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },
});