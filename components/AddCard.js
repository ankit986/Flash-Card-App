import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { styles as s } from "react-native-style-tachyons";
import { addQuestionToAsync } from '../utils/api'
import { addQuestion } from '../actions/deck'
import { connect } from 'react-redux'


class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    }


    handleSubmit = () => {
        const deck = this.props.route.params.deckName;
        addQuestionToAsync(deck, this.state)

        this.props.dispatch(addQuestion(this.state, deck))

        this.props.navigation.goBack();

        //Navigate to back
    }
    handleQuestion = (text) => {
        this.setState({
            question: text
        })
        // console.log('addcard', this.props.route.params.deckName)

    }

    handleAnswer = (text) => {
        this.setState({
            answer: text
        })
    }

    render() {
        const { question, answer } = this.state;
        return (
            <View>
                <KeyboardAvoidingView>
                    <TextInput
                        onChangeText={this.handleQuestion}
                        placeholder='Enter The Question'

                    />
                    <TextInput
                        onChangeText={this.handleAnswer}
                        placeholder='Enter The Answer'

                    />
                </KeyboardAvoidingView>
                <TouchableOpacity disabled={question === '' || answer === ''} onPress={this.handleSubmit}>
                    <Text >Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    }

})

function mapStateToProps(deck) {
    // console.log(deck)
    return {
        deck
    }
}

// function mapDispatchToProps(dispatch, props) {
//     // console.log('mdtp', props)
//     return {
//         // addCard:()=>{
//         //     props.dispatch(addQuestion(this.state, deck))
//         // },
//         goBack: () => {
//             props.navigation.goBack();
//         }
//     }
// }

export default connect(mapStateToProps)(AddCard)

