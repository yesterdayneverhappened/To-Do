// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Button, Animated, TouchableOpacity, Text, TextInput } from 'react-native';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetail';
import { Picker } from '@react-native-picker/picker';
import { loadTasks, saveTasks } from './assets/storage';
import styles from './assets/styles/AppStyles';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [sortCriterion, setSortCriterion] = useState('dateAsc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState(''); // Состояние для поиска
  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    };
    fetchTasks();
  }, []);

  const addTaskHandler = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setIsAdding(false);
    animateAddTask(false);
  };

  const cancelAddTask = () => {
    setIsAdding(false);
    animateAddTask(false);
  };

  const animateAddTask = (visible) => {
    Animated.timing(animationValue, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const sortedAndFilteredTasks = () => {
    let filteredTasks = tasks;

    // Фильтрация по статусу
    if (filterStatus !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === filterStatus);
    }

    // Фильтрация по названию
    if (searchTerm) {
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredTasks.sort((a, b) => {
      if (sortCriterion === 'dateAsc') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortCriterion === 'dateDesc') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return a.status.localeCompare(b.status);
      }
    });
  };

  const updateTaskStatus = (updatedTask) => {
    const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="To Do List">
          {props => (
            <View style={styles.container}>
              <Button
                title="Add task"
                onPress={() => {
                  setIsAdding(true);
                  animateAddTask(true);
                }}
              />

              {isAdding && (
                <Animated.View
                  style={[
                    styles.addTaskContainer,
                    {
                      opacity: animationValue,
                      transform: [
                        {
                          translateY: animationValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <AddTask onAddTask={addTaskHandler} />
                  <TouchableOpacity onPress={cancelAddTask} style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
              <Picker
                selectedValue={sortCriterion}
                style={styles.picker}
                onValueChange={(itemValue) => setSortCriterion(itemValue)}
              >
                <Picker.Item label="Sort by date (increase)" value="dateAsc" />
                <Picker.Item label="Sort by date (decreasing)" value="dateDesc" />
                <Picker.Item label="Sort by status" value="status" />
              </Picker>

              <Picker
                selectedValue={filterStatus}
                style={styles.picker}
                onValueChange={(itemValue) => setFilterStatus(itemValue)}
              >
                <Picker.Item label="All tasks" value="all" />
                <Picker.Item label="New" value="New" />
                <Picker.Item label="In process" value="In process" />
                <Picker.Item label="Completed" value="Completed" />
              </Picker>

              <View style={styles.searchContainer}>
                <Icon name="search" size={20} style={styles.icon} />
                <TextInput
                  placeholder="Search by name"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  style={styles.searchInput}
                />
              </View>

              <TaskList 
                tasks={sortedAndFilteredTasks()} 
                setTasks={setTasks} 
                onTaskPress={(task) => props.navigation.navigate('TaskDetails', { 
                  task, 
                  onDelete: deleteTask, 
                  onUpdate: updateTaskStatus 
                })} 
              />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}