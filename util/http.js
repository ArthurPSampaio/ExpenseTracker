import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-61b31-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  try {
    const response = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
    return response.data.name; // Agora garantimos que a resposta foi recebida antes de acessar 'name'
  } catch (error) {
    console.error("Erro ao enviar para Firebase:", error);
    throw error; // Propaga o erro para ser tratado na chamada
  }
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export async function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}