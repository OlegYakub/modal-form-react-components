import React, {Component} from "react";
import ReactDOM from 'react-dom';
//material-ui components
import FlatButton from 'material-ui/FlatButton';
//my components
import ListItemComponent from './ListItemComponent';

//styles
const style = {
  marginTop: 12,
  marginBottom: 12,
};

//component
export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data.concat()
    }
  };

  creactItem() {
    this.state.data.push({
      num: "0",
      select: 1
    }); 
    this.setState({data: this.state.data});
  };

  deleteItem(index) {
    var newData = this.state.data.concat();
    newData.splice(index, 1);
    this.setState({data: newData});
  };  

  componentDidMount() {
    window.ee.addListener('save-changes', () => {
      window.ee.emit('saved', this.state.data);
    });
  };

  changeNumber(index, value) {
    var UpdatedItem = {
      num: value,
      select: this.state.data[index].select
    }
    this.state.data[index] = UpdatedItem;
    this.setState({data: this.state.data});
  };

  changeSelect(index, value) {
    var UpdatedItem = {
      num: this.state.data[index].num,
      select: value
    }
    this.state.data[index] = UpdatedItem;
    this.setState({data: this.state.data});
  };
  
  render() {
    return( 
      <div>
        <ul>
          {
            this.state.data.map((item, index) => {
              return (
              <ListItemComponent 
                data={item} 
                index={index}
                key={index}
                deleteItem={this.deleteItem.bind(this)}
                changeNumber={this.changeNumber.bind(this)}
                changeSelect={this.changeSelect.bind(this)}
              />)
            })
          }
        </ul>
        <FlatButton label="Добавить" primary={true} style={style} onClick={this.creactItem.bind(this)}/>
      </div>
    )
  }
}

