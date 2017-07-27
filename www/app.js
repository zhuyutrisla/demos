requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-3.2.1.min'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/index']);