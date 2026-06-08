import { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  ImageBackground
} from "react-native";
import { useRouter } from "expo-router";
import { authContext } from "../../context/AuthContext";
import CustomInput from "../../components/CustomInput";
import GradientButton from "../../components/GradientButton";
import SlideAlert from "../../components/SlideAlert";

export default function Cadastrar() {
  const router = useRouter();
  const { cadastrarUsuario } = useContext(authContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erros, setErros] = useState({});

  const validar = () => {
    const novosErros = {};

    if (!nome) novosErros.nome = "Campo obrigatório";
    
    if (!email) {
      novosErros.email = "Campo obrigatório";
    } else if (!email.includes("@")) {
      novosErros.email = "Formato de e-mail inválido";
    }

    if (!senha) {
      novosErros.senha = "Campo obrigatório";
    } else if (senha.length < 6) {
      novosErros.senha = "A senha deve ter no mínimo 6 caracteres";
    }

    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem";
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

  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [message, setMessage] = useState('');

  const showAlert = (msg) => {
    setMessage(msg);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    });
  };

  const handleCadastro = async () => {
    if (validar()) {
      const novoUsuario = { nome, email, senha };
      const sucesso = await cadastrarUsuario(novoUsuario);

      if (sucesso) {
        showAlert('✅ Cadastro realizado com sucesso!');
        
        setTimeout(() => {
            router.replace("/login");
        }, 3000);

      } else {
        setErros({ email: "Este e-mail já está em uso" });
      }
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
        <KeyboardAvoidingView style={styles.container}>
          <SlideAlert slideAnim={slideAnim} message={message} />

          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.titulo}>Criar Conta</Text>
            <Text style={styles.subtitulo}>Preencha os dados abaixo</Text>

            <CustomInput
              label="Nome:"
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
              erro={erros.nome}
            />

            <CustomInput
              label="Email:"
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              erro={erros.email}
            />

            <CustomInput
              label="Senha:"
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!senhaVisivel}
              isPassword={true}
              senhaVisivel={senhaVisivel}
              setSenhaVisivel={setSenhaVisivel}
              erro={erros.senha}
            />

            <CustomInput
              label="Senha:"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!senhaVisivel}
              isPassword={true}
              senhaVisivel={senhaVisivel}
              setSenhaVisivel={setSenhaVisivel}
              erro={erros.confirmarSenha}
            />

            <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
              <GradientButton title="Cadastrar" onPress={handleCadastro} />
            </Animated.View>

            <Text style={styles.linkLogin} onPress={() => router.back()}>
              Já tem uma conta? Faça login
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
  titulo: { fontSize: 32, fontWeight: "bold", color: "#FFFFFF", textAlign: "center", marginBottom: 8 },
  subtitulo: { fontSize: 16, color: "#ffffff", textAlign: "center", marginBottom: 30 },
  linkLogin: { color: "#ffffff", textAlign: "center", marginTop: 24, fontSize: 16, fontWeight: "600" },
});