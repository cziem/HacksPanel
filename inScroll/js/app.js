const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')
let photosArray = [];

// Unsplash API
const count = 25;
const API_KEY = '6HL117qqw4aTFpcCjNEwtkCJKk8U6NVGIhiv5kvdMbY';
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}
`;

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Display photos
const displayPhotos = () => {
  photosArray.forEach(photo => {
    // Create <a> linking to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })

    // Put <img> inside <a>, then put both in the imageContainer;
    item.appendChild(img)
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(API_URL);
    photosArray = await response.json()

    displayPhotos();
  } catch (error) {

  }
}


// On load
getPhotos();