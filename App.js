import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Router from './src/navigation/Router';
import 'react-native-gesture-handler';
import { ColorsConstant } from './src/constants/Colors.constant';

function App() {
   // const [counter, setCounter] = useState(60);
   // useEffect(() => {
   //    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
   // }, [counter]);
   return (
      <View style={{ flex: 1 }} >
         <View style={[ls.statusBar, { backgroundColor: ColorsConstant.hadercolor }]}>
            <StatusBar translucent backgroundColor={ColorsConstant.hadercolor} />
         </View>
         <Router />
         <Toast />

      </View>
   );
}
const ls = StyleSheet.create({
   statusBar: {
      height: StatusBar.currentHeight,
   },
})
export default App;

// import React from 'react'
// import { useState, useEffect } from 'react';
// import { Text, View } from 'react-native';

// const App = (props) => {
//     const {initialMinute = 1,initialSeconds = 0} = props;
//     const [ minutes, setMinutes ] = useState(initialMinute);
//     const [seconds, setSeconds ] =  useState(initialSeconds);
//     useEffect(()=>{
//     let myInterval = setInterval(() => {
//             if (seconds > 0) {
//                 setSeconds(seconds - 1);
//             }
//             if (seconds === 0) {
//                 if (minutes === 0) {
//                     clearInterval(myInterval)
//                 } else {
//                     setMinutes(minutes - 1);
//                     setSeconds(59);
//                 }
//             } 
//         }, 1000)
//         return ()=> {
//             clearInterval(myInterval);
//           };
//     });

//     return (
//         <View>
//         { minutes === 0 && seconds === 0
//             ? null
//             : <Text> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Text> 
//         }
//         </View>
//     )
// }

// export default App;
