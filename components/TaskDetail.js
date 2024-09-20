// components/TaskDetails.js
import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const TaskDetails = ({ route, navigation }) => {
  const { task, onDelete, onUpdate } = route.params;

  const handleStatusChange = (newStatus) => {
    onUpdate({ ...task, status: newStatus });
    navigation.goBack(); // Возврат на предыдущий экран
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete task?",
      "Are you sure you want to delete this task?",
      [
        { text: "Cansel", style: "cancel" },
        { text: "Delete", onPress: () => onDelete(task.id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>Description: {task.description}</Text>
      <Text style={styles.date}>{new Date(task.date).toLocaleString()}</Text>
      <Text style={styles.description}>Location: {task.location}</Text>
      <Text style={styles.status}>Status: {task.status}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.inProgress]}
          onPress={() => handleStatusChange('In process')}
        >
          <Text style={styles.buttonText}>In process</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.completed]}
          onPress={() => handleStatusChange('Completed')}
        >
          <Text style={styles.buttonText}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.delete]} 
          onPress={confirmDelete}
        >
          <Text style={styles.buttonText}>delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  status: {
    fontSize: 14,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  inProgress: {
    backgroundColor: '#FFA500', // Мягкий оранжевый цвет
  },
  completed: {
    backgroundColor: '#28A745', // Зеленый цвет
  },
  delete: {
    backgroundColor: '#FF6347', // Красный цвет для удаления
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TaskDetails;