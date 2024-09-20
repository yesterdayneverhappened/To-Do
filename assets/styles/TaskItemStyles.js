import { StyleSheet } from "react-native";
import TaskItem from "../../components/TaskItem";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  butPross: {
    backgroundColor: '#FFE4B5',
    padding: 13,
    borderRadius: 10,
  },
  butCompl: {
    backgroundColor: '#BFFFBA',
    padding: 13,
    borderRadius: 10,
  },
  butDel: {
    backgroundColor: '#FFA5A5',
    padding: 13,
    borderRadius: 10,
  }
});

  export default styles;