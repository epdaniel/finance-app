import "../css/Entry.css";
const { Component } = require("react");

class Entry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.entry.description,
            amount: props.entry.amount,
            category: props.entry.category,
            subCategory: props.entry.subCategory,
            date: props.entry.timestamp,
        };
    }

    render() {
        return (
            <div className="Entry">
                <b className="EntryDesc">{this.state.description} </b>
                <label>Amount:</label>
                <b>{this.state.amount} </b>
                <label>Category:</label>
                <b>{this.state.category} </b>
                <label>Sub-category:</label>
                <b>{this.state.subCategory} </b>
                <label>Date:</label>
                <b>{this.state.date} </b>
            </div>
        );
    }
}

export default Entry;
