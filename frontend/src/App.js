import React, { Component } from "react";
import axios from 'axios'
import CustomModal from "./components/Modal";
import './App.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// const todoItems = [
//   {
//     id: 1,
//     title: "Go to Market",
//     description: "Buy ingredients to prepare dinner",
//     completed: true,
//   },
//   {
//     id: 2,
//     title: "Study",
//     description: "Read Algebra and History textbook for the upcoming test",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Sammy's books",
//     description: "Go to library to return Sammy's books",
//     completed: true,
//   },
//   {
//     id: 4,
//     title: "Article",
//     description: "Write article on how to use Django with React",
//     completed: false,
//   },
// ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [], //todoItem
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList =() => {
    axios
    .get("/api/todos/")
    .then( (res) => this.setState({todoList: res.data}))
    .catch( (err) => console.log("get error: ", err))
  }

  toggle = () => {
    this.setState({modal: !this.state.modal});
  };

  handleSubmit = (item) => {
    this.toggle();
    
  if(item.id) {
    axios
    .put(`/api/todos/${item.id}/`, item)
    .then( (res) => this.refreshList())
    .catch( (err) => console.log("put error: ", err));
  } else {
  axios
  .post("/api/todos/", item)
  .then( (res) => this.refreshList())
  .catch( (err) => console.log("post error: ", err))
  }
  
  }

  handleDelete = (item) => {
    axios
    .delete(`/api/todos/${item.id}/`, item)
    .then(() => {
      // Remove the item from the UI without reloading
      this.setState((prevState) => ({
        todoList: prevState.todoList.filter((todo) => todo.id !== item.id),
      }));
    })
    .catch( (err) => console.log("delete error: ", err));
  }

  createItem =() => {
    const item = {title: "", description: "" , completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal })
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal })
  }


  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active bg-light " : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active bg-light"}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed == viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="todo-list list-group-item d-flex justify-content-between align-items-center"
        onClick={() => this.editItem(item)}
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
          
          
        >
          {item.title}
        </span>
        <span>
          
          <button
            className="btn btn-sm btn-danger"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
              this.handleDelete(item)
            }}
          >
            X
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4 d-flex align-items-center">
                <button
                  className="btn btn-success rounded-circle"
                  style={{ width: '50px', height: '50px' }}
                  onClick={this.createItem}
                >
                  <FontAwesomeIcon icon={faPlus} size="xl" />
                </button>
                <h2 className="ml-5 mb-0">To Do List</h2>
              </div>
              <ht />
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? 
        <CustomModal
         activeItem = {this.state.activeItem}
         toggle = {this.toggle}
         onSave = {this.handleSubmit} />
         : null
      }
      </main>
    );
  }
}

export default App;