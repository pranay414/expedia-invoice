import React, { Component } from 'react';
import { Menu, Grid, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './styles.css';
import ItemList from './components/ItemList';
import InvoiceArea from './components/InvoiceArea';
import { getItems } from './redux/actions';

function mapStateToProps(state) {
  return {
    loadingStatus: state.isLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getItems: () => dispatch(getItems())
  }
}

const Header = () => {
  return (
    <Menu borderless size='massive' inverted>
      <Menu.Item>
        Expedia Invoice
        </Menu.Item>
    </Menu>
  );
}
class App extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  render() {
    if (this.props.loadingStatus === null) {
      return (
        <Dimmer active>
          <Loader>Initializing...</Loader>
        </Dimmer>
      );
    }
    else if (this.props.loadingStatus === 1) {
      return (
        <Dimmer active>
          <Loader>Loading Invoice Dashboard....</Loader>
        </Dimmer>
      );
    }
    else if (this.props.loadingStatus === 0) {
      return (
        <Dimmer active>Failed to load...</Dimmer>
      );
    }

    return (
      <div>
        <Header />
        <Grid style={{ height: '80vh' }}>
          <Grid.Row style={{ height: '100%' }} divided>
            <Grid.Column width={8} verticalAlign='top'>
              <ItemList />
            </Grid.Column>
            <Grid.Column width={8} textAlign='center'>
              <InvoiceArea />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
