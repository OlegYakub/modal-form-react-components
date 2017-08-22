import React, {Component} from "react";
import ReactDOM from 'react-dom';
//material-ui components
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Close from 'material-ui-icons/Close';
//styles
var styles = {
  input: {
    marginLeft: 30,
    width: 50,
  },

  btn: {
    marginLeft: 20,
  },

  icon: {
    fill: '#F44336'
  }
}

//component
export default class ListItemComponent extends Component {

  handleSelectChange(event, index, value) {
   this.props.changeSelect(this.props.index, value)
  };

  handleNumberChange(event, value) {
    this.props.changeNumber(this.props.index, value)
  };

  render() {
    return (
      <li className="list__item"> 
        <SelectField
          value={this.props.data.select}
          onChange={this.handleSelectChange.bind(this)}
        >
          <MenuItem value={1} primaryText="Twin" />
          <MenuItem value={2} primaryText="Tripple" />
          <MenuItem value={3} primaryText="Quadro" />
        </SelectField>
        <TextField
          defaultValue={this.props.data.num}
          onChange={this.handleNumberChange.bind(this)}
          style={styles.input}
          type={'number'}
          id="num"
        />
        <FloatingActionButton 
          iconStyle={styles.icon} 
          style={styles.btn} 
          mini={true} 
          backgroundColor={"rgba(244, 67, 54, 0.1)"}
          onClick={this.props.deleteItem.bind(this, this.props.index)}
          >
          <Close />
        </FloatingActionButton>
      </li>  
    )
  }
};