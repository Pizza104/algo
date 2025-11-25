const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
 
// Inicializa o Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://algo-4e1ac-default-rtdb.firebaseio.com/" 
});
 
const db = admin.database();
const app = express();
const port = process.env.PORT || 3000;
 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
 
// Rotas de Navegação
app.get('/', (req, res) => {
  res.render('index');
});
 
app.get('/integrantes', (req, res) => {
  res.render('integrantes');
});
 
// 📚 ROTAS PARA PROFESSORES
app.get('/professores', async (req, res) => {
  try {
    const snapshot = await db.ref('professores').once('value');
    const professores = snapshot.val() || {};
    const professoresArray = Object.keys(professores).map(key => {
      return {
        id: key,
        ...professores[key]
      };
    });
    res.render('professores', { professores: professoresArray });
  } catch (error) {
    res.status(500).send('Erro ao carregar professores');
  }
});
 
app.get('/professores/novo', (req, res) => {
  res.render('editar-professor', { professor: null, id: null });
});
 
app.post('/professores/salvar', async (req, res) => {
  const { id, nome, disciplina } = req.body;
  try {
    if (id) {
      // Editar
      await db.ref(`professores/${id}`).update({ nome, disciplina });
    } else {
      // Novo
      await db.ref('professores').push({ nome, disciplina });
    }
    res.redirect('/professores');
  } catch (error) {
    res.status(500).send('Erro ao salvar professor');
  }
});
 
app.get('/professores/editar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const snapshot = await db.ref(`professores/${id}`).once('value');
    const professor = snapshot.val();
    res.render('editar-professor', { professor, id });
  } catch (error) {
    res.status(500).send('Erro ao carregar professor');
  }
});
 
app.post('/professores/excluir/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.ref(`professores/${id}`).remove();
    res.redirect('/professores');
  } catch (error) {
    res.status(500).send('Erro ao excluir professor');
  }
});
 
// 📚 ROTAS PARA CURSOS
app.get('/cursos', async (req, res) => {
  try {
    const snapshot = await db.ref('cursos').once('value');
    const cursos = snapshot.val() || {};
    const cursosArray = Object.keys(cursos).map(key => {
      return {
        id: key,
        ...cursos[key]
      };
    });
    res.render('cursos', { cursos: cursosArray });
  } catch (error) {
    res.status(500).send('Erro ao carregar cursos');
  }
});
 
app.get('/cursos/novo', (req, res) => {
  res.render('editar-curso', { curso: null, id: null });
});
 
app.post('/cursos/salvar', async (req, res) => {
  const { id, nome, duracao } = req.body;
  try {
    if (id) {
      await db.ref(`cursos/${id}`).update({ nome, duracao });
    } else {
      await db.ref('cursos').push({ nome, duracao });
    }
    res.redirect('/cursos');
  } catch (error) {
    res.status(500).send('Erro ao salvar curso');
  }
});
 
app.get('/cursos/editar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const snapshot = await db.ref(`cursos/${id}`).once('value');
    const curso = snapshot.val();
    res.render('editar-curso', { curso, id });
  } catch (error) {
    res.status(500).send('Erro ao carregar curso');
  }
});
 
app.post('/cursos/excluir/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.ref(`cursos/${id}`).remove();
    res.redirect('/cursos');
  } catch (error) {
    res.status(500).send('Erro ao excluir curso');
  }
});
 
// 📚 ROTAS PARA ALUNOS
app.get('/alunos', async (req, res) => {
  try {
    const snapshot = await db.ref('alunos').once('value');
    const alunos = snapshot.val() || {};
    const alunosArray = Object.keys(alunos).map(key => {
      return {
        id: key,
        ...alunos[key]
      };
    });
    res.render('alunos', { alunos: alunosArray });
  } catch (error) {
    res.status(500).send('Erro ao carregar alunos');
  }
});
 
app.get('/alunos/novo', (req, res) => {
  res.render('editar-aluno', { aluno: null, id: null });
});
 
app.post('/alunos/salvar', async (req, res) => {
  const { id, nome, matricula } = req.body;
  try {
    if (id) {
      await db.ref(`alunos/${id}`).update({ nome, matricula });
    } else {
      await db.ref('alunos').push({ nome, matricula });
    }
    res.redirect('/alunos');
  } catch (error) {
    res.status(500).send('Erro ao salvar aluno');
  }
});
 
app.get('/alunos/editar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const snapshot = await db.ref(`alunos/${id}`).once('value');
    const aluno = snapshot.val();
    res.render('editar-aluno', { aluno, id });
  } catch (error) {
    res.status(500).send('Erro ao carregar aluno');
  }
});
 
app.post('/alunos/excluir/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.ref(`alunos/${id}`).remove();
    res.redirect('/alunos');
  } catch (error) {
    res.status(500).send('Erro ao excluir aluno');
  }
});
 
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
