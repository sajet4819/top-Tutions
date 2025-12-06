// src/data/tuitions.js

// Helper to get correct base URL for images
const getImagePath = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
};

// 25 images from public folder (fixed for GitHub Pages!)
const imageList = [
  "images/tuition1.avif",
  "images/tuition2.jpg",
  "images/tuition3.jpg",
  "images/tuition4.jpg",
  "images/tuition5.jpg",
  "images/tuition6.jpg",
  "images/tuition7.jpg",
  "images/tuition8.jpg",
  "images/tuition9.jpg",
  "images/tuition10.jpg",
  "images/tuition11.jpg",
  "images/tuition12.jpg",
  "images/tuition13.jpg",
  "images/tuition14.jpg",
  "images/tuition15.jpg",
  "images/tuition16.jpg",
  "images/tuition17.jpg",
  "images/tuition18.jpg",
  "images/tuition19.jpg",
  "images/tuition20.jpg",
  "images/tuition21.jpg",
  "images/tuition22.jpg",
  "images/tuition23.jpg",
  "images/tuition24.jpg",
  "images/tuition25.jpg",
].map(getImagePath); // Apply base URL to all images

// Generate 1000+ tuitions
const baseNames = ["FIITJEE","Allen","Aakash","Resonance","Vibrant","Bansal","Narayana","PACE","Motion","Rao IIT","Vidyamandir","Sri Chaitanya","Brilliant","Super 30","Drishti IAS","Vision IAS","Vajiram","Unacademy","Physics Wallah","Vedantu","Byju's","Mahesh Tutorials","Lakshya","Prime","Elite","Quantum","Target Point","Success Forum"];
const cities = ["Kota","Delhi","Mumbai","Pune","Bangalore","Hyderabad","Chennai","Jaipur","Lucknow","Patna","Ahmedabad","Indore","Bhopal","Nagpur","Online"];
const suffixes = [""," Prime"," Elite"," Pro"," Advanced"," Foundation"," Plus"," Pinnacle"," Junior"];

export const tuitions = Array.from({ length: 1000 }, (_, i) => {
  const nameIdx = i % baseNames.length;
  const cityIdx = Math.floor(i / 30) % cities.length;
  const suffix = i % 9 === 0 ? suffixes[Math.floor(Math.random() * suffixes.length)] : '';

  return {
    id: i + 1,
    name: baseNames[nameIdx] + suffix,
    location: cities[cityIdx],
    rating: Number((4.1 + Math.random() * 0.9).toFixed(1))
  };
});

// FIXED IMAGE — same tuition = same image forever
export const getTuitionImage = (id) => {
  return imageList[(id - 1) % imageList.length];
};

// Also export images as array (in case any component needs it)
export const tuitionImages = imageList;