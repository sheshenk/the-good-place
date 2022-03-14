
// material-ui
import { Alert, Box, Button, Card, CardContent, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { CardActions, CardHeader, CardMedia, IconButton } from '@mui/material';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import firebaseSvc, { useAuthListener } from 'views/firebaseAuth/firebaseSvc';
import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import { ShareOutlined, StarBorder } from '@mui/icons-material';
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
                            by {props.author}
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

    const [projs, setProjs] = useState([])

    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [body, setBody] = useState('')
    const [externalLink, setExternalLink] = useState('')
    const [open, setOpen] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title && body) {
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
        const getProjs = async () => {
            const projs = await firebaseSvc.allStoriesFromDb((snapshot) => {
                let projs = snapshot.val()
                setProjs(Object.values(projs))
            })
        }
        getProjs()
    }, [])

    if (!loggedIn) return <Navigate to='/pages/login/login3' />

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
                                variant='outlined'
                                style={{ width: '100%' }}
                                label="Image URL"
                                onChange={(event) => setImg(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                variant='outlined'
                                style={{ width: '100%' }}
                                label="Link to another page"
                                onChange={(event) => setExternalLink(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                style={{ width: '100%' }}
                                label="Content"
                                onChange={(event) => setBody(event.target.value)}
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Button
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
                            Sign Up
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
                    projs.map(proj => <StoriesCard {...proj} />)
                }
            </Grid>
        </Box>
    )

};

export default Stories;
