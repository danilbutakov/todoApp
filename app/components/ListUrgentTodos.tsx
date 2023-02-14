import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AppContext } from "../../App";

const ListUrgentTodos = ({ urgentTodo }) => {
  const { removeUrgentTodo } = useContext(AppContext);
  return (
    <View style={styles.listenItem}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            color: "black",
            textDecorationLine: urgentTodo?.completed ? "line-through" : "none",
          }}
        >
          {urgentTodo?.task}
        </Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity
          style={[styles.iconContainer, { backgroundColor: "red" }]}
          onPress={() => removeUrgentTodo(urgentTodo?.id)}
        >
          <FontAwesome name="remove" size={20} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
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

export default ListUrgentTodos;
