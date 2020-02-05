import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ListItems from './ListItems'
import { Library, library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add(faTrash);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem !== "") {
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItem: {
          text: '',
          key: ''
        }
      })
    }
  }
  deleteItem(key) {
    const FilteredItems = this.state.items.filter(item =>
    item.key !== key);

    this.setState({
      items:FilteredItems
    })
  }
  setUpdate(text, key){
    const items = this.state.items;
    items.map(item=>{
      if(item.key === key){
        item.text=text;
      }
    })

    this.setState({
      items:items
    })
      
  }


  render() {
    return (



      <header>
        <h1>ToDo List</h1>
        <form id="todo-form" onSubmit={this.addItem}>
          <input type="text" placeholder="New Task"
            value={this.state.currentItem.text}
            onChange={this.handleInput} />

          <Button type="submit" variant="primary">Add</Button>{' '}


        </form>
        <ListItems items={this.state.items}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}></ListItems>


      </header>




    );
  }

}



export default App;
