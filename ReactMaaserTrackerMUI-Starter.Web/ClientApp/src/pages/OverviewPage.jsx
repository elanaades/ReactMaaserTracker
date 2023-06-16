import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

const OverviewPage = () => {

    const [totalIncome, setTotalIncome] = useState('');
    const [totalMaaser, setTotalMaaser] = useState('');
    const [obligation, setObligation] = useState('');

    useEffect(() => {
        getTotalIncome();
        getTotalMaaser();
    }, []);

    
    const getTotalIncome = async () => {
        const { data } = await axios.get('/api/income/gettotalincome');
        setTotalIncome(data);
        setObligation(data * 0.1);
    }

    const getTotalMaaser = async () => {
        const { data } = await axios.get('/api/maaser/gettotalmaaser');
        setTotalMaaser(data);
    }

    const formatAsMoney = (amount) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return formatter.format(amount);
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                textAlign: 'center'
            }}
        >
            <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
                <Typography variant="h2" gutterBottom>
                    Overview
                </Typography>
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Total Income: {formatAsMoney(totalIncome)}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Total Maaser: {formatAsMoney(totalMaaser)}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" gutterBottom>
                        Maaser Obligated: {formatAsMoney(obligation)}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Remaining Maaser obligation: {totalMaaser >= obligation ? formatAsMoney(0) : formatAsMoney(obligation - totalMaaser)}
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default OverviewPage;
