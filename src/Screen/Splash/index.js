import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';
import Images from '../../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Splash(props) {
    useEffect(() => {
      // AsyncStorage.clear()  
        setTimeout(() => {
          AsyncStorage.getItem('userid').then((value) => {
            if (value !== null) {
              props.navigation.navigate('Tabs')
            } else {
              AsyncStorage.clear()
              props.navigation.navigate('Login')
            }
          })
        }, 3000);
      }, []);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: ColorsConstant.White }} >
            <Image source={Images['splash']} resizeMode='contain' style={{ width: 200, height: 200 }} />
        </View>
    )
}
export default Splash;