import React,{useState,useEffect} from 'react';
import {Link,useHistory,useLocation} from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png"
import useStyles from './styles';
import { useDispatch} from 'react-redux';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/auth');
        setUser(null);
    }
    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
        //JWT ..
    }, [location]);
    return (
        <AppBar className={classes.AppBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories   </Typography >
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{ user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>logout</Button>
                    </div>
                ) : (
                        <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
                )}
</Toolbar>
        </AppBar>
    )
}

export default Navbar
