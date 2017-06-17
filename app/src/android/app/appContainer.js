'use strict';

import React, {Component} from 'react';
import {BackAndroid} from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import Search from '../search/search';
import SearchArtist from '../search/searchArtist';
import SearchDetails from '../search/searchDetails';
import SearchTopTrack from '../search/searchTopTrack';
import SearchTrack from '../search/searchTrack';

import Movies from '../movies/movies';
import MoviesDetails from '../movies/moviesDetails';

import PlayTrack from './playTrack';
import Wikr from '../movies/wikr';

class AppContainer extends Component {
    constructor(props) {
        super(props);
				
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <DefaultTabBar backgroundColor='white'/>}
            >
                <WikrTab tabLabel="Wikr"/>
                <MoviesTab tabLabel="Favorite"/>
            </ScrollableTabView>
        );
    }
}

class WikrTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Wikr', index: 0},
			{title: 'Web', index: 1}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Wikr routes={this.routes} navigator={navigator} />
					break;					
			case 1: return <PlayTrack data={route.data} routes={this.routes} navigator={navigator} />
					break;
 		}
 	}	
	
	render() {
		return (
	  		<NavigationExperimental.Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class MoviesTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Movies', index: 0},
			{title: 'Movies Details', index: 1},
			{title: 'Web', index: 2}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Movies routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <MoviesDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;			
			case 2: return <PlayTrack data={route.data} routes={this.routes} navigator={navigator} />
					break;
 		}
 	}	
	
	render() {
		return (
	  		<NavigationExperimental.Navigator
				initialRoute={this.routes[0]}
				initialRouteStack={this.routes}
				renderScene={this.renderScene.bind(this)}
				style={{padding: 0}}
			  
				configureScene={(route, routeStack) =>
					NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
			/>
		)
	}
}

class Logout extends Component {
    constructor(props) {
        super(props);

        //appConfig.onLogOut();
    }

    render() {
        return null;
    }
}

class SearchTab extends Component {
	constructor(props) {
		super(props);
		this.routes = [
			{title: 'Search', index: 0},
			{title: 'Search Artist', index: 1},
			{title: 'Search Details', index: 2},
			{title: 'Search Top Track', index: 3},
			{title: 'Search Track', index: 4},
			{title: 'Play Track', index: 5}
		];
	}
		  
	renderScene(route, navigator) {
		switch (route.index) {
			case 0: return <Search routes={this.routes} navigator={navigator} />
					break;			
			case 1: return <SearchArtist data={route.data} routes={this.routes} navigator={navigator} />
					break;			
			case 2: return <SearchDetails data={route.data} routes={this.routes} navigator={navigator} />
					break;	
			case 3: return <SearchTopTrack data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 4: return <SearchTrack data={route.data} routes={this.routes} navigator={navigator} />
					break;
			case 5: return <PlayTrack data={route.data} routes={this.routes} navigator={navigator} />
					break;					
 		}
 	}

    render() {
        return (
            <NavigationExperimental.Navigator
                initialRoute={this.routes[0]}
                initialRouteStack={this.routes}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route, routeStack) =>
                    NavigationExperimental.Navigator.SceneConfigs.PushFromRight}
            />
        )
    }
}

export default AppContainer;