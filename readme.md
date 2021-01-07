# Simple Software Suite Update Server

This suite of programs allow for version control and streamlined logging, settings, and management of a group of software. The update server hosts the static files of each program and allows for version checking and providing file paths to the updated portions of a program. 

## Requirements
This requires NodeJS and has only been tested on version 12.19. The latest version of NodeJS is recommended to use this software. Along with this, all libraries included in the "Packages.json" file are required to run this. Installation of these libraries are included in the installation guide.

## Installation

Download the latest release on GitHub then run the following commands in the downloaded folder:

```bash
npm install
node index.js
```

This will start the server and allow connections from the launcher and updater found above.

## Usage

Open "./app/data/software/" and create a folder (no spaces) titled the name of your program. Drag and drop all the files for this program in the folder. Create a file "ver.txt" and put the program version number in here, such as "1.0.0". This is what the server will compare when checking for updates.

For the initial install of the application, the Simple Software Suite Installer will pull the appropriate files from the server and place it in the correct location. The source for this can be found here:

>[https://github.com/RylanTaylor/Simple-Software-Suite-Installer](https://github.com/RylanTaylor/Simple-Software-Suite-Installer)

After installing, it is recommended to also use the Simple Software Suite Updater and Simple Software Suite Launcher which are already ready for use with this server. These will allow updates to be automatically checked and pushed to a client. Those can be found here:

>[https://github.com/RylanTaylor/Simple-Software-Suite-Updater](https://github.com/RylanTaylor/Simple-Software-Suite-Updater)

>[https://github.com/RylanTaylor/Simple-Software-Suite-Launcher](https://github.com/RylanTaylor/Simple-Software-Suite-Launcher)
 
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is under the MIT license, please refer to the "LICENSE" file for additional information.