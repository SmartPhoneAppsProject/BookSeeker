import React ,{Component} from 'react';
import {Alert,StyleSheet,Button,View} from 'react-native';
import clickNewBookButton from './App'
//import {TabNavigator} from 'react-navigation';

//const util=require('util');
export default class Bar extends Component {

   // clickReturnAndBlowButton(){
   //     Alert.alert("you're already dead")
  //  }
    // clickNewBookButton(){
    //  this.props.onForword;
    //  }

    render() {

        return (
            <View >
                <Button
                    title="借出・返却"
                    onPress={this.props.onPress()}
                       // onPress={() =>navigate('detailBook', { name: 'Jane'})}
                />

                <Button
                    title="新規"
                    //  onPress={this.props.onPress()}
                    // onPress={() =>navigate('newBook', { name: 'Jane'})}

                />
            </View>

        );
    }

// <View>
// <StatusBar
// backgroundColor="blue"
// barStyle="light-content"
//
// />
//</View>
}
// const styles = StyleSheet.create({
//     bar: {
//         width: 200,
//         height: 40,
//         backgroundColor: 'blue',
//         flexDirection: 'row',
//         //justifyContent: 'space-between',
//     },
// });