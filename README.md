# My New Tab

A simple, clean, custom Chrome new tab page. If you're using the extension from the Chrome app store, all settings [will eventually be] synced across all your devices. (Pull requests welcome!)

This is me playing with `create-react-app`, React, Redux, yarn. The whole pile / stack.

![screenshot](https://github.com/abachman/my-new-tab/blob/master/assets/screenshot.png)

[You can find it on the Chrome Webstore here.](https://chrome.google.com/webstore/detail/my-new-tab/gpneodfkmdkgoakeelnklgmcgohmdcpn)

## Developing

Download and install dependencies:

    $ yarn

Run create-react-app in development mode:

    $ yarn start

Make changes, be mind boggled!


## Building

Run make:

    $ make

This creates the `build/` directory and copies manifest.json into it. If you want to load the unpacked extension, point Chrome at `build/`.


## TODO

- [] update settings
- [] bookmarks block

## Distant Future

- [] simple news reading
- [] reminders / todo
- [] sticky notes
