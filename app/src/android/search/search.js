'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
    Switch,
    Dimensions
} from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            eventSwitchTitle: true,
            eventSwitchBase: true,
            textSwitchBase: 'Search by track',
            bugANDROID: ''
        }
    }

    componentDidMount() {
        this.setState({
            width: Dimensions.get('window').width
        });
    }

    clearSearch() {
        this.setState({
            searchQuery: '',
            invalidValue: false
        })
    }

    onSearchPressed() {
        if (this.state.searchQuery === undefined ||
            this.state.searchQuery === '') {
            this.setState({
                invalidValue: true
            });
            return;
        }
		
		if (this.state.textSwitchBase === 'Search by track') {
			this.props.navigator.push({
				index: 4,
				data: {
					searchQuery: this.state.searchQuery,
					searchType: this.state.textSwitchBase
				}
			})
		} else {
			this.props.navigator.push({
				index: 1,
				data: {
					searchQuery: this.state.searchQuery,
					searchType: this.state.textSwitchBase
				}
			})
		}
    }

    toggleTypeChange() {
        if (!this.state.eventSwitchBase) {
            this.setState({
                textSwitchBase: 'Search by track'
            });
        } else {
            this.setState({
                textSwitchBase: 'Search by artist'
            });
        }
    }

    goBack() {
        this.props.navigator.pop();
    }

    render() {
        let validCtrl;

        if (this.state.invalidValue) {
            validCtrl = <Text style={styles.error}>
                Value required - please provide.
            </Text>;
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#48BBEC'
						>
                            <View>
                                <Text style={styles.textSmall}>
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={styles.textLarge}>
                                    Search
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
						<TouchableHighlight
							onPress={()=> this.clearSearch()}
							underlayColor='#48BBEC'
						>
                            <View>
                                <Text style={styles.textSmall}>
                                    Clear
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>

                <ScrollView keyboardShouldPersistTaps='always'>
                    <View style={styles.scrollBlock}>
                        <View style={styles.switchBlock}>
                            <View>
                                <Text style={styles.switchItemText}>
                                    {this.state.textSwitchBase}
                                </Text>
                            </View>

                            <View style={styles.switchItem}>
                                <Switch
                                    onValueChange={(value) => {
                                        this.toggleTypeChange();
                                        this.setState({
                                            eventSwitchBase: value
                                        });
                                    }}
                                    value={this.state.eventSwitchBase}
                                />
                            </View>
                        </View>

                        <View style={styles.inputBlock}>
                            <TextInput
                                underlineColorAndroid='rgba(0,0,0,0)'
                                onChangeText={(text) => this.setState({
                                    searchQuery: text,
                                    invalidValue: false
                                })}
                                value={this.state.searchQuery}
                                style={{
                                    height: 50,
                                    width: this.state.width * .94,
                                    fontSize: 18,
                                    color: 'black',
                                    paddingTop: 6
                                }}
                                placeholder="Search here">
                            </TextInput>
                        </View>

                        {validCtrl}

                        <TouchableHighlight
                            onPress={() => this.onSearchPressed()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>
                                Submit
                            </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#48BBEC',
        borderWidth: 0,
        borderColor: 'whitesmoke'
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingLeft: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    scrollBlock: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    switchBlock: {
        height: 50,
        borderWidth: 1,
        borderColor: '#48BBEC',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5
    },
    switchItem: {
        marginTop: 10,
        margin: 10
    },
    switchItemText: {
        fontSize: 18,
        marginTop: 10,
        margin: 10
    },
    inputBlock: {
        height: 50,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#48BBEC',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        paddingLeft: 6
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 19,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    loader: {
        justifyContent: 'center',
        height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
		marginBottom: -6,
        textAlign: 'center'
    }
});

export default Search;