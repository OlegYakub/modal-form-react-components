import 'babel-polyfill';
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EventEmitter from '../react/EventEmitter';
import injectTapEventPlugin from 'react-tap-event-plugin';
//material-ui components
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Close from 'material-ui-icons/Close';
//my components
import ListComponent from './ListComponent';


injectTapEventPlugin();
//init EventEmitter
window.ee = new EventEmitter();
//style
var styles = {
  cancel: {
    marginLeft: 10
  },

  modalHeader: {
    backgroundColor: '#eee',
    boxShadow: 'none',
    marginBottom: 40
  },

  closeIcon: {
    fill: "#222"
  }
}
//data
var initialState = [
  {
    num:'22',
    select: 1
  },
  {
    num:'33',
    select: 1
  },
  {
    num:'12',
    select: 1
  },
];

//component
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      data: initialState.concat(),
    }
  };

  handleToggle() {
    this.setState({open: !this.state.open})
  };

  saveChanges() {
    window.ee.emit('save-changes');
    this.setState({open: false})
  };

  componentDidMount() {
    window.ee.addListener('saved', (items) => {
      this.setState({data: items});
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Click the burger"
            onLeftIconButtonTouchTap={() => this.handleToggle()}
          />
          <Dialog
            modal={false}
            open={this.state.open}
            onRequestClose={() => this.handleToggle()}
          >
            <AppBar
              iconElementRight={ <FlatButton  icon={<Close style={styles.closeIcon}/>}/> }
              showMenuIconButton={false}
              style={styles.modalHeader}
              title="Структура номеров"
              onRightIconButtonTouchTap={() => this.handleToggle()}
              titleStyle={{color: "#222"}}
            />
            <ListComponent data={this.state.data}></ListComponent>
            <RaisedButton label="Сохранить" primary={true} onClick={() => this.saveChanges()} />
            <FlatButton style={styles.cancel} label="Отмена" onClick={() => this.handleToggle()}/>
          </Dialog>
        </div>   
      </MuiThemeProvider>
    );
  }
}
