import { StyleSheet, Text, TextInput, View } from "react-native";

function Input({ label, style, textInputConfig }) {
  
  const inputStyles = [styles.input]

  if (textInputConfig && textInputConfig.multiLine) {
    inputStyles.push(styles.inputMultiline)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },
  label: {
    fontSize: 12,
    marginBottom: 4
  },
  input: {
    backgroundColor: '#cccccc',
    padding: 6,
    borderRadius: 6,
    fontSize: 18
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  }
})
