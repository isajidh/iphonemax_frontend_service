import React, { Component } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import ItemModal from '../model/ItemModal';

// import AddToCartModal from '../model/AddToCartModal';


export class Catalog extends Component {
  static displayName = Catalog.name;

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
        if (!response.ok) {
          throw Error("Could not fetch data for that resource");
        }
        return response.json();
      })
      .then(returnedItems => this.setState({ items: returnedItems, loading: false, loadedSuccess: true }))
      .catch(err => {
        console.log(err);
        this.setState({ items: [], loading: false, loadedSuccess: false })
      });
  }
  addItemToState = item => {
    this.setState(previous => ({
      items: [...previous.items, item]
    }));
  }
  updateState = (id) => {
    this.populateItems();
  }
  deleteItemFromState = id => {
    const updated = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updated })
  }
  async deleteItem(id) {
    let confirmDeletion = window.confirm('Do you really wish to delete it?');
    if (confirmDeletion) {
      fetch(`${window.CATALOG_ITEMS_API_URL}/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          this.deleteItemFromState(id);
        })
        .catch(err => {
          console.log(err);
          window.alert("Could not delete the item.");
        });
    }
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
                      {item.price.toLocaleString()}
                    </td>
                    <td align="center">
                      <div>
                        <ItemModal
                          isNew={false}
                          item={item}
                          updateItemIntoState={this.updateState} />
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="danger" onClick={() => this.deleteItem(item.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <ItemModal isNew={true} addItemToState={this.addItemToState} />
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
        <h1 id="tabelLabel" align="center">Product Catalog</h1>
        {contents}
      </div>
    );
  }
}
