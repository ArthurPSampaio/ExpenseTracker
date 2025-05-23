import { StyleSheet } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ id, description, amount, date }) {
  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate("ExpenseDetails", {
      expenseId: id,
    });
  }

  return (
    <TouchableRipple
      onPress={expensePressHandler}
      style={styles.container}
      key={id}
    >
      <Surface style={styles.expenseItem}>
        <Surface style={styles.infoContainer} elevation={0}>
          <Text variant="titleMedium" style={styles.description}>
            {description}
          </Text>
          <Text variant="bodyMedium" style={styles.date}>
            {getFormattedDate(date)}
          </Text>
        </Surface>
        <Surface style={styles.amountContainer} elevation={2}>
          <Text variant="titleMedium" style={styles.amount}>
            R$ {amount.toFixed(2)}
          </Text>
        </Surface>
      </Surface>
    </TouchableRipple>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 8,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  description: {
    marginBottom: 4,
  },
  date: {
    color: "#666666",
  },
  amountContainer: {
    minWidth: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#6200ee",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  amount: {
    color: "white",
  },
});
