import { FlatList, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

export default ExpensesList;
