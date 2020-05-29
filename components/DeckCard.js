import React, {Component} from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';

class DeckCard extends Component{

    handlePress(){
        this.props.navigation.navigate('DeckDetails',
        {
          deckName:this.props.title
        })
    }

    render(){
      const {title, noOfCards} = this.props
        return(
            <TouchableOpacity style={[styles.red, s.ba, s.ma2  ]} onPress={this.handlePress}>
                <Text style={[s.f3, s.bg_black, s.mb2 , s.tc]}>
                  {title}
                </Text>
                <Text style={[s.f5, s.fw4, s.gray, s.mt0]}>
                  {noOfCards}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles=StyleSheet.create({
  red:{
    backgroundColor:'red'
  }
  
})

export default DeckCard

