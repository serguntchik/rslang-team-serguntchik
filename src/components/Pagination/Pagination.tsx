import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationRoundedProps } from '../../utils/alias';

export const PaginationRounded: React.FC<PaginationRoundedProps> = (props) => {
    const { setPage } = props;

    return (
        <Stack spacing={2}>
            <Pagination count={30} variant="outlined" shape="rounded" onChange={(_, num) => setPage(num - 1)} />
        </Stack>
    );
};
