const express = require("express");
const sqlite = require("sqlite");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

const dbCon = sqlite.open("banco.sqlite", { Promise });

const init = async () => {
  const db = await dbCon;
  await db.run(
    "CREATE TABLE IF NOT EXISTS contatos(id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER, email TEXT, url_image TEXT, endereco TEXT, contato TEXT);"
  );
};

//init()

//CRUD - ReactJS e React Native
app.get("/", (req, res) => {
  res.send("Início");
});

app.get("/pessoas", async (req, res) => {
  const db = await dbCon;
  const dados = await db.all("SELECT * FROM contatos");
  res.send(JSON.stringify(dados));
});

app.get("/pessoas/:id", async (req, res) => {
  const db = await dbCon;
  let id = req.params.id;
  const dado = await db.get(`SELECT * FROM contatos WHERE id = ${id}`);
  if (dado) {
    res.send(JSON.stringify(dado));
  } else {
    res.send("Id não encontrado");
  }
});

app.post("/pessoas", async (req, res) => {
  let { nome, idade, email, url_image, endereco, contato } = req.body;
  const db = await dbCon;
  await db.get(`INSERT INTO contatos (
					nome, idade, email, url_image, endereco, contato) 
					VALUES (
					'${nome}',
					'${idade}',
					'${email}',
					'${url_image}',
					'${endereco}',
					'${contato}')
				`);
  res.send(req.body);
});

app.delete("/pessoas/:id", async (req, res) => {
  let id = req.params.id;
  const db = await dbCon;
  await db.run(`DELETE FROM contatos WHERE id = ${id}`);
  res.send(`Ùsuario com ${id} foi deletado`);
});

app.put("/pessoas/:id", async (req, res) => {
  let id = req.params.id;
  let { nome, idade, email, url_image, endereco, contato } = req.body;
  const db = await dbCon;
  await db.run(`UPDATE contatos SET 
					nome = '${nome}', 
					idade='${idade}', 
					email='${email}', 
					url_image='${url_image}', 
					endereco='${endereco}', 
					contato='${contato}' 
					WHERE id = ${id}
				`);
  res.send(req.body);
});

app.listen(port, err => {
  if (err) {
    console.log("Erro ao subir o server");
  } else {
    console.log("Server is on port 3000");
  }
});
