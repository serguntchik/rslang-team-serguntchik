import * as React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { AppBar } from '@mui/material';
import MenuIcon from '@material-ui/icons/Menu';
import {
    Outlet, Link, useNavigate, useLocation,
} from 'react-router-dom';
import { MyContext } from '../../core/context';

const gamesRoute = { title: 'Игры', link: '/games' };
const wordsRoute = { title: 'Учебник', link: '/manual' };
const difficultWordsRoute = { title: 'Словарь', link: '/difficult' };
const teamRoute = { title: 'Команда', link: '/team' };

export const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const { currentUser, setCurrentUser } = React.useContext(MyContext);
    const pages = currentUser
        ? [gamesRoute, wordsRoute, difficultWordsRoute, teamRoute]
        : [gamesRoute, wordsRoute, teamRoute];
    const navigation = useNavigate();
    const location = useLocation();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('id');

        setCurrentUser!(null);
        location.pathname === '/difficult' && navigation('/');
    };

    return (
        <AppBar position="fixed" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                        <Link to="/">
                            <img src="/rslang_logo.svg" alt="RSLang" />
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link to={page.link}>{page.title}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Link to="/">
                            <img src="/rslang_logo.svg" alt="RSLang" />
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={page.title}
                                variant="text"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2 }}
                                component={Link}
                                to={page.link}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {currentUser ? (
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                                <p>{currentUser.name}</p>

                                <LogoutIcon style={{ cursor: 'pointer' }} onClick={logout} />
                            </div>
                        ) : (
                            <Button variant="text" sx={{ my: 2 }} component={Link} to="/login">
                                Войти
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            <Outlet />
        </AppBar>
    );
};
