import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import { ColorsConstant } from '../../constants/Colors.constant';
import Images from '../../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DeviceInfo from 'react-native-device-info';
import { get_url } from '../../services/AppSetting';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { StyleConstants } from '../../constants/Style.constant';
import { Linking } from 'react-native';

function Splash(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const [androidUrl, setAndroidUrl] = useState('')
  useEffect(() => {
    // AsyncStorage.clear()
    setTimeout(() => {
      getAppUpdateData();
    }, 2000);
  }, []);

  const getAppUpdateData = async () => {
    let url = "app-setting.php";
    try {
      let result = await get_url(url);
      AsyncStorage.setItem('whatsappNumber', result.data.supportNumber);
      if (result.data.maintenance != 0) {
        setMaintenance(true)
      }
      else {
        if (Platform.OS == "ios") {
          if (appCurrentVersionIos >= result.data.iosVersion) {
            AsyncStorage.getItem("userid").then((value) => {
              getUserVeried(value);
            });
          } else {
            setModalVisible(true)
          }
        }
        else {
          // if (DeviceInfo.getBuildNumber() >= result.data.appVersion) {
          //   AsyncStorage.setItem('androidUrl', result.data.appUrl);
            AsyncStorage.getItem("userid").then((value) => {
              getUserVeried(value);
            });
          // } else {
          //   setAndroidUrl(result.data.appUrl)
          //   setModalVisible(true)
          // }
        }
      }
    } catch (error) {
      console.log("error333", error);
    }
  };
  const getUserVeried = async (value) => {
    if (value !== null) {
      props.navigation.navigate('Tabs')
    } else {
      AsyncStorage.clear()
      props.navigation.navigate('Login')
    }
  };
  const handlePress = async () => {
    let Url = androidUrl
    console.log('----', Url)
    Linking.openURL(Url.toString());
  }
  return (
    <>
      {!modalVisible &&
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: ColorsConstant.White }} >
          <Image source={Images['splash']} resizeMode='contain' style={{ width: 200, height: 200 }} />
        </View>
      }
      {
        modalVisible &&
        <View style={{ flex: 1, }}>
          <View style={[{ alignItems: 'center', flex: 1, justifyContent: 'flex-start', backgroundColor: ColorsConstant.White }]}>
            <Image source={require('../../asstes/images/app_update.png')} style={{ height: screenHeight / 2, width: screenWidth, marginBottom: 50 }} />
            <Text style={[styles.textStylemodal, { fontSize: 16, fontWeight: 'bold' }]}>Time To Update!</Text>
            <Text style={[styles.textStylemodal, { textAlign: 'center' }]}> We added Iots of new features, fix Some bugs to make your experience as smooth as passible</Text>
            <TouchableOpacity onPress={() => handlePress()} style={[styles.btnTheme, { height: 45, marginTop: 50 }]}>
              <Text style={[StyleConstants.textsigup, { color: ColorsConstant.White, textAlign: 'center' }]}>Update Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      }

      <Modal
        animationType="slide"
        transparent={true}
        visible={maintenance}
        onRequestClose={() => {
          setMaintenance(!maintenance);
        }}
      >
        <View style={[s.modalManView, { backgroundColor: c.White, justifyContent: 'center' }]}>
          {/* <Image source={require('../../asstes/images/maintenance.png')}
            resizeMode='stretch'
            style={{ height: screenHeight, width: screenWidth }}
          /> */}
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOncpSA2UgP-ick0VBCSGaks_4jQ5zo_fRSUY8voGuGrxeWOvZZxnke2R7Jq9nRYNT8g5thqIuBVY&usqp=CAU&ec=48665701' }}
            resizeMode='contain'
            style={{ height: 280, width: 280 }}
          />
        </View>
      </Modal>
    </>
  )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
  textStylemodal: {
    color: c.Black,
    padding: 10
  },
  btnTheme: {
    backgroundColor: c.btnthame,
    borderRadius: 10,
    // width: screenWidth - 32,
    height: 44,
    justifyContent: 'center',
    marginTop: 12
  },
})
export default Splash;