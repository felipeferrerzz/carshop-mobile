import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const carros = [
  {
    id: '1',
    nome: 'BMW X6',
    marca: 'BMW',
    preco: 350000,
    descricao: 'SUV esportivo premium da BMW.',
    imagem:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e',
  },
  {
    id: '2',
    nome: 'Audi A5',
    marca: 'Audi',
    preco: 280000,
    descricao: 'Sedan elegante e tecnológico.',
    imagem:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
  },
  {
    id: '3',
    nome: 'Toyota Corolla',
    marca: 'Toyota',
    preco: 150000,
    descricao: 'Conforto e economia para o dia a dia.',
    imagem:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
  },
  {
    id: '4',
    nome: 'Honda Civic',
    marca: 'Honda',
    preco: 170000,
    descricao: 'Sedan esportivo moderno.',
    imagem:
      'https://images.unsplash.com/photo-1549924231-f129b911e442',
  },
];

export default function App() {
  const [marcaSelecionada, setMarcaSelecionada] = useState('Todas');
  const [valorMaximo, setValorMaximo] = useState(500000);

  const carrosFiltrados = carros.filter((carro) => {
    const filtroMarca =
      marcaSelecionada === 'Todas' ||
      carro.marca === marcaSelecionada;

    const filtroPreco = carro.preco <= valorMaximo;

    return filtroMarca && filtroPreco;
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.titulo}>CarShop Mobile</Text>

            <Text style={styles.subtitulo}>
              Escolha a marca:
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={marcaSelecionada}
                onValueChange={(itemValue) =>
                  setMarcaSelecionada(itemValue)
                }
              >
                <Picker.Item label="Todas" value="Todas" />
                <Picker.Item label="BMW" value="BMW" />
                <Picker.Item label="Audi" value="Audi" />
                <Picker.Item label="Toyota" value="Toyota" />
                <Picker.Item label="Honda" value="Honda" />
              </Picker>
            </View>

            <Text style={styles.filtroTexto}>
              Marca selecionada: {marcaSelecionada}
            </Text>

            <Text style={styles.subtitulo}>
              Faixa de preço:
            </Text>

            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={50000}
              maximumValue={500000}
              step={10000}
              value={valorMaximo}
              onValueChange={(value) =>
                setValorMaximo(value)
              }
            />

            <Text style={styles.filtroTexto}>
              Até R$ {valorMaximo.toLocaleString()}
            </Text>

            <Text style={styles.subtitulo}>
              Sobre a Loja
            </Text>

            <ScrollView style={styles.sobreContainer}>
              <Text style={styles.sobreTexto}>
                A CarShop é uma concessionária especializada em
                veículos premium e seminovos de alta qualidade.
                Nossa empresa atua há mais de 10 anos no mercado
                automobilístico oferecendo carros modernos,
                seguros e com garantia completa para nossos
                clientes. Trabalhamos com diversas marcas
                reconhecidas mundialmente e buscamos sempre
                proporcionar a melhor experiência na compra do
                seu veículo. Nosso objetivo é unir tecnologia,
                conforto e confiança em um só lugar.
              </Text>
            </ScrollView>

            <Text style={styles.subtitulo}>
              Catálogo de Carros
            </Text>
          </>
        }
        data={carrosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.imagem }}
              style={styles.imagem}
            />

            <Text style={styles.nome}>
              {item.nome}
            </Text>

            <Text style={styles.preco}>
              R$ {item.preco.toLocaleString()}
            </Text>

            <Text style={styles.descricao}>
              {item.descricao}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 15,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#111',
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#222',
  },

  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },

  filtroTexto: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },

  sobreContainer: {
    maxHeight: 140,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },

  sobreTexto: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    elevation: 5,
  },

  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },

  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#111',
  },

  preco: {
    fontSize: 18,
    color: 'green',
    marginTop: 5,
    fontWeight: 'bold',
  },

  descricao: {
    fontSize: 15,
    marginTop: 8,
    color: '#555',
  },
});
