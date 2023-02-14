import React, { createContext, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Alert, SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MainTodoScreen from "./app/screens/MainTodoScreen";
import UrgentTodoScreen from "./app/screens/UrgentTodoScreen";
import { NavigationContainer } from "@react-navigation/native";

export const AppContext = createContext({});
const Tab = createMaterialTopTabNavigator();

function App() {
  const [todos, setTodos] = useState([]);
  const [urgentTodos, setUrgentTodos] = useState([]);

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const removeUrgentTodo = (id) => {
    const newUrgentTodos = urgentTodos.filter((todo) => todo.id !== id);
    setUrgentTodos(newUrgentTodos);
  };

  const addUrgentTodo = (todo) => {
    if (urgentTodos.includes(todo)) {
      Alert.alert("This todo is already urgent");
    } else {
      setUrgentTodos([...urgentTodos, todo]);
    }
  };

  const setCompletedTodo = (id) => {
    let newTask = todos.map((task) => {
      if (task.id === id) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTodos(newTask);
  };

  const saveTodosDevice = async (todos: any[], urgentTodos: any[]) => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      const stringifyUrgentTodos = JSON.stringify(urgentTodos);
      await AsyncStorage.setItem("todos", stringifyTodos);
      await AsyncStorage.setItem("urgentTodos", stringifyUrgentTodos);
    } catch (e) {
      console.log(e);
    }
  };

  const getTodosFromUserDevice = async () => {
    try {
      const userTodos = await AsyncStorage.getItem("todos");
      const userUrgentTodos = await AsyncStorage.getItem("urgentTodos");
      if (userTodos !== null && userUrgentTodos !== null) {
        setTodos(JSON.parse(userTodos));
        setUrgentTodos(JSON.parse(userUrgentTodos));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  useEffect(() => {
    saveTodosDevice(todos, urgentTodos);
  }, [todos, urgentTodos]);

  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
        removeTodo,
        addUrgentTodo,
        removeUrgentTodo,
        urgentTodos,
        setCompletedTodo,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Main"
            screenOptions={{
              tabBarActiveTintColor: "white",
              tabBarLabelStyle: { fontSize: 12 },
              tabBarStyle: { backgroundColor: "#28565e" },
            }}
          >
            <Tab.Screen
              name="Main"
              component={MainTodoScreen}
              options={{ tabBarLabel: `Todos ${todos.length}` }}
            />
            <Tab.Screen
              name="Urgent"
              component={UrgentTodoScreen}
              options={{
                tabBarLabel: () => (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "white" }}>Urgent Todos</Text>
                    <Text
                      style={{
                        marginLeft: 5,
                        color: urgentTodos.length >= 3 ? "red" : "white",
                      }}
                    >
                      {urgentTodos.length}
                    </Text>
                  </View>
                ),
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AppContext.Provider>
  );
}

export default App;
