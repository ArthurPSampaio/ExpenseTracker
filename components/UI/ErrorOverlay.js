import { View, StyleSheet } from "react-native";
import { Button, Text, Surface } from "react-native-paper";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text variant="headlineMedium" style={[styles.text, styles.title]}>
          Ocorreu um erro!
        </Text>
        <Text variant="bodyLarge" style={styles.text}>
          {message}
        </Text>
        <Button mode="contained" onPress={onConfirm} style={styles.button}>
          Tentar Novamente
        </Button>
      </Surface>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f6f6f6",
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    width: "90%",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 16,
  },
  title: {
    marginBottom: 24,
    color: "#B00020",
  },
  button: {
    marginTop: 8,
    width: "80%",
  },
});
