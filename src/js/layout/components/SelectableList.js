import React from 'react';
import { List, makeSelectable } from 'material-ui/List';
import PropTypes from 'prop-types';


let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends React.Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
        };

        componentWillMount() {
            this.setState({
                selectedIndex: 0,
            });
        }

        handleRequestChange = (event, value) => {
            this.setState({
                selectedIndex: value,
            });
        };

        toggleClick = (event) => {

            if(event.target.childNodes[0].attributes === undefined) {
                return;
            }
            if(event.target.childNodes[0].getAttribute('value') === this.state.selectedIndex) {     // if you click on the same element that is currently selected, then the selectedIndex becomes 0 to turn off any selections altogether, otherwise, the selectedIndex will just move to a different item in the mapped array of <ListItem> elements
                this.setState({
                    selectedIndex: 0
                })
            }
        };

        render() {
            return (
                <ComposedComponent
                    value={this.props.isEdit}
                    onChange={this.handleRequestChange}
                    onClick={this.toggleClick}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

export default SelectableList;