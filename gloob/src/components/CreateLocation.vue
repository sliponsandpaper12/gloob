<template>
    <div class="add-location">
      <h2>Add a New Location</h2>
      <form @submit.prevent="addLocation"> 
        <!-- the .prevent prevents the form from being submitted in the traditional way, which would cause a page refresh or a full page navigation.  -->
        <div class="form-group">
          <label for="placeName">Place Name</label>
          <input type="text" id="placeName" v-model="location.placeName" required />
        </div>
  
        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" v-model="location.category" required>
            <option value="restaurant">Restaurant</option>
            <option value="park">Park</option>
            <!-- Add more category options here -->
          </select>
        </div>
  
        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" id="address" v-model="location.address" required />
        </div>
  
        <div class="form-group">
          <label for="affordability">Affordability</label>
          <select id="affordability" v-model="location.affordability">
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="safety">Safety (1-10)</label>
          <select id="safety" v-model="location.safety">
            <option value="1">1</option>
            <option value="2">2</option>
            <!-- Add more safety scale options here -->
          </select>
        </div>
  
        <div class="form-group">
          <label for="openingHours">Opening Hours</label>
          <input type="text" id="openingHours" v-model="location.openingHours" />
        </div>
  
        <button type="submit">Add Location</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import projectFirestore from '../firebase/config';
  import { collection, addDoc, serverTimestamp } from "firebase/firestore";
  import { ref } from 'vue';
  
  const location = ref({
    placeName: '',
    category: '',
    address: '',
    affordability: '',
    safety: '',
    openingHours: '',
  });
  
  async function addLocation() {
    try {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(projectFirestore, "locations"), location.value);
  // const updateTimestamp = await updateDoc(docRef, {
  //     timestamp: serverTimestamp()
  //   })
  console.log("Document written with ID: ", docRef.id);
      // Add the location data to Firestore
      // const collectionRef = projectFirestore.collection('locations');
      // await collectionRef.add(location);
  
      // Reset the form or perform any other necessary actions
      location.value = {
        placeName: '',
        category: '',
        address: '',
        affordability: '',
        safety: '',
        openingHours: '',
      };
  
      console.log('Location added to Firestore');
    } catch (error) {
      console.error('Error adding location to Firestore:', error);
    }
  }
  </script>
  
  <style>
    .add-location {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  button {
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  </style>