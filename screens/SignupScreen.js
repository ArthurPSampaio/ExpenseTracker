import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Surface, Text } from "react-native-paper";
import { signUp } from "../util/auth";

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function signupHandler() {
    if (!email.trim()) {
      setError("Por favor, insira um email!");
      return;
    }

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
    setSuccessMessage("");

    try {
      const result = await signUp(email, password);
      console.log("Resultado do cadastro:", result);

      if (result?.user?.confirmation_sent_at) {
        setSuccessMessage(
          "Por favor, verifique seu email para confirmar o cadastro!"
        );
        // Não navega automaticamente, espera a confirmação do email
      } else {
        // Se não precisar de confirmação, pode navegar
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Erro detalhado ao criar conta:", error);
      let message = "Erro ao criar conta";

      if (
        error.message?.includes("already registered") ||
        error.message?.includes("já está cadastrado")
      ) {
        message = "Este email já está em uso!";
      } else if (error.message?.includes("Invalid email")) {
        message = "Email inválido!";
      } else if (error.message?.includes("weak-password")) {
        message = "A senha é muito fraca!";
      } else if (error.message?.includes("network")) {
        message = "Erro de conexão. Verifique sua internet.";
      } else if (error.message?.includes("confirme seu email")) {
        setSuccessMessage(error.message);
        message = "";
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
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
          <Surface
            style={[styles.messageContainer, styles.errorContainer]}
            elevation={1}
          >
            <Text style={styles.errorText}>{error}</Text>
          </Surface>
        ) : null}

        {successMessage ? (
          <Surface
            style={[styles.messageContainer, styles.successContainer]}
            elevation={1}
          >
            <Text style={styles.successText}>{successMessage}</Text>
          </Surface>
        ) : null}

        <Button
          mode="contained"
          onPress={signupHandler}
          loading={isLoading}
          style={styles.button}
          disabled={isLoading}
        >
          Cadastrar
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
          disabled={isLoading}
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
  messageContainer: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  errorContainer: {
    backgroundColor: "#ffebee",
  },
  successContainer: {
    backgroundColor: "#e8f5e9",
  },
  errorText: {
    color: "#B00020",
    textAlign: "center",
  },
  successText: {
    color: "#2e7d32",
    textAlign: "center",
  },
});
