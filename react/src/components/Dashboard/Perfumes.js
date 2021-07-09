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

export default class Perfumes extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        getAPI(`/perfumes`)
            .then(res => {
                const posts = res.data;
                this.setState({ posts });
            })
    }
    render() {
        return (
            <React.Fragment>
                <Link to={'/dashboard'}>
                    <Title>Perfumes</Title>
                </Link>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Perfumes</TableCell>
                            <TableCell>Name Perfumes</TableCell>
                            <TableCell>Made In</TableCell>
                            <TableCell>ID Type</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>
                                    {post.manuochoa}
                                </TableCell>
                                <TableCell>
                                    {post.tennuochoa}
                                </TableCell>
                                <TableCell >
                                    {post.xuatxu}
                                </TableCell>
                                <TableCell >
                                    {post.maloai}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              
            </React.Fragment>
        );
    }
}