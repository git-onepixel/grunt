require.config({
    baseUrl: 'src/',
    paths: {
        'A': 'a',
        'B': 'b',
    }
});

require(["B"], function(B) {})