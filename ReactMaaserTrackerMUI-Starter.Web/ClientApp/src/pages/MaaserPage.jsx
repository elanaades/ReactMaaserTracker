import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const MaaserPage = () => {

    const [maasers, setMaasers] = useState([]);

    useEffect(() => {
        const getMaasers = async () => {
            const { data } = await axios.get('/api/maaser/getallmaaser');
            setMaasers(data);
        }
        getMaasers();
    }, []);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Maaser Payments History
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Recipient</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maasers.map((m) => (
              <TableRow key={m.id}>
                <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                  {m.recipient}
                </TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>{m.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>{new Date(m.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MaaserPage;
