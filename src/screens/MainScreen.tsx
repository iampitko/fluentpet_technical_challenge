import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { usePetContext } from "../context/PetContext";
import { Pet } from "../types";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../styles/MainScreenStyles";

const MainScreen: React.FC = () => {
  const { addPet, updatePet, deletePet, pets, searchPets } = usePetContext();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPets, setFilteredPets] = useState<Pet[]>(pets);
  const [editingPet, setEditingPet] = useState<Pet | undefined>(undefined);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [petImage, setPetImage] = useState<string | undefined>(undefined);
  const [petCategory, setPetCategory] = useState<string | null>(null);
  const [petBreed, setPetBreed] = useState<string | null>(null);
  const [isCategoryFilterVisible, setCategoryFilterVisible] = useState(false);
  const [isBreedFilterVisible, setBreedFilterVisible] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access the camera roll is required!");
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const petsData = await AsyncStorage.getItem("pets");
        if (petsData) {
          setFilteredPets(JSON.parse(petsData));
        }
      } catch (error) {
        console.error("Failed to load pets from AsyncStorage", error);
      }
    };

    loadPets();
  }, []);

  useEffect(() => {
    const savePets = async () => {
      try {
        await AsyncStorage.setItem("pets", JSON.stringify(filteredPets));
      } catch (error) {
        console.error("Failed to save pets to AsyncStorage", error);
      }
    };

    savePets();
  }, [filteredPets]);

  // Open image gallery to select a pet photo
  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPetImage(result.assets?.[0]?.uri);
    } else {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleSearch = () => {
    const results = searchPets(searchQuery);
    setFilteredPets(results);
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setFilteredPets(pets);
  };

  const sortByAge = () => {
    const sorted = [...filteredPets].sort(
      (a, b) => Number(a.age) - Number(b.age)
    );
    setFilteredPets(sorted);
  };

  const sortByName = () => {
    const sorted = [...filteredPets].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredPets(sorted);
  };

  React.useEffect(() => {
    setFilteredPets(pets);
  }, [pets]);

  const handleSubmit = () => {
    if (!name.trim() || !age.trim() || !petCategory || !petBreed) {
      alert("Please fill in all required fields.");
      return;
    }

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      alert("Please enter a valid age greater than 0.");
      return;
    }

    const petData: Pet = {
      id: editingPet?.id || Date.now().toString(),
      name: name.trim(),
      age: parsedAge.toString(),
      description: description.trim(),
      image: petImage,
      category: petCategory,
      breed: petBreed,
    };

    if (editingPet) {
      updatePet(petData);
    } else {
      addPet(petData);
    }

    setEditingPet(undefined);
    setName("");
    setAge("");
    setDescription("");
    setPetImage(undefined);
    setPetCategory(null);
    setPetBreed(null);
  };

  const renderPetItem = ({ item }: { item: any }) => (
    <View style={styles.petItem}>
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={{ width: 50, height: 50, borderRadius: 5 }}
        />
      )}
      <Text>Name: {item.name}</Text>
      <Text>Age: {item.age}</Text>
      <Text>Category: {item.category}</Text>
      <Text>Breed: {item.breed}</Text>
      {item.description && <Text>Description: {item.description}</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setEditingPet(item);
            setName(item.name);
            setAge(item.age);
            setDescription(item.description || "");
            setPetImage(item.image);
            setPetCategory(item.category);
            setPetBreed(item.breed);
          }}
          style={styles.editButton}
        >
          <Text>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deletePet(item.id)}
          style={styles.deleteButton}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Pet Name"
        />
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Pet Age"
          keyboardType="numeric"
        />
        <DropDownPicker
          open={isCategoryFilterVisible}
          setOpen={setCategoryFilterVisible}
          value={petCategory}
          items={[
            { label: "Dog", value: "Dog" },
            { label: "Cat", value: "Cat" },
            { label: "Bird", value: "Bird" },
          ]}
          setValue={setPetCategory}
          placeholder="Select Pet Category"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Pet Description"
          multiline
          numberOfLines={4}
        />

        <DropDownPicker
          open={isBreedFilterVisible}
          setOpen={setBreedFilterVisible}
          value={petBreed}
          items={[
            { label: "Labrador", value: "Labrador" },
            { label: "Bulldog", value: "Bulldog" },
            { label: "Persian", value: "Persian" },
          ]}
          setValue={setPetBreed}
          placeholder="Select Pet Breed"
        />

        <TouchableOpacity style={styles.button} onPress={handleImagePick}>
          <Text style={styles.buttonText}>Upload Pet Photo</Text>
        </TouchableOpacity>
        {petImage && (
          <Image
            source={{ uri: petImage }}
            style={{ width: 100, height: 100, marginVertical: 10 }}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {editingPet ? "Update Pet" : "Add Pet"}
          </Text>
        </TouchableOpacity>
      </View>

      {pets.length > 0 && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search pets..."
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetSearch}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(!isFilterVisible)}
        >
          <Text style={styles.filterButtonText}>
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </Text>
        </TouchableOpacity>
        {isFilterVisible && (
          <View style={styles.sortButtons}>
            <TouchableOpacity style={styles.sortButton} onPress={sortByAge}>
              <Text>Sort by Age</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortButton} onPress={sortByName}>
              <Text>Sort by Name</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.listContainer}>
        {pets.length === 0 ? (
          <Text>No pets available. Add a new pet!</Text>
        ) : (
          <FlatList
            data={filteredPets}
            keyExtractor={(item) => item.id}
            renderItem={renderPetItem}
            ListEmptyComponent={
              <Text>No pets found matching your criteria.</Text>
            }
          />
        )}
      </View>
    </View>
  );
};

export default MainScreen;
