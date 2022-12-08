import React, { useEffect, useState } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import axios from 'axios';
import Webcam from 'react-webcam';
import './App.css';

function App() {
  const [orderId, setOrderId] = useState();
  const [message, setMessage] = useState();
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  useEffect(() => {
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      console.log("Key is: " + pair[0]);
      console.log("Value is: " + pair[1]);
      setOrderId(pair[1]);
    }
  }, []);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleAddVideo = async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      blob.lastModifiedDate = new Date();
      blob.name = "react-webcam-stream-capture.webm";
      console.log('record--->', blob);
      var formData = new FormData();
      formData.append('order_id', orderId);
      formData.append('file', blob);
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8080/api/file/upload',
        data: formData,
      });
      if (response) {
        setMessage('Video Message Added Successfully');
      }
      setRecordedChunks([]);
    }
  };
  return (
    <div className="App">
      <Webcam audio={true} ref={webcamRef} />
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <>
          <button onClick={handleAddVideo}>Add Video</button>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}

export default App;
