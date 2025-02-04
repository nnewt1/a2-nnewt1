const http = require( "node:http" ),
    fs   = require( "node:fs" ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you're testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.
    mime = require( "mime" ),
    dir  = "public/",
    port = 3000

const appdata = [
    { "model": "toyota", "year": 1999, "mpg": 23 },
    { "model": "honda", "year": 2004, "mpg": 30 },
    { "model": "ford", "year": 1987, "mpg": 14}
]

// let fullURL = ""
const server = http.createServer( function( request,response ) {
    if( request.method === "GET" ) {
        handleGet( request, response )
    }else if( request.method === "POST" ){
        handlePost( request, response )
    }

    // The following shows the requests being sent to the server
    fullURL = `http://${request.headers.host}${request.url}`
    console.log( fullURL );
})

const handleGet = function( request, response ) {
    const filename = dir + request.url.slice( 1 )

    if( request.url === "/" ) {
        sendFile( response, "public/index.html" )
    }else{
        sendFile( response, filename )
    }
}

const handlePost = function( request, response ) {
    let dataString = ""

    request.on( "data", function( data ) {
        dataString += data
    })

    request.on( "end", function() {
        console.log( JSON.parse( dataString ) )
        let newdata = JSON.parse( dataString )

        // ... do something with the data here and at least generate the derived data

        // Priority field to be derived from the deadline (compares the date value of deadline to today's date)
        // If deadline is within 1 day or less, priority is high, 2 days medium, 3 days or more low
        // How to get deadline from dataString?
        // How to update the data being posted?
        let priority = function() {
            let today = new Date();
            let deadline = new Date(newdata.deadline);
            console.log(today);
            console.log(deadline);
            let diff = deadline - today;
            console.log(diff);
            if (diff <= 86400000) {
                return "High";
            } else if (diff <= 172800000) {
                return "Medium";
            }
            return "Low";
        }

        newdata.priority = priority()

        console.log(newdata)

        response.writeHead( 200, "OK", {"Content-Type": "application/json" })
        response.end(JSON.stringify(newdata))
    })
}

const sendFile = function( response, filename ) {
    const type = mime.getType( filename )

    fs.readFile( filename, function( err, content ) {

        // if the error = null, then we've loaded the file successfully
        if( err === null ) {

            // status code: https://httpstatuses.com
            response.writeHeader( 200, { "Content-Type": type })
            response.end( content )

        } else {

            // file not found, error code 404
            response.writeHeader( 404 )
            response.end( "404 Error: File Not Found" )

        }
    })
}

// process.env.PORT references the port that Glitch uses
// the following line will either use the Glitch port or one that we provided
server.listen( process.env.PORT || port )

