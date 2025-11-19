const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
 
const serviceAccount = {
    "type": "service_account",
    "project_id": "algo-4e1ac",
    "private_key_id": "ccdd66c88320488b2a23c1fa3a469e9ce66e032e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcy97PnEiuP9AI\nSdMmVv+R0z8KaejuMq68TQkZAFHCh3/fmRa5KApIQLXK4dm2lm2znCIs4k6tPezQ\nKIwbLTuwxyDKK49b/+BSPZIz0mfOX0VkGKlWzF6cWbMxLpa0LF0dJ4/hONoRFGcp\nMIQRwDKMuu/HUiKT/wP1h9VaME8UX3noedLlXT4Ik6UIipmjJaUJ/gr9Pmc3a2iR\nf1lmeUASupi12bDgyVXd5xkSSUfRXiVKv6Rsqu7KjYrjvGLk+Vo41BAoUDXzQIbE\nWpK9HNbh9rVCmP1pVX+2UfyMjWHdTViUGn2w5Wp5ow+hbhYu0GscE3EufH8XxKDe\nZ0DgHinXAgMBAAECggEACyBQ4YhgFzvK+Wfy9nci2M/a2OT+YmZ2bLG7GCHufM2E\nMZnOzdTJM9vi7U7VQECzVX40MKvUyCEbOmAYs1PjsqROMDHivwGVZb+Jiwf6yCj/\n36voeKHC0MEqaPuOh5TGum3gb7qELqEnE6nItfZH9dSDubkXWfrbUbefFjTh/0Y6\ncA/FZhJvXPyM06KowmS2fk6qyujlNSju3E8Q1RQKn37oEX23BxkKnDfU1lgdrr5M\ny88qIqWe/1msywgXxSLz9/DUEMG9vi0NQKa6zIUfpLH84lMYiEkosX8piZP5Ln0V\n7ji1ehGlxoOSx5MwfqzQlEcveA/kt1748X6Hzw1FdQKBgQDzlFO52MsrMvMYfzzz\nZhj9qV2AzI/j8zpOiF2FXRu0eyPpSgk2UeqreI4A3jVAWT9rtycFFjJlyxkhZXTi\noBrHfGNAoJ4L0TuEmTdAnMXYwXuml+2Hfu3Vbsfyv6D4c7G+Ejy7rh4tc5H547u2\nbBpPAG+9WTxPIxjjCX2cKXZ9FQKBgQDoDiJ/EtzEKSiRLEiySc2aPJumA0fo7Pln\ndNkHYWVR9JFou8o8tskjdRaofN7PyL00lm24lYzBgo+5yO/iJ76W2kzrd+XAj6UC\nWLgoSVoybRiawSa5SYDmCHOYLj7K0M0Q0C+3fFqmKbx9t/aBkYqkTFahotYpRM8Q\nn1m1pQN+OwKBgGKP950xO2z8jd+wxOIcwyoJmXtfyy3LIyHaDjXD6k0KswpYWgfv\n98xw2M1DHTsvofkdQJ3PUI9eMooP+s8lSBDGpYbmN23CuZm7Qd9UUL6X9EgCHCyC\n0QxXanMw1ZsTfa3SxV6QY0ezBzOd0jxL3A1xuMVe0YeYRR7BnWFOadLNAoGADLNx\nWekrYiUqjj+RPwjhEvcMQdreHbaStAHmOwwuonyzVLsqh4Ytnh4zfkdPXqoLCQzO\ntpKg4JqHyVBhKMyqFtGd8ileztpN2sIGWlYhdK8Z8KZvuyZ1wqFlykeFsk4ZWzk5\n014gDAYuxebCvDa+Et4Gw9QIyrt0ZeGC5HlCpq8CgYEAzS18BjbKj4ui0vKJIfee\nxPmrMDd2cWTPePNGR/S7amYscrA5yLolvHE11sQDb+sUS+C1gMnD2oYap0SvYIFN\ndKaliFwQqAo1omDwwexLJ0y2yAa1ZHaEIz/fH3A5SMpCmc59IId+/gToQfFdr2UF\nL0EtJdEsbINaBLi1sBhN3Hs=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@algo-4e1ac.iam.gserviceaccount.com",
    "client_id": "113410034731251135318",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40algo-4e1ac.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }  
 
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
 
// Aqui onde ficariam as rotas de navegação
app.get('/', (req, res) => {
  res.render('index');
});
 
app.get('/integrantes', (req, res) => {
  res.render('integrantes');
});
 

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
    console.error('Erro ao carregar professores:', error);
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
    
      await db.ref(`professores/${id}`).update({ nome, disciplina });
    } else {

      await db.ref('professores').push({ nome, disciplina });
    }
    res.redirect('/professores');
  } catch (error) {
    console.error('Erro ao salvar professor:', error);
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
    console.error('Erro ao carregar professor:', error);
    res.status(500).send('Erro ao carregar professor');
  }
});
 
app.post('/professores/excluir/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.ref(`professores/${id}`).remove();
    res.redirect('/professores');
  } catch (error) {
    console.error('Erro ao excluir professor:', error);
    res.status(500).send('Erro ao excluir professor');
  }
});
 
// As rotas do curso
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
    console.error('Erro ao carregar cursos:', error);
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
    console.error('Erro ao salvar curso:', error);
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
    console.error('Erro ao carregar curso:', error);
    res.status(500).send('Erro ao carregar curso');
  }
});
 
app.post('/cursos/excluir/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.ref(`cursos/${id}`).remove();
    res.redirect('/cursos');
  } catch (error) {
    console.error('Erro ao excluir curso:', error);
    res.status(500).send('Erro ao excluir curso');
  }
});
 
// Rota dos alunos 
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
    console.error('Erro ao carregar alunos:', error);
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
    console.error('Erro ao salvar aluno:', error);
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
    console.error('Erro ao carregar aluno:', error);
    res.status(500).send('Erro ao carregar aluno');
  }
});
 
app.post('/alunos/excluir/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.ref(`alunos/${id}`).remove();
    res.redirect('/alunos');
  } catch (error) {
    console.error('Erro ao excluir aluno:', error);
    res.status(500).send('Erro ao excluir aluno');
  }
});
 
app.listen(port, () => {
  console.log(` Parabéns você conseguiy rodar o meu servidor; ${port}`);
  console.log(` Só acessar esse link: http://localhost:${port}`);
});
 