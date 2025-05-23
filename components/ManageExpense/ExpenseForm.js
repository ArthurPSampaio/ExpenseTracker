import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { TextInput, Button, Surface, Text } from "react-native-paper";
import MaskInput from "react-native-mask-input";

import {
  getFormattedDate,
  formatDateForInput,
  parseDateString,
  isValidDate,
  formatCurrency,
} from "../../util/date";

const currencyMask = [
  "R",
  "$",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ",",
  /\d/,
  /\d/,
];

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues
        ? `R$ ${defaultValues.amount.toFixed(2).replace(".", ",")}`
        : "R$ ",
      isValid: true,
    },
    date: {
      value: defaultValues
        ? getFormattedDate(defaultValues.date)
        : getFormattedDate(new Date()),
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    console.log("Iniciando submissão do formulário");

    // Remove todos os caracteres não numéricos e o ponto decimal
    let amount = inputs.amount.value.replace(/[^\d,]/g, "").replace(",", ".");
    amount = parseFloat(amount);

    const expenseData = {
      amount: amount,
      date: parseDateString(inputs.date.value) || new Date(),
      description: inputs.description.value,
    };

    console.log("Dados do formulário:", expenseData);

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    console.log("Validação:", {
      amountIsValid,
      dateIsValid,
      descriptionIsValid,
      amount: expenseData.amount,
      date: expenseData.date.toString(),
      description: expenseData.description,
    });

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      console.log("Formulário inválido");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    console.log("Formulário válido, enviando dados");
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <Surface style={styles.form} elevation={2}>
      <Text variant="headlineMedium" style={styles.title}>
        Sua Despesa
      </Text>

      <TextInput
        label="Descrição"
        mode="outlined"
        value={inputs.description.value}
        onChangeText={inputChangeHandler.bind(this, "description")}
        error={!inputs.description.isValid}
        style={styles.input}
        multiline
      />

      <View style={styles.inputRow}>
        <View style={styles.amountContainer}>
          <TextInput
            label="Valor"
            mode="outlined"
            value={inputs.amount.value}
            render={({ value, ...props }) => (
              <MaskInput
                {...props}
                value={value}
                onChangeText={(masked) => {
                  if (!masked.startsWith("R$ ")) {
                    masked = "R$ " + masked;
                  }
                  inputChangeHandler("amount", masked);
                }}
                mask={currencyMask}
                keyboardType="numeric"
                style={[props.style]}
              />
            )}
            error={!inputs.amount.isValid}
            style={[styles.input, styles.amountInput]}
          />
        </View>

        <View style={styles.dateContainer}>
          <TextInput
            label="Data"
            mode="outlined"
            value={inputs.date.value}
            onChangeText={(text) => {
              const formattedDate = formatDateForInput(text);
              inputChangeHandler("date", formattedDate);
            }}
            error={!inputs.date.isValid}
            style={[styles.input, styles.dateInput]}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
      </View>

      {formIsInvalid && (
        <Text style={styles.errorText}>
          {!inputs.amount.isValid && "O valor deve ser maior que zero\n"}
          {!inputs.date.isValid && "A data inserida é inválida\n"}
          {!inputs.description.isValid && "A descrição não pode estar vazia"}
        </Text>
      )}

      <View style={styles.buttons}>
        <Button mode="outlined" onPress={onCancel} style={styles.button}>
          Cancelar
        </Button>
        <Button mode="contained" onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </Surface>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#6200ee",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "white",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  amountContainer: {
    flex: 1,
  },
  dateContainer: {
    flex: 1,
  },
  amountInput: {
    backgroundColor: "white",
  },
  dateInput: {
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    color: "#B00020",
    marginVertical: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
