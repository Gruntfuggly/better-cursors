# Create Cursors In Selection

Select some text, press F1, choose 'Create Cursors In Selection' and enter the character (or characters) where you want to create cursors.

### Commands

`Create Cursors In Selection` - prompts for some text to find in the selection and creates cursors at all locations.

`Move Cursors To Next` - prompts for some text and moves all cursors to the next instance on the line of the that text 

`Move Cursors To Previous` - prompts for some text and moves all cursors to the previous instance on the line of the that text 

`Move Cursors To First` - prompts for some text and moves all cursors to the first instance on the line of the that text 

`Move Cursors To Last` - prompts for some text and moves all cursors to the last instance on the line of the that text 

`Restore Previous Cursors` - restores the previous set of cursors (after a move command)

#### Notes:

- When creating cursors, if there is no selection, the whole document will be used.
- If there are no previous or next instances of the text on a line, the cursor will be removed.
- If there are no instances found on any line, the cursors won't be changed.

## Installing

You can install the latest version of the extension via the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.create-cursors-in-selection).

### Source Code

The source code is available on GitHub [here](https://github.com/Gruntfuggly/create-cursors-in-selection).

## Credits

Icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>