//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      TextInput_Book_ID: '',
      TextInput_Book_Name: '',
      TextInput_Book_Subjet: '',
      TextInput_Book_Author: '',
      TextInput_Book_Editorial: '',
    }
  }

  InsertBook = () => {
    fetch ('http://localhost:80/apiLibrary/InsertBook.php',{
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book_name: this.state.TextInput_Book_Name,
        book_subjet: this.state.TextInput_Book_Subjet,
        book_author: this.state.TextInput_Book_Author,
        book_editorial: this.state.TextInput_Book_Editorial
      })
    }).then((response)=> response.json())
      .then((responseJson)=>{
        alert(responseJson);
        this.refreshStudents();
      }).catch((error)=>{
        console.error(error);
      });
  }

  render(){
    return (
      <View style={styles.MainContainer}>
        <Text>Biblioteca Central</Text>
        <TextInput
          placeholder='Id Libro'
          onChangeText={TextInputValue => this.setState({TextInput_Book_ID:TextInputValue})}
        />
        <TextInput
          placeholder='Nombre Libro'
          onChangeText={TextInputValue => this.setState({TextInput_Book_Name:TextInputValue})}
        />
        <TextInput
          placeholder='Materia Libro'
          onChangeText={TextInputValue => this.setState({TextInput_Book_Subjet:TextInputValue})}
        />
        <TextInput
          placeholder='Autor Libro'
          onChangeText={TextInputValue => this.setState({TextInput_Book_Author:TextInputValue})}
        />
        <TextInput
          placeholder='Editorial Libro'
          onChangeText={TextInputValue => this.setState({TextInput_Book_Editorial:TextInputValue})}
        />
        <TouchableOpacity onPress={this.InsertBook}>
          <Text>ADD BOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>FIND BOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>UPDATE BOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>DELETE BOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>SHOW ALL</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
});