<template>
    <div class="add-review-form">
      <h2>Add Review</h2>
      <form @submit.prevent="addReview">
        <div class="form-group">
          <label for="locationId">Location ID:</label>
          <input type="text" id="locationId" v-model="review.locationId" required>
        </div>
  
        <div class="form-group">
          <label for="indivOverallRating">Overall Rating:</label>
          <input type="number" id="indivOverallRating" v-model.number="review.userReview.indivOverallRating" required min="1" max="5">
        </div>
  
        <div class="form-group">
          <label for="likes">Likes:</label>
          <input type="number" id="likes" v-model.number="review.userReview.likes" required min="0">
        </div>
  
        <div class="form-group">
          <label for="reviews">Review:</label>
          <textarea id="reviews" v-model="review.userReview.reviews" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="userID">User ID:</label>
          <input type="text" id="userID" v-model="review.userReview.userID" required>
        </div>
  
        <button type="submit">Submit Review</button>
      </form>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { projectFirestore } from '../firebase/config'; // Assuming you have a timestamp function in your Firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const review = ref({
  locationId: '',
  userReview: {
    indivOverallRating: 0,
    likes: 0,
    reviews: '',
    time: '', // We'll set this at submission time to the current timestamp
    userID: ''
  }
});

async function addReview() {
  // Update the time to the current timestamp
  review.value.userReview.time = serverTimestamp(); // Your method of getting the current timestamp in Firebase format

  try {
    const docRef = await addDoc(collection(projectFirestore, "reviews"), {
      locationId: review.value.locationId,
      userReview: review.value.userReview
    });

    console.log("Review document written with ID: ", docRef.id);

    // Reset the form or perform any other necessary actions after submission
    review.value = {
      locationId: '',
      userReview: {
        indivOverallRating: 0,
        likes: 0,
        reviews: '',
        time: '',
        userID: ''
      }
    };

    alert('Review added successfully!');

  } catch (error) {
    console.error('Error adding review to Firestore:', error);
    alert('Failed to add review.');
  }
}
</script>

<style scoped>
.add-review-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  background-color: #007BFF;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>

