import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class Transactionscreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    cameraPermissions=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status==='granted'
        })
    }

    handleBarcodeScanned=async({type, data})=>{
       this.setState({
           scanned: true,
           scannedData: data,
           buttonState:'normal'
       })
    }

  render(){
      const hasCameraPermissions=this.state.hasCameraPermissions
      const scanned = this.state.scanned
      const buttonState = this.state.buttonState
      if(buttonState==='clicked' && hasCameraPermissions){
          return(
              <BarCodeScanner
              onBarCodeScanned = {scanned?undefined:this.handleBarcodeScanned}
              style={StyleSheet.absoluteFillObject}
              />
          )
      }
      else if(buttonState==='normal'){

      return(
          <View style={styles.container}>
              <Image style={styles.imageIcon} source={require('../assets/camera.jpg')}/>
              <Text style={styles.displayText}> 
              {hasCameraPermissions===true?this.state.scannedData:'request for camera Permission'}
               </Text>
              <TouchableOpacity 
              onPress={this.cameraPermissions}
              style={styles.scanButton}>
                  <Text style={styles.buttonText}> Scan QR Code </Text>
              </TouchableOpacity>
          </View>
      )
  }
}
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scanButton:{
        backgroundColor: 'blue',
        margin: 10,
        padding: 10
    },
    buttonText:{
        fontSize: 20
    },
    imageIcon:{
        width: 200,
        height: 200,
        marginTop: 200
      }
})