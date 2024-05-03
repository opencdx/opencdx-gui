# OpenCDx

## Repository Name: [opencdx/opencdx-gui](https://github.com/opencdx/opencdx-gui)

## Software Used
- Node: 20
- Git
- Xcode (if running iOS emulator)
- Android SDK (if running Android emulator)
- Docker (if deploying image)

ℹ️ Specific version not required, but the latest version is recommended.

## Description

OpenCDX is a platform for the management of clinical data exchange. It is designed to be a secure, scalable, and interoperable platform for the exchange of clinical data.

## Modules

- [OpenCdx Dashboard](opencdx-dashboard/README.md)
- [OpenCdx Form Render](opencdx-form-render/README.md)

## Required Software
- [Git](https://git-scm.com/downloads): Git is a distributed version control system that enables developers to track changes in source code during software development. It allows for collaborative work, branching, and merging code efficiently.
- [Node.js](https://nodejs.org/en/download/): Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to run JavaScript code outside of a web browser. It is commonly used for building server-side applications and command-line tools.

## Optional Software
- [Docker Desktop](https://www.docker.com/products/docker-desktop): Docker Desktop is an application for MacOS and Windows machines that enables developers to build and share containerized applications and microservices. It provides an easy-to-use interface for managing Docker containers, images, networks, and volumes.
- [Android Studio](https://developer.android.com/studio): For managing the Android SDK and device emulators
- [Xcode](https://developer.apple.com/xcode/): For managing iOS device emulators

## Deployment Procedures (Docker)

It is recommended to run the two UI modules locally. Please refer to the README in the repective module folders [OpenCdx Dashboard](opencdx-dashboard/README.md) and [OpenCdx Form Render](opencdx-form-render/README.md).

The following is for deploying the dashboard to Docker.

1. Run the command "chmod 755 deploy.sh" in the root directory.
2. Run the command "./deploy.sh --deploy" in the root directory of the repository.
> This will run a full build, test, docker image generation and deployment of all services to docker desktop.
3. Once successfully deployed you will receive a menu like this:
> OpenCDX Deployment Menu:
> 
> 1. Build Docker Image                     
> 2. Start Docker (All Services)             
> 3. Start Docker (Custom)                   
> 4. Stop Docker                             
> 5. OpenCDX Dashboard                
>
> Enter your choice (x to Exit):

4. At this time you can select any of the options to interact with the deployed services.  For example, to open the admin dashboard, select option 5 and press enter.

### Build Docker Image
This will build the docker image for all services, based on the current build of code in the repository.

### Start Docker (All Services / Custom)
This will allow you to select which images to build, and then start the docker containers for the selected services, plus any required services.

### Stop Docker
This will stop the OpenCDX Docker Container.

### Deploy parameters
For the latest command line options please use:

`./deploy.sh --help`

Below are a few of the more common options to run:

### Build Only
To build the project without deploying, use the following command:

`./deploy.sh`
### Build and Deploy
To build and deploy the project, use the following command:

`./deploy.sh --deploy`
### Build / Deploy / Test
To build, deploy and test the project, use the following command:

### Skip Build jump to Menu
To skip the build and jump to the deployment menu, use the following command:

`./deploy.sh --skip`


### Accessing
1. Open OpenCDX Dashboard: [https://localhost:3005](https://localhost:3005) or option 5 from the deployment menu.

## Support Team

[Avengers (cs@safehealth.me)](mailto:cs@safehealth.me)
