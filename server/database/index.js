import mysql2 from "mysql2";

let pool = '';

if(process.env.NODE_ENV === 'DEVELOPMENT'){
    let pool = mysql2.createPool({
        host: 'https://www.bluehost.com/',
        user: 'eddmapco_ad_asc',
        database: 'eddmapco_asc_web',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
}

else if(process.env.NODE_ENV === 'TEST'){
    let pool = mysql2.createPool({
        host: 'localhost',
  user: 'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
    })

}

else if(process.env.NODE_ENV === 'PRODUCTION'){
    let pool = mysql2.createPool({
        host: 'localhost',
        user: 'root',
        database: 'test',
        waitForConnections: true,
        connectionLimit: 10,
    })
}


export default pool;