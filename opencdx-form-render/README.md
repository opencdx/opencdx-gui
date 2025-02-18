# OpenCDx Form Render
# About
This is the form render component for the OpenCDx platform. It is a React Native project that allows deployment on both web and mobile platforms.

## Technologies Used
- [React Native](https://reactnative.dev/)
- [Gluestack UI](https://gluestack.io/)
- [Expo](https://expo.dev/)
## Prerequisites
- [NodeJS](https://nodejs.org/en/download/)

Xcode and Android SDK are required if running iOS or Android emulators. Application can also be run on a physical device via Expo Go.

## Getting Started

1. Install the project dependencies using npm:
   
   ```bash
   npm install


2. Start the app

   ```bash
    npm start

3. Follow the interactive shell for opening the app (e.g. type w to open web, i for iOS) or scan the QR code to run on physical device.

Note: For iOS and Android, the application will not be able to connect to the localhost server due to the self signed certificate. Update `REACT_APP_API_HOST` in `api/index.ts` to a deployment with a valid certificate.