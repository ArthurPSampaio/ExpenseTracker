import { StyleSheet, View, ScrollView } from "react-native";
import { Surface, Text, Button, useTheme } from "react-native-paper";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getFormattedDate } from "../util/date";

function ExpenseDetailsScreen({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const expensesCtx = useContext(ExpensesContext);
  const theme = useTheme();

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  if (!selectedExpense) {
    return (
      <View style={styles.fallbackContainer}>
        <Text>Despesa não encontrada!</Text>
      </View>
    );
  }

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.card} elevation={2}>
        <Text
          variant="headlineMedium"
          style={[styles.title, { color: theme.colors.primary }]}
        >
          {selectedExpense.description}
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.label}>
              Valor:
            </Text>
            <Text
              variant="titleMedium"
              style={[styles.value, { color: theme.colors.primary }]}
            >
              R$ {selectedExpense.amount.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.label}>
              Data:
            </Text>
            <Text variant="titleMedium" style={styles.value}>
              {getFormattedDate(selectedExpense.date)}
            </Text>
          </View>

          {/* <View style={styles.row}>
            <Text variant="titleMedium" style={styles.label}>
              Categoria:
            </Text>
            <Text variant="titleMedium" style={styles.value}>
              {selectedExpense.category || "Não categorizado"}
            </Text>
          </View> */}
        </View>

        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate("ManageExpense", {
                expenseId: expenseId,
              });
            }}
            style={styles.button}
          >
            Editar
          </Button>
          <Button
            mode="contained-tonal"
            onPress={deleteExpenseHandler}
            style={styles.button}
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.error}
          >
            Excluir
          </Button>
        </View>
      </Surface>
    </ScrollView>
  );
}

export default ExpenseDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  detailsContainer: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  label: {
    opacity: 0.7,
  },
  value: {
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 32,
    gap: 16,
  },
  button: {
    flex: 1,
  },
});
