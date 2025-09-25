import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

/* ===================== COMPONENTES FORA DO APP ===================== */

function Lista({ alunos, onVer, onEditar, onExcluir, onNovo, styles }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alunos</Text>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item._id ?? String(Math.random())}
        contentContainerStyle={{ gap: 10, padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardSub}>Matrícula: {item.matricula}</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.btn} onPress={() => onVer(item)}>
                <Text style={styles.btnText}>Ver</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => onEditar(item)}>
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btnDanger]}
                onPress={() => onExcluir(item._id)}
              >
                <Text style={styles.btnText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#777', marginTop: 24 }}>
            Nenhum aluno cadastrado.
          </Text>
        }
      />

      <View style={{ padding: 16 }}>
        <Button title="Adicionar Aluno" onPress={onNovo} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

function Form({ form, setForm, onChangeCep, onSalvar, onCancelar, styles }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{form._id ? 'Editar Aluno' : 'Novo Aluno'}</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Matrícula"
          style={styles.input}
          value={form.matricula}
          onChangeText={(v) => setForm((prev) => ({ ...prev, matricula: v }))}
        />
        <TextInput
          placeholder="Nome"
          style={styles.input}
          value={form.nome}
          onChangeText={(v) => setForm((prev) => ({ ...prev, nome: v }))}
        />

        <Text style={styles.section}>Endereço</Text>
        <TextInput
          placeholder="CEP (8 dígitos)"
          keyboardType="numeric"
          style={styles.input}
          value={form.endereco.cep}
          onChangeText={onChangeCep}
          maxLength={9}
        />
        <TextInput
          placeholder="Logradouro"
          style={styles.input}
          value={form.endereco.logradouro}
          onChangeText={(v) =>
            setForm((prev) => ({
              ...prev,
              endereco: { ...prev.endereco, logradouro: v },
            }))
          }
        />
        <TextInput
          placeholder="Número"
          style={styles.input}
          value={form.endereco.numero}
          onChangeText={(v) =>
            setForm((prev) => ({
              ...prev,
              endereco: { ...prev.endereco, numero: v },
            }))
          }
        />
        <TextInput
          placeholder="Bairro"
          style={styles.input}
          value={form.endereco.bairro}
          onChangeText={(v) =>
            setForm((prev) => ({
              ...prev,
              endereco: { ...prev.endereco, bairro: v },
            }))
          }
        />
        <TextInput
          placeholder="Cidade"
          style={styles.input}
          value={form.endereco.cidade}
          onChangeText={(v) =>
            setForm((prev) => ({
              ...prev,
              endereco: { ...prev.endereco, cidade: v },
            }))
          }
        />
        <TextInput
          placeholder="Estado (UF)"
          style={styles.input}
          value={form.endereco.estado}
          onChangeText={(v) =>
            setForm((prev) => ({
              ...prev,
              endereco: { ...prev.endereco, estado: v },
            }))
          }
        />
        <TextInput
          placeholder="Complemento"
          style={styles.input}
          value={form.endereco.complemento}
          onChangeText={(v) =>
            setForm((prev) => ({
              ...prev,
              endereco: { ...prev.endereco, complemento: v },
            }))
          }
        />

        <Text style={styles.section}>Cursos (separe por vírgula)</Text>
        <TextInput
          placeholder="Ex.: Front-end, Lógica"
          style={styles.input}
          value={form.cursos}
          onChangeText={(v) => setForm((prev) => ({ ...prev, cursos: v }))}
        />

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          <Button title="Salvar" onPress={onSalvar} />
          <Button title="Cancelar" color="#888" onPress={onCancelar} />
        </View>
      </View>
    </View>
  );
}

function Detalhe({ aluno, onVoltar, styles }) {
  if (!aluno) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes</Text>
      <View style={styles.form}>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Nome:</Text> {aluno.nome}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.bold}>Matrícula:</Text> {aluno.matricula}
        </Text>

        <Text style={styles.section}>Endereço</Text>
        <Text style={styles.detail}>CEP: {aluno.endereco?.cep}</Text>
        <Text style={styles.detail}>Logradouro: {aluno.endereco?.logradouro}</Text>
        <Text style={styles.detail}>Número: {aluno.endereco?.numero}</Text>
        <Text style={styles.detail}>Bairro: {aluno.endereco?.bairro}</Text>
        <Text style={styles.detail}>
          Cidade/UF: {aluno.endereco?.cidade} / {aluno.endereco?.estado}
        </Text>
        <Text style={styles.detail}>Complemento: {aluno.endereco?.complemento}</Text>

        <Text style={styles.section}>Cursos</Text>
        <Text style={styles.detail}>{(aluno.cursos ?? []).join(', ')}</Text>

        <View style={{ marginTop: 12 }}>
          <Button title="Voltar" onPress={onVoltar} />
        </View>
      </View>
    </View>
  );
}

/* ===================== APP ===================== */

export default function App() {
  // Ajuste para seu ambiente: localhost / 10.0.2.2 / IP da máquina
  // const url = 'http://localhost:3000';
  // const url = 'http://10.0.2.2:3000';
  const url = 'http://192.168.50.64:3000';

  const [tela, setTela] = useState('lista'); // 'lista' | 'form' | 'detalhe'
  const [alunos, setAlunos] = useState([]);
  const [selecionado, setSelecionado] = useState(null);

  const [form, setForm] = useState({
    _id: null,
    matricula: '',
    nome: '',
    endereco: {
      cep: '',
      logradouro: '',
      cidade: '',
      bairro: '',
      estado: '',
      numero: '',
      complemento: '',
    },
    cursos: '', // string separada por vírgulas
  });

  const carregarAlunos = async () => {
    try {
      const resp = await fetch(`${url}/alunos`);
      const data = await resp.json();
      setAlunos(data);
    } catch (e) {
      console.log('Falha ao carregar alunos', e);
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const limparForm = () => {
    setForm({
      _id: null,
      matricula: '',
      nome: '',
      endereco: {
        cep: '',
        logradouro: '',
        cidade: '',
        bairro: '',
        estado: '',
        numero: '',
        complemento: '',
      },
      cursos: '',
    });
  };

  const abrirFormCriar = () => {
    limparForm();
    setSelecionado(null);
    setTela('form');
  };

  const abrirFormEditar = (aluno) => {
    setSelecionado(aluno);
    setForm({
      _id: aluno._id,
      matricula: aluno.matricula ?? '',
      nome: aluno.nome ?? '',
      endereco: {
        cep: aluno.endereco?.cep ?? '',
        logradouro: aluno.endereco?.logradouro ?? '',
        cidade: aluno.endereco?.cidade ?? '',
        bairro: aluno.endereco?.bairro ?? '',
        estado: aluno.endereco?.estado ?? '',
        numero: aluno.endereco?.numero ?? '',
        complemento: aluno.endereco?.complemento ?? '',
      },
      cursos: (aluno.cursos ?? []).join(', '),
    });
    setTela('form');
  };

  const abrirDetalhe = (aluno) => {
    setSelecionado(aluno);
    setTela('detalhe');
  };

  const excluirAluno = async (id) => {
    try {
      await fetch(`${url}/alunos/${id}`, { method: 'DELETE' });
      await carregarAlunos();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível excluir.');
    }
  };

  const salvar = async () => {
    const cursosArray = form.cursos
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      matricula: form.matricula,
      nome: form.nome,
      endereco: {
        cep: form.endereco.cep,
        logradouro: form.endereco.logradouro,
        cidade: form.endereco.cidade,
        bairro: form.endereco.bairro,
        estado: form.endereco.estado,
        numero: form.endereco.numero,
        complemento: form.endereco.complemento,
      },
      cursos: cursosArray,
    };

    if (!payload.matricula || !payload.nome) {
      return Alert.alert('Atenção', 'Preencha matrícula e nome.');
    }

    try {
      if (form._id) {
        const resp = await fetch(`${url}/alunos/${form._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify(payload),
        });
        await resp.json();
      } else {
        const resp = await fetch(`${url}/alunos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify(payload),
        });
        await resp.json();
      }
      await carregarAlunos();
      setTela('lista');
      limparForm();
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar.');
    }
  };

  // Auto-preenche endereço quando CEP tem 8 dígitos
  const onChangeCep = async (cepDigitado) => {
    setForm((prev) => ({ ...prev, endereco: { ...prev.endereco, cep: cepDigitado } }));
    const apenasNumero = cepDigitado.replace(/\D/g, '');
    if (apenasNumero.length === 8) {
      try {
        const resp = await fetch(`${url}/viacep/${apenasNumero}`);
        const data = await resp.json();
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            endereco: {
              ...prev.endereco,
              cep: data.cep ?? apenasNumero,
              logradouro: data.logradouro ?? '',
              bairro: data.bairro ?? '',
              cidade: data.cidade ?? '',
              estado: data.estado ?? '',
            },
          }));
        }
      } catch {
        // silencioso
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {tela === 'lista' && (
        <Lista
          alunos={alunos}
          onVer={abrirDetalhe}
          onEditar={abrirFormEditar}
          onExcluir={excluirAluno}
          onNovo={abrirFormCriar}
          styles={styles}
        />
      )}

      {tela === 'form' && (
        <Form
          form={form}
          setForm={setForm}
          onChangeCep={onChangeCep}
          onSalvar={salvar}
          onCancelar={() => setTela('lista')}
          styles={styles}
        />
      )}

      {tela === 'detalhe' && (
        <Detalhe aluno={selecionado} onVoltar={() => setTela('lista')} styles={styles} />
      )}
    </View>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', padding: 16 },
  form: { paddingHorizontal: 16, gap: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 },
  section: { marginTop: 10, fontWeight: '600' },
  card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 10, backgroundColor: '#fafafa' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardSub: { color: '#656060ff', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 8 },
  btn: { backgroundColor: '#222', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  btnDanger: { backgroundColor: 'rgba(206, 19, 19, 1)' },
  btnText: { color: '#fff' },
  detail: { marginBottom: 6 },
  bold: { fontWeight: '600' },
});
