const {Pool} = require('pg');
const http = require("http");

const PORT = 5000;

//Replace with your data
const pool = new Pool({
    "host": "localhost",
    "user": "postgres",
    "port": 5432,
    "password": "test",
    "database": "mydatadb",
    "max": 20,
    "connectionTimeoutMillis": 0,
    "idleTimeoutMillis": 0
})

const server = http.createServer(async (req, res) => {
    //Route to get all data
    if (req.url === '/' && req.method === "GET") {
        const results = await pool.query(`SELECT * FROM data`);
        return res.end(JSON.stringify(results.rows));
    }

    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
