var vscode = require( 'vscode' );

function activate( context )
{
    context.subscriptions.push( vscode.commands.registerCommand( 'create-cursors-in-selection.enterSearchTerm', function()
    {
        vscode.window.showInputBox( { prompt: "Create cursors at every:" } ).then(
            function( term )
            {
                if( term )
                {
                    var editor = vscode.window.activeTextEditor;
                    var selection = editor.selection;

                    var s = selection.start;
                    var e = selection.end;

                    var hasSelection = s.line !== e.line || s.character !== e.character;

                    var document = editor.document;

                    var selectionOffset = 0;
                    var selectedText = document.getText();

                    if( hasSelection )
                    {
                        selectionOffset = document.offsetAt( selection.start );
                        selectedText = selectedText.substring( selectionOffset, document.offsetAt( selection.end ) );
                    }

                    var newSelections = [];

                    var pattern = new RegExp( term, 'gm' );

                    selectedText = selectedText.replace( pattern, function( match, offset )
                    {
                        var stop = document.positionAt( offset + selectionOffset );
                        var start = match.length > 1 ? document.positionAt( offset + selectionOffset + match.length ) : stop;
                        newSelections.push( new vscode.Selection( start, stop ) );
                    } );

                    editor.selections = newSelections;
                }
            } );
    } ) );
}

function deactivate()
{
}

exports.activate = activate;
exports.deactivate = deactivate;
