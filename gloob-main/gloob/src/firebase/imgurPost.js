import axios from 'axios';

// Replace 'YOUR_CLIENT_ID' with your actual Imgur client ID
const imgurClientId = '3014baa5275f7a4';

const imgurApi = axios.create({
  baseURL: 'https://api.imgur.com/3/',
  headers: {
    Authorization: `Client-ID ${imgurClientId}`
  }
});

const uploadImagesToImgur = async (files) => {
  const uploadedImages = [];

  for (const file of files) {
    const formData = new FormData();
    // Append the image file to the formData object
    // Here 'file' should be a file object with at least a 'buffer' and 'originalname' property
    formData.append('image', file.buffer, file.originalname); // Assuming 'file' comes from multer with .buffer and .originalname

    try {
      const response = await imgurApi.post('image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      uploadedImages.push(response.data.data);
    } catch (error) {
      console.error('Error uploading image to Imgur:', error.response ? error.response.data : error.message);
      // Decide if you want to throw an error or just continue with the next image
      // throw new Error('Failed to upload image to Imgur');
    }
  }

  return uploadedImages;
};

export default {
  async uploadImages(files) {
    return await uploadImagesToImgur(files);
  },
};
