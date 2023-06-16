import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';


const AddIncomePage = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState(null);
    const [amount, setAmount] = useState('');

    const income = {
        sourceId: selectedSource,
        amount: amount,
        date: selectedDate,
    };

    useEffect(() => {
        const getSources = async () => {
            const { data } = await axios.get('/api/source/getsources');
            setSources(data);
        }
        getSources();
        console.log(sources);
    }, []);

    const onAddClick = async () => {
        income.sourceId = selectedSource.id;
        console.log(income);
        await axios.post(`/api/income/addincome`, income);
        setSelectedSource(null);
        setAmount('');
        setSelectedDate(new Date());
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={(source) => source.title}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source"/>}
                value={selectedSource}
                onChange={(e, selectedValue) => setSelectedSource(selectedValue)}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
             <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                //renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={onAddClick}>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
