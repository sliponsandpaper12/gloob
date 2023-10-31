export default function yourLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(userLocation);
      },
      function (error) {
        reject(error);
      }
    );
  });
}