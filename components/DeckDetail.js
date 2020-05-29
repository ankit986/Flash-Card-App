import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { styles as s } from "react-native-style-tachyons";
import { getDeckData, removeDeckFromAsync, DECKS_STORAGE_KEY } from "../utils/api";
import AddCard from './AddCard'
import Quiz from './Quiz'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { addDeck } from '../actions/deck'
import {  Button, } from 'react-native-ui-lib'; //eslint-disable-line

class DeckDetail extends Component {

    state = {

        title: null,
        noOfCards: null
    }




    deleteDeck = () => {
        console.log(this.props.decks)
        const { goBack, removeDeck } = this.props
        removeDeck();
        removeDeckFromAsync(this.props.title)
        goBack();

    }

    render() {
        const { title, noOfCards } = this.props
        
        return (
            <View >
                <View style={{ marginTop: 100, marginBottom: 70, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 50 }}>
                        {title}
                    </Text>
                    <Text style={{ fontSize: 20, color: 'gray' }} >
                        {noOfCards} Cards
                    </Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>

                    <Button
                        backgroundColor="#FB3C62"
                        label="New Question"
                        enableShadow
                        borderRadius={7}
                        style={{ height: 45, marginBottom: 10 }}
                        onPress={() => this.props.navigation.navigate('AddCard', { deckName: title })}
                    />
                    <Button
                        backgroundColor="#FB3C62"
                        label="Start Quiz"
                        borderRadius={7}
                        enableShadow
                        style={{ height: 45, marginBottom: 10 }}
                        onPress={() => this.props.navigation.navigate('Quiz', { deckName: title })}
                    />
                    <Button
                        backgroundColor="#FB3C62"
                        label="Delete Deck"
                        borderRadius={7}
                        enableShadow

                        style={{ height: 45, marginBottom: 10 }}
                        onPress={this.deleteDeck}
                    />
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

function mapStateToProps(decks, props) {
    const deckName = props.route.params.deckName
    console.log('redux store : ', decks)
    const deck = decks[deckName]

    return {

        title: deck !== null ? deck.title : null,
        noOfCards: deck !== null ? deck.questions.length : null,
    }
}

function mapDispatchToProps(dispatch, props) {
    console.log(props)
    const deckName = props.route.params.deckName
    console.log(deckName)

    return {
        goBack: () => {
            props.navigation.goBack();
        },
        removeDeck: () => {
            dispatch(addDeck({
                [deckName]: null
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)

