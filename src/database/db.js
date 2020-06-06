// Configurando o banco de dados
// Importar dependência do SQLite3 com o método "verbose"
const sqlite3 = require("sqlite3").verbose()

// Criar objeto que irá fazer operações no banco de dados com o método DataBase
const db = new sqlite3.Database("./src/DataBase/database.db")

// Exportar objeto db
module.exports = db

// Utilizar o objeto de banco de dados nas operações
db.serialize(() => {
//     // Criar tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // Inserir dados
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES(?,?,?,?,?,?,?);
//     `
//     const values = []

//     function afterInsertData(err) {
//         if(err){
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     //db.run(query, values, afterInsertData)

//     // Consultar dados
//     db.all(`SELECT * FROM places`, function(err, rows) {
//         if(err){
//             return console.log(err)
//         }

//         console.log("Aqui estão seus registros")
//         console.log(rows)
//     })

//     // // Deletar dados
//     // db.run(`DELETE FROM places WHERE id = ? `, [numeroDoRegistro], function(err, rows) {
//     //     if(err){
//     //         return console.log(err)
//     //     }

//     //     console.log("Registro deletado com sucesso")
//     // })

})








