async function connect() {

    if (global.connection) {
        return global.connection;    //Se já houver uma conexão estabelecida, retorna a conexão existente
    }

    const {Pool} = require('pg');
    const pool = new Pool({
        connectionString:  process.env.CONNECTION_STRING
    });

    const client = await pool.connect();    //Estabelecendo conexão com o banco de dados
    console.log('Connected to the database');

    const res = await client.query('SELECT NOW()');    //Executando uma query para testar a conexão
    console.log(res.rows[0])
    client.release();    //Liberando a conexão

    global.connection = pool //Armazenando a conexão globalmente para ser usada em outros módulos
    return pool; 
}

connect();
