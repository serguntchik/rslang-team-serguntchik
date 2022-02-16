import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GroupsProps } from '../../utils/alias';

export const Groups: React.FC<GroupsProps> = (props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { setGroup } = props;

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Groups
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    onClick={() => {
                        setGroup(0);
                        handleClose();
                    }}
                >
                    Group 1
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setGroup(1);
                        handleClose();
                    }}
                >
                    Group 2
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setGroup(2);
                        handleClose();
                    }}
                >
                    Group 3
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setGroup(3);
                        handleClose();
                    }}
                >
                    Group 4
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setGroup(4);
                        handleClose();
                    }}
                >
                    Group 5
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setGroup(5);
                        handleClose();
                    }}
                >
                    Group 6
                </MenuItem>
            </Menu>
        </div>
    );
};
