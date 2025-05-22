import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Surface, Text } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebase";

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth(app);

  async function signupHandler() {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      console.log("Tentando criar usuário com:", { email, password });
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuário criado com sucesso!");
      // A navegação será feita automaticamente pelo sistema de autenticação
    } catch (error) {
      console.error("Erro completo:", error);
      let message = `Erro ao criar conta: ${error.code} - ${error.message}`;
      if (error.code === "auth/email-already-in-use") {
        message = "Este email já está em uso!";
      } else if (error.code === "auth/invalid-email") {
        message = "Email inválido!";
      } else if (error.code === "auth/weak-password") {
        message = "A senha é muito fraca!";
      } else if (error.code === "auth/network-request-failed") {
        message = "Erro de conexão. Verifique sua internet.";
      } else if (error.code === "auth/operation-not-allowed") {
        message = "O cadastro com email/senha não está habilitado.";
      }
      setError(message);
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Surface style={styles.surface} elevation={4}>
        <Text variant="headlineMedium" style={styles.title}>
          Criar Conta
        </Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          label="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        {error ? (
          <Surface style={styles.errorContainer} elevation={1}>
            <Text style={styles.errorText}>{error}</Text>
          </Surface>
        ) : null}
        <Button
          mode="contained"
          onPress={signupHandler}
          loading={isLoading}
          style={styles.button}
        >
          Cadastrar
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          Já tem uma conta? Faça login
        </Button>
      </Surface>
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f6f6f6",
  },
  surface: {
    padding: 24,
    borderRadius: 10,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#6200ee",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  errorText: {
    color: "#B00020",
    textAlign: "center",
  },
});
