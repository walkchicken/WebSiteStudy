import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom'

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <Link to='/dashboard'>
                    <DashboardIcon />
                </Link>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Link to='/members'>
                    <ShoppingCartIcon />
                </Link>
            </ListItemIcon>
            <ListItemText primary="Members" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Link to='/perfumes'>
                    <PeopleIcon />
                </Link>
            </ListItemIcon>
            <ListItemText primary="Perfumes" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Link to='/types'>
                    <BarChartIcon />
                </Link>
            </ListItemIcon>
            <ListItemText primary="Types" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Link to='/moneys'>
                    <LayersIcon />
                </Link>
            </ListItemIcon>
            <ListItemText primary="Moneys" />
        </ListItem>
    </div>
);

