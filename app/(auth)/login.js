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
import { authContext } from "../../context/AuthContext";
import CustomInput from "../../components/CustomInput";
import GradientButton from "../../components/GradientButton";

export default function Login() {
  const router = useRouter();
  const { usuarios, salvarSessaoUsuario } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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

    if (!senha) {
      novosErros.senha = "A senha é obrigatória"; 
    } else if (senha.length < 6) {
      novosErros.senha = "A senha deve ter no mínimo 6 caracteres"; 
    }

    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuarioEncontrado) {
      novosErros.login = "Usuário não encontrado. Verifique as informações ou cadastre-se."; 
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

  const handleLogin = async () => {
          const usuarioEncontrado = usuarios.find(
            (u) => u.email === email && u.senha === senha
          );

          if (validar() && usuarioEncontrado) {
            await salvarSessaoUsuario(usuarioEncontrado); 
            
            router.replace("/(mission)/entrarMissao"); 
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
          <Text style={styles.titulo}>PREDIX</Text> 
          <Text style={styles.subtitulo}>PREVISÃO • DADOS • MISSÕES</Text> 

          {erros.login && (
            <View style={styles.containerErroLogin}>
              <Text style={styles.erroLoginTexto}>{erros.login}</Text>
            </View>
          )}

          <CustomInput
            label="Email:"
            placeholder="Insira seu e-mail"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErros({});
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            erro={erros.email}
          />
          
          <CustomInput
            label="Senha:"
            placeholder="Insira sua senha"
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              setErros({});
            }}
            secureTextEntry={!senhaVisivel}
            isPassword={true}
            senhaVisivel={senhaVisivel}
            setSenhaVisivel={setSenhaVisivel}
            erro={erros.senha}
          />

          <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
            <GradientButton title="Entrar" onPress={handleLogin} />
          </Animated.View>

          <Text style={styles.linkCadastro} onPress={() => router.push("(auth)/cadastrar")}>
            Não tem conta? Cadastre-se
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
    justifyContent: "center",
    padding: 24,
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