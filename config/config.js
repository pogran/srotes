let config;

if(process.env.prod) {
    config = {
        SERVER_API : 'http://localhost:3001'
    }
} else {
    config = {
        SERVER_API : 'http://localhost:3001'
    }
}



export default config;