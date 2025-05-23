import { supabase } from "../config/supabase";

export async function storeExpense(expenseData) {
  try {
    console.log("Iniciando salvamento de despesa:", expenseData);

    // Pega o usuário atual
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("Usuário atual:", user);

    if (!user) throw new Error("Usuário não autenticado");

    const expenseToSave = {
      description: expenseData.description,
      amount: expenseData.amount,
      date: expenseData.date.toISOString(),
      user_id: user.id,
    };

    console.log("Dados formatados para salvar:", expenseToSave);

    const { data, error } = await supabase
      .from("expenses")
      .insert([expenseToSave])
      .select()
      .single();

    if (error) {
      console.error("Erro detalhado ao salvar despesa:", error);
      throw error;
    }

    console.log("Despesa salva com sucesso:", data);
    return data;
  } catch (error) {
    console.error("Erro capturado ao salvar despesa:", error);
    throw error;
  }
}

export async function fetchExpenses() {
  // Pega o usuário atual
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error) {
    console.error("Erro ao buscar despesas:", error);
    throw error;
  }

  // Converte as datas de string para objeto Date
  return data.map((expense) => ({
    ...expense,
    date: new Date(expense.date),
  }));
}

export async function updateExpense(id, expenseData) {
  // Pega o usuário atual
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Usuário não autenticado");

  const { error } = await supabase
    .from("expenses")
    .update({
      description: expenseData.description,
      amount: expenseData.amount,
      date: expenseData.date.toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id); // Garante que só atualiza despesas do usuário

  if (error) {
    console.error("Erro ao atualizar despesa:", error);
    throw error;
  }
}

export async function deleteExpense(id) {
  // Pega o usuário atual
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Usuário não autenticado");

  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // Garante que só deleta despesas do usuário

  if (error) {
    console.error("Erro ao deletar despesa:", error);
    throw error;
  }
}
