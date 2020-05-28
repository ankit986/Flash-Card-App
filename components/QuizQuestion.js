import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles as s } from "react-native-style-tachyons";
import TextButton from './TextButton'


class QuizQuestion extends Component {
    state = {
        isQuestion: false
    }

    handleCorrect = () => {
        this.props.updateCorrect();
        this.props.nextQuestion();
    }

    handleIncorrect = () => {
        this.props.updateInCorrect();
        this.props.nextQuestion();
    }

    toggle = () => {
        this.setState((state) => ({
            isQuestion: !state.isQuestion
        }));
    }

    render() {
        const { index, question, totalQuestions } = this.props
        const { isQuestion } = this.state
       
        return (
            <View>
                <View>
                    <Text>{index + 1}/{totalQuestions}</Text>
                </View>
                <View>
                    {isQuestion 
                    ? <View>
                        <Text>{question && question.question}?</Text>
                    </View> 
                    : <TextButton  onPress={this.toggle}>Question</TextButton>}
                    {!isQuestion
                    ?<View>
                        <Text>{question && question.answer}</Text>
                    </View>
                    :<TextButton onPress={this.toggle}>Answer</TextButton>}
                </View>
                <View>
                    <TouchableOpacity onPress={this.handleCorrect}>
                        <Text>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleIncorrect}>
                        <Text>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    }

})

export default QuizQuestion

