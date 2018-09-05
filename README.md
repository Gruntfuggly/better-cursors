# Format On Idle

This a very simple extension that enables formatting of the current file after a period of inactivity.

By default it is enabled for all file extensions (except files without extensions).

When the current file has an extension and an available formatter, a button is displayed in the status bar (a watch with a tick or a cross next to it) indicating if **Format On Idle** is enabled for the current file extension:

<img src="https://raw.githubusercontent.com/Gruntfuggly/formatOnIdle/master/button.png">

Click the button to disable or enable.

Once a file extension has been enabled or disabled, the state is stored in your settings and the extension will no longer be enabled for all file extensions.

## Configuration

Use `formatOnIdle.delay` to change the delay after which the formatting is triggered. The value is specified in milliseconds. The default delay is 1 second.

`formatOnIdle.enabled` can be manually modified to set the state for specific file extensions.

The position of the status bar button can be configured using `formatOnIdle.buttonAlignment` and `formatOnIdle.buttonPriority`.

## Installing

You can install the latest version of the extension via the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.format-on-idle).

### Source Code

The source code is available on GitHub [here](https://github.com/Gruntfuggly/format-on-idle).

## Known Issues

Files without extensions are not considered.

## Credits

Extension icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
