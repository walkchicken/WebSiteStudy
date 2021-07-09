import React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { getAPI } from '../UserFunctions';
import axios from 'axios';


export default class Perfumes extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        getAPI(`/all`)
            .then(res => {
                const posts = res.data;
                this.setState({ posts });
            })
    }
    render() {
        return (
            <React.Fragment>
                <Title>All PerFumes</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name Perfumes</TableCell>
                            <TableCell>Type Name</TableCell>
                            <TableCell>Made In</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>
                                    {post.tennuochoa}
                                </TableCell>
                                <TableCell>
                                    {post.tenloai}
                                </TableCell>
                                <TableCell >
                                    {post.xuatxu}
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