import { useState } from 'react';
import { ethers } from 'ethers';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import MintBackground from './AccessPassSamples/MintBackground.GIF'
import AsyncConnect from './AsyncConnect';



function FullScreenHook() {

    const [wallet, accessPassContract, accessPassAddress, web3] = AsyncConnect();
    const [mintAmount, setMintAmount] = useState();

    async function mint(mintAmount, wallet) {
        console.log("Mint ", mintAmount, " Access Passes");
        var price = ethers.utils.parseEther("1.95")['_hex'] * mintAmount
        console.log("Price:", price)
        // call transfer function
        accessPassContract.methods.mintAccessPass(mintAmount.toString()).send({ from: wallet, value: price })
    }

    function handleSlider(event, value) {
        event.preventDefault();
        setMintAmount(value);
    }

    function handleMint(event) {
        event.preventDefault();
        mint(mintAmount, accessPassContract, wallet);
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            fontFamily: [
                'Open Sans',
                'Roboto'
            ].join(','),
        }
    });

    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://www.blackboxcollective.io/">
                    Black Box Collective
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const MintButton = styled(Button)({
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'grey',
        fontFamily: [
            'Roboto',
        ].join(','),
        '&:hover': {
            backgroundColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: 'rgba(255, 255, 255, 0.16)',
        },
        '&:active': {
            boxShadow: '#fff',
            backgroundColor: '#fff',
            borderColor: '#fff',
        }
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid
                container
                component="main"
                sx={{
                    height: '100vh',
                    backgroundImage: `url(${MintBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'Transparent',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <CssBaseline />
                <Grid
                    item
                    container
                    direction="column"
                    alignItems="flex-end"
                    justify="flex-start"
                    sx={{
                        p: 4,
                        m: -2
                    }}
                >
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    display="flex"
                    justify="center"
                >
                    <Container
                        sx={{
                            width: 500,
                            height: 280,
                            backgroundColor: '#121212',
                            marginTop: -10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 8,
                            opacity: [1, 1, .92],
                        }}
                    >
                        <Box
                            component="form"
                            noValidate
                            sx={{
                                mt: 1,
                            }}>
                            <Typography
                                component="h1"
                                variant="Title"
                                fontWeight="fontWeightBold"
                                color="White"
                                align="center"
                                display='flex'
                                justifyContent='center'
                            >
                                BLACK BOX COLLECTIVE
                            </Typography>
                            <Slider
                                onChangeCommitted={(events, value) => handleSlider(events, value)}
                                aria-label="Mint Amount"
                                defaultValue={0}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={1}
                                sx={{
                                    color: 'text.primary'
                                }}
                            />
                            <MintButton
                                fullWidth
                                variant="contained"
                                type="submit"
                                onClick={(event) => handleMint(event)}
                            >
                                Mint
                            </MintButton>
                            <Typography
                                component="h4"
                                variant="Subtitle"
                                color="White"
                                align="center"
                                display='flex'
                                justifyContent='center'
                                sx={{
                                    m: 1
                                }}
                            >
                                Connected Wallet: {wallet}
                            </Typography>
                            <Typography
                                component="h4"
                                variant="Subtitle"
                                color="White"
                                align="center"
                                display='flex'
                                justifyContent='center'
                                sx={{
                                    m: 1
                                }}
                            >
                                Contract Address: {accessPassAddress}
                            </Typography>
                            <Copyright sx={{ mt: 1 }} />
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default FullScreenHook;