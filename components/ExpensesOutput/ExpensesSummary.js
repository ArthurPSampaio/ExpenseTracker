import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <Surface style={styles.container} elevation={4}>
      <Text variant="titleMedium" style={styles.period}>
        {periodName}
      </Text>
      <Text variant="headlineMedium" style={styles.sum}>
        R$ {expensesSum.toFixed(2)}
      </Text>
    </Surface>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#6200ee",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  period: {
    color: "white",
  },
  sum: {
    color: "white",
    fontWeight: "bold",
  },
});
