const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = [];

// Unsplash API - set up developer account and get new API key 

const count = 10;
const apiKey = 'lGspqOQiL5z9LqIFJOGmGIoluV8a6IQyP9_e53NHgwY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// helper function to set attributes

function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

//Create elements for links and phoots, add to DOM. We create a forEach function. We loop through the array, and create an anchor tag for each image that has a bunch of attributes. We append the images within the A tags that we just created, and then we append these items (a tags) onto the image container.

// We make the coder dry - don't repeat yourself - by creating a helper functioin (above) where pass in the element and the attributes on that element that we want to change. We then loop through the attributes that we've entered in the function to update the element.

function displayPhotos() {
    photosArray.forEach((photo) => {
      const item = document.createElement('a');
      setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
      });
      const img = document.createElement('img');
      setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
  }

// Get photos from Unsplash API
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    } catch (error) {
      // Catch Error Here
    }
  }
  
  // Check to see if scrolling near bottom of page, Load More Photos
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      getPhotos();
      console.log('load more');
    }
  });
  
  // On Load
  getPhotos();