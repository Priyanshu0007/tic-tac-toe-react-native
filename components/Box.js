import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';


export default function Box({ no, boxInfo , chance, winner }) {

    const { isXChance, setIsXChance } = chance;
    const { boxes, setBoxes } = boxInfo;
    const player = isXChance ? 'X' : 'O';

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if( boxes[no] === null && winner === null) {
                    setBoxes((prevBoxInfo) => {
                        prevBoxInfo[no] = player
                        return prevBoxInfo;
                    });
                    setIsXChance((prevState) => !prevState)
                }
            }}
        >
            {boxes[no] !== null ? 
            <View style={styles.boxView}>
                { boxes[no] === 'X' ? 
                <Text className="text-6xl text-white">X</Text>
                :
                <Text className="text-6xl text-white">O</Text>
            } 
            </View>
            : <View style={styles.boxView}></View>
            }
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    boxView: {
        minWidth: 110,
        minHeight: 110,
        borderWidth: 2,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    }
})