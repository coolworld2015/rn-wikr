'use strict';

import React, {Component} from 'react';
import {
    WebView
} from 'react-native';

class PlayTrack extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			url: ''
		};
		
		if (props.data) {
			this.state = {
				url: props.data.url,
				html: 'https://www.facebook.com/wikrcom/videos/1118835278260392/'
			}
		}
    }

    render() {
        return (
            <WebView
                source={{uri: this.state.url}}
				mediaPlaybackRequiresUserAction={false}
            />
        )
    }
}

export default PlayTrack;