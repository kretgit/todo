import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {

  state = {
      searchText: ''
  };

  render() {
    return (
        <input
            type="text"
            value={this.state.searchText}
            onChange={this.onSearchInput}
            className="form-control search-input"
            placeholder="type to search"
        />
    );
  }

  onSearchInput = (e) => {
    const text = e.target.value;
    this.setState({searchText: text});
    this.props.setSearchText(text);
  }

}