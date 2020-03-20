import mysql2 from "mysql2";

let pool = '';

if(process.env.NODE_ENV === 'PRODUCTION'){
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

else if(process.env.NODE_ENV === 'Development'){
    pool = mysql2.createPool({
        host: '162.241.253.36',
        user: 'eddmapco_ad_asc',
        password: 'x4~^uNGgS9v9',
        database: 'eddmapco_asc_web',
        waitForConnections: true,
        connectionLimit: 10,
    })
}


export default pool;