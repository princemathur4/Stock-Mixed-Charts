import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';

class DateFilter extends Component {
    
    render() {
        return (
            <Menu.Item style={this.props.style}>
                <h2>{this.props.label}</h2>
                <Input 
                    type='date'
                    size='medium'
                    onChange={this.props.handleDate}
                    value={this.props.value}
                />
            </Menu.Item>
        );
    }
}

export default DateFilter;
