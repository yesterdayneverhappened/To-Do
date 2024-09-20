import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../assets/styles/AddTaskStyles';

const AddTask = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAddTask = () => {
    const newErrors = {};

    if (!title) newErrors.title = 'Task title cannot be empty.';
    if (!description) newErrors.description = 'Task description cannot be empty.';
    if (!location) newErrors.location = 'Location cannot be empty.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddTask({
      id: Math.random().toString(),
      title,
      description,
      date: date.toISOString(),
      location,
      status: 'New',
    });

    setTitle('');
    setDescription('');
    setDate(new Date());
    setLocation('');
    setErrors({});
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(); // Date formatting
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, errors.title && styles.errorInput]}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, errors.description && styles.errorInput]}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        placeholder="Date"
        value={formatDate(date)} // Displaying the selected date
        editable={false} // Prevent editing
        style={[styles.input]}
      />

      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={[styles.input, errors.location && styles.errorInput]}
      />
      {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

      <Button title="Add" onPress={handleAddTask} />
    </View>
  );
};

export default AddTask;