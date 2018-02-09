import React from 'react';
import { List, ListItem } from 'material-ui/List';

import SelectableList from './SelectableList';


export default class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            toggleItem: false,
        }
    }

    onDelete(todo, event) {
        this.props.onDelete(todo);
    }

    onEdit(todo, event) {
        if(todo.id === this.props.isEdit || !this.state.toggleItem) {
            this.state.toggleItem = !this.state.toggleItem;
        }
        if(this.state.toggleItem && event.target.tagName !== 'A') {
            this.props.onEdit(todo);
        } else {
            this.props.offEdit();
        }
    }

    render() {
        return (
            <SelectableList {...this.props}>
                {
                    this.props.todos.map(todo => {
                        return (
                            <ListItem key={todo.id}
                                      value={todo.id}
                                      onClick={this.onEdit.bind(this, todo)}
                            >
                                <span>{todo.text} </span>
                                <a onClick={this.onDelete.bind(this, todo)}
                                   style={{color: 'red'}}
                                   href='#'
                                >
                                    &#10008;
                                </a>
                            </ListItem>
                        )
                    })
                }
            </SelectableList>
        );
    }
}