import { useState, useContext, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { authContext } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { usuarios, salvarSessao } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [rm, setRM] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erros, setErros] = useState({});

  useFocusEffect(
    useCallback(() => {
      setErros({}); 
    }, [])
  );

  const validar = () => {
    const novosErros = {};

    if (!email) {
      novosErros.email = "O e-mail é obrigatório"; 
    } else if (!email.includes("@")) {
      novosErros.email = "Formato de e-mail inválido"; 
    }

    if (!rm) {
      novosErros.rm = "O RM é obrigatório";
    } else if (rm.length !== 6) {
      novosErros.rm = "RM inválido (deve ter 6 dígitos)";
    }

    if (!senha) {
      novosErros.senha = "A senha é obrigatória"; 
    } else if (senha.length < 6) {
      novosErros.senha = "A senha deve ter no mínimo 6 caracteres"; 
    }

    // Procura o usuário na lista carregada do AsyncStorage via Context
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha && u.rm === rm
    );

    if (!usuarioEncontrado) {
      novosErros.login = "Usuário não encontrado. Verifique as informações ou cadastre-se."; 
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const startShake = () => {
    // 2. Configurar a sequência de animação
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleLogin = async () => {
      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.senha === senha && u.rm === rm
      );

      if (validar() && usuarioEncontrado) {
        // É essencial salvar a sessão no contexto antes de mudar de tela
        await salvarSessao(usuarioEncontrado); 
        router.replace("/(tabs)/salas");
      } else {
        startShake();
      }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#262626" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
      >
        <View style={styles.icone}>
          <Ionicons name="calendar-outline" size={55} color="white" />
        </View>

        <Text style={styles.titulo}>FiapReserve</Text> 
        <Text style={styles.subtitulo}>Sistema de reservas de salas</Text> 

        
        {erros.login && (
          <View style={styles.containerErroLogin}>
            <Text style={styles.erroLoginTexto}>{erros.login}</Text>
          </View>
        )}

        <TextInput
          placeholder="Insira seu e-mail"
          placeholderTextColor="#8C8C8C"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErros({});
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        {erros.email && <Text style={styles.erro}>{erros.email}</Text>}

        <TextInput
          placeholder="Insira seu RM"
          placeholderTextColor="#8C8C8C"
          value={rm}
          onChangeText={(text) => {
            setRM(text);
            setErros({});
          }}
          keyboardType="number-pad"
          style={styles.input}
        />
        {erros.rm && <Text style={styles.erro}>{erros.rm}</Text>}

        <View style={styles.senhaContainer}>
          <TextInput
            placeholder="Insira sua senha"
            placeholderTextColor="#8C8C8C"
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              setErros({});
            }}
            secureTextEntry={!senhaVisivel}
            style={styles.senhaInput}
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <Text style={styles.olho}>{senhaVisivel ? <Ionicons name="eye-off" color= {"#ffff"} size={24} />: <Ionicons name="eye" color= {"#ffff"} size={24} />}</Text>
          </TouchableOpacity>
        </View>
        {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}

        <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
          <TouchableOpacity style={styles.botao} onPress={handleLogin}>
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={() => router.push("/(auth)/cadastrar")}>
          <Text style={styles.linkCadastro}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  icone: {
    backgroundColor: "#F23064",
    padding: 12,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    color: "#8C8C8C",
    textAlign: "center",
    marginBottom: 40,
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
  input: {
    backgroundColor: "#404040",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    fontSize: 16,
    color: "#FFFFFF",
  },
  senhaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#404040",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 12,
    marginBottom: 8,
    paddingRight: 10,
  },
  senhaInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: "#FFFFFF",
  },
  olho: {
    fontSize: 20,
  },
  erro: {
    color: "#FF4D4D",
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 14,
  },
  botao: {
    backgroundColor: "#F23064",
    width: "100%",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkCadastro: {
    color: "#F23064",
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },
});