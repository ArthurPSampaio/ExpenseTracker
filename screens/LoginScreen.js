import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Surface, Text } from "react-native-paper";
import { signIn } from "../util/auth";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function loginHandler() {
    setIsLoading(true);
    setError("");
    try {
      await signIn(email, password);
      // A navegação será feita automaticamente pelo sistema de autenticação
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      let message = "Erro ao fazer login";

      if (error.message?.includes("Invalid login credentials")) {
        message = "Email ou senha incorretos!";
      } else if (error.message?.includes("Invalid email")) {
        message = "Email inválido!";
      } else if (error.message?.includes("network")) {
        message = "Erro de conexão. Verifique sua internet.";
      }

      setError(message);
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Surface style={styles.surface} elevation={4}>
        <Text variant="headlineMedium" style={styles.title}>
          Login
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
        {error ? (
          <Surface style={styles.errorContainer} elevation={1}>
            <Text style={styles.errorText}>{error}</Text>
          </Surface>
        ) : null}
        <Button
          mode="contained"
          onPress={loginHandler}
          loading={isLoading}
          style={styles.button}
        >
          Entrar
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate("Signup")}
          style={styles.button}
        >
          Criar nova conta
        </Button>
      </Surface>
    </View>
  );
}

export default LoginScreen;

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
