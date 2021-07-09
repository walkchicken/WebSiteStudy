import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getAPI } from '../UserFunctions';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default class Moneys extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        getAPI(`/moneys`)
            .then(res => {
                const posts = res.data;
                this.setState({ posts });
            })
    }
    render() {
        return (
            <React.Fragment>
                 <Link to={'/dashboard'}>
                    <Title>Prices</Title>
                </Link>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Perfumes</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.posts.map((post) => (
                            <TableRow >
                                <TableCell >
                                    {post.manuochoa}
                                </TableCell>
                                <TableCell >
                                    {post.gia}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}