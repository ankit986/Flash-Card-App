import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { styles as s } from "react-native-style-tachyons";
import DeckCard from './DeckCard'
import { getDeckInfo } from '../utils/helper'
import { getDeckData } from '../utils/api'
import { recieveDeck } from '../actions/deck'
import { connect } from 'react-redux'
// import DeckDetail from './DeckDetail';
import { Constants, Colors, View, Card, Button, Text, Image } from 'react-native-ui-lib';

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
            <View flex padding-20 >
                <ScrollView
                    horizontal
                    height={100}
                    padding={15}
                    style={{ overflow: 'visible' }}
                    contentContainerStyle={{ padding: 5 }}
                    showsHorizontalScrollIndicator={true}
                >
                    {Object.entries(decks).map(deck => {
                     
                        return (
                            deck[1] !== null ?
                                <View
                                    style={{marginLeft:0, justifyContent: 'center' }}
                                >
                                    <Card key={deck[0]}
                                        width={300}
                                        height={180}
                                        borderRadius={15}
                                        useNative
                                        activeScale={1.05}
                                        style={{ marginLeft:-5,marginRight: 15, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => this.props.navigation.navigate(
                                            'Deck Details',
                                            { deckName: deck[0] }
                                        )}>

                                        <Text text20>
                                            {deck[0]}
                                        </Text>
                                        <Text text40 dark50>
                                            {deck[1].questions.length} Cards
                                        </Text>
                                    </Card>
                                </View>
                                : <View></View>
                        )
                    }
                    )}
                </ScrollView>
            </View>
        )
    }
}
//Remove this part 
function mapStateToProps(decks) {
    console.log('store', decks)
    return {
        decks
    }
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    }

})

export default connect(mapStateToProps)(DeckList)