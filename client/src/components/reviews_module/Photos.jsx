import React, { useState, useEffect } from 'react';

function Photos({ photos, handleUserInputs }) {
  const [addPhotoDiv, setAddPhotoDiv] = useState(<div />);

  function handlePhotos(e) {
    let files = e.target.files;
    let fileURLs = [];

    if (files.length + photos.length > 5) {
      throw new Error('Too Many Files Uploaded: Max(5)');
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const img = document.createElement('img');
      img.className = 'review-image';
      img.file = file;
      img.width = 80;

      images.appendChild(img);

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
        fileURLs.push(e.target.result);
        handleUserInputs('photos', fileURLs);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <fieldset id="review-photos">
      <legend>Upload your photos</legend>
      <input
        id="photo-input"
        type="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={(e) => handlePhotos(e)}
      ></input>
      <div id="images"></div>
    </fieldset>
  );
}

export default Photos;