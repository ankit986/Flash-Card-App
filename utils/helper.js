import { DECKS_STORAGE_KEY } from './api'
import { AsyncStorage } from 'react-native'

export function getInitialDeckInfo(deckName) {
    const info = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }
    console.log('insidehelper :', JSON.stringify(info))

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(info))

    return deckName === undefined ? info : info[deckName]
}
