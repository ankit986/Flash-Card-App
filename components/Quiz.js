import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles as s } from "react-native-style-tachyons";
import { getDeckData, removeDeck, DECKS_STORAGE_KEY } from "../utils/api";
import QuizQuestion from './QuizQuestion';
import {connect} from 'react-redux'

class Quiz extends Component {
  state = {
    questions: [],
    index: 0,
    correct: 0,
    incorrect: 0
  }
  componentDidMount() {
    const deckName = this.props.route.params.deckName;
    // console.log('q',this.props)
   
    const {questions} = this.props

    this.setState({
      questions
    })
    
  }

  nextQuestion = () => {
    const { questions, index } = this.state;
    if (index <= questions.length) {
      this.setState({
        index: index + 1
      })
    }
  }

  updateCorrect = () => {
    const { correct } = this.state
    this.setState({
      correct: correct + 1
    })

  }

  updateInCorrect = () => {
    const { incorrect } = this.state

    this.setState({
      incorrect: incorrect + 1
    })
  }

  render() {
    const { questions, index, correct, incorrect } = this.state
    // console.log(questions, index)
    const totalQuestions = questions.length
    const question = questions[index]
    return (
      <View>
        {index < questions.length
          ? <View>
            <QuizQuestion
              index={index}
              question={question}
              totalQuestions={totalQuestions}
              nextQuestion={this.nextQuestion}
              updateCorrect={this.updateCorrect}
              updateInCorrect={this.updateInCorrect} />
          </View>
          : <View>
            <Text>Score</Text>
            <View>
              <Text>correct:{correct}</Text>
              <Text>Incorrect:{incorrect}</Text>
            </View>
            <View>
              <Text>correct Percentage:{Math.round((correct * 100) / totalQuestions * 100) / 100}</Text>
              <Text>Incorrect Percentage:{Math.round((incorrect * 100) / totalQuestions * 100) / 100}</Text>
            </View>
          </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  red: {
    backgroundColor: 'red'
  }

})

function mapStateToProps(deck, props){
  const deckName = props.route.params.deckName;

   const questions = deck[deckName].questions
  return {
    questions
  }
}


export default connect(mapStateToProps)(Quiz)

