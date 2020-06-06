// npm : gerenciador de pacotes 
// npm init -y : cria o arquivo package.json com a descrição do projeto
// npm install express : dependência ....
// também cria o arquivo package-lock.json que faz o mapeamento das dependências. Subir este arquivo no git ao invés da pasta "node_modules"

// Ao fazer alterações no servidor é necessário desligá-lo e ligá-lo novamente. Para fazer isso há um módulo chamado nodemon

const express = require ("express")
const server = express()
// acrescentar nos scripts do arquivo package.json: "start": "nodemon scr/server.js"
// com isso, ao invés de iniciar o servidor com 'node src/server.js', basta digitar 'npm start'

// Configurando pasta pública
server.use(express.static("public"))

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
    return res.render("create-point.html") 
})

// Resultado da pesquisa (search-results.html)
server.get("/search-results", function (req, res) {
    return res.render("search-results.html") 
})

//ligar o servidor
server.listen(3000)

// nunjucks: template engine : trabalha com arquivos html de uma maneira inteligente, transformando-os em arquivos dinâmicos