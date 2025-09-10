import React, { useRef } from "react";

const ImageUploader = ({ inputRef }) => {
  const previewRef = useRef(null);

  const validateFile = (file) => {
    const allowedFormats = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024;

    return allowedFormats.includes(file.type) && file.size < maxSize;
  };

  const updateFileInput = () => {
    const fileInput = inputRef.current;
    const preview = previewRef.current;
    const remainingImages = preview.getElementsByTagName("img");

    if (remainingImages.length === 0) {
      fileInput.value = "";
    } else {
      const dataTransfer = new DataTransfer();
      Array.from(fileInput.files).forEach((file) => {
        if (Array.from(remainingImages).some((img) => img.alt === file.name)) {
          dataTransfer.items.add(file);
        }
      });
      fileInput.files = dataTransfer.files;
    }
  };

  const handleFileChange = (event) => {
    const preview = previewRef.current;
    const files = event.target.files;
    const dataTransfer = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!validateFile(file)) continue;

      dataTransfer.items.add(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "image-preview-item";

        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = file.name;
        imgContainer.appendChild(img);

        const closeIcon = document.createElement("span");
        closeIcon.className = "close-icon";
        closeIcon.innerHTML = "&times;";
        closeIcon.onclick = () => {
          preview.removeChild(imgContainer);
          updateFileInput();
        };
        imgContainer.appendChild(closeIcon);

        preview.appendChild(imgContainer);
      };

      reader.readAsDataURL(file);
    }

    inputRef.current.files = dataTransfer.files;
  };

  return (
    <div>
      <input
        id="images"
        className="file-input"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        ref={inputRef}
      />
      <div
        id="image_preview"
        className="d-flex flex-wrap gap-2 mt-2"
        ref={previewRef}
      ></div>
    </div>
  );
};

export default ImageUploader;
