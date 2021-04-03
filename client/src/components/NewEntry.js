import React from 'react'
//import '../css/NewEntry.css';

export const NewEntry = ({ showModal, setShowModal }) => {
    return <>{showModal ? <div>modal</div> : null}</>
}

// class NewEntry extends Component {
//     // eslint-disable-next-line 
//     constructor(props) {
//         super(props);
//     }

//     addEntry() {
//         alert("Please fill all inputs!")
//         //Save inputs to state
//         // check all inputs are there
//         //send inputs using axios
//         //updated the entries (how to send alert to main app? - maybe take parameters in constructor?)
//         // axios.post('/entry/new').then((res) => {
//         //   this.loadAllEntries(); //probably bad, just add entry
//         // });
//     }

//     render() {
//         return <div className="NewEntry">
//             <label className="NewEntryLabel" htmlFor="desc">Description </label>
//             <input className="NewEntryInput" id="desc" name="desc"></input><br></br>
//             <label className="NewEntryLabel" htmlFor="amount">Amount </label>
//             <input className="NewEntryInput" id="amount" name="amount"></input><br></br>
//             <label className="NewEntryLabel" htmlFor="category">Category </label>
//             <input className="NewEntryInput" id="category" name="category"></input><br></br>
//             <label className="NewEntryLabel" htmlFor="subcat">Sub-Category </label>
//             <input className="NewEntryInput" id="subcat" name="subcat"></input><br></br>
//             <label className="NewEntryLabel" htmlFor="date">Date </label>
//             <input className="NewEntryInput" id="date" name="date"></input><br></br>
//             <button onClick={this.addEntry}>Add transaction</button>
//         </div>;
//     }


// }

// export default NewEntry;