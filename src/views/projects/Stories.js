
// material-ui
import { Alert, Box, Button, Card, CardContent, CircularProgress, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { CardActions, CardHeader, CardMedia, IconButton } from '@mui/material';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import firebaseSvc, { useAuthListener } from 'views/firebaseAuth/firebaseSvc';
import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import { ShareOutlined } from '@mui/icons-material';
import { IconHeart } from '@tabler/icons';



const StoriesCard = (props) => {
    return (
        <Grid item xs={3}>
            <a href={props.href}>
                <Card sx={{ maxWidth: '100%' }}>
                    <CardHeader
                        title={props.title}
                        subheader={props.date}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={props.img}
                        alt=""
                    />
                    <CardContent>
                        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                            {props.author === '' ? "" : `By ${props.author}`}
                        </Typography>
                        <Typography variant="body2" color="#000">
                            {props.desc}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add project">
                            <IconHeart />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareOutlined />
                        </IconButton>
                    </CardActions>
                </Card>
            </a>
        </Grid>
    );
}

const Stories = () => {
    const { loggedIn, checkingStatus } = useAuthListener();

    const [stories, setStories] = useState([])

    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [body, setBody] = useState('')
    const [externalLink, setExternalLink] = useState('')
    const [open, setOpen] = useState(false)

    const [inputsDisabled, setInputsDisabled] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title && body) {
            setInputsDisabled(true)
            const data = {
                'title': title,
                'img': img,
                'desc': body,
                'author': firebaseSvc.getUserName(),
                'date': new Date(Date.now()).toLocaleString().split(',')[0],
                'href': externalLink
            }
            firebaseSvc.addStoryToDb(data)
        } else {
            setOpen(true)
        }
    }

    useEffect(() => {
        const getStories = async () => {
            await firebaseSvc.allStoriesFromDb((snapshot) => {
                let stories = snapshot.val()
                setStories(Object.values(stories).reverse())
            })
        }
        getStories()
    }, [])

    if (checkingStatus) return <CircularProgress/>

    if (!loggedIn) return <Navigate to='/login' />

    return (
        <Box>
            <MainCard title="Write your own story!" sx={{ mb: 2 }}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <TextField
                                variant='outlined'
                                style={{ width: '100%' }}
                                label="Title"
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                            disabled={inputsDisabled}
                                variant='outlined'
                                style={{ width: '100%' }}
                                label="Image URL"
                                onChange={(event) => setImg(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                            disabled={inputsDisabled}
                                variant='outlined'
                                style={{ width: '100%' }}
                                label="Link to another page"
                                onChange={(event) => setExternalLink(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            disabled={inputsDisabled}
                                variant='outlined'
                                style={{ width: '100%' }}
                                label="Content"
                                onChange={(event) => setBody(event.target.value)}
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Button
                        disabled={inputsDisabled}
                            color='inherit'
                            size='large'
                            sx={{

                                margin: '2%',
                                mt: 3,
                                height: 50,
                                width: `35%`
                            }}
                            variant='outlined'
                            type='submit'
                        >
                            Post
                        </Button>
                    </Grid>
                </form>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    message=""
                    onClose={()=>setOpen(false)}
                >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Enter title and body!
                    </Alert>
                </Snackbar>
            </MainCard>
            <Grid container spacing={2}>
                {
                    stories.map(proj => <StoriesCard {...proj} />)
                }
            </Grid>
        </Box>
    )

};

export default Stories;
