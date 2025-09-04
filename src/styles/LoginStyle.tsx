import { StyleSheet } from "react-native";
import { Fonts } from "../utils";

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        color: '#333',
      },
      formContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      },
      errorInput: {
        borderColor: '#ff6b6b',
        borderWidth: 2,
      },
      errorText: {
        color: '#ff6b6b',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
        marginLeft: 5,
      },
      loginButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
      },
      disabledButton: {
        backgroundColor: '#cccccc',
      },
      loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },

});

export default LoginStyle;