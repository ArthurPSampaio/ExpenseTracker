import { useContext, useState, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  storeExpense,
  updateExpense,
  deleteExpense,
} from "../util/expenses-service";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar Despesa" : "Nova Despesa",
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsFetching(true);
    try {
      if (isEditing) {
        await updateExpense(editedExpenseId, expenseData);
        expensesCtx.updateExpense(editedExpenseId, expenseData);
      } else {
        const savedExpense = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: savedExpense.id });
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao processar despesa:", error);
      setError(
        isEditing
          ? "Não foi possível atualizar a despesa. Tente novamente mais tarde."
          : "Não foi possível adicionar a despesa. Tente novamente mais tarde."
      );
      setIsFetching(false);
    }
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Atualizar" : "Adicionar"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f6f6f6",
  },
});
