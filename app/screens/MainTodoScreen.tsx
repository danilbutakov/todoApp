import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome";
import { AppContext } from "../../App";
import ListTodos from "../components/ListTodos";

const MainTodoScreen = () => {
  const { todos, setTodos } = useContext(AppContext);
  const [textInput, setTextInput] = useState("");
  const addTodo = () => {
    if (textInput === "") {
      Alert.alert("Error", "Please enter todo");
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTextInput("");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <ListTodos todo={item} />}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        style={styles.main}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
            placeholder="Input Todo"
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="plus" color="white" size={20} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 2,
  },
  footer: {
    color: "white",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#28565e",
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainTodoScreen;
