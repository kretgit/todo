import React from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'}
    ];

    render() {

        const {filter} = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button
                    type={"button"}
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => this.onFilterButtonClick(name)}
                >
                    {label}
                </button>
            )
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>


        );
    }

    onFilterButtonClick = (filter) => {
        this.props.setFilter(filter)
    }
}
