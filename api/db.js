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

//Avisos
//Função para selecionar todos os avisos do banco de dados
async function selectNotices(){
    const client = await connect();
    const res = await client.query('SELECT * FROM avisos') 
    return res.rows;
    client.release();    //Liberando a conexão
}

//Inserir um novo aviso no banco de dados
async function insertNotices(notice){
    const client = await connect();
    const sql = 'INSERT INTO avisos (titulo, conteudo, autor_id, disciplina_id) VALUES ($1, $2, $3, $4)';
    const res = await client.query(sql, [notice.titulo, notice.conteudo, notice.autor_id, notice.disciplina_id]);
    client.release();
}



module.exports = {
    selectNotices,
    insertNotices
}
