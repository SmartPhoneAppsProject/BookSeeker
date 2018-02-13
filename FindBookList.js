import React from 'react';
import { Button,AppRegistry,StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import AddListView from './AddListView';
import EditText from './EditText';
import Bar from './Bar';

export default class FindBookList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookitems: [
                //{key: 'Learn react native'},
                //{key: 'Make a to-do app'}
            ],
            isLoading: true,
            quere:''
        }
       // this.updateState=this.updateState.bind(this);
       //  this.searchStart=this.searchStart.bind(this);
        // this.callbackst=this.callbackst.bind(this);

    }

    updateState(){
        this.setState(this);
    }

    componentDidMount() {
        fetch("https://go-api-staging.herokuapp.com/books", {
            method: "GET",
        }).then((respJson)=>{
            var data = JSON.parse(respJson._bodyInit);
            for(i=0;i<Object.keys(data).length;i++) {
                console.log(data[i].title)

                this.setState({bookitems: this.state.bookitems.concat([{title: data[i].title,key:data[i].id}])});
            }
            this.setState({isLoading:false})
        })
    }

    // searchStart(text){
    //     //fetch("https://go-api-staging.herokuapp.com/books", {
    //       //  method: "GET",
    //    // }).then((respJson)=>{
    //         //var data = JSON.parse(respJson._bodyInit);
    //         var data=this.state.bookitems;
    //         for(i=0;i<data.length;i++) {
    //             var booktitle=data[i].title;
    //             if(booktitle==text)
    //                 console.log(text)
    //             else
    //                 data.splice(i,1);
    //             //this.setState({bookitems: this.state.bookitems.concat([{key: data[i].title}])});
    //         }
    //         //this.setState({bookitems:data});
    //        // this.setState({isLoading:false})
    //     //})
    // }

    callbackst(text){

        this.searchStart(text)
    }

    static navigationOptions = {
        title: 'FindBookList',
    };
  render() {
      const { navigate } = this.props.navigation;
      if (this.state.isLoading) {
          return (
              <View style={{flex: 1, paddingTop: 20}}>
                  <ActivityIndicator />
              </View>
          );
      }
    return (
        <View>
            <Button
                title="新規"
                onPress={()=>navigate('newBook')}
                />
            <Button
                title="貸出・返却"
                onPress={()=>navigate('detailBook')}
            />


            <EditText　
                //updateState={this.updateState}
                // callbackst={this.callbackst}
               // onPress={(q)=>this.searchStart(q)}
                //onPress={this.callbackst}

                //q={(q)=>this.setState({queue:q})}

            />
            <AddListView
               // updateState={this.updateState}
                bookitems={this.state.bookitems}
                //_onPress={this.clickListItem}
            />
        </View>

    );
  }
}

//<Bar
  //  onPress={() =>navigate('detailBook')}
   // onPress={()=>navigate('newBook')}

///>

AppRegistry.registerComponent('findListView',()=>findListView);
// const styles = StyleSheet.create({
//
//     container: {
//         flex: 1,
//         margin: 30,
//         backgroundColor: '#fff',
//         // alignItems: 'center',
//         justifyContent: 'center',
//     },
// });