const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(cors());
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// MongoDB
const url = 'mongodb://localhost:27017/FatecVotorantim';
mongoose.connect(url)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('Erro na conexão:', err?.message ?? err));

// ===== Schema/Model =====
const AlunoSchema = new mongoose.Schema({
  matricula: { type: String, required: true },
  nome:      { type: String, required: true },
  endereco: {
    cep:         { type: String, default: '' },
    logradouro:  { type: String, default: '' },
    cidade:      { type: String, default: '' },
    bairro:      { type: String, default: '' },
    estado:      { type: String, default: '' },
    numero:      { type: String, default: '' },
    complemento: { type: String, default: '' }
  },
  cursos: [{ type: String }]
}, { timestamps: true });

const Aluno = mongoose.model('Aluno', AlunoSchema);

// ===== Rotas ViaCEP =====
app.get('/viacep/:cep', async (req, res) => {
  try {
    const cep = (req.params.cep || '').replace(/\D/g, '');
    if (cep.length !== 8) return res.status(400).json({ erro: 'CEP inválido (use 8 dígitos).' });

    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await resp.json();

    if (data.erro) {
      return res.status(404).json({ erro: 'CEP não encontrado.' });
    }

    res.json({
      cep: data.cep,
      logradouro: data.logradouro || '',
      bairro: data.bairro || '',
      cidade: data.localidade || '',
      estado: data.uf || ''
    });
  } catch (e) {
    res.status(500).json({ erro: 'Falha ao consultar ViaCEP.' });
  }
});

// ===== CRUD RESTful de Alunos =====

// LISTAR TODOS
app.get('/alunos', async (req, res) => {
  const alunos = await Aluno.find().sort({ createdAt: -1 });
  res.json(alunos);
});

// OBTER POR ID
app.get('/alunos/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });
    res.json(aluno);
  } catch {
    res.status(400).json({ erro: 'ID inválido.' });
  }
});

// CRIAR
app.post('/alunos', async (req, res) => {
  try {
    const novo = await Aluno.create(req.body);
    res.status(201).json(novo);
  } catch (e) {
    res.status(400).json({ erro: 'Dados inválidos para criação.', detalhe: e?.message });
  }
});

// ATUALIZAR
app.put('/alunos/:id', async (req, res) => {
  try {
    const atualizado = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!atualizado) return res.status(404).json({ erro: 'Aluno não encontrado.' });
    res.json(atualizado);
  } catch (e) {
    res.status(400).json({ erro: 'Falha ao atualizar.', detalhe: e?.message });
  }
});

// EXCLUIR
app.delete('/alunos/:id', async (req, res) => {
  try {
    const deletado = await Aluno.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ erro: 'Aluno não encontrado.' });
    res.json({ status: 'deletado com sucesso' });
  } catch {
    res.status(400).json({ erro: 'ID inválido.' });
  }
});

// Subir servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
