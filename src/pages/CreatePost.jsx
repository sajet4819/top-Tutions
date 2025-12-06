// src/pages/CreatePost.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import { selectUser, selectUserProfile } from '../redux/authSlice';
import { addPost } from '../redux/postsSlice';
import { FaImage, FaTimes, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);

  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > 4) {
      setError('Maximum 4 images allowed');
      return;
    }

    setImages([...images, ...files]);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
    setError('');
  };

  // Remove image
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  // Upload images to Firebase Storage
  const uploadImages = async () => {
    const uploadPromises = images.map(async (image) => {
      const imageRef = ref(storage, `posts/${user.uid}/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      return getDownloadURL(imageRef);
    });

    return Promise.all(uploadPromises);
  };

  // Handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Please write something to post');
      return;
    }

    if (content.length > 1000) {
      setError('Post content is too long (max 1000 characters)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Upload images if any
      let imageUrls = [];
      if (images.length > 0) {
        imageUrls = await uploadImages();
      }

      // Create post in Firestore
      const postData = {
        tuitionName: userProfile.tuitionName || userProfile.name,
        tuitionId: user.uid,
        ownerId: user.uid,
        ownerPhoto: user.photoURL || null,
        content: content.trim(),
        images: imageUrls,
        likes: 0,
        comments: 0,
        enrollments: 0,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'posts'), postData);

      // Add to Redux store
      dispatch(addPost({
        id: docRef.id,
        ...postData,
        createdAt: new Date()
      }));

      // Navigate to feed
      navigate('/feed');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 font-semibold"
          >
            <FaArrowLeft />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Post</h1>
          <p className="text-gray-600">Share updates and announcements with students</p>
        </div>

        {/* Post Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8">
          
          {/* User Info */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {(userProfile?.tuitionName || userProfile?.name || 'T').charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                {userProfile?.tuitionName || userProfile?.name || 'Tuition Center'}
              </h3>
              <p className="text-sm text-gray-500">Posting as tuition owner</p>
            </div>
          </div>

          {/* Content Textarea */}
          <div className="mb-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What would you like to share? Announcements, achievements, new batches..."
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-500 text-gray-800 text-lg"
              maxLength={1000}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">
                {content.length}/1000 characters
              </p>
            </div>
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Selected Images ({imagePreviews.length}/4)
              </label>
              <div className="grid grid-cols-2 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Upload Button */}
          {images.length < 4 && (
            <div className="mb-6">
              <label className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer transition">
                <FaImage className="text-2xl text-gray-600" />
                <span className="font-semibold text-gray-700">
                  Add Images (Optional - Max 4)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Posting...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Publish Post
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={loading}
              className="px-8 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all duration-300 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

          {/* Tips */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-100 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-3">💡 Tips for Great Posts:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Share student achievements and success stories</li>
              <li>• Announce new batch timings and enrollments</li>
              <li>• Post about upcoming workshops or events</li>
              <li>• Share study tips and motivational content</li>
              <li>• Keep it clear, positive, and engaging!</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;