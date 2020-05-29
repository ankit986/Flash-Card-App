import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles as s } from "react-native-style-tachyons";
import { Button, } from 'react-native-ui-lib'; //eslint-disable-line


class Score extends Component {

  render() {
    const {correct, incorrect, totalQuestions, restart} = this.props
    console.log('score',this.props)
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.bigText}>Score</Text>
        <View style={styles.scores}>
          <Text>correct:{correct}</Text>
          <Text>Incorrect:{incorrect}</Text>
        </View>
        <View style={styles.scores}>
          <Text>Percentage correct : {Math.round((correct * 100) / totalQuestions * 100) / 100}</Text>
          <Text> Percentage Incorrect : {Math.round((incorrect * 100) / totalQuestions * 100) / 100}</Text>
        </View>

        <Button
          backgroundColor="#FB3C62"
          label="Restart Quiz"
          enableShadow
          borderRadius={7}
          style={{ height: 45, }}
          onPress={()=>restart}
          // onPress={() => this.props.navigation.navigate('Quiz', { deckName: this.props.route.params.deckName })}
        />
        {/* <Button
            backgroundColor="#FB3C62"
            label="Back To Deck"
            enableShadow
            borderRadius={7}
            style={{ height: 45, }}
            onPress={this.props.navigation.navigate('DeckDetails',{deckName:this.props.deckName})}

          /> */}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  smallText: {
    fontSize: 25,
    margin: 10
  },
  bigText: {
    fontSize: 35,
  },
  active: {
    color: 'red',
    margin: 20,
    fontSize: 20
  },

  scores: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 30,
    margin: 30,
  }

})



export default Score

