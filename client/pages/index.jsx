import { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import io from 'socket.io-client';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_SERVER;
const socket = io(baseUrl); 

export default function Home() {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        const storedSessionId = localStorage.getItem('sessionId');
        const storedUsername = localStorage.getItem('username');

        if (storedSessionId && storedUsername) {
            setSessionId(storedSessionId);
            setUsername(storedUsername);
            setLoggedIn(true);
        }

        axios.get(`${baseUrl}/api/comments`).then(response => {
            setComments(response.data);
        });

        socket.on('newComment', (newComment) => {
            setComments(prevComments => [newComment, ...prevComments]);
        });

        return () => socket.off('newComment');
    }, []);

    const handleLogin = () => {
        axios.post(`${baseUrl}/api/login`, { username })
            .then(response => {
                const { sessionId } = response.data;
                setSessionId(sessionId);
                setLoggedIn(true);
                
                localStorage.setItem('sessionId', sessionId);
                localStorage.setItem('username', username);
            });
    };

    const handleCommentSubmit = () => {
        if (!sessionId) {
            console.error('User not logged in');
            return;
        }


        axios.post(`${baseUrl}/api/comments`, { username, comment, sessionId });
        setComment(''); 
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setSessionId(null);
        setUsername('');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('username');
    };

    return (
        <Container maxWidth="sm">
            {!loggedIn ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h5">Login</Typography>
                    <TextField 
                        label="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6">Welcome, <strong>{username}</strong></Typography>
                    <Button style={{ position: 'absolute', top: "1rem", right: "3rem" }} variant="outlined" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                    <TextField 
                        label="Comment" 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleCommentSubmit}>Post Comment</Button>
                    <List>
                        {comments.map((c, index) => (
                            <ListItem key={index} 
                                      style={{ 
                                          justifyContent: c.username === username ? 'flex-end' : 'flex-start',
                                          margin: '4px 0',
                                      }}>
                                <ListItemText 
                                    primary={<strong>{c.username}</strong>} 
                                    secondary={
                                        <>
                                            {c.comment}
                                            <br />
                                            <span style={{ fontSize: '0.8em', color: '#757575',
                                                display: 'flex',
                                                justifyContent: c.username === username ? 'flex-start' : 'flex-end',
                                            }}>
                                                {new Date(c.timestamp).toLocaleString()}
                                            </span>
                                        </>
                                    }
                                    style={{ 
                                        textAlign: c.username === username ? 'right' : 'left', 
                                        backgroundColor: c.username === username ? '#B6B6B6' : '#f5f5f5', 
                                        borderRadius: '8px',
                                        padding: '8px',
                                        display: 'inline-block', 
                                        maxWidth: '70%',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Container>
    );
}
