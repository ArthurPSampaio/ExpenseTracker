import { supabase } from "../config/supabase";

export async function signIn(email, password) {
  console.log("Tentando fazer login com:", email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Erro no login:", error);
    throw error;
  }
  console.log("Login bem sucedido:", data);
  return data;
}

export async function signUp(email, password) {
  console.log("Tentando criar conta com:", email);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window?.location?.origin,
    },
  });

  if (error) {
    console.error("Erro no cadastro:", error);
    throw error;
  }

  // Verifica se o usuário precisa confirmar o email
  if (data?.user?.identities?.length === 0) {
    throw new Error("Este email já está cadastrado!");
  }

  if (data?.user?.confirmation_sent_at) {
    console.log("Email de confirmação enviado");
    throw new Error("Por favor, confirme seu email para continuar.");
  }

  console.log("Cadastro bem sucedido:", data);
  return data;
}

export async function signOut() {
  console.log("Tentando fazer logout");
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Erro no logout:", error);
    throw error;
  }
  console.log("Logout bem sucedido");
}

export function subscribeToAuthChanges(callback) {
  console.log("Configurando listener de autenticação");
  return supabase.auth.onAuthStateChange((event, session) => {
    console.log("Mudança no estado de autenticação:", event, session?.user?.id);
    callback(session?.user || null);
  });
}
