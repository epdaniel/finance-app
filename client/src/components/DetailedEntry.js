import React, { useState, useRef, useEffect } from 'react'
import { MdClose } from 'react-icons/md';
import { Grid, TextField, Typography } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../css/DetailedEntry.css';

export const DetailedEntry = ({ showModal, setShowModal }) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const modalRef = useRef()

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false)
        }
    }

    useEffect(() => {
        const keyHandler = e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false)
            }
        }
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [setShowModal, showModal])

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

    return (
        <>
            {showModal ? (
                <div className='backgroundDiv' ref={modalRef} onClick={closeModal}>
                    <div className='wrapperDiv'>
                        <MdClose className='closeButton' aria-label='Close' onClick={() => setShowModal(false)}></MdClose>
                        <form>
                            <Grid container className='EntryContainer' spacing={10} direction='row' justify='center' alignItems='center'>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant='h4'>Add Transaction</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id='desc' label='Description' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id='amount' label='Amount' type='number' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id='category' label='Category' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id='subcat' label='Sub-Category' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker id='date' value={selectedDate} onChange={handleDateChange} />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                {/* <button onClick={this.addEntry}>Add transaction</button> */}
                            </Grid>
                        </form>
                    </div>
                </div>
            ) : null
            }
        </>
    )
}