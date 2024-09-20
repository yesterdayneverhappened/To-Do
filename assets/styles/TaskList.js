import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10, // Полукруг
    marginRight: 10,
    borderWidth: 2, // Ширина обводки
  },
  taskTitle: {
    fontSize: 18,
  },
  searchInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  }
});
  
  export default styles;