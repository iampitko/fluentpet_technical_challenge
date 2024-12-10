import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  formContainer: {
    padding: 16,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 5,
    marginTop: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 8,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
  },
  filterContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  filterButtonText: {
    fontSize: 16,
  },
  sortButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  sortButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  petItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  editButton: {
    backgroundColor: "#2196F3",
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 5,
  },
});
