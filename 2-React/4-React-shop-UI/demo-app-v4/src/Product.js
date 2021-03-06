import React, { Component } from 'react';
import classNames from 'classnames';
import Review from './Review';
import ReviewForm from './ReviewForm';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1,
            reviews: []
        }
    }
    changeTab(tab) {
        this.setState({ currentTab: tab }, () => {
            let { product } = this.props;
            let apiUrl = `http://0.0.0.0:8080/api/products/${product.id}/reviews`
            fetch(apiUrl)
                .then(response => response.json())
                .then(reviews => {
                    reviews = reviews || []
                    this.setState({ reviews })
                });
        });
    }
    handleNewReview(review) {
        let { product } = this.props;
        let apiUrl = `http://0.0.0.0:8080/api/products/${product.id}/reviews`
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
            .then(response => response.json())
            .then(review => {
                let { reviews } = this.state;
                reviews = reviews.concat(review);
                this.setState({ reviews });
            });
    }
    handleBuyBtnClick() {
        let { product, onBuy } = this.props;
        let qty = this.refs.qtyField.value;
        onBuy(product, Number.parseInt(qty, 10));
    }
    renderBuyBtn(product) {
        if (true) return (
            <div>
                <button className="btn btn-sm btn-primary" onClick={() => { this.handleBuyBtnClick() }}>buy</button>
                &nbsp;
                <select className="" ref="qtyField">
                    {[1, 2, 3, 4, 5].map((n, idx) => <option key={idx}>{n}</option>)}
                </select>
            </div>
        )
        else return null;
    }
    renderReviews() {
        let { reviews } = this.state;
        return reviews.map((review, idx) => {
            return <Review review={review} key={idx} />
        });
    }
    renderTabPanel(product) {
        let { currentTab } = this.state;
        let panel;
        switch (currentTab) {
            case 1: {
                panel = (<div>{product.description}</div>)
                break;
            }
            case 2: {
                panel = (<div>Not Yet</div>)
                break;
            }
            case 3: {
                panel = (
                    <div>
                        {this.renderReviews()}
                        <ReviewForm onNewReview={(review) => { this.handleNewReview(review) }} />
                    </div>
                )
                break;
            }
            default:
                panel = null;
        }
        return panel;
    }
    render() {
        let { product } = this.props;
        let { currentTab } = this.state;
        return (
            <div>
                <div className="list-group-item" >
                    <div className="row">
                        <div className="col-3 col-sm-3 col-md-3">
                            <img src={product.image} className="img-fluid" alt='product' />
                        </div>
                        <div className="col-9 col-sm-9 col-md-9">
                            <h5>{product.name}</h5>
                            <h6>&#8377;{product.price}</h6>
                            <p>{product.description}</p>
                            {this.renderBuyBtn(product)}
                            <hr />
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className={`nav-link ${currentTab === 1 ? 'active' : ''}`} onClick={() => this.changeTab(1)}>Description</a>
                                </li>
                                <li className="nav-item">
                                    <a className={classNames('nav-link', { active: currentTab === 2 })} onClick={() => this.changeTab(2)}>Specification</a>
                                </li>
                                <li className="nav-item">
                                    <a className={classNames('nav-link', { active: currentTab === 3 })} onClick={() => this.changeTab(3)}>Reviews</a>
                                </li>
                            </ul>
                            {this.renderTabPanel(product)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;