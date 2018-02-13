import React,{Component} from 'react';
import {StyleSheet, FlatList,TouchableOpacity,Text, } from 'react-native';

export default class AddListView extends Component{

    constructor(props){
        super(props);
        // this.state={data:{key:''}};
        this.state = {
            bookitems: [
                //{key: 'Learn react native'},
                //{key: 'Make a to-do app'}
            ],
            isLoading: true,
            quere:''
        }
       // this.props.updateState(this.state);
    }
// <View style={styles.container}>
// <FlatList
// data={[
//     {key:'fbdfndgnfmfhnm1'},
//     {key:'bdgngnfmhm2'},
//     {key:'gdhdgjgjfjf3'},
// ]}
// renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
// />
// </View>
    render() {
        return (
            <FlatList
                data={this.props.bookitems}
                renderItem={({item}) =>(
                    <TouchableOpacity
                        key={item.id}
                        // onPress={this.props.state.mytitle=item.title||this.props.onPress}
                        onPress={this.props._onPress}
                    >
                        <Text style={styles.item}>{item.title}</Text>
                    </TouchableOpacity>

                )}
            />
            // <Text>リストの表示</Text>
        );
    }
}

const styles=StyleSheet.create({
    container:
        {
            flex: 1,
            paddingTop: 22,
        },
    item:
        {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
});