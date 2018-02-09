import React from 'react';
var uuid = require('uuid/v4');

import TodoForm from "./components/TodoForm";
import TodoList from './components/TodoList';


export default class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            formMounted: true,
            text: '',
            isEdit: 0,
            todos: []
        }
    }

    componentDidMount() {
        var dbPromise = this.props.firebaseApp.getTodos();

        var that = this;
        dbPromise.then(function(snapshot) {
            var todos = [];
            snapshot.forEach(function(data) {
                var todo = data.val();
                todos.push(todo);
            });
            that.setState({todos: todos});
        });
    }

    handleTodoAdd(todoText) {
        console.log(todoText);
        //debugger;
        var newTodo = {
            id: uuid(),
            text: todoText
        };

        this.props.firebaseApp.addTodo(newTodo);

        this.setState({todos: this.state.todos.concat(newTodo)});
        this.resetVals();
    }

    handleTodoDelete(deleteTodo) {
        console.log(deleteTodo);
        //debugger;
        var newTodos = [];
        this.state.todos.forEach(todo => {
            if(todo.id !== deleteTodo.id) {
                newTodos.push(todo);
            }
        });
        this.props.firebaseApp.removeTodo(deleteTodo.id);

        this.setState({todos: newTodos});
    }

    // ______EDIT TODO_______
    turnOnEdit(editedTodo) {
        this.setState({
            text: editedTodo.text,
            isEdit: editedTodo.id
        });
    }
    resetVals() {
        this.setState({
            text: '',
            isEdit: 0
        });
    }

    changeText(todoText) {
        this.setState({text: todoText});
    }

    updateTodo(updatedTodo) {

        var todos = this.state.todos;
        for(var i = 0; i < todos.length; i++) {
            if(todos[i].id === updatedTodo.id) {
                todos.splice(i, 1, updatedTodo);

                this.props.firebaseApp.updateTodo(updatedTodo);
                break;
            }
        }

        this.setState({todos: todos});
        this.resetVals();
    }
    //_____________________

    render() {
        return (
            <div class="container" style={{marginTop:"20px"}}>

                <TodoForm {...this.state}
                          onTodoAdd={this.handleTodoAdd.bind(this)}
                          onChangeText={this.changeText.bind(this)}
                          onUpdate={this.updateTodo.bind(this)}
                />

                <div class="mt-4">
                    <TodoList {...this.state}
                              onDelete={this.handleTodoDelete.bind(this)}
                              onEdit={this.turnOnEdit.bind(this)}
                              offEdit={this.resetVals.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
