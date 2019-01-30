import React from 'react';
import styled from '@emotion/styled';
import firebase from 'firebase/app';

import presets, { colors } from '../../utils/presets';
import { rhythm, options } from '../../utils/typography';
import { buttonStyles } from '../../utils/styles';

import Layout from '../../components/layout';
import Container from '../../components/container';

const config = {
  apiKey: "AIzaSyBHdpnrCvJei57UHA6aJU682mnF2pGyzYU",
  authDomain: "doc-collection-e7de5.firebaseapp.com",
  databaseURL: "https://doc-collection-e7de5.firebaseio.com",
  projectId: "doc-collection-e7de5",
  storageBucket: "doc-collection-e7de5.appspot.com",
  messagingSenderId: "1006231203782"
};
firebase.initializeApp(config);

const formInput = {
  backgroundColor: `#fff`,
  border: `1px solid ${colors.ui.bright}`,
  borderRadius: presets.radius,
  color: colors.brand,
  fontFamily: options.headerFontFamily.join(`,`),
  padding: rhythm(1 / 2),
  verticalAlign: `middle`,
  transition: `all ${presets.animation.speedDefault} ${
    presets.animation.curveDefault
  }`,
  "::placeholder": {
    color: colors.lilac,
    opacity: 1,
  },
};

const StyledForm = styled(`form`)`
  margin: 0;
`;

const Label = styled(`label`)`
  :after {
    content: ${props => (props.isRequired ? `'*'` : ``)};
    color: ${colors.warning};
  }
`;

const SingeLineInput = styled('input')`
  ${formInput};
  width: 100%;

  :focus {
    border-color: ${colors.gatsby};
    outline: 0;
    box-shadow: 0 0 0 0.1rem ${colors.ui.bright};
  }
`;

const Submit = styled(`input`)`
  ${buttonStyles.default};
  margin-top: 20px;
`;

const StyledButton = styled(`button`)`
  ${buttonStyles.default};
  margin-left: 10px;
  margin-top: 20px;
`;

class IndexRoute extends React.Component {
  _isMounted = false;
  
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      init: false,
      bookTitle: 'notSet',
      error: '',
      url: '',
      description: '',
      links: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        if (this._isMounted) {
          this.setState({ uid: user.uid });
        }
      }
    });

    firebase.database().ref('links').on('value', snapshot => {
      const result = snapshot.val();
      if (this._isMounted && this.state.init === false) {
        this.setState({ init: true });
      }
      if (result !== null) {
        const links = [];
          Object.keys(result).forEach(link => {
            links.push(result[link]);
          })
          if (this._isMounted) {
            this.setState({ links: links });
          }
      } else {
        if (this._isMounted) {
          this.setState({ links: [] });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  shouldGetData(cache) {
    if (cache && cache.timestamp) {
      const difference = Math.floor((new Date().getTime() - cache.timestamp) / 1000);
      return difference > 30;
    }
    return true;
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const link = {
      url: this.state.url,
      description: this.state.description
    };

    const newLinkRef = firebase.database().ref('links').push();
    newLinkRef.set(link)
      .catch(err => {
        if (this._isMounted) {
          this.setState({ error: 'Could not post link' });
        }
      })

    this.setState({ url: '', description: '' });
  }

  handleLogin(event) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        if (this._isMounted) {
          this.setState({ uid: res.user.uid });
        }
      })
  }

  handleLogout(event) {
    firebase.auth().signOut()
      .then(res => {
        if (this._isMounted) {
          this.setState({ uid: null });
        }
      });
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <Container>
          {this.state.links.map((link, index) => (
            <div key={index}>
              <div>url: {link.url}</div>
              <div>description: {link.description}</div>
            </div>
          ))}
          {this.state.init && <div
            css={{
              borderTop: `2px solid ${colors.gatsby}`,
              fontFamily: options.headerFontFamily.join(`,`),
              marginTop: rhythm(3),
              paddingTop: `${rhythm(1)}`,
            }}
          >
            {this.state.error && (
              <div>{this.state.error}</div>
            )}
            <div
              css={{
                backgroundColor: colors.ui.light,
                borderRadius: presets.radius,
                color: colors.gatsby,
                fontFamily: options.headerFontFamily.join(`,`),
                padding: '15px',
              }}
            >
              <StyledForm onSubmit={this.handleSubmit} autoComplete="off">
                <Label isRequired htmlFor="url">
                  Url
                </Label>
                  <SingeLineInput
                    name="url"
                    type="text"
                    required
                    aria-label='LinkUrl'
                    value={this.state.url}
                    onChange={this.handleChange}
                  />
                <Label>
                  Description
                </Label>
                <SingeLineInput
                  name="description"
                  type="text"
                  aria-label='LinkDescription'
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <Submit
                  type="submit"
                  value="Add new Link"
                  onClick={() => this.submitButton.blur()}
                  ref={(submitButton) => { this.submitButton = submitButton }}
                />
                {this.state.uid ? (
                  <StyledButton onClick={this.handleLogout}>Logout</StyledButton>
                ) : (
                  <StyledButton onClick={this.handleLogin}>Login</StyledButton>
                )}
              </StyledForm>
            </div>
          </div>}
        </Container>
      </Layout>
    );
  }
}

export default IndexRoute;
