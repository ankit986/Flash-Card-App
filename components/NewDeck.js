import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';
import { styles as s } from "react-native-style-tachyons";
import { addDeckToAsync } from '../utils/api';
import { addDeck } from '../actions/deck'
import {connect} from 'react-redux'


class NewDeck extends Component {
    state = {
        deck: {
            title: '',
            questions: []
        }
    }

    handleChange = (text) => {
        this.setState({
            deck: {
                title: text,
                questions: []
            }
        })
    }

    render() {
        const handleSubmit = () => {
            const { deck } = this.state
            const key = deck.title
            this.props.dispatch(addDeck({
                [key]:deck
            }))

            addDeckToAsync(key, deck)

            this.props.navigation.goBack()
        }
  

    return(
            <View>
    <View>
        <Text>What Is The Title Of Your New Deck?</Text>
    </View>
    <KeyboardAvoidingView>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={this.handleChange}
            placeholder='Deck Title'
        />
    </KeyboardAvoidingView>
    <View>
        <TouchableOpacity onPress={handleSubmit} disabled={this.state.deckTitle === ''}>
            <Text>Submit</Text>
        </TouchableOpacity>
    </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    }

})



export default connect()(NewDeck)

