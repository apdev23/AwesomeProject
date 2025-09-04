import { StyleSheet } from "react-native";
import { Fonts } from "../utils";

const SignupStyle = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
      },
      h1Style: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000000'
      },
      label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#000000'
      },
      placeHolderStyle: {
        color: 'gray',
        fontSize: 16,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        color: '#000000'
      },
      errorInput: {
        borderColor: 'red',
      },
      errorText: {
        color: 'red',
        marginBottom: 10,
      },
});

export default SignupStyle;