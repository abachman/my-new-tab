# My New Tab

A simple, clean, custom Chrome new tab page. If you're using the extension from the Chrome app store, all settings [will eventually be] synced across all your devices. (Pull requests welcome!)

This is me playing with `create-react-app`, React, Redux, npm. The whole pile / stack.

![screenshot](https://github.com/abachman/my-new-tab/blob/master/assets/screenshot.png)

[You can find it on the Chrome Web Store here.](https://chrome.google.com/webstore/detail/my-new-tab/gpneodfkmdkgoakeelnklgmcgohmdcpn)

## Developing

Download and install dependencies:

    $ npm install

Run create-react-app in development mode:

    $ npm start

Make changes, be mind boggled!

This process has been tested on macOS 10.14.5, npm 6.9.0, and node 10.14.1.

## Building the Browser Extension

Run make:

    $ make

This creates the `build/` directory and copies manifest.json into it. If you want to load the unpacked extension, point Firefox at `build/`.

Use `make package` to build a .zip file suitable for uploading to the Chrome Web Store. You'll need to generate your own art, though, if you want to go through the whole Chrome extension publishing thing.

## TODO

- [] update settings
- [] bookmarks block

## Distant Future

- [] simple news reading
- [] reminders / todo
- [] sticky notes
