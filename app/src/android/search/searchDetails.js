'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
    AsyncStorage,
    Alert,
	BackAndroid
} from 'react-native';

class SearchDetails extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
		
		this.state = {
			name: '',
			artist: '',
			album: '',
			duration: '',
			url: ''
		};
		
		if (props.data) {
			this.state = {
				name: props.data.name,
				image: props.data.image,
				artist: props.data.artist,
				album: props.data.album,
				duration: props.data.duration,
				url: props.data.url
			};
		}	
    }
	
	addItem() {
        let movies = [];

        AsyncStorage.getItem('rn-movies.movies')
            .then(req => JSON.parse(req))
            .then(json => {
                movies = [].concat(json);
                movies.push({
					trackId: + new Date,
					name: this.state.name,
					image: this.state.image,
					artist: this.state.artist,
					album: this.state.album,
					duration: this.state.duration,
					url: this.state.url
				});

                if (movies[0] == null) {
                    movies.shift()
                } // Hack !!!

                AsyncStorage.setItem('rn-movies.movies', JSON.stringify(movies))
                    .then(json => {
                            appConfig.movies.refresh = true;
                            this.props.navigator.pop();
                        }
                    );

            })
            .catch(error => console.log(error));
    }
	
    playTrack() {
		this.props.navigator.push({
			index: 5,
			data: {
				url: this.state.url
			}
		});
    }
	
	goBack() {
		this.props.navigator.pop();
	}
	
    render() {
        var image = <View />;
 
		image = <Image
			source={{uri: this.state.image}}
			style={{
				height: 300,
				width: 300,
				borderRadius: 10,
				margin: 5
			}}
		/>;
		
        return (
            <View style={styles.container}>
				<View style={styles.header}>
					<View>
						<TouchableHighlight
							onPress={()=> this.goBack()}
							underlayColor='#48BBEC'
						>
							<Text style={styles.textSmall}>
								Back
							</Text>
						</TouchableHighlight>	
					</View>
					<View style={styles.itemWrap}>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textLarge}>
								{this.state.name}
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							onPress={()=> this.addItem()}
							underlayColor='#48BBEC'
						>
							<Text style={styles.textSmall}>
								Add
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
				<ScrollView>
					<View style={{
							flex: 1,
							padding: 10,
							paddingBottom: 55,
							justifyContent: 'flex-start',
							backgroundColor: 'white'
					}}>
					<View style={{
						 alignItems: 'center'
					}}>
						{image}
					</View>
					 
						<Text style={styles.itemTextBold}>
							{this.state.name}
						</Text>
						
						<Text style={styles.itemText}>
							{this.state.artist}
						</Text>
						
						<Text style={styles.itemText}>
							{this.state.album}
						</Text>
						
						<Text style={styles.itemText}>
							{this.state.duration}
						</Text>
						
						<Text style={styles.itemText}>
							{this.state.url}
						</Text>

						<TouchableHighlight
							onPress={()=> this.playTrack()}
							style={styles.button}>
							<Text style={styles.buttonText}>
								Play track
							</Text>
						</TouchableHighlight>
						
					</View>
				</ScrollView>
			</View>
		);
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
		marginRight: 20,
		fontWeight: 'bold',
		color: 'white'
	},	
    form: {
		flex: 1,
		padding: 10,
		justifyContent: 'flex-start',
		paddingBottom: 130,
		backgroundColor: 'white'
    },
 	itemWrap: {
		flex: 1,
		flexDirection: 'column', 
		flexWrap: 'wrap'
    },	
    itemTextBold: {
        fontSize: 18,
        textAlign: 'center',
        margin: 5,
        fontWeight: 'bold',
		color: 'black'
    },
    itemText: {
        fontSize: 14,
        textAlign: 'center',
        margin: 3,
        marginLeft: 2,
        color: 'black'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
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
        marginTop: 20
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default SearchDetails;
