import { KeyboardAvoidingView, Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import Styles from "./Styles";
import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    return (
        <>
            <View style={Styles.container}>
                <Image
                    style={Styles.logoImage}
                    source={require("../pictures/tassutellen-logo2.png")}
                />
                <KeyboardAvoidingView
                    behavior="padding">
                    <View style={Styles.loginContainer}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={Styles.loginInput}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={Styles.loginInput}
                            secureTextEntry
                        />
                    </View>

                    <View style={Styles.loginButtonContainer}>
                        <TouchableOpacity
                            style={Styles.signUpButton}
                            onPress={() => { }}
                        >
                            <Text style={Styles.signUpButton}>Sign up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={Styles.loginButton}
                            onPress={() => { }}
                        >
                            <Text style={Styles.loginButton}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </>
    )
}

export default Login