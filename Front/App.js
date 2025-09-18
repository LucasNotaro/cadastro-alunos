import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function App() {
  // ip // atlas
  //const url ='http://localhost:3000'; 
 //  const url = 'http://192.168.50.81:3000';
  const url = 'http://192.168.50.64:3000';
  //const url ='http://10.0.2.2:3000'; 


  //useEffect(()=>{},[])

  // exebir o dados na tela //GET
  const ExibirDados = (urlX) => {
    fetch(urlX)
      .then((response) => { return response.json() })
      .then((data) => {
        console.log(data);
      }).catch((e) => {
        console.log(e)

      })
  }

  // inserir

  const inserirUser = (urlx) => {
    fetch(urlx + '/inseir', {
      method: "POST",
      body: JSON.stringify({
        name: 'Vitor'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((resp) => { return resp.json() })
      .then((data) => console.log(data))
  }

  // DELETAR

  const deletarId = (urlX) => {
    fetch(urlX + '/deletar/68b8d209cc1b2d00f3315b07', {
      method: 'DELETE'
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))

  }
  // update

  const updateDados = (urlx) => {
    fetch(urlx + '/alterar/68c20751c3c11adbdb24df21', {
      method: 'PUT',
      body: JSON.stringify({
        name: 'Novo'
      }),
      headers: {
        'Content-type' : 'application/json; charset=utf-8'
      }
    }).then((resp)=> resp.json())
     .then((data)=> console.log(data))

  }





  return (
    <View style={styles.container}>
      <Button
        title='EXIBIR DADOS'
        onPress={() => ExibirDados(url)}
      />

      <Button
        title='INSERIR DADOS'
        onPress={() => inserirUser(url)}
      />

      <Button
        title='DELETAR ID'
        onPress={() => deletarId(url)}
      />
      <Button
        title='Update ID'
        onPress={() => updateDados(url)}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
