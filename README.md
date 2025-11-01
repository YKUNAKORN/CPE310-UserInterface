# ASL Alphabet Detection

This is a web application that can detect American Sign Language (ASL) alphabets in real time. Built with React and TypeScript, it lets you use your camera to capture hand gestures and converts them into text and speech.

## What It Does

This application recognizes ASL alphabet signs through your camera and speaks them out loud. Here are the key features:

- **Real-time Camera Access** - Connect your webcam to see and detect hand gestures live
- **ASL Detection** - Currently using simulated detection (you can easily plug in your own ML model later)
- **Overview Page** - A clean landing page that introduces the project
- **Text-to-Speech** - The app will read out the detected letters for you
- **Works on Any Device** - Desktop, tablet, or mobile - it adapts to your screen
- **Smooth Animations** - Modern, polished interface that's easy on the eyes
- **Accessibility Built In** - Follows web accessibility best practices
- **Your Data Stays Private** - Everything happens on your device, nothing is sent to servers

## Built With

We used these technologies to build this app:

- **React 18** - The main framework with modern React features
- **TypeScript** - Adds type safety to catch errors early
- **React Router** - Handles navigation between different pages
- **CSS3** - Custom styling with smooth animations and mobile-friendly layouts
- **Web APIs** that make it work:
  - MediaDevices API - Access your camera
  - Web Speech API - Convert text to speech

## What You Need

Before getting started, make sure you have these installed on your computer:
- **Node.js** (version 14.0.0 or newer)
- **npm** (version 6.0.0 or newer) or **yarn** (version 1.22.0 or newer)

## Getting Started

First, open your terminal and navigate to the project folder:

```bash
cd CPE310UI
```

Then install all the required packages:

```bash
npm install
```

Or if you're using yarn:

```bash
yarn install
```

This might take a minute or two the first time.

## Running the App

### Try It Out Locally

To run the app in development mode (with live updates as you change code):

```bash
npm start
```

Or with yarn:

```bash
yarn start
```

Your browser should automatically open to `http://localhost:3000` and you'll see the app running.

### Building for Production

When you're ready to deploy, create an optimized build:

```bash
npm run build
```

Or with yarn:

```bash
yarn build
```

The finished build will be saved in the `build/` folder, ready to upload to a web server.

## How to Use It

The app has three main sections you can navigate between:

### Detection Page (Main Feature)

This is where the magic happens - real-time ASL detection:

1. **Allow Camera Access**: When you click the Play button, your browser will ask for permission to use your camera. Just click "Allow".

2. **Camera Controls**:
   - **Blue Play Button**: Turns on the camera and starts detecting signs
   - **Gray Pause Button**: Pauses the camera temporarily (your video feed stays on)
   - **Red Stop Button**: Completely stops the camera and ends detection

3. **See Your Results**: Any letters the app detects will show up on the right side panel labeled "Detection result".

4. **Start Fresh**: Click the "Clear" button to wipe out all the detected text.

5. **Hear It Spoken**: Click the "Speak" button (you'll see a waveform animation) and the app will read the detected text out loud using computer voice.

### Overview Page

This page introduces the project and explains what it's all about:

- Welcoming introduction section
- Four key features highlighted with nice graphics
- Interactive cards that show what the app can do
- Real-world scenarios where this technology helps
- Privacy information explaining how your data is handled
- Clean, modern look with smooth transitions

### How to Use Page

A detailed guide that walks you through everything step-by-step, includes troubleshooting tips, and shares best practices for getting the best results.

## Project Structure

```
CPE310UI/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Home.tsx            # Main detection page
│   │   ├── Overview.tsx        # Project overview page
│   │   └── HowToUse.tsx        # Instructions page
│   ├── styles/
│   │   ├── Overview.css        # Overview page styles
│   │   └── HowToUse.css        # How to use page styles
│   ├── App.tsx                 # Main app with routing
│   ├── App.css                 # Global application styles
│   ├── index.tsx               # Application entry point
│   ├── index.css               # Base styles
│   └── react-app-env.d.ts      # TypeScript definitions
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## Adding Your Own ML Model

Right now, the app uses fake detection for demonstration. If you want to use a real machine learning model instead:

1. **Install ML libraries** (like TensorFlow.js):
   ```bash
   npm install @tensorflow/tfjs @tensorflow-models/handpose
   ```

2. **Open `App.tsx` and find the `startDetection` function**:
   Replace the simulation code with your actual model inference logic.

3. **Here's where you'd add your model code** (in `App.tsx`):
   ```typescript
   const startDetection = async () => {
     // Load your ML model
     const model = await loadYourModel();
     
     // Process video frames
     const detectFrame = async () => {
       if (videoRef.current && isPlaying && !isPaused) {
         const predictions = await model.predict(videoRef.current);
         // Update detected text based on predictions
         setDetectedText(prev => prev + predictions.letter);
       }
       requestAnimationFrame(detectFrame);
     };
     
     detectFrame();
   };
   ```

## Browser Support

Works great on:
- Chrome/Edge (version 90 or newer)
- Firefox (version 88 or newer)
- Safari (version 14 or newer)
- Opera (version 76 or newer)

**Important**: For the camera to work, you need to either run the app on localhost during development, or deploy it over HTTPS in production.

## Troubleshooting

### Camera Not Working

If the camera won't start:
- Check that you've granted camera permission to your browser
- Make sure you're running on HTTPS (or localhost for development)
- Close any other apps that might be using your camera

### No Sound on Text-to-Speech

If you can't hear the speech:
- Make sure your browser supports the Web Speech API (most modern browsers do)
- Check that your computer volume is up and your browser isn't muted
- You need to have some detected text first - there has to be something for the app to read

## Contributing

Want to help make this better? Feel free to submit a Pull Request with your improvements.

## License

This is part of an academic project for CPE310.

## Acknowledgments

- Design follows modern UI/UX best practices
- Built following React and TypeScript conventions
- Uses standard Web APIs for camera and speech features

---

**© 2025 ML Project. All rights reserved.**

