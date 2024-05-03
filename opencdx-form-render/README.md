# OpenCDx Form Render

This project was initialized using [Expo Go Quickstart for React Native](https://reactnative.dev/docs/environment-setup) with [gluestack](https://gluestack.io/) added.


## Build & Deployment Procedures
### Prerequisites
1. [Node.js](https://nodejs.org/en/download/) installed
2. If running on iOS emulator, [Xcode](https://developer.apple.com/xcode/) installed
3. If running on Android emulator, [Android Studio](https://developer.android.com/studio) installed. Once installed, open Android Studio and click the three dots on the top right for More Actions. Use the SDK Manager to download the latest numbered API level (e.g. 14). Then use the Device Manager under More Actions to create a device emulator.
4. If running on physical device, [Expo Go](https://expo.dev/go) installed on the device

### Running locally
1. Run `npm install`
2. Run `npm start`
3. Follow on screen prompts to open in Android, iOS, web, or on a physical device.

## Using form render
OpenCDx backend services are required for auth and submitting questionnaire responses (IAM and questionnaire services). After logging in, a list of questionnaire saved from the OpenCDx form builder will be displayed. Selecting one will allow the form to be displayed and allow users to enter and submit the questionnaire.