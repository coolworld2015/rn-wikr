'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
	TouchableWithoutFeedback,
    ListView,
    ScrollView,
    ActivityIndicator,
    TextInput,
	BackAndroid,
	Image,
	Dimensions,
	RefreshControl	
} from 'react-native';

class SearchTrack extends Component {
    constructor(props) {
        super(props);
		
		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				this.props.navigator.pop();
			}
			return true;
		});	
		
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

		this.state = {
			dataSource: ds.cloneWithRows([]),
			searchQuery: ''
		}	
		
		if (props.data) {
			this.state = {			
				dataSource: ds.cloneWithRows([]),
				searchQueryHttp: props.data.searchQuery,
				showProgress: true,
				resultsCount: 0,
				recordsCount: 15,
				positionY: 0,
				searchQuery: '',
				refreshing: false
			}
        };
 
    }

    componentDidMount() {
		this.setState({
            width: Dimensions.get('window').width
        });
        this.getItems();
    }
	
    getItems() {
		let json = [
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				name: 'Bomby bags made from T-shirts',
				trackId: '1',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/14906834_947251632085425_3101138519701294434_n.png?oh=49e9d0a3f14339f96137876efe727ca9&oe=59CF4C1C',
				artist: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				name: 'Apple Roses With Cinnamon And Cream Cheese. So Elegant, So Delicious!',
				trackId: '2',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/s173x172/18259557_10154288489106529_5042799940653285376_n.jpg?oh=7242ac96b7db9249a3d2289c8e9f819f&oe=59A0FE87',
				artist: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				name: 'I sewed this very skirt. Yes, out of a shirt',
				trackId: '2',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/p720x720/18943012_1108625199281400_6120594963945226240_n.jpg?oh=6fdf41418372f2a14336d8efd904af69&oe=599DDA55',
				artist: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				name: 'Vanilla panna cotta with strawberry gelatin',
				trackId: '3',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-0/p75x225/19060043_1117791485031438_5856102670120566329_n.jpg?oh=eaadf94870b73edcd960776f4e4042a7&oe=59D7E76F',
				artist: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},			
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				name: 'Bomby bags made from T-shirts',
				trackId: '4',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/14906834_947251632085425_3101138519701294434_n.png?oh=49e9d0a3f14339f96137876efe727ca9&oe=59CF4C1C',
				artist: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				name: 'Apple Roses With Cinnamon And Cream Cheese. So Elegant, So Delicious!',
				trackId: '5',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/s173x172/18259557_10154288489106529_5042799940653285376_n.jpg?oh=7242ac96b7db9249a3d2289c8e9f819f&oe=59A0FE87',
				artist: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				name: 'I sewed this very skirt. Yes, out of a shirt',
				trackId: '6',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/p720x720/18943012_1108625199281400_6120594963945226240_n.jpg?oh=6fdf41418372f2a14336d8efd904af69&oe=599DDA55',
				artist: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				name: 'Vanilla panna cotta with strawberry gelatin',
				trackId: '7',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-0/p75x225/19060043_1117791485031438_5856102670120566329_n.jpg?oh=eaadf94870b73edcd960776f4e4042a7&oe=59D7E76F',
				artist: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				name: 'Bomby bags made from T-shirts',
				trackId: '11',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/14906834_947251632085425_3101138519701294434_n.png?oh=49e9d0a3f14339f96137876efe727ca9&oe=59CF4C1C',
				artist: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				name: 'Apple Roses With Cinnamon And Cream Cheese. So Elegant, So Delicious!',
				trackId: '12',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/s173x172/18259557_10154288489106529_5042799940653285376_n.jpg?oh=7242ac96b7db9249a3d2289c8e9f819f&oe=59A0FE87',
				artist: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				name: 'I sewed this very skirt. Yes, out of a shirt',
				trackId: '112',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/p720x720/18943012_1108625199281400_6120594963945226240_n.jpg?oh=6fdf41418372f2a14336d8efd904af69&oe=599DDA55',
				artist: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				name: 'Vanilla panna cotta with strawberry gelatin',
				trackId: '13',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-0/p75x225/19060043_1117791485031438_5856102670120566329_n.jpg?oh=eaadf94870b73edcd960776f4e4042a7&oe=59D7E76F',
				artist: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},			
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				name: 'Bomby bags made from T-shirts',
				trackId: '14',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/14906834_947251632085425_3101138519701294434_n.png?oh=49e9d0a3f14339f96137876efe727ca9&oe=59CF4C1C',
				artist: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				name: 'Apple Roses With Cinnamon And Cream Cheese. So Elegant, So Delicious!',
				trackId: '15',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/s173x172/18259557_10154288489106529_5042799940653285376_n.jpg?oh=7242ac96b7db9249a3d2289c8e9f819f&oe=59A0FE87',
				artist: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				name: 'I sewed this very skirt. Yes, out of a shirt',
				trackId: '16',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/p720x720/18943012_1108625199281400_6120594963945226240_n.jpg?oh=6fdf41418372f2a14336d8efd904af69&oe=599DDA55',
				artist: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				name: 'Vanilla panna cotta with strawberry gelatin',
				trackId: '17',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-0/p75x225/19060043_1117791485031438_5856102670120566329_n.jpg?oh=eaadf94870b73edcd960776f4e4042a7&oe=59D7E76F',
				artist: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				name: 'Bomby bags made from T-shirts',
				trackId: '21',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/14906834_947251632085425_3101138519701294434_n.png?oh=49e9d0a3f14339f96137876efe727ca9&oe=59CF4C1C',
				artist: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				name: 'Apple Roses With Cinnamon And Cream Cheese. So Elegant, So Delicious!',
				trackId: '22',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/s173x172/18259557_10154288489106529_5042799940653285376_n.jpg?oh=7242ac96b7db9249a3d2289c8e9f819f&oe=59A0FE87',
				artist: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				name: 'I sewed this very skirt. Yes, out of a shirt',
				trackId: '22',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/p720x720/18943012_1108625199281400_6120594963945226240_n.jpg?oh=6fdf41418372f2a14336d8efd904af69&oe=599DDA55',
				artist: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				name: 'Vanilla panna cotta with strawberry gelatin',
				trackId: '23',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-0/p75x225/19060043_1117791485031438_5856102670120566329_n.jpg?oh=eaadf94870b73edcd960776f4e4042a7&oe=59D7E76F',
				artist: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},			
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				name: 'Bomby bags made from T-shirts',
				trackId: '24',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/14906834_947251632085425_3101138519701294434_n.png?oh=49e9d0a3f14339f96137876efe727ca9&oe=59CF4C1C',
				artist: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				name: 'Apple Roses With Cinnamon And Cream Cheese. So Elegant, So Delicious!',
				trackId: '25',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/s173x172/18259557_10154288489106529_5042799940653285376_n.jpg?oh=7242ac96b7db9249a3d2289c8e9f819f&oe=59A0FE87',
				artist: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				name: 'I sewed this very skirt. Yes, out of a shirt',
				trackId: '26',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/p720x720/18943012_1108625199281400_6120594963945226240_n.jpg?oh=6fdf41418372f2a14336d8efd904af69&oe=599DDA55',
				artist: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				name: 'Vanilla panna cotta with strawberry gelatin',
				trackId: '27',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-0/p75x225/19060043_1117791485031438_5856102670120566329_n.jpg?oh=eaadf94870b73edcd960776f4e4042a7&oe=59D7E76F',
				artist: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				name: 'Bomby bags made from T-shirts',
				trackId: '211',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/14906834_947251632085425_3101138519701294434_n.png?oh=49e9d0a3f14339f96137876efe727ca9&oe=59CF4C1C',
				artist: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				name: 'Apple Roses With Cinnamon And Cream Cheese. So Elegant, So Delicious!',
				trackId: '212',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/s173x172/18259557_10154288489106529_5042799940653285376_n.jpg?oh=7242ac96b7db9249a3d2289c8e9f819f&oe=59A0FE87',
				artist: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				name: 'I sewed this very skirt. Yes, out of a shirt',
				trackId: '2112',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/p720x720/18943012_1108625199281400_6120594963945226240_n.jpg?oh=6fdf41418372f2a14336d8efd904af69&oe=599DDA55',
				artist: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				name: 'Vanilla panna cotta with strawberry gelatin',
				trackId: '213',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-0/p75x225/19060043_1117791485031438_5856102670120566329_n.jpg?oh=eaadf94870b73edcd960776f4e4042a7&oe=59D7E76F',
				artist: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},			
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				name: 'Bomby bags made from T-shirts',
				trackId: '214',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-1/14906834_947251632085425_3101138519701294434_n.png?oh=49e9d0a3f14339f96137876efe727ca9&oe=59CF4C1C',
				artist: 'https://www.facebook.com/wikrcom/videos/1117043335106253/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				name: 'Apple Roses With Cinnamon And Cream Cheese. So Elegant, So Delicious!',
				trackId: '215',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/s173x172/18259557_10154288489106529_5042799940653285376_n.jpg?oh=7242ac96b7db9249a3d2289c8e9f819f&oe=59A0FE87',
				artist: 'https://www.facebook.com/wikrcom/videos/vl.720074554828774/853479708129285/?type=1',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				name: 'I sewed this very skirt. Yes, out of a shirt',
				trackId: '216',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t15.0-10/p720x720/18943012_1108625199281400_6120594963945226240_n.jpg?oh=6fdf41418372f2a14336d8efd904af69&oe=599DDA55',
				artist: 'https://www.facebook.com/wikrcom/videos/1108612915949295/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			},
			{
				url: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				name: 'Vanilla panna cotta with strawberry gelatin',
				trackId: '217',
				image: 'https://scontent.fhen1-1.fna.fbcdn.net/v/t1.0-0/p75x225/19060043_1117791485031438_5856102670120566329_n.jpg?oh=eaadf94870b73edcd960776f4e4042a7&oe=59D7E76F',
				artist: 'https://www.facebook.com/wikrcom/videos/1117790755031511/',
				//album: 'Wikr.com',
				duration: 'Wikr.com'
			}
		];
		
		this.setState({
			serverError: false,
            recordsCount: 15,
            positionY: 0,
			searchQuery: '',
			
			dataSource: this.state.dataSource.cloneWithRows(json.slice(0, 15)),
			resultsCount: json.length,
			responseData: json,
			filteredItems: json,
			refreshing: false,
			showProgress: false
        });
	}
	
    pressRow(rowData) {
		let data = {
			trackId: rowData.trackId,
			name: rowData.name,
			image: rowData.image,
			artist: rowData.artist,
			album: rowData.album,
			duration: rowData.duration,
			url: rowData.url
		};
		
		this.props.navigator.push({
			index: 1,
			data: data
		});
    }
	
    renderRow(rowData) {
		var image;
 
		image = <Image
			source={{uri: rowData.image}}
			style={styles.img}
		/>
		
        return (
            <TouchableHighlight
                onPress={()=> this.pressRow(rowData)}
                underlayColor='#ddd'
            >
                <View style={styles.imgsList}>
 
					{image}
 
                    <View style={styles.textBlock}>
                        <Text style={styles.textItemBold}>
							{rowData.name}
						</Text>                           
						
						<Text style={styles.textItemBold}>
							Wikr.com
						</Text>                        

                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    refreshData(event) {
        if (this.state.showProgress === true) {
            return;
        }

        if (this.state.filteredItems === undefined) {
            return;
        }

        let items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
        items = this.state.filteredItems.slice(0, recordsCount);

        if (event.nativeEvent.contentOffset.y >= positionY) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                recordsCount: recordsCount + 10,
                positionY: positionY + 400
            });
        }
    }

    onChangeText(text) {
        if (this.state.responseData == undefined) {
            return;
        }
        var arr = [].concat(this.state.responseData);
        var items = arr.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) >= 0);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }

	refreshDataAndroid() {
		this.setState({
			showProgress: true,
			resultsCount: 0
		});

		setTimeout(() => {
			this.getItems()
		}, 300);
	}
	
    goBack(rowData) {
		this.props.navigator.pop();
	}

    clearSearchQuery() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.responseData.slice(0, 15)),
            resultsCount: this.state.responseData.length,
            filteredItems: this.state.responseData,
            positionY: 0,
            recordsCount: 15,
            searchQuery: ''
        });
    }
	
    render() {
        let errorCtrl, loader, image;

        if (this.state.serverError) {
            errorCtrl = <Text style={styles.error}>
                Something went wrong.
            </Text>;
        }

        if (this.state.showProgress) {
            loader = <View style={styles.loader}>
                <ActivityIndicator
                    size="large"
                    animating={true}
                />
            </View>;
        }

		if (this.state.searchQuery.length > 0) {
			image = <Image
				source={require('../../../img/cancel.png')}
				style={{
					height: 20,
					width: 20,
					marginTop: 10
				}}
			/>;
		}

        return (
            <View style={styles.container}>
				<View style={styles.header}>
					<View>
						<TouchableHighlight
							onPress={()=> this.refreshDataAndroid()}
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
								 
							</Text>
						</TouchableHighlight>	
					</View>
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textLarge}>
								Wikr
							</Text>
						</TouchableHighlight>	
					</View>						
					<View>
						<TouchableHighlight
							underlayColor='#ddd'
						>
							<Text style={styles.textSmall}>
							</Text>
						</TouchableHighlight>	
					</View>
				</View>
				
                <View style={styles.iconForm}>
					<View>
						<TextInput
							underlineColorAndroid='rgba(0,0,0,0)'
							onChangeText={this.onChangeText.bind(this)}
							style={{
								height: 45,
								padding: 5,
								backgroundColor: 'white',
								borderWidth: 3,
								borderColor: 'white',
								borderRadius: 0,
								width: this.state.width * .90,
							}}
							value={this.state.searchQuery}
							placeholder="Search here">
						</TextInput>
					</View>
					<View style={{
						height: 45,
						backgroundColor: 'white',
						borderWidth: 3,
						borderColor: 'white',
						marginLeft: -10,
						paddingLeft: 5,
						width: this.state.width * .10,
					}}>			
						<TouchableWithoutFeedback
							onPress={() => this.clearSearchQuery()}
						>			
							<View>					
								{image}
							</View>
						</TouchableWithoutFeedback>
					</View>
                </View>
				
				{errorCtrl}

                {loader}

				<ScrollView onScroll={this.refreshData.bind(this)} scrollEventThrottle={16}
					refreshControl={
						<RefreshControl
							enabled={true}
							refreshing={this.state.refreshing}
							onRefresh={this.refreshDataAndroid.bind(this)}
						/>
					}
				>
					<ListView
						enableEmptySections={true}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
					/>
				</ScrollView>

				<View>
					<Text style={styles.countFooter}>
						Records: {this.state.resultsCount} 
					</Text>
				</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgsList: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
	iconForm: {
		flexDirection: 'row',
		borderColor: 'lightgray',
		borderWidth: 3
	},
    countHeader: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#F5FCFF',
    },
    img: {
        height: 95,
        width: 90,
        borderRadius: 10,
        margin: 10
    },    
	textBlock: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between'
    },	
	textItemBold: {
		fontWeight: 'bold', 
		color: 'black'
    },	
	textItem: {
		color: 'black'
    },
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
	textInput: {
		height: 45,
		marginTop: 0,
		padding: 5,
		backgroundColor: 'white',
		borderWidth: 3,
		borderColor: 'lightgray',
		borderRadius: 0
	},
	itemWrap: {
		flex: 1,
		flexDirection: 'column', 
		flexWrap: 'wrap'
    },	
	row: {
		flex: 1,
		flexDirection: 'row',
		padding: 20,
		alignItems: 'center',
		borderColor: '#D7D7D7',
		borderBottomWidth: 1,
		backgroundColor: '#fff'
	},		
	rowText: {
		backgroundColor: '#fff', 
		color: 'black', 
		fontWeight: 'bold'
	},	
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: '#48BBEC',
		color: 'white',
		fontWeight: 'bold'
    },
    loader: {
		justifyContent: 'center',
		height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default SearchTrack;
