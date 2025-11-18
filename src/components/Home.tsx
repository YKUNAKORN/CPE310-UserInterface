import React, { useState, useRef, useEffect, useCallback } from 'react';
import Footer from './Footer';

type CameraStatus = 'inactive' | 'active' | 'paused';

const Home: React.FC = () => {
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('inactive');
  const [detectedText, setDetectedText] = useState<string>('');
  const [pendingText, setPendingText] = useState<string>(''); // Text waiting to be spoken
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoSpeakTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingTextRef = useRef<string>(''); // Use ref to store the latest value

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
      if (autoSpeakTimerRef.current) {
        clearTimeout(autoSpeakTimerRef.current);
      }
    };
  }, []);

  const updateCameraStatus = (status: CameraStatus) => {
    setCameraStatus(status);
  };

  // Function to capture frame from video and convert to base64
  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current) {
      return null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas size to match video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw frame from video to canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Convert to base64 (format: data:image/jpeg;base64,...)
      const base64Image = canvas.toDataURL('image/jpeg', 0.8);
      // Remove data:image/jpeg;base64, prefix, return only base64 string
      return base64Image.split(',')[1];
    }
    
    return null;
  }, []);

  // Function to send image to Flask API
  const sendToAPI = useCallback(async (base64Image: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Display the result
      if (data.result) {
        const newChar = data.result;
        setDetectedText(prev => prev + newChar);
        
        // Send result to TTS API
        try {
          const response = await fetch('http://127.0.0.1:8000/tts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: newChar
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const ttsData = await response.json();
        } catch (ttsError) {
          console.error('TTS API Error:', ttsError);
        }
        
        // Update pending text in both state and ref
        setPendingText(prev => {
          const updated = prev + newChar;
          pendingTextRef.current = updated;
          return updated;
        });
        
        // Reset auto-speak timer when new detection occurs
        if (autoSpeakTimerRef.current) {
          clearTimeout(autoSpeakTimerRef.current);
        }
        
        // Start 5-second countdown again
        autoSpeakTimerRef.current = setTimeout(() => {
          // Use ref to access the latest value of pendingText
          const textToSpeak = pendingTextRef.current;
          if (textToSpeak) {
            const utterance = new SpeechSynthesisUtterance(newChar);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
            
            // Clear pending text and add space to detectedText after speaking
            setPendingText('');
            pendingTextRef.current = '';
            setDetectedText(prev => prev + ' ');
          }
          autoSpeakTimerRef.current = null;
        }, 1000);
      }
    } catch (error) {
      console.error('API Error:', error);
      // Don't show alert to avoid interrupting auto-detection
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-detection when camera is on and not paused
  useEffect(() => {
    if (isPlaying && !isPaused && !isLoading) {
      // Start auto-detection every 2 seconds
      detectionIntervalRef.current = setInterval(async () => {
        if (!isPlaying || isPaused || isLoading || !videoRef.current) {
          return;
        }

        const base64Image = captureFrame();
        if (base64Image) {
          await sendToAPI(base64Image);
        }
      }, 2000); // Detect every 2 seconds
    } else {
      // Stop auto-detection when paused or stopped
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }
    }

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [isPlaying, isPaused, isLoading, captureFrame, sendToAPI]);

  const handlePlay = async () => {
    try {
      // Resume camera if paused
      if (isPaused && streamRef.current) {
        videoRef.current?.play();
        setIsPaused(false);
        updateCameraStatus('active');
        
        // Start auto-speak timer again if there is pendingText
        if (pendingTextRef.current) {
          if (autoSpeakTimerRef.current) {
            clearTimeout(autoSpeakTimerRef.current);
          }
          
          autoSpeakTimerRef.current = setTimeout(() => {
            const textToSpeak = pendingTextRef.current;
            if (textToSpeak) {
              const utterance = new SpeechSynthesisUtterance(textToSpeak);
              utterance.lang = 'en-US';
              utterance.rate = 0.9;
              window.speechSynthesis.speak(utterance);
              
              setPendingText('');
              pendingTextRef.current = '';
              setDetectedText(prev => prev + ' ');
            }
            autoSpeakTimerRef.current = null;
          }, 5000);
        }
        
        return;
      }

      // Start camera if not initialized
      if (!streamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }

      videoRef.current?.play();
      setIsPlaying(true);
      setIsPaused(false);
      updateCameraStatus('active');
    } catch (err) {
      console.error('Camera error:', err);
      alert(`Cannot access camera: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPaused(true);
    updateCameraStatus('paused');
    
    // Temporarily stop auto-speak timer when paused
    if (autoSpeakTimerRef.current) {
      clearTimeout(autoSpeakTimerRef.current);
      autoSpeakTimerRef.current = null;
    }
  };

  const handleStop = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }

    if (autoSpeakTimerRef.current) {
      clearTimeout(autoSpeakTimerRef.current);
      autoSpeakTimerRef.current = null;
    }

    setIsPlaying(false);
    setIsPaused(false);
    updateCameraStatus('inactive');

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleClear = () => {
    setDetectedText('');
    setPendingText('');
    pendingTextRef.current = '';
    
    // Clear auto-speak timer when clearing text
    if (autoSpeakTimerRef.current) {
      clearTimeout(autoSpeakTimerRef.current);
      autoSpeakTimerRef.current = null;
    }
  };

  const handleSpeak = () => {
    if (detectedText) {
      const utterance = new SpeechSynthesisUtterance(detectedText);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('No text to speak');
    }
  };

  const getStatusIndicatorClass = () => {
    return cameraStatus === 'active' ? 'status-indicator active' : 'status-indicator';
  };

  const getStatusText = () => {
    switch (cameraStatus) {
      case 'active':
        return 'Camera: Active';
      case 'paused':
        return 'Camera: Paused';
      default:
        return 'Camera: Inactive';
    }
  };

  const getStatusColor = () => {
    switch (cameraStatus) {
      case 'active':
        return '';
      case 'paused':
        return '#FFA500';
      default:
        return '#FF0000';
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="header-section">
          <h1 className="main-title">Silent Voices</h1>
          <p className="subtitle">Real-time American Sign Language Recognition with Voice Output</p>
        </div>

        <div className="main-container">
          <div className="camera-panel">
            <div className="video-container">
              <div className="camera-status">
                <div 
                  className={getStatusIndicatorClass()}
                  style={{ background: getStatusColor() }}
                ></div>
                <span className="status-text">{getStatusText()}</span>
              </div>

              <video 
                ref={videoRef}
                id="videoElement" 
                autoPlay 
                playsInline
              ></video>
            </div>

            <div className="controls">
              <button 
                id="playBtn" 
                className={`control-btn btn-play ${!isPlaying || isPaused ? '' : 'disabled'}`}
                onClick={handlePlay}
                disabled={isPlaying && !isPaused}
              >
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <button 
                id="pauseBtn" 
                className={`control-btn btn-pause ${isPlaying && !isPaused ? '' : 'disabled'}`}
                onClick={handlePause}
                disabled={!isPlaying || isPaused}
              >
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              </button>
              <button 
                id="stopBtn" 
                className={`control-btn btn-stop ${isPlaying ? '' : 'disabled'}`}
                onClick={handleStop}
                disabled={!isPlaying}
              >
                <svg width="30" height="30" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12"/>
                </svg>
              </button>
            </div>
            
            {/* Canvas for capturing image (hidden) */}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>

          <div className="result-panel">
            <h2 className="result-title">Detection result</h2>
            <div className="result-box">
              {!detectedText ? (
                <div className="result-placeholder">
                  Result article will appear here
                </div>
              ) : (
                <div className="result-text">{detectedText}</div>
              )}
            </div>
            <button className="clear-btn" onClick={handleClear}>Clear</button>

            <div className="divider-container">
              <div className="divider-line"></div>
              <span className="divider-text">Tap to Speak</span>
              <div className="divider-line"></div>
            </div>

            <button className="speak-btn" onClick={handleSpeak}>
              <div className="waveform">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="waveform-bar"></div>
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

