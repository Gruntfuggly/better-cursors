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

                    var selectedText = document.getText();

                    if( hasSelection )
                    {
                        selectionOffset = document.offsetAt( selection.start );
                        selectedText = selectedText.substring( selectionOffset, document.offsetAt( selection.end ) );
                        // range = selection;
                    }

                    selectedText = selectedText.replace( term, function( match, g1, g2, g3 )
                    {
                        var offset = arguments[ arguments.length - 2 ];
                        console.log( "offset:" + offset );
                        var cursorPosition = document.positionAt( offset + selectionOffset );
                        console.log( 100 );
                        editor.selection = new vscode.Selection( cursorPosition, cursorPosition );
                        console.log( 101 );
                        vscode.commands.executeCommand( 'createCursor' );
                        console.log( 102 );
                    } );
                }
            } );
    } ) );
}

function deactivate()
{
}

exports.activate = activate;
exports.deactivate = deactivate;
