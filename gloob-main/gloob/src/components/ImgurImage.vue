<template>
    <div>
      <input type="file" @change="handleFileUpload" accept="image/*" multiple/>
      <button @click="uploadImage">Upload Image</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
// import imgurPost  from '../firebase/imgurPost.js';

  export default {
    data() {
      return {
        selectedImages: [],
      };
    },
    methods: {
      handleFileUpload(event) {
        this.selectedImages = event.target.files;
        console.log(this.selectedImages)
      },

      async uploadImage() {
        if (this.selectedImages.length > 0) {
          const formData = new FormData();
          for (let i = 0; i < this.selectedImages.length; i++) {
            formData.append('images', this.selectedImages[i]);
          }

          try {
            const response =await axios.post('/api/upload',formData,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log('Upload successful!', response.data);
              // Clear the selected images if needed
              this.selectedImages = [];
            } catch (error) {
              console.error('Upload failed.', error);
            }
          } else {
            console.log('No images selected.');
          }
        },
      },
  }
</script>
  