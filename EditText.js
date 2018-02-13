import React ,{Component} from 'react';
import {StyleSheet,TextInput,View,Button } from 'react-native';

export default class EditText extends Component{

    constructor(props){
        super(props);
        // var storeState = this.props.getState();
         this.state = {
             q:''
         }
        //this.props.updateState(this.state);
        // this.props.callbackst(this.state.q);
    }

    clickSearchButton(){

    }

    render(){
        return(
            <View>
                <TextInput
                    placeholder="タグ検索"
                    onChangeText={(q)=>this.setState({q})}
                    //value={this.props.state.quere}
                >
                </TextInput>

                <Button style={styles.seachButton}
                        title="検索"
                        //onPress={this.clickSearchButton}
                        //var data={this.state.q}
                        // onPress={this.props.callbackst(this.state.q)}
                        //onPress={this.props.onPress(this.state.q)}
                />
            </View>

        );
    }
}
const styles = StyleSheet.create({
    seachButton: {
        width: 60,
        height: 40,
        backgroundColor: 'blue',
        flexDirection: 'row',
        //justifyContent: 'space-between',
    },
});