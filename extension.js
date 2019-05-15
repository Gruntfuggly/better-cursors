var vscode = require( 'vscode' );

function activate( context )
{
    var lastTerm = context.workspaceState.get( 'last-term' );
    console.log( "lastTerm :" + lastTerm );
    var previousCursors = [];

    function updateLastTerm( term )
    {
        lastTerm = term;
        context.workspaceState.update( 'last-term', lastTerm );
    }

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.enterSearchTerm', function()
    {
        vscode.window.showInputBox( { prompt: "Create cursors at every:", value: lastTerm } ).then(
            function( term )
            {
                if( term )
                {
                    updateLastTerm( term );

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


    function positionCursors( prompt, select, method )
    {
        function getSearchScope( document, selection )
        {
            var scope = vscode.workspace.getConfiguration( 'better-cursors' ).get( 'scope' );
            if( scope === "line" )
            {
                return document.lineAt( selection.start );
            }
            else if( scope === "document" )
            {
                var text = document.getText();
                var range = new vscode.Range( document.positionAt( 0 ), document.positionAt( text.length - 1 ) );
                return { text: text, range: range };
            }
        }

        function positionCursorsWithTerm( term )
        {
            if( term )
            {
                var editor = vscode.window.activeTextEditor;

                updateLastTerm( term );
                previousCursors.push( editor.selections );

                var newSelections = [];

                editor.selections.map( function( selection )
                {
                    var document = editor.document;
                    var searchScope = getSearchScope( document, selection );
                    var scopeOffset = document.offsetAt( searchScope.range.start );
                    var cursorOffset = document.offsetAt( selection.start );
                    var position = method( searchScope.text, cursorOffset - scopeOffset, term );
                    if( position !== -1 )
                    {
                        var stop = document.positionAt( scopeOffset + position );
                        var start = term.length > 1 ? document.positionAt( scopeOffset + position + term.length ) : stop;
                        if( select )
                        {
                            newSelections.push( new vscode.Selection( selection.start, start ) );
                        }
                        else
                        {
                            newSelections.push( new vscode.Selection( start, stop ) );
                        }
                    }
                } );

                if( newSelections.length > 0 )
                {
                    editor.selections = newSelections;
                }
            }
        }

        if( prompt || lastTerm === undefined )
        {
            vscode.window.showInputBox( { prompt: "Move cursors to " + prompt + ":", value: lastTerm } ).then(
                function( term )
                {
                    positionCursorsWithTerm( term );
                }
            )
        }
        else
        {
            positionCursorsWithTerm( lastTerm );
        }
    }

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.moveCursorsToNext', function()
    {
        positionCursors( "next", false, function( text, offset, term )
        {
            var position = text.substr( offset + 1 ).indexOf( term )
            return position === -1 ? position : offset + 1 + position;
        } );
    } ) );

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.moveCursorsToNextSelect', function()
    {
        positionCursors( "next", true, function( text, offset, term )
        {
            var position = text.substr( offset + 1 ).indexOf( term )
            return position === -1 ? position : offset + 1 + position;
        } );
    } ) );

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.moveCursorsToPrevious', function()
    {
        positionCursors( "previous", false, function( text, offset, term )
        {
            return text.substr( 0, offset - 1 ).lastIndexOf( term );
        } );
    } ) );

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.moveCursorsToPreviousSelect', function()
    {
        positionCursors( "previous", true, function( text, offset, term )
        {
            return text.substr( 0, offset - 1 ).lastIndexOf( term );
        } );
    } ) );

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.moveCursorsToFirst', function()
    {
        positionCursors( "first", false, function( text, offset, term )
        {
            return text.indexOf( term );
        } );
    } ) );

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.moveCursorsToLast', function()
    {
        positionCursors( "last", false, function( text, offset, term )
        {
            return text.lastIndexOf( term );
        } );
    } ) );

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.moveCursorsToSameNext', function()
    {
        positionCursors( undefined, false, function( text, offset, term )
        {
            var position = text.substr( offset + 1 ).indexOf( term )
            return position === -1 ? position : offset + 1 + position;
        } );
    } ) );

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.moveCursorsToSamePrevious', function()
    {
        positionCursors( undefined, false, function( text, offset, term )
        {
            return text.substr( 0, offset - 1 ).lastIndexOf( term );
        } );
    } ) );

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.moveCursorsToSameFirst', function()
    {
        positionCursors( undefined, false, function( text, offset, term )
        {
            return text.indexOf( term );
        } );
    } ) );

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.moveCursorsToSameLast', function()
    {
        positionCursors( undefined, false, function( text, offset, term )
        {
            return text.lastIndexOf( term );
        } );
    } ) );

    context.subscriptions.push( vscode.commands.registerCommand( 'better-cursors.restorePreviousCursors', function()
    {
        var editor = vscode.window.activeTextEditor;
        if( previousCursors.length > 0 )
        {
            editor.selections = previousCursors.pop();
        }
        else
        {
            vscode.window.showInformationMessage( "No previous cursors" );
        }
    } ) );
}

function deactivate()
{
}

exports.activate = activate;
exports.deactivate = deactivate;
