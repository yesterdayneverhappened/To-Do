import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles/TaskItemStyles';

const TaskItem = ({ task, onStatusChange, onDelete }) => {
  // Функция для форматирования даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>{formatDate(task.date)}</Text>
      <Text>{task.location}</Text>
      <Text>{task.status}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.butPross} onPress={() => onStatusChange(task.id, 'In process')}>
          <Text style={styles.buttonText}>In process</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butCompl} onPress={() => onStatusChange(task.id, 'Completed')}>
          <Text style={styles.buttonText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butDel} onPress={() => onDelete(task.id)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;