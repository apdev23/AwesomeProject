import { StyleSheet } from "react-native";
import { Fonts } from "../utils";

const UsersStyle = StyleSheet.create({

    safeAreaViewStyle: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    userBoxStyle: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBlockColor: 'gray',
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userNameStyle: {
        fontFamily: Fonts.OpenSans_Medium,
        fontSize: 15,
        color: '#000000',
        marginLeft: 15
    }

});

export default UsersStyle;