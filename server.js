const express = require("express")
const sqlite  = require("sqlite")
const bodyParser = require("body-parser")
const app 	  = express()

app.use(bodyParser.urlencoded({ extended: true }))
const parser = bodyParser.json()

const dbCon = sqlite.open("banco.sqlite", {Promise})

const init = async () => {
	const db = await dbCon
	await db.run("CREATE TABLE IF NOT EXISTS contatos(id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER, email TEXT, url_image TEXT, endereco TEXT, contato TEXT);")
	await db.run("INSERT INTO contatos(nome, idade, email, url_image, endereco, contato) VALUES ('JOsé', 23 ,'jose@gmail.com','user.jpg','Rua C','8899999999');")
}

//init()

app.get('/', (req, res) => {
	res.send("Início")
})

app.get('/pessoas', async (req, res) => {
	const db = await dbCon
	const dados = await db.all("SELECT * FROM contatos")
	res.send(JSON.stringify(dados))
})

app.get('/pessoas/:id', async (req, res) => {
	const db = await dbCon
	let id = req.params.id
	const dado = await db.get(`SELECT * FROM contatos WHERE id = ${id}`)
	if(dado){
		res.send(JSON.stringify(dado))		
	}else{
		res.send("Id não encontrado")
	}

})

app.post('/pessoas', parser, async (req, res) => {
	let { nome, idade, email, url_image, endereco, contato} = req.body
	const db = await dbCon
	await db.get(`INSERT INTO contatos (nome, idade, email, url_image, endereco, contato) VALUES ('${nome}','${idade}','${email}','${url_image}','${endereco}','${contato}')`)
	res.send(req.body)
})


app.listen(3000, (err) => {
	if(err){
		console.log("Erro ao subir o server")
	}else{
		console.log("Server is on port 3000")
	}
})







