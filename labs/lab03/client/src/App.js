import React, { useState } from 'react';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [randomImages, setRandomImages] = useState([]);
  const [dogImageUrl, setDogImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle selecting multiple files
  const handleFilesChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Upload selected files to server
  const uploadFiles = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('Please select files first.');
      return;
    }
    const formData = new FormData();
    Array.from(selectedFiles).forEach(file => {
      formData.append('images', file);
    });
    try {
      setUploading(true);
      const res = await fetch('http://localhost:5000/upload-multiple', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        alert('Upload failed: ' + (data.msg || res.statusText));
      } else {
        alert('Uploaded: ' + data.filenames.join(', '));
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading files');
    } finally {
      setUploading(false);
    }
  };

  // Fetch multiple random images from server
  const fetchRandomImages = async () => {
    try {
      const res = await fetch('http://localhost:5000/random-images');
      const data = await res.json();
      if (!res.ok) {
        alert('Failed to fetch random images');
      } else {
        setRandomImages(data.images || []);
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching random images');
    }
  };

  // Fetch a random dog image from dog.ceo
  const fetchDogImage = async () => {
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      if (data && data.message) {
        setDogImageUrl(data.message);
      } else {
        alert('Failed to get dog image');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching dog image');
    }
  };

  // Upload the currently shown dog image URL to our server
  const uploadDogImage = async () => {
    if (!dogImageUrl) {
      alert('No dog image to upload.');
      return;
    }
    try {
      setUploading(true);
      const res = await fetch('http://localhost:5000/upload-dog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageUrl: dogImageUrl })
      });
      const data = await res.json();
      if (!res.ok) {
        alert('Failed to upload dog image: ' + (data.msg || res.statusText));
      } else {
        alert('Dog image uploaded as: ' + data.filename);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading dog image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Lab 3: Image Upload & Random Fetch</h1>

      {/* Section: Upload multiple local images */}
      <section style={{ marginBottom: 40 }}>
        <h2>Upload Multiple Images</h2>
        <input
          type="file"
          multiple
          onChange={handleFilesChange}
          accept="image/*"
        />
        <button onClick={uploadFiles} disabled={uploading} style={{ marginLeft: 10 }}>
          {uploading ? 'Uploading...' : 'Upload Selected'}
        </button>
      </section>

      {/* Section: Fetch random images saved on server */}
      <section style={{ marginBottom: 40 }}>
        <h2>Get Random Images from Server</h2>
        <button onClick={fetchRandomImages}>Fetch Random (up to 3)</button>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
          {randomImages.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`random-${idx}`}
              style={{
                width: 150,
                height: 150,
                objectFit: 'cover',
                border: '1px solid #ccc',
                borderRadius: 4
              }}
            />
          ))}
        </div>
      </section>

      {/* Section: Fetch random dog image and upload it */}
      <section style={{ marginBottom: 40 }}>
        <h2>Random Dog Image</h2>
        <button onClick={fetchDogImage}>Fetch Dog Image</button>
        {dogImageUrl && (
          <div style={{ marginTop: 10 }}>
            <img
              src={dogImageUrl}
              alt="random dog"
              style={{
                width: 200,
                height: 200,
                objectFit: 'cover',
                border: '1px solid #ccc',
                borderRadius: 4
              }}
            />
            <div style={{ marginTop: 10 }}>
              <button onClick={uploadDogImage} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Dog to Server'}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
