<template>
  <div>
    <!-- Display Google Place photos -->
    <div v-if="googlePhotos && googlePhotos.length">
      <h3>Google Photos:</h3>
      <img v-for="(photo, index) in googlePhotos" :key="index" :src="photo" :alt="'Photo ' + index">
    </div>

    <!-- User photo upload -->
    <input id="imageInput" type="file" @change="handlePhotoUpload">
    
    <!-- Display uploaded photos -->
    <div v-if="userPhotos && userPhotos.length">
      <h3>User Photos:</h3>
      <img v-for="(photo, index) in userPhotos" :key="index" :src="photo" :alt="'User Photo ' + index">
    </div>

    <button id="imageSubmit" @click="submitAllPhotos">Submit Photos</button>
  </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

export default {
  props: {
    propPlace: Object
  },

  data() {
    return {
      googlePhotos: [],
      userPhotos: []
    };
  },

  mounted() {
    if (this.propPlace) {
      this.setPlace(this.propPlace);
    }
  },

  methods: {
    setPlace(place) {
      if (place.photos && place.photos.length) {
        this.googlePhotos = place.photos.map(photo =>
          photo.getUrl({ maxWidth: 400, maxHeight: 400 })
        );
      }
    },

    async handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          const res = await fetch('/s3Url');
          const { url } = await res.json(); // Get presigned URL from your server

          // The PUT operation to S3 using the presigned URL
          const uploadRes = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': file.type // Adjust the content type based on the file type
            },
            body: file,
          });

          if (uploadRes.ok) {
            const imageUrl = url.split('?')[0];
            console.log(imageUrl)
            this.userPhotos.push(imageUrl); // Add the URL to the userPhotos array
          } else {
            throw new Error('Upload failed');
          }
        } catch (error) {
          console.error("Error in uploading to S3:", error);
        }
      }
    },

    submitAllPhotos() {
      let allPhotoUrls = [...this.googlePhotos, ...this.userPhotos];

      addDoc(collection(projectFirestore, 'placesImages'), {
        placeId: this.propPlace ? this.propPlace.place_id : null,
        imageUrls: allPhotoUrls
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
    },
  }
};
</script>
