import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles as s } from "react-native-style-tachyons";
import DeckCard from './DeckCard'
import { getDeckInfo } from '../utils/helper'
import { getDeckData } from '../utils/api'
import { recieveDeck } from '../actions/deck'
import { connect } from 'react-redux'
// import DeckDetail from './DeckDetail';


class DeckList extends Component {
    
    //remove this state
    state = {
        decks: {}

    }
    componentDidMount() {

        getDeckData()
            .then(
                data => {
                    const decks = data
                    this.setState({ decks: decks })
                    this.props.dispatch(recieveDeck(data))
                }
            )
    }


    render() {

        const { decks } = this.props
        return (
            <View>
                {Object.entries(decks).map(deck =>
                    <View key={deck[0]}>
                        <TouchableOpacity style={[styles.red, s.ba, s.ma2]}
                            onPress={() => this.props.navigation.navigate(
                                'Deck Details',
                                { deckName: deck[0] }
                            )}>
                            <Text style={[s.f3, s.bg_black, s.mb2, s.tc]}>
                                {deck[0]}
                            </Text>
                            <Text style={[s.f5, s.fw4, s.gray, s.mt0]}>
                                {deck[1].questions.length}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}
//Remove this part 
function mapStateToProps(decks){
    // console.log('store',decks)
    return{
        decks
    }
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    }

})

export default connect(mapStateToProps)(DeckList)