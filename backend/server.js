import express from "express" // importação do express
import mysql from "mysql"
import cors from "cors"

const app = express() // criação do app

app.use(express.json())
app.use(cors())
//conexão com o banco de dados
const db = mysql.createConnection({ // parâmetros para conexão
  host:"localhost",
  user:"andrey",
  password:"Ka$enshi211202",
  database:"trabUser"
})

// essa parte define que toda vez que visitarmos a nossa homepage do backend, será enviada uma rquisição do
// usuario para o backend e retornada uma mensagem do backend para o usuario 
app.get("/", (req,res) =>{
  res.json("Hello, this is the backend server!")
})

// select em toda a tabela do banco de dados
app.get("/users", (req, res) =>{
  const query = "select * from User" // definindo qual a operação que será feita no banco

  db.query(query, (err, data) =>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/commons", (req, res) =>{
  const type = req.query.type
  const query = "select * from User where type = 0" // definindo qual a operação que será feita no banco

  db.query(query, [type] ,(err, data) =>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/products", (req, res) =>{
  const query = "select * from Product" // definindo qual a operação que será feita no banco

  db.query(query, (err, data) =>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/showforn", (req, res) =>{
  const query = "select * from Fornecedor" // definindo qual a operação que será feita no banco

  db.query(query, (err, data) =>{
    if(err) return res.json(err)
    return res.json(data)
  })
})


// insert na tabela no banco de dados
app.post("/register", (req, res) =>{
  const query = "insert into User(`id`,`name`,`type`,`email`, `password`) values (?)"

  const values = [
    req.body.id,
    req.body.name,
    req.body.type,
    req.body.email,
    req.body.password
  ]
  db.query(query, [values], (err, data) =>{
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post("/registerprod", (req, res) =>{
  const query = "insert into Product(`cod`,`qtd`,`name`,`price`, `type`, `cnpjFornecedor`) values (?)"

  const values = [
    req.body.cod,
    req.body.qtd,
    req.body.name,
    req.body.price,
    req.body.type,
    req.body.cnpjFornecedor
  ]
  db.query(query, [values], (err, data) =>{
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post("/registerforn", (req, res) =>{
  const query = "insert into Fornecedor(`cnpjFornecedor`,`name`,`number`,`registerDate`, `address`) values (?)"

  const values = [
    req.body.cnpjFornecedor,
    req.body.name,
    req.body.number,
    req.body.registerDate,
    req.body.address
  ]
  db.query(query, [values], (err, data) =>{
    if (err) return res.json(err)
    return res.json(data)
  })
})


app.post("/fornecedor", (req, res) => {

  const {cnpjFornecedor} = req.body
  const query = "select * from Fornecedor where cnpjFornecedor = ?"

  db.query(query, [cnpjFornecedor], (err, data) => {
    if(err){
      return res.json(err)
    }
    if (data.length > 0) {
      const fornecedor = data[0];

      // Se você estiver usando hashing de senhas (recomendado), compare a senha
      return res.json({
        message: "Fornecedor cadastrado!",
        fornecedor: fornecedor
      })
      }
      else{
        return res.json("Fornecedor não cadastrado.")
      }
  })
})

// verificacao de id e senha no banco para validar login
app.post("/login", (req, res) => {

  const {id, password} = req.body
  const query = "select * from User where id = ?"

  db.query(query, [id], (err, data) => {
    if(err){
      return res.json(err)
    }

    if (data.length > 0) {
      const user = data[0];

      // Se você estiver usando hashing de senhas (recomendado), compare a senha
      if (user.password === password){
        return res.json({
          message: "Login bem-sucedido!",
          user: user
        })
      }
      else{
        return res.json("Senha incorreta.")
      }
    } else {
      return res.json("Usuário não encontrado.");
    }
  })
})

app.post("/update", (req, res) => {
  const {id, type} = req.body

  const query = "update User set type = 1 where id = ?"

  db.query(query, [id] , (err, data) => {
    if(err){
      return res.json(err)
    }

   return res.json(data)

  })

})

app.post("/updateprod", async (req, res) => {
  const { cod, attribute, value } = req.body;
  const query = `update Product set ${attribute} = ? where cod = ?`;

  try {
    db.query(query, [value, cod]); 
    res.json({ message: "Produto atualizado com sucesso" }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar produto" }); 
  }
});

app.post("/updateforn", async (req, res) => {
  const { cnpjFornecedor, attribute, value } = req.body;
  const query = `update Fornecedor set ${attribute} = ? where cnpjFornecedor = ?`;

  try {
    db.query(query, [value, cnpjFornecedor]); 
    res.json({ message: "Produto atualizado com sucesso" }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar produto" }); 
  }
});

app.get("/mydata" , (req, res) => {
  const {id} = req.body
  const query = "select * from User where id = ?"

  db,query(query, [id], (err, data) =>{
    if(err){
      return res.json(res)
    }

    return res.json(data)
    
  })
})

app.post("/delete", (req, res) =>{
  const {id} = req.body
  const query = "delete from User where id = ?"

  db.query(query, [id], (err, data)=>{
    if (err) return res.json(err)
    
    return res.json('Deletado com sucesso!')
  })
})

app.post("/deleteprod", (req, res) =>{
  const {cod} = req.body
  const query = "delete from Product where cod = ?"

  db.query(query, [cod], (err, data)=>{
    if (err) return res.json(err)
    
    return res.json('Deletado com sucesso!')
  })
})

app.post("/deleteforn", (req, res) =>{
  const {cnpjFornecedor} = req.body
  const query = "delete from Fornecedor where cnpjFornecedor = ?"

  db.query(query, [cnpjFornecedor], (err, data)=>{
    if (err) return res.json(err)
    
    return res.json('Deletado com sucesso!')
  })
})




// conexão com a porta e retorno de uma mensagem
// que confirma a conexão com o 'server.js'
app.listen(8800, ()=>{
  console.log("Connected to backend!")
})

