import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import Box from './components/Box';

export default function App() {

  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXChance, setIsXChance] = useState(true);
  const [winner, setWinner] = useState(null);

  function PlayBox(no) {
    return(
      <Box 
        no={no}
        boxInfo={{boxes, setBoxes}}
        chance={{ isXChance, setIsXChance }}
        winner={winner}
      />
    )
  }

  const winPosition = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8] ,[2,4,6]
  ]

  function calculateWin() {
    for (let i=0;  i<winPosition.length; i++) {
      if( 
        boxes[winPosition[i][0]] !== null &&
        boxes[winPosition[i][0]] === boxes[winPosition[i][1]]
        && boxes[winPosition[i][0]] === boxes[winPosition[i][2]]
       ) {
         setWinner(boxes[winPosition[i][0]]);
         return;
       }
    }
  }

  useEffect(() => {
    calculateWin();
  }, [isXChance])

  function resetValues() {
    setWinner(null);
    setBoxes(Array(9).fill(null));
    setIsXChance(true);
  }

  return (
    <View style={styles.container} >
      <StatusBar style="auto"  backgroundColor='orange'/>
      <View className="flex-row pb-4">
        <Text className="text-red-700 text-6xl">Tic</Text>
        <Text className="text-red-900 text-6xl">Tac</Text>
        <Text className="text-red-700 text-6xl">Toe</Text>
      </View>
      <View style={styles.playBoard}>
        <View style={styles.rows}>
          {PlayBox(0)}
          {PlayBox(1)}
          {PlayBox(2)}
        </View>
        <View style={styles.rows}>
          {PlayBox(3)}
          {PlayBox(4)}
          {PlayBox(5)}
        </View>
        <View style={styles.rows}>
          {PlayBox(6)}
          {PlayBox(7)}
          {PlayBox(8)}
        </View>
      </View>
      <View style={styles.featureContainer} className="py-8">
        {winner !== null 
        ? <Text style={[styles.primaryText, styles.winnerText]}>{winner} WON</Text>
        : <Text style={styles.primaryText}>Chance: {isXChance ? 'X' : 'O'}</Text>
        }
        {/* <Ionicons 
          style={styles.resetIcon}
          name="reload-circle" 
          size={38} 
          color="black" 
          onPress={resetValues}
        /> */}
      </View>
      <TouchableOpacity onPress={resetValues} className="bg-red-700 px-6 py-4 rounded-full"><Text className="text-white text-3xl">Reset</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',

  },
  playBoard: {
    borderWidth: 1,

    borderColor: 'gray'
  },
  rows: {
    flexDirection: 'row',
  },
  resetIcon: {
    position: 'absolute',
    right: 20,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  primaryText: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'

  },
  winnerText: {
    color: 'red',
    fontSize: 36,
  }
});