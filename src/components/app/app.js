import React from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from "../item-add-form/item-add-form";

import './app.css';

export default class App extends React.Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
            /*
            {label: 'Drink Coffee', important: false, id: 1},
            {label: 'Make Awesome App', important: true, id: 2},
            {label: 'Have a lunch', important: false, id: 3}
             */
        ],
        searchText: '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        const newArr = [...this.state.todoData.filter(item => item.id !== id)];
        this.setState({todoData: newArr})
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            const newArr = [...this.state.todoData, newItem];
            return {todoData: newArr}
        })
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {todoData: this.toggleProperty(todoData, id, 'important')}
        })
    };

    onToggleDone = (id) => {
        /*
        this.setState(({todoData}) => {
            const idx = todoData.findIndex(item => item.id === id);
            const oldItem = todoData[idx];
            const newItem = {...oldItem, done: !oldItem.done};
            const newArray = [...todoData];
            newArray[idx] = newItem;
            return {
                todoData: newArray
            }
        })
         */
        this.setState(({todoData}) => {
            return {todoData: this.toggleProperty(todoData, id, 'done')}
        })

    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex(item => item.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        const newArray = [...arr];
        newArray[idx] = newItem;
        return newArray;
    }

    searchTodos = (data, text) => {
        if (text.length === 0) {
            return data
        }
        return data.filter(item => item.label.toLowerCase().indexOf(text.toLowerCase()) > -1);
    };

    setSearchText = (searchText) => {
        this.setState({searchText})
    };

    filterTodos = (data, filter) => {
        switch (filter) {
            case 'all':
                return data;
            case 'active':
                return data.filter(item => !item.done);
            case 'done':
                return data.filter(item => item.done);
            default: return data;
        }
    };

    setFilter = (filter) => {
        this.setState({filter})
    };


    render() {

        const {todoData, searchText, filter} = this.state;

        const visibleData = this.filterTodos(this.searchTodos(todoData, searchText), filter);

        const doneCount = todoData.filter(item => item.done === true).length;

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel setSearchText={this.setSearchText}/>
                    <ItemStatusFilter setFilter={this.setFilter} filter={filter}/>
                </div>

                <TodoList
                    todos = {visibleData}
                    onDeleted = {this.deleteItem}
                    onToggleImportant = {this.onToggleImportant}
                    onToggleDone = {this.onToggleDone}
                />

                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }
}