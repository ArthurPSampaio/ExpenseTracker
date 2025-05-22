export function getFormattedDate(date) {
  if (!date) return "";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function formatDateForInput(dateString) {
  if (!dateString) return "";

  // Remove caracteres não numéricos
  const numbers = dateString.replace(/\D/g, "");

  // Aplica a máscara DD/MM/YYYY
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
}

export function parseDateString(dateString) {
  if (!dateString) return null;

  // Remove caracteres não numéricos
  const numbers = dateString.replace(/\D/g, "");

  if (numbers.length !== 8) return null;

  const day = parseInt(numbers.slice(0, 2));
  const month = parseInt(numbers.slice(2, 4)) - 1; // Mês começa em 0 no JavaScript
  const year = parseInt(numbers.slice(4, 8));

  const date = new Date(year, month, day);

  // Verifica se é uma data válida
  if (isNaN(date.getTime())) return null;

  return date;
}

export function isValidDate(dateString) {
  const date = parseDateString(dateString);
  return date !== null;
}

export function formatCurrency(value) {
  if (!value) return "";

  // Converte para número e formata com 2 casas decimais
  const number =
    typeof value === "string"
      ? parseFloat(value.replace(/\D/g, "") / 100)
      : value;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}
