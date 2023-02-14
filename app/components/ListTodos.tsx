import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AppContext } from "../../App";

const ListTodos = ({ todo }) => {
  const { removeTodo, addUrgentTodo, setCompletedTodo } =
    useContext(AppContext);

  const [showActions, setShowActions] = useState(false);
  return (
    <TouchableOpacity
      style={styles.listenItem}
      onPress={() => {
        setShowActions(!showActions);
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            color: "black",
            textDecorationLine: todo?.completed ? "line-through" : "none",
          }}
        >
          {todo?.task}
        </Text>
      </View>
      {showActions && (
        <View style={styles.icons}>
          {!todo?.completed && (
            <TouchableOpacity
              style={[styles.iconContainer, { backgroundColor: "green" }]}
              onPress={() => {
                setCompletedTodo(todo.id);
                setShowActions(false);
              }}
            >
              <FontAwesome name="check" color={"white"} size={20} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.iconContainer, { backgroundColor: "red" }]}
            onPress={() => {
              removeTodo(todo?.id);
              setShowActions(false);
            }}
          >
            <FontAwesome name="remove" size={20} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconContainer, { backgroundColor: "yellow" }]}
            onPress={() => {
              addUrgentTodo(todo);
              setShowActions(false);
            }}
          >
            <FontAwesome name="chevron-right" size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listenItem: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
    justifyContent: "space-between",
  },
  icons: {
    flexDirection: "row",
    gap: 15,
  },
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#28565e",
    borderRadius: 25,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListTodos;
