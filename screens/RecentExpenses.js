import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import Button from "../components/UI/Button";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  async function getExpenses() {
    setIsFetching(true);
    try {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
      setError(null); // Limpa o erro se a operação for bem sucedida
    } catch (error) {
      setError(error.message || "Não foi possível carregar as despesas.");
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={() => {
          setError(null);
          getExpenses();
        }}
      />
    );
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const RecentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={RecentExpenses}
      expensesPeriod={"Últimos 7 dias"}
      fallbackText={"Nenhuma despesa registrada nos últimos 7 dias."}
    />
  );
}

export default RecentExpenses;
