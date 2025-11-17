import axios from "axios"
import { useState } from "react"
import { ActivityIndicator, Alert, Keyboard, StyleSheet, TextInput, TouchableOpacity, View , Text, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


// defininido url da api
const API_URL = process.env.EXPO_PUBLIC_API_URL;


export default function App() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)


  const handleShorten = async () => {
    // esconde o telcado
    Keyboard.dismiss()

    //validação simples
    if(!longUrl) {
      Alert.alert('Ops', 'Informe a URL para encurtar')
      return
    }

    setLoading(true)
    setShortUrl('') // limpa o resultado anterior

    try {
      // faz a requisição para a api
      const response = await axios.post(`${API_URL}/api/url/shorten`, {
        longUrl: longUrl
      })

      setShortUrl(response.data.shortUrl)
    } catch (e) {
      console.error(e)
      Alert.alert('Erro', 'Não foi possível encurtar a URL. Verifique sue servidor e IP')
    } finally {
      setLoading(false)
    }

  }

  return (
  
    <SafeAreaView style={styles.container}>
      <StatusBar translucent/>

      <View  style={styles.content}>
        <Text style={styles.title}>Encurtar de URL</Text>

        <TextInput
        style={styles.input} 
        placeholder='Digite sua URL longa aqui'
        placeholderTextColor = '#888'
        value={longUrl}
        onChangeText={setLongUrl}
        autoCapitalize='none'
        keyboardType='url'
        />

        <TouchableOpacity style={styles.button} onPress={handleShorten} disabled={loading}>
          { 
            loading ? (
              <ActivityIndicator color='#FFF' />
            ) : (
              <Text style={styles.buttonText}>
                Encurtar! 
              </Text>
            )
          }
        </TouchableOpacity>

       {shortUrl  ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Sua URL curta </Text>
          <Text style={styles.resultUrl} selectable={true}>{shortUrl}</Text>
        </View>
       ) : (null
       )}
      </View>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    alignItems: 'center', 
    justifyContent: 'center'
  }, 
  content: {
    width: '90%'
  }, 
  title: {
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#fff', 
    alignItems: 'center', 
    marginBottom: 30
  }, 
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 15, 
    borderRadius: 8, 
    fontSize: 16,
    marginBottom: 20
  }, 
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold'
  }, 
  resultContainer: {
    marginTop: 30, 
    padding: 15,  
    backgroundColor:  '#222', 
    borderRadius: 8
  }, 
  resultLabel: {
    fontSize: 16, 
    color: '#aaa', 
    textAlign: 'center'
  },
  resultUrl: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#00bfff', 
    textAlign: 'center', 
    marginTop: 10
  }

})