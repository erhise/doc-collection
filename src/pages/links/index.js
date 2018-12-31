import React from 'react';
import axios from 'axios';

import Layout from '../../components/layout';
import Container from '../../components/container';

class IndexRoute extends React.Component {
  _isMounted = false;
  
  constructor(props) {
    super(props);
    this.state = {
      bookTitle: 'notSet',
      url: '',
      description: '',
      links: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    console.log('mounted, doing request');
    axios.get('https://doc-collection-e7de5.firebaseio.com/links.json')
      .then(res => {
        if (this._isMounted) {
          const links = [];
          Object.keys(res.data).forEach(eachLink => {
            links.push(res.data[eachLink]);
          })
          this.setState({ links: [...this.state.links, ...links]});
          const objectToSave = {
            links,
            timestamp: new Date().getTime()
          };
          console.log(objectToSave);
          console.log(this.state.links);
        }
        console.log(res.data);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    const link = {
      url: this.state.url,
      description: this.state.description
    };
    console.log(link);
    axios.post('https://doc-collection-e7de5.firebaseio.com/links.json', link)
      .then(res => {
        console.log(res);
      })
    this.setState({
      url: '',
      description: ''
    });
    event.preventDefault();
  }

  handleButtonClick = async () => {
    this.setState({ bookTitle: 'loading...' });
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/s1gVAAAAYAAJ`);
    if (this._isMounted) {
      this.setState({ bookTitle: response.data.volumeInfo.title });
    }
  }

  render() {
    return (
      <Layout location={this.props.location}>
        <Container>
          <button onClick={this.handleButtonClick}>Get Book Title</button>
          <pre>{this.state.bookTitle}</pre>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <label>
              Link:
              <input type="text" name="url" value={this.state.url} onChange={this.handleChange} />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {this.state.links.map((link, index) => (
            <div key={index}>
              <div>url: {link.url}</div>
              <div>description: {link.description}</div>
            </div>
          ))}
        </Container>
      </Layout>
    );
  }
}

export default IndexRoute;
