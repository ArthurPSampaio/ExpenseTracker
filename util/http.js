import axios from "axios";

const BACKEND_URL = "https://projeto-renato-bd522-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData) {
  try {
    const response = await axios.post(
      BACKEND_URL + "/expenses.json",
      expenseData
    );
    return response.data.name; // Agora garantimos que a resposta foi recebida antes de acessar 'name'
  } catch (error) {
    console.error("Erro ao enviar para Firebase:", error);
    throw error; // Propaga o erro para ser tratado na chamada
  }
}

export async function fetchExpenses() {
  try {
    const response = await axios.get(BACKEND_URL + "/expenses.json");
    console.log("Dados do Firebase:", response.data);

    const expenses = [];

    // Verifica se response.data é null (caso não haja dados)
    if (!response.data) {
      return expenses;
    }

    for (const key in response.data) {
      try {
        // Verifica se todos os campos necessários existem
        if (
          !response.data[key] ||
          !response.data[key].amount ||
          !response.data[key].date ||
          !response.data[key].description
        ) {
          console.warn(`Dados incompletos para a despesa ${key}`);
          continue;
        }

        const expenseObj = {
          id: key,
          amount: +response.data[key].amount, // Garante que é um número
          date: new Date(response.data[key].date),
          description: response.data[key].description,
        };

        // Verifica se a data é válida
        if (isNaN(expenseObj.date.getTime())) {
          console.warn(`Data inválida para a despesa ${key}`);
          continue;
        }

        expenses.push(expenseObj);
      } catch (itemError) {
        console.error(`Erro ao processar despesa ${key}:`, itemError);
        // Continua para o próximo item em caso de erro
        continue;
      }
    }

    console.log("Despesas convertidas:", expenses);
    return expenses;
  } catch (error) {
    console.error("Erro ao buscar despesas:", error);
    throw new Error(
      "Não foi possível carregar as despesas. Por favor, tente novamente."
    );
  }
}

export async function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
