import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Surface, Text } from "react-native-paper";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <ActivityIndicator
          size="large"
          color="#6200ee"
          style={styles.spinner}
        />
        <Text variant="bodyLarge">Carregando...</Text>
      </Surface>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f6f6f6",
  },
  surface: {
    padding: 24,
    borderRadius: 10,
    elevation: 4,
    alignItems: "center",
  },
  spinner: {
    marginBottom: 16,
  },
});
