import React, { Component } from 'react'
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import { Link } from "react-router-dom"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { RadioGroup } from '@material-ui/core'
import { Collapse } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

export default class CreateRoom extends Component {
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {},
    }
    constructor(props) {
        super(props)
    
        this.state = {
             guestCanPause: this.props.guestCanPause,
             votesToSkip: this.props.votesToSkip,
             successMessage: "",
             errorMessage: ""
        }
        this.handleRoomButtonClicked = this.handleRoomButtonClicked.bind(this)
        this.handleVotesChange = this.handleVotesChange.bind(this)
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this)
        this.handleUpdateButtonClicked = this.handleUpdateButtonClicked.bind(this)
        console.log(this.state)
    }
    
    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value
        })
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value === 'true' ? true : false
        })
    }

    renderCreateButtons() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleRoomButtonClicked}>Create Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>
        )
    }

    renderUpdateButtons() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleUpdateButtonClicked}>Update Room</Button>
                </Grid>
            </Grid>
        )
    }

    handleRoomButtonClicked() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
            })
        }

        fetch('/api/create-room', requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.props.history.push("/room/"+ data.code)
        })
    }

    handleUpdateButtonClicked() {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode
            })
        }

        fetch('/api/update-room', requestOptions)
        .then((response) => {
            if (response.ok){
                this.setState({
                    successMessage: "Room updated successfully"
                })
            } 
            else {
                this.setState({
                    errorMessage: "Error updating room..."
                })

            }
            this.props.updateCallback()
        })
    }

    render() {
        const title = this.props.update ? "Update Room" : "Create a Room"
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Collapse align="center" in={this.state.errorMessage != "" || this.state.successMessage != ""}>
                        {this.state.successMessage != "" 
                        ? <Alert align="center" severity="success" onClose={() => this.setState({successMessage: ""})}>{this.state.successMessage}</Alert> : 
                        <Alert align="center" severity="error" onclose={() => this.setState({errorMessage: ""})}>{this.state.errorMessage}</Alert>}
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        {title}
                    </Typography>
                </Grid>

                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">Guest Control of Playback State</div>
                        </FormHelperText>
                        <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.handleGuestCanPauseChange}>
                            <FormControlLabel 
                                value="true"
                                control={<Radio color="primary" />} 
                                label="Play/Pause"
                                labelPlacement="bottom"

                            />

                            <FormControlLabel 
                                value="false"
                                control={<Radio color="secondary" />} 
                                label="No Control"
                                labelPlacement="bottom"

                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField 
                            required={true} 
                            type="number" 
                            defaultValue={this.props.votesToSkip} 
                            inputProps={{
                                min: 1,
                                style: {textAlign: "center"}
                            }}
                            onChange={this.handleVotesChange}
                        />
                        <FormHelperText>
                            <div align="center">
                                Votes Required to Skip Song
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
            </Grid>
        )
    }


}
