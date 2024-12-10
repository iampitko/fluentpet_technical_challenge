import React, { createContext, useState, useContext } from "react";
import { Pet } from "../types";

type PetContextType = {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  updatePet: (pet: Pet) => void;
  deletePet: (id: string) => void;
  searchPets: (query: string) => Pet[];
};

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pets, setPets] = useState<Pet[]>([]);

  const addPet = (pet: Pet) => {
    const existingPet = pets.find((p) => p.id === pet.id);
    if (existingPet) {
      alert("A pet with this ID already exists.");
      return;
    }
    setPets([...pets, pet]);
  };

  const updatePet = (updatedPet: Pet) => {
    const newPets = pets.map((pet) => {
      if (pet.id === updatedPet.id) {
        return updatedPet;
      }
      return pet;
    });
    setPets(newPets);
  };

  const deletePet = (id: string) => {
    const newPets = pets.filter((pet) => pet.id !== id);
    if (newPets.length === pets.length) {
      alert("Pet not found or already deleted.");
      return;
    }
    setPets(newPets);
  };

  const searchPets = (query: string): Pet[] => {
    if (!query.trim()) return pets; // Return all pets if query is empty
    const lowercasedQuery = query.toLowerCase();
    return pets.filter((pet) =>
      pet.name.toLowerCase().includes(lowercasedQuery)
    );
  };

  return (
    <PetContext.Provider
      value={{ pets, addPet, updatePet, deletePet, searchPets }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePetContext must be used within a PetProvider");
  }
  return context;
};
