import { useContext, useState, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton as PaperIconButton } from "react-native-paper";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
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

  async function deleteExpenseHandler() {
    setIsFetching(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError(
        "Não foi possível excluir a despesa. Tente novamente mais tarde."
      );
      setIsFetching(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsFetching(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
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
       { /*isEditing && ( 
        <View style={styles.deleteContainer}>
          <PaperIconButton
            icon="delete"
            iconColor="#B00020"
            size={32}
            onPress={deleteExpenseHandler}
          />
        </View>
      ) */}
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    alignItems: "center",
  },
});
