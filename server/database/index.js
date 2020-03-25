import mysql2 from "mysql2";
import "dotenv/config";

let pool = '';

if(process.env.NODE_ENV === 'DEVELOPMENT'){
    pool = mysql2.createPool({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'asc_web_database',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
}

else if(process.env.NODE_ENV === 'TEST'){
    pool = mysql2.createPool({
        host: 'localhost',
        user: 'root',
        database: 'test',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })

}

else if(process.env.NODE_ENV === 'PRODUCTION'){
    pool = mysql2.createPool({
        host: process.env.PRD_DATABASE_HOST,
        user: process.env.PRD_DATABASE_USER,
        password: process.env.PRD_DATABASE_PASSWORD,
        database: process.env.PRD_DATABASE_SCHEMA,
        waitForConnections: true,
        connectionLimit: 10,
    })
}


export default pool;