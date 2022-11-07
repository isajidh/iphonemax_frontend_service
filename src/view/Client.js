import React, { Component } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import AddToCartModal from '../model/AddToCartModal';


export class Client extends Component {
    static displayName = Client.name;

    constructor(props) {
        super(props);
        this.state = { items: [], loading: true, loadedSuccess: false };
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
    renderItemsTable(items) {
        return <Container style={{ paddingTop: "10px", paddingLeft: "0px" }}>
            <Row>
                <Col>
                    <Table striped bordered hover variant="dark">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!items || items.length <= 0 ?
                                <tr>
                                    <td colSpan="6" align="center"><b>No Items yet</b></td>
                                </tr>
                                : items.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.description}
                                        </td>
                                        <td>
                                            {item.price}
                                        </td>
                                        <td align="center">
                                            <div>
                                                <AddToCartModal
                                                    item={item} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>;
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.loadedSuccess
                ? this.renderItemsTable(this.state.items)
                : <p>Could not load items</p>;

        return (
            <div>
                <h1 id="tabelLabel" >Product Catalog (Client)</h1>
                {contents}
            </div>
        );
    }
}
