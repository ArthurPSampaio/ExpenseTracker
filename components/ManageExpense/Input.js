import { StyleSheet, Text, TextInput, View } from "react-native";

function Input({ label, invalid, style, textInputConfig }) {
  
  const inputStyles = [styles.input]

  if (textInputConfig && textInputConfig.multiLine) {
    inputStyles.push(styles.inputMultiline)
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#cccccc",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: "#e78d8d",
  },
});
