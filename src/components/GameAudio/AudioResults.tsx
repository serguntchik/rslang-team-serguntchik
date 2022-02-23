import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import VolumeUpIcon from './VolumeUpIcon';
import { resultGame } from './AudioGame';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '2px 10px 2px 10px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const AudioResults: React.FC<{ result: resultGame[] }> = ({ result }) => {
    const navigate = useNavigate();

    const handleRefresh = () => {
        navigate('/games');
    };

    return (
        <div className="result--page">
            <Button size="small" sx={{ height: '40px' }} onClick={handleRefresh}>
                НАЗАД
            </Button>
            <TableContainer sx={{ margin: '0 auto', maxWidth: 600 }}>
                <Table sx={{ width: 400, maxWidth: '100%' }} size="small" aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>WORDS</StyledTableCell>
                            <StyledTableCell align="right">ANSWER</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {result.map((row) => (
                            <TableRow
                                key={row.word}
                                sx={{ backgroundColor: row.answer === true ? 'rgb(47 177 52)' : '#ffdfd4' }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.word}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <VolumeUpIcon path={row.audio} width="20px" />
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default AudioResults;
