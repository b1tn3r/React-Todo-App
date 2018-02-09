import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';


export default class TodoForm extends React.Component {

    componentDidMount() {
        this.refs.todoElement.focus();
    }

    onSubmit(event) {
        let form = event.target;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            // On Valid Submit
            var todoText = this.props.text.trim();

            if(this.props.isEdit) {
                var updatedTodo = {
                    id: this.props.isEdit,
                    text: todoText
                };
                this.props.onUpdate(updatedTodo);

            } else {
                this.props.onTodoAdd(todoText);
            }

            // Reset Form
            form.reset();
            form.classList.remove('was-validated');
            return;
        }
        // Add Validation Styling
        form.classList.add('was-validated');
    }

    onInputChange(event) {
        this.props.onChangeText(event.target.value);
    }

    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <div class="form-group">
                        <input type="text" class="form-control" ref="todoElement" value={this.props.text} onChange={this.onInputChange.bind(this)} required />
                        <div class="invalid-feedback">Insert To-Do</div>
                    </div>
                    <RaisedButton type="submit" label="Submit" />
                </form>

                <div class="mt-3 p-3" style={{border: "2px inset lightgray", height: "100px"}}>
                    <h5>Preview:</h5>
                    <label style={{fontWeight:"bold"}}>{this.props.text}</label>
                </div>
            </div>
        );
    }
}
