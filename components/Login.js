import { KeyboardAvoidingView, Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import Styles from "./Styles";
import { useState } from "react";
import { auth } from "./Firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /*     const handleSignUp = () => {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log(user.email);
                })
                .catch(error => alert(error.message))
        } */
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.email);
            })
            .catch((error) => {
                console.error("An error occurred: " + error);
            })
    }

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
                            onPress={handleSignUp}
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