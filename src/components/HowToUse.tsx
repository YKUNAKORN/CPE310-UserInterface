import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../styles/HowToUse.css';

const HowToUse: React.FC = () => {
  return (
    <div className="how-to-use-wrapper">
      <div className="how-to-content">
        <h1 className="how-to-title">Manual: ASL Alphabet Detection</h1>
        <p className="how-to-subtitle">A complete guide to using our real-time sign language recognition system</p>

        <div className="instruction-cards">
          {/* Step 1 */}
          <div className="instruction-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h2 className="step-title">Grant Camera Permission</h2>
              <p className="step-description">
                When you first click the <strong>Play</strong> button, your browser will request permission to access your camera.
                Click <strong>"Allow"</strong> to enable the camera feed. This is required for the hand gesture detection to work.
              </p>
              <div className="tip-box">
                <strong>Tip:</strong> If you accidentally denied permission, you can reset it in your browser's site settings.
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="instruction-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h2 className="step-title">Position Your Hand</h2>
              <p className="step-description">
                Place your hand in front of the camera with good lighting. Make sure your hand is clearly visible and centered in the video frame.
                The system works best when:
              </p>
              <ul className="feature-list">
                <li>Your hand is well-lit</li>
                <li>The background is not too cluttered</li>
                <li>Your hand is 1-2 feet from the camera</li>
                <li>Your fingers are clearly visible</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="instruction-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h2 className="step-title">Control the Camera</h2>
              <p className="step-description">
                Use the control buttons to manage the camera feed:
              </p>
              <div className="controls-guide">
                <div className="control-item">
                  <div className="control-icon play-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Play Button (Blue)</strong>
                    <p>Start the camera and begin detection</p>
                  </div>
                </div>
                <div className="control-item">
                  <div className="control-icon pause-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Pause Button (Gray)</strong>
                    <p>Temporarily pause the camera feed</p>
                  </div>
                </div>
                <div className="control-item">
                  <div className="control-icon stop-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                      <rect x="6" y="6" width="12" height="12"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Stop Button (Red)</strong>
                    <p>Stop the camera completely</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="instruction-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h2 className="step-title">Make ASL Gestures</h2>
              <p className="step-description">
                Form ASL alphabet letters with your hand. The system will automatically detect and display the recognized letters in the 
                <strong> "Detection result"</strong> panel on the right side of the screen. Detection occurs every 2 seconds when the camera is active.
              </p>
              <div className="tip-box">
                <strong>Note:</strong> Hold each gesture steady for a moment to ensure accurate detection.
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="instruction-card">
            <div className="step-number">5</div>
            <div className="step-content">
              <h2 className="step-title">View & Manage Results</h2>
              <p className="step-description">
                As letters are detected, they will appear in the result panel. You can:
              </p>
              <ul className="feature-list">
                <li><strong>View detected text</strong> - Letters accumulate as you make gestures</li>
                <li><strong>Auto-spacing</strong> - A space is automatically added after 5 seconds without new detection</li>
                <li><strong>Clear results</strong> - Click the "Clear" button to remove all detected text</li>
              </ul>
            </div>
          </div>

          {/* Step 6 */}
          <div className="instruction-card">
            <div className="step-number">6</div>
            <div className="step-content">
              <h2 className="step-title">Automatic Text-to-Speech</h2>
              <p className="step-description">
                The system automatically speaks detected letters after <strong>5 seconds</strong> without new detection.
                You can also click the <strong>"Speak"</strong> button (with animated waveform) to manually hear all detected text.
                The system uses your browser's built-in text-to-speech engine.
              </p>
              <div className="tip-box">
                <strong>Note:</strong> Make sure your device volume is turned up and not muted. Each spoken segment is automatically separated with a space.
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="additional-info">
          <h2 className="info-title">Additional Information</h2>
          
          <div className="info-section">
            <h3>System Requirements</h3>
            <ul className="feature-list">
              <li>Modern web browser (Chrome, Firefox, Safari, or Edge)</li>
              <li>Working webcam or camera</li>
              <li>HTTPS connection (required for camera access)</li>
              <li>JavaScript enabled</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Troubleshooting</h3>
            <div className="troubleshooting">
              <div className="trouble-item">
                <strong>Camera not working?</strong>
                <p>Check browser permissions and ensure no other app is using the camera.</p>
              </div>
              <div className="trouble-item">
                <strong>No sound on text-to-speech?</strong>
                <p>Check your system volume and browser audio settings.</p>
              </div>
              <div className="trouble-item">
                <strong>Poor detection accuracy?</strong>
                <p>Improve lighting conditions and ensure your hand is clearly visible.</p>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Best Practices</h3>
            <ul className="feature-list">
              <li>Use in a well-lit environment</li>
              <li>Keep your hand steady when forming gestures</li>
              <li>Practice ASL alphabet letters for better results</li>
              <li>Position yourself 1-2 feet from the camera</li>
              <li>Use a plain background for better detection</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">Try the ASL detection system now and experience real-time sign language recognition!</p>
          <Link to="/detection" className="cta-button">
            Start Detection
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowToUse;

