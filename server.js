const express = require("express")
const dados = require("./dados.json")
const app = express()

app.get('/', (req, res) => {
	res.send("Início")
})

app.get('/pessoas', (req, res) => {
	res.send(JSON.stringify(dados))
})

app.get('/pessoas/:id', (req, res) => {
	let id = req.params.id - 1
	let dado = dados[id]

	if(dados[id]){
		res.send(JSON.stringify(dado))
	}else{
		res.send("O Id não corresponde a nenhum usuario")
	}
	
})


app.listen(3000, (err) => {
	if(err){
		console.log("Erro ao subir o server")
	}else{
		console.log("Server is on port 3000")
	}
})







