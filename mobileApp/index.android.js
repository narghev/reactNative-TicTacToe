window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight
} from 'react-native';

export default class project extends Component {
  constructor(){
    super();
    this.state = {visible: "welcomePage", board: [{},{},{},{},{},{},{},{},{}]};
    this.playPress = this.playPress.bind(this);
    this.fieldPress = this.fieldPress.bind(this);
    this.againPress = this.againPress.bind(this);
    this.socket;
  }
  playPress(){
    this.socket = io("http://192.168.0.102:8080/");
    this.socket.on("gameStart", ()=>{
        this.setState({visible: "board"});
    });
    this.socket.on("inQueue", ()=>{
      this.setState({visible: "queue"});
    });
    this.socket.on("boardUpdate", (arr)=>{
      let newArr = new Array(9);
      for (let i=0;i<arr.length;i++){
        if (arr[i]===0){
          newArr[i]={text: "O", color: "#0000FF"};
        }
        else if (arr[i]===1){
          newArr[i]={text: "X", color: "#FF0000"};
        }
        else{
          newArr[i]={};
        }
      }
      this.setState({board: newArr});
    });
    this.socket.on("win", ()=>{
      this.setState({visible: "win"});
    });
    this.socket.on("lose", ()=>{
      this.setState({visible: "lose"});
    });
    this.socket.on("draw", ()=>{
      this.setState({visible: "draw"});
    });
  }
  fieldPress(key){
    this.socket.emit("fieldPressed", key);
  }
  againPress(){
    this.socket.emit("disc");
    this.setState({visible: "welcomePage"});
  }
  render() {
    if (this.state.visible==="welcomePage"){
      return (
        <View style={styles.container}>
          <Text style={styles.play} onPress={this.playPress}>
            Play!
          </Text>
          <Text style={styles.code}>
            Source code
          </Text>
        </View>
      );
    }
    else if(this.state.visible==="queue"){
      return(
        <View style={styles.container}>
          <Text style={[styles.play, {color: "#ff8703"}]}>
            You are in Queue, waiting for one more player!
          </Text>
        </View>
      );
    }
    else if (this.state.visible==="board"){
      return (
        <View style={styles.board}>
          <TouchableHighlight onPress={()=>{this.fieldPress(1)}} style={[styles.boardFields, {left: 0}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={[{color: this.state.board[0].color}, styles.fieldSymbols]}>{this.state.board[0].text}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>{this.fieldPress(2)}} style={[styles.boardFields, {left: Dimensions.get('window').width*0.34}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={[{color: this.state.board[1].color}, styles.fieldSymbols]}>{this.state.board[1].text}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>{this.fieldPress(3)}} style={[styles.boardFields, {left: Dimensions.get('window').width*0.68}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={[{color: this.state.board[2].color}, styles.fieldSymbols]}>{this.state.board[2].text}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>{this.fieldPress(4)}} style={[styles.boardFields, {left: 0, top: Dimensions.get('window').height*0.34}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={[{color: this.state.board[3].color}, styles.fieldSymbols]}>{this.state.board[3].text}</Text>
            </View></TouchableHighlight>
          <TouchableHighlight onPress={()=>{this.fieldPress(5)}} style={[styles.boardFields, {left: Dimensions.get('window').width*0.34, top: Dimensions.get('window').height*0.34}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={[{color: this.state.board[4].color}, styles.fieldSymbols]}>{this.state.board[4].text}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>{this.fieldPress(6)}} style={[styles.boardFields, {left: Dimensions.get('window').width*0.68,  top: Dimensions.get('window').height*0.34}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={[{color: this.state.board[5].color}, styles.fieldSymbols]}>{this.state.board[5].text}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>{this.fieldPress(7)}} style={[styles.boardFields, {left: 0, top: Dimensions.get('window').height*0.68}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={[{color: this.state.board[6].color}, styles.fieldSymbols]}>{this.state.board[6].text}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>{this.fieldPress(8)}} style={[styles.boardFields, {left: Dimensions.get('window').width*0.34, top: Dimensions.get('window').height*0.68}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={[{color: this.state.board[7].color}, styles.fieldSymbols]}>{this.state.board[7].text}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>{this.fieldPress(9)}} style={[styles.boardFields, {left: Dimensions.get('window').width*0.68,  top: Dimensions.get('window').height*0.68}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={[{color: this.state.board[8].color}, styles.fieldSymbols]}>{this.state.board[8].text}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
    else if (this.state.visible==="win"){
      return(
        <View style={styles.container}>
          <Text style={[styles.play, {color: "#14a72f"}]}>
            You WIN!
          </Text>
          <Text style={styles.code} onPress={this.againPress}>
            Continue
          </Text>
        </View>
      );
    }
    else if (this.state.visible==="lose"){
      return(
        <View style={styles.container}>
          <Text style={[styles.play, {color: "#af4317"}]}>
            You LOSE!
          </Text>
          <Text style={styles.code} onPress={this.againPress}>
            Continue
          </Text>
        </View>
      );
    }
    else if (this.state.visible==="draw"){
      return(
        <View style={styles.container}>
          <Text style={[styles.play, {color: "#3d0cca"}]}>
            Draw!
          </Text>
          <Text style={styles.code} onPress={this.againPress}>
            Continue
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  play: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 150,
    color: '#FF0000'
  },
  code: {
    fontSize: 40,
    textAlign: 'center',
    color: '#0000FF'
  },
  board: {
    flex: 1,
    backgroundColor: '#000000'
  },
  boardFields: {
    position: 'absolute',
    width: Dimensions.get('window').width*0.32,
    height: Dimensions.get('window').height*0.32,
    backgroundColor: '#F5FCFF'
  },
  fieldSymbols: {
    textAlign: 'center',
    fontSize: 100
  }
});

AppRegistry.registerComponent('project', () => project);
