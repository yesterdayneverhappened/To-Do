// components/TaskList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../assets/styles/TaskList';

const TaskList = ({ tasks, onTaskPress }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return '#28A745'; // Зеленый
      case 'In process':
        return '#FFC107'; // Оранжевый
      case 'Completed':
        return '#FFF'; // Белый с черной обводкой
      default:
        return '#FFF'; // По умолчанию белый
    }
  };

  const getBorderColor = (status) => {
    return status === 'Completed' ? '#000' : 'transparent'; // Черная обводка для завершенных задач
  };

  return (
    <View>
      {tasks.map((task) => (
        <TouchableOpacity key={task.id} onPress={() => onTaskPress(task)} style={styles.taskItem}>
          <View
            style={[
              styles.circle,
              {
                backgroundColor: getStatusColor(task.status),
                borderColor: getBorderColor(task.status),
              },
            ]}
          />
          <Text style={styles.taskTitle}>{task.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};



export default TaskList;