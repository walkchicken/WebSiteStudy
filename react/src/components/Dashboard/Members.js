import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getAPI, postAPI } from '../UserFunctions';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         flexGrow: 1,
//     },
// }));

export default class Test extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        getAPI(`/shows`)
            .then(res => {
                const posts = res.data;
                this.setState({ posts });
            })
    }

    deleteRow(id, e) {
        postAPI(`/shows/delete/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);

                const posts = this.state.posts.filter(item => item.id !== id);
                this.setState({ posts });
            })

    }

    render() {
        return (
            <React.Fragment>
                <Link to={'/dashboard'}>
                    <Title>Members</Title>
                </Link>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Birth Day</TableCell>
                            <TableCell>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>
                                    {post.id}
                                </TableCell>
                                <TableCell>
                                    {post.first_name}
                                </TableCell>
                                <TableCell >
                                    {post.last_name}
                                </TableCell>
                                <TableCell align="right">{post.email}</TableCell>
                                <TableCell align="right">{post.number}</TableCell>
                                <TableCell align="right">{post.birthday}</TableCell>
                                <TableCell align="right">{post.address}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={(e) => this.deleteRow(post.id, e)}>
                                        <DeleteForeverIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button >
                    <Link to={'/register'}>
                        Update
                    </Link>
                </Button>
               
            </React.Fragment>
        );
    }
}