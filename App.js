import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "./src/api";

export default function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState('')
  const [complemento, setComplemento] = useState('')

  const consultarCep = () => {
    api.get(`/${cep}/json/`).then(success => {
      console.log(`MEU CEP ${JSON.stringify(success)}`)
      setEndereco(success.data.logradouro)
      setComplemento(success.data.complemento)
    }).catch(error => {
      console.log(`ERROR ${JSON.stringify(error)}`)
    })
  }

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.title}>Consulta de CEP</Text>
      <StatusBar style="auto" />
      <View style={styles.sectionField}>
        <TextInput
          style={styles.textInput}
          placeholder={"Digite seu CEP"}
          placeholderTextColor={"grey"}
          keyboardType={"numeric"}
          value={cep}
          onChangeText={(c) => setCep(c)}
        />
        <TouchableOpacity style={styles.button} onPress={() => consultarCep()}>
          <Text style={styles.label}>CONSULTAR CEP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionField2}>
      <Text style={styles.address}>{endereco}</Text>
      <Text style={styles.address}>{complemento}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    color: "#000",
    fontSize: 20,
    textAlign: "center",
  },
  sectionField: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: 'red'
  },
  sectionField2: {
    flex: 1,
    // backgroundColor: "blue",
  },
  textInput: {
    height: 45,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    padding: 5,
  },
  button: {
    height: 45,
    backgroundColor: "red",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  label: {
    color: "#FFF",
    fontWeight: "bold",
  },
  address: {
    color: '#000',
  }
});
