import React, { useEffect, useState, useCallback } from 'react'
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider, Stack, Thumbnail, DropZone } from '@shopify/polaris';
import { NoteMinor } from '@shopify/polaris-icons';
import axios from 'axios'
import './App.css';

function App() {
  const [orderNumber, setOrderNumber] = useState();
  const [files, setFiles] = useState();
  const [message, setMessage] = useState();
  useEffect(() => {
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      console.log("Key is: " + pair[0]);
      console.log("Value is: " + pair[1]);
      setOrderNumber(pair[1])
    }
  }, []);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles) =>
      setFiles(acceptedFiles[0]),
    [],
  );

  const validImageTypes = ['video/mp4'];

  const fileUpload = !files && <DropZone.FileUpload />;
  const uploadedFiles = files && (
    <div style={{ padding: '0' }}>
      <Stack vertical>
        <Stack alignment="center">
          <Thumbnail
            size="small"
            alt={files.name}
            source={
              validImageTypes.includes(files.type)
                ? window.URL.createObjectURL(files)
                : NoteMinor
            }
          />
          <div>
            {files.name}
            <p>
              {files.size} bytes
            </p>
          </div>
        </Stack>
      </Stack>
    </div>
  );

  const handleAddVideo = async () => {
    var formData = new FormData();
    formData.append('order_number', orderNumber)
    formData.append('file', files)
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:8080/api/file/upload',
      data: formData,
    });
    if (response) {
      setMessage('Video Message Added Successfully')
    }
  }
  return (
    <div className="App">
      <AppProvider i18n={enTranslations}>
        <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
          {uploadedFiles}
          {fileUpload}
        </DropZone>
      </AppProvider>
      <button onClick={handleAddVideo}>Add Video</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
