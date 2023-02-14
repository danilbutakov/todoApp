import { View, FlatList, Text } from "react-native";
import React, { useContext } from "react";
import ListUrgentTodos from "../components/ListUrgentTodos";
import { AppContext } from "../../App";

const UrgentTodoScreen = () => {
  const { urgentTodos } = useContext(AppContext);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={urgentTodos}
        renderItem={({ item }) => <ListUrgentTodos urgentTodo={item} />}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      />
    </View>
  );
};

export default UrgentTodoScreen;
