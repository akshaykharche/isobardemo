import React, { Component } from 'react';

export default class FacebookLogin extends Component {

    componentDidMount() {
        document.addEventListener('FB', this.initializeFacebookLogin);
    }

    componentWillUnmount() {
        document.removeEventListener('FB', this.initializeFacebookLogin);
    }

    initializeFacebookLogin = () => {
        this.FB = window.FB;
        this.checkLoginStatus();
    }

    checkLoginStatus = () => {
        this.FB.getLoginStatus(this.facebookLoginHandler);
    }

    facebookLogin = () => {
        if (!this.FB) return;

        this.FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                this.facebookLoginHandler(response);
            } else {
                this.FB.login(this.facebookLoginHandler, { scope: 'public_profile' });
            }
        });
    }

    facebookLoginHandler = response => {
        
        if (response.status === 'connected') {
            console.log(response.authResponse.accessToken);
            window.FB.api(
                '/me',
                'GET',
                {
                    "fields": "id,name,email,albums,picture",
                    "access_token": `${response.authResponse.accessToken}`
                }, userData => {
                    let result = {
                        ...response,
                        user: userData
                    };
                    this.props.onLogin(true, result);
                }
            );
            console.log(response.authResponse.accessToken);
            window.FB.api(
                '/me/albums',
                'GET',
                {
                    "fields": "id,name,link",
                    "access_token": "EAAH7zem3sBkBAGXHSLwM0bnS92tnZAfkcNR0dktzbY9qQ2yqVaPlOZAiBlQRnWzAAkWT59mAThFZBRXUGvVByncYt6ZBIi0lTtvp4aQcIJEcYpVsbzdEQuUnlEDliKU59NjZCwiybfqmZAtZC4V0v2WAsR4vXQNfuzWiY8FZAMYM7CGhufdMENgur8UNpZCoZAY3khnsgTVlm2kwZDZD"
                }, userData => {
                    let result = {
                        ...response,
                        user: userData
                    };
                    this.props.albums(true, result);
                }
            );

        } else {
            this.props.onLogin(false);
        }
    }

    render() {
        let { children } = this.props;
        return (
            <div onClick={this.facebookLogin}>
                {children}
            </div>
        );
    }
}



