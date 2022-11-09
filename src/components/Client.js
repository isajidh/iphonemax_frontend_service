import React, { Component } from 'react';
// import { Col, Container, Row, Table } from 'react-bootstrap';
// import AddToCartModal from '../model/AddToCartModal';
// import { useState, useEffect } from "react";
import "../assets/styles/Client.scss";
import iphoneImage from "../assets/Images/iphone-xs.jpg";


export class Client extends Component {
    static displayName = Client.name;

    constructor(props) {
        super(props);
        this.state = { items: [], loading: true, loadedSuccess: false, q: "", searchParam: ["name", "description", "price"], filterParam: ["All"] };
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.populateItems();
    }

    async populateItems() {
        fetch(`${window.CATALOG_ITEMS_API_URL}`)
            .then(response => {
                return response.json();
            })
            .then(returnedItems => this.setState({ items: returnedItems, loading: false, loadedSuccess: true }))
            .catch(err => {
                console.log(err);
                this.setState({ items: [], loading: false, loadedSuccess: false })
            });
    }

    search(items) {
        return items.filter((item) => {
            // console.log(item.name.match(/(\w+\s+\w+)/));
            if (item.name.match(/(\w+\s+\w+)/)[0] == this.state.filterParam) {
                return this.state.searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(this.state.q.toLowerCase()) > -1
                    );
                });
            } else if (this.state.filterParam == "All") {
                return this.state.searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(this.state.q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    renderItemsTable(items) {
        return <div className="wrapper">
            {/* SEARCH BAR */}
            <div className="search-wrapper">
                <label htmlFor="search-form">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="search-input"
                        placeholder="Search for..."
                        value={this.state.q}
                        onChange={(e) => this.setState({ q: e.target.value })}
                    />
                    <span className="sr-only">Search iPhones here</span>
                </label>

                <div className="select">
                    <select
                        onChange={(e) => {
                            this.setState({ filterParam: e.target.value });
                        }}
                        className="custom-select"
                        aria-label="Filter Countries By Region"
                    >
                        <option value="All">Filter By Model</option>
                        <option value="iPhone 14">iPhone 14</option>
                        <option value="iPhone SE">iPhone SE</option>
                        <option value="iPhone 13">iPhone 13</option>
                        <option value="iPhone 12">iPhone 12</option>
                        <option value="iPhone 11">iPhone 11</option>
                        <option value="iPhone XS">iPhone XS</option>
                        <option value="iPhone XR">iPhone XR</option>
                        <option value="iPhone X">iPhone X</option>
                    </select>
                    <span className="focus"></span>
                </div>
            </div>
            {/* SEARCH END */}
            <ul className="card-grid">
                {this.search(items).map((item) => (
                    <li>
                        <article className="card" key={item.name}>
                            <div className="card-image">
                                <img src={iphoneImage} alt={item.name} />
                            </div>
                            <div className="card-content">
                                <h2 className="card-name">{item.name}</h2>
                                <ol className="card-list">
                                    <li>
                                        Description:{" "}
                                        <span>{item.description}</span>
                                    </li>
                                    <li>
                                        Price: <span>{item.price.toLocaleString()}</span>
                                    </li>
                                </ol>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>
        </div>
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.loadedSuccess
                ? this.renderItemsTable(this.state.items)
                : <p>Could not load items</p>;

        return (
            <div>
                <h1 id="tabelLabel" align="center" >iPhoneMax Catalog</h1>
                {contents}
            </div >
        );
    }
}
