import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { styles as s } from "react-native-style-tachyons";
import { getDeckData, removeDeck, DECKS_STORAGE_KEY } from "../utils/api";
import AddCard from './AddCard'
import Quiz from './Quiz'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'

class DeckDetail extends Component {

    state = {
        
        title: null,
        noOfCards: null
    }
    deck = this.props.route.params.deckName

    componentDidMount() {

        const { navigation } = this.props;
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
    //    console.log(this.state)
        const data = this.props.deck


        if (data !== undefined) {
            this.setState({
                title: data.title,
                noOfCards: data.questions.length
            })
        }
      
        return unsubscribe;

    }
    



    deleteDeck = () => {
        //Navigate back
        removeDeck(this.deck)
    }


    render() {
        const { title, noOfCards } = this.state
        return (
            <View >
                <View>
                    <Text style={[s.f3, s.bg_black, s.mb2, s.tc]}>
                        {title}
                    </Text>
                    <Text style={[s.f5, s.fw4, s.gray, s.mt0]}>
                        {noOfCards} Cards
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCard', { deckName: title })}>
                        <Text>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz', { deckName: title })}>
                        <Text>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.deleteDeck}>
                        <Text>Delete Deck</Text>
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

function mapStateToProps(decks, props) {
    const deckName = props.route.params.deckName
    const deck = decks[deckName]
    return {
        deck
    }

}

export default connect(mapStateToProps)(DeckDetail)

