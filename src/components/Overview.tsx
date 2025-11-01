import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../styles/Overview.css';

const Overview: React.FC = () => {
  return (
    <div className="overview-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Communicate <span className="gradient-text">Anything</span>
          </h1>
          <p className="hero-subtitle">
            Your real-time ASL detection partner, powered by computer vision and machine learning,
            designed to bridge communication gaps and make sign language accessible to everyone.
          </p>
          <div className="hero-buttons">
            <Link to="/detection" className="primary-button">
              Start Detection
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/manual" className="secondary-button">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Your AI-Powered Sign Language Partner</h2>
        
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon camera-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <h3 className="feature-title">Real-Time Detection</h3>
            <p className="feature-description">
              Instantly recognize ASL alphabet gestures through your webcam with high accuracy.
              Our system processes hand movements in real-time, providing immediate feedback
              as you sign each letter.
            </p>
            <div className="feature-highlight">
              <span className="highlight-tag">Live Processing</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon brain-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 0 1 7.07 17.07M12 2a10 10 0 0 0-7.07 17.07M12 2v20"/>
                <path d="M8 8a5 5 0 0 1 8 0"/>
              </svg>
            </div>
            <h3 className="feature-title">Smart Recognition</h3>
            <p className="feature-description">
              Built with advanced computer vision algorithms ready to integrate with ML models.
              Designed for accuracy and speed, making sign language recognition accessible
              to everyone.
            </p>
            <div className="feature-highlight">
              <span className="highlight-tag">ML-Ready</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon voice-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
              </svg>
            </div>
            <h3 className="feature-title">Text-to-Speech</h3>
            <p className="feature-description">
              Convert detected sign language into spoken words instantly. Perfect for real-time
              communication, presentations, or learning scenarios. Make your gestures heard
              with natural-sounding voice output.
            </p>
            <div className="feature-highlight">
              <span className="highlight-tag">Voice Output</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon mobile-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <path d="M12 18h.01"/>
              </svg>
            </div>
            <h3 className="feature-title">Works Everywhere</h3>
            <p className="feature-description">
              Fully responsive design that works seamlessly on desktop, tablet, and mobile devices.
              Practice ASL anywhere, anytime, on any device with a camera. No installation required –
              just open and start signing.
            </p>
            <div className="feature-highlight">
              <span className="highlight-tag">Cross-Platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="showcase-section">
        <div className="showcase-grid">
          <div className="showcase-card large-card">
            <div className="showcase-content">
              <div className="showcase-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
              <h3>Start with your camera</h3>
              <p>Simply allow camera access and position your hand in frame. Our intuitive interface
              guides you through the setup process in seconds.</p>
            </div>
            <div className="showcase-visual">
              <div className="demo-box camera-demo">
                <div className="camera-indicator">
                  <div className="indicator-dot active"></div>
                  <span>Camera: Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase-card">
            <div className="showcase-content">
              <div className="showcase-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3>Instant insights</h3>
              <p>Get immediate feedback as you sign. Track your detected letters in real-time
              with our clean result panel.</p>
            </div>
          </div>

          <div className="showcase-card">
            <div className="showcase-content">
              <div className="showcase-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Practice anytime</h3>
              <p>No schedules, no appointments. Practice ASL alphabet whenever you want,
              at your own pace, with instant AI feedback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases-section">
        <h2 className="section-title">How people use ASL Detection</h2>
        
        <div className="use-cases-grid">
          <div className="use-case-card">
            <div className="use-case-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1AB6DF" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Learn to communicate</h3>
            <p>
              Master the ASL alphabet through interactive practice. Perfect for students, teachers,
              and anyone wanting to learn sign language basics. Get instant feedback to improve
              your signing accuracy.
            </p>
          </div>

          <div className="use-case-card">
            <div className="use-case-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1AB6DF" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <h3>Enhance accessibility</h3>
            <p>
              Bridge communication gaps in educational and professional settings. Enable real-time
              translation of ASL alphabet for presentations, meetings, or classroom environments
              with text-to-speech output.
            </p>
          </div>

          <div className="use-case-card">
            <div className="use-case-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1AB6DF" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <h3>Build your project</h3>
            <p>
              Integrate ASL detection into your own applications. Our ML-ready architecture makes
              it easy to add custom models, extend functionality, or build upon our foundation
              for research and development.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="privacy-section">
        <div className="privacy-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1AB6DF" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h2 className="privacy-title">Your privacy is protected</h2>
        <p className="privacy-description">
          All video processing happens locally in your browser. We don't store, transmit, or use
          your camera feed for any purpose other than real-time detection. Your data stays on
          your device, always.
        </p>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to start signing?</h2>
          <p className="cta-description">
            Experience real-time ASL alphabet detection with instant feedback.
            No sign-up required – just click and start.
          </p>
          <Link to="/detection" className="cta-button">
            Try ASL Detection Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Overview;

