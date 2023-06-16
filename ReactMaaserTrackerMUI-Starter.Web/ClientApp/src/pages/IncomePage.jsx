import React, { useState, useEffect } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const IncomePage = () => {

    const [groupBySource, setGroupBySource] = useState(false);
    const [sourceIncomes, setSourceIncomes] = useState([]);

    useEffect(() => {
        const getIncomeSource = async () => {
            const { data } = await axios.get('/api/source/getincomesource');
            setSourceIncomes(data);
            console.log(data);
        }
        getIncomeSource();
    }, []);

    const groupedIncomes = sourceIncomes.map((source) => {
        return {
            source: source.title,
            incomes: source.incomes,
        };
    });

    const incomes = sourceIncomes.flatMap((source) => {
        return source.incomes.map((income) => {
            return {
                source: source.title,
                amount: income.amount,
                date: income.date,
            };
        });
    });  

    incomes.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Typography variant="h2" gutterBottom component="div">
                Income History
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={groupBySource}
                        onChange={(event) => setGroupBySource(event.target.checked)}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Group by source"
            />

            {!groupBySource ? (
                <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {incomes.map((incomes, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                        {incomes.source}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>{incomes.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>{new Date(incomes.date).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                groupedIncomes.map(({ source, incomes }) => (
                    <div key={source} sx={{ width: '80%', maxWidth: '80%' }}>
                        <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
                            {source}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {incomes.map((income) => (
                                        <TableRow key={income.id}>
                                            <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                                {source}
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>{income.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>{new Date(income.date).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))
            )}
        </Container>
    );
}

export default IncomePage;
