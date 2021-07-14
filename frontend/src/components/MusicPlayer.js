import React, { Component } from 'react'
import { Grid, Typography, Card, IconButton, LinearProgress } from "@material-ui/core"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import SkipNextIcon from "@material-ui/icons/SkipNext"


export default class MusicPlayer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }
    playSong() {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
        fetch('/spotify/play-song', requestOptions)
        .then(response => {
            if(response.ok){
                console.log("Play")
            }
            else {
                console.log("Error")
            }
        })
    }

    pauseSong() {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
        fetch('/spotify/pause-song', requestOptions)
        .then(response => {
            if(response.ok){
                console.log("Pause")
            }
            else {
                console.log("Error")
            }
        })
    }
    
    render() {
        const songProgress = (this.props.time/this.props.duration)*100
        return (
            <Card>
                <Grid container alignItems="center">
                    <Grid item align="center" xs={4}>
                        <img src={this.props.image_url} height="100%" width="100%" />
                    </Grid>
                    <Grid item align="center" xs={8}>
                        <Typography component="h5" variant="h5">
                            {this.props.title}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle1">
                            {this.props.artist}
                        </Typography>
                        <div>
                            <IconButton>
                                {this.props.is_playing ? <PauseIcon onClick={() => this.pauseSong()} /> : <PlayArrowIcon onClick={() => this.playSong()} />}
                            </IconButton>
                            <IconButton>
                                <SkipNextIcon />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                <LinearProgress variant="determinate" value={songProgress}/>
            </Card>
        )
    }
}
