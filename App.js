//import { StatusBar } from 'expo-status-bar';
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      TextInput_Book_ID: "",
      TextInput_Book_Name: "",
      TextInput_Book_Subjet: "",
      TextInput_Book_Author: "",
      TextInput_Book_Editorial: "",
    };
  }

  InsertBook = () => {
    fetch("http://localhost:80/apiLibrary/InsertBook.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_name: this.state.TextInput_Book_Name,
        book_subjet: this.state.TextInput_Book_Subjet,
        book_author: this.state.TextInput_Book_Author,
        book_editorial: this.state.TextInput_Book_Editorial,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
        this.refreshStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  FindBook = () => {
    fetch("http://localhost:80/apiLibrary/ShowBookId.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_Id: this.state.TextInput_Book_ID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          TextInput_Book_Name: responseJson[0]["book_name"],
          TextInput_Book_Subjet: responseJson[0]["book_subjet"],
          TextInput_Book_Author: responseJson[0]["book_author"],
          TextInput_Book_Editorial: responseJson[0]["book_editorial"],
        });
      })
      .catch((error) => {
        alert("No se Encuentra el ID del Libro");
        this.setState({
          TextInput_Book_ID: "",
          TextInput_Book_Name: "",
          TextInput_Book_Subjet: "",
          TextInput_Book_Author: "",
          TextInput_Book_Editorial: "",
        });
      });
  };

  UpdateBook = () => {
    fetch('http://localhost:80/apiLibrary/UpdateBook.php', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book_Id: this.state.TextInput_Book_ID,
        book_name: this.state.TextInput_Book_Name,
        book_subjet: this.state.TextInput_Book_Subjet,
        book_author: this.state.TextInput_Book_Author,
        book_editorial: this.state.TextInput_Book_Editorial,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        alert("Libro actualizado correctamente ...")
        this.refreshStudents();

      }).catch((error) => {
        console.error(error);
      });

  }

  DeleteBook = () => {
    fetch('http://localhost:80/apiLibrary/DeleteBook.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book_Id: this.state.TextInput_Book_ID
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        alert("Libro eliminado correctamente ...");
        this.refreshStudents();
      }).catch((error) => {
        console.error(error);
      });
  }

  CleanBooks= () => {
    this.setState({
      TextInput_Book_ID: "",
      TextInput_Book_Name: "",
      TextInput_Book_Subjet: "",
      TextInput_Book_Author: "",
      TextInput_Book_Editorial: "",
    });
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text>Biblioteca Central</Text>
        <TextInput
          placeholder="Id Libro"
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Book_ID: TextInputValue })
          }
          value={this.state.TextInput_Book_ID}
        />
        <TextInput
          placeholder="Nombre Libro"
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Book_Name: TextInputValue })
          }
          value={this.state.TextInput_Book_Name}
        />
        <TextInput
          placeholder="Materia Libro"
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Book_Subjet: TextInputValue })
          }
          value={this.state.TextInput_Book_Subjet}
        />
        <TextInput
          placeholder="Autor Libro"
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Book_Author: TextInputValue })
          }
          value={this.state.TextInput_Book_Author}
        />
        <TextInput
          placeholder="Editorial Libro"
          onChangeText={(TextInputValue) =>
            this.setState({ TextInput_Book_Editorial: TextInputValue })
          }
          value={this.state.TextInput_Book_Editorial}
        />
        <TouchableOpacity onPress={this.InsertBook}>
          <Text>ADD BOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.FindBook}>
          <Text>FIND BOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.UpdateBook}>
          <Text>UPDATE BOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.DeleteBook}>
          <Text>DELETE BOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.CleanBooks}>
          <Text>CLEAN</Text>
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
    alignItems: "center",
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
});
