// npm : gerenciador de pacotes 
// npm init -y : cria o arquivo package.json com a descrição do projeto
// npm install express : dependência ....
// também cria o arquivo package-lock.json que faz o mapeamento das dependências. Subir este arquivo no git ao invés da pasta "node_modules"

// Ao fazer alterações no servidor é necessário desligá-lo e ligá-lo novamente. Para fazer isso há um módulo chamado nodemon

const express = require("express")
const server = express()
// acrescentar nos scripts do arquivo package.json: "start": "nodemon scr/server.js"
// com isso, ao invés de iniciar o servidor com 'node src/server.js', basta digitar 'npm start'

// Pegar o banco de dados
const db = require("./database/db")

// Configurar pasta pública
server.use(express.static("public"))

// Habilitar o uso do req.body na apicação
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Configurando caminhos da aplicação
// Página inicial (index.html)
// req: requisição; res: resposta
server.get("/", function (req, res) {
    return res.render("index.html") //send envia de volta a resposta para a página; render renderiza a página
})

// Cadastro do ponto de coleta (create-point.html)
server.get("/create-point", function (req, res) {
    // req.query: Query strings da url
    // console.log(req.query)
    return res.render("create-point.html") 
})

server.post("/savepoint", function (req, res) {
    // req.body: o corpo do formulário
    // Inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items        
    ]

    function afterInsertData(err) {
        if(err){
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true }) 
    }

    db.run(query, values, afterInsertData)
})

// Resultado da pesquisa (search-results.html)
server.get("/search-results", function (req, res) {
    const search = req.query.search
    
    if (search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }
    
    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total }) 
    })
})

//ligar o servidor
server.listen(3000)

// nunjucks: template engine : trabalha com arquivos html de uma maneira inteligente, transformando-os em arquivos dinâmicos