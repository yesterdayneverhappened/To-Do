import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f7f7f7',
    },
    addTaskContainer: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    cancelButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#ff4d4d',
      borderRadius: 5,
      alignItems: 'center',
    },
    cancelText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#333', // Цвет текста
        backgroundColor: '#f0f0f0', // Цвет фона
        borderRadius: 30,
      },
      searchContainer: {
        flexDirection: 'row', // Расположение элементов в строку
        alignItems: 'center',  // Центрирование по вертикали
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
      },
      icon: {
        marginLeft: 10, // Отступ между иконкой и инпутом
        color: '#aaa',
      },
      searchInput: {
        flex: 1, // Занять оставшееся пространство
        padding: 10,
      },
  });

  export default styles;