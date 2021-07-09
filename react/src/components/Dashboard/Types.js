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

export default class Types extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        getAPI(`/types`)
            .then(res => {
                const posts = res.data;
                this.setState({ posts });
            })
    }
    render() {
        return (
            <React.Fragment>
                  <Link to={'/dashboard'}>
                    <Title>Types</Title>
                </Link>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Type</TableCell>
                            <TableCell>Name Type</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.posts.map((post) => (
                            <TableRow >
                                <TableCell >
                                    {post.maloai}
                                </TableCell>
                                <TableCell >
                                    {post.tenloai}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="">
                    <Link color="primary" href="#" >
                        See more orders
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}