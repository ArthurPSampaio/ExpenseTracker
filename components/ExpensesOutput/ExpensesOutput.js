import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  let content = (
    <Surface style={styles.fallbackContainer}>
      <Text variant="titleLarge" style={styles.infoText}>
        {fallbackText}
      </Text>
    </Surface>
  );

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f6f6f6",
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
    marginTop: 32,
  },
  infoText: {
    color: "#666666",
    textAlign: "center",
    padding: 24,
  },
});
