import { ethers } from 'ethers';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import MintBackground from './BlackBoxSamples/MintBackground.GIF'
import logo from './BlackBoxSamples/logo.png'
import { contractAddr, contract } from './Contract';


function SideScreen() {

    const [mintAmount, setMintAmount] = useState(1);
    const [wallet, setWallet] = useState();
    const [web3, setWeb3] = useState();


    const etherscanLink = "https://etherscan.io/address/";

    const providerOptions = {
        injected: {
            package: null
        },
        walletconnect: {
            package: WalletConnectProvider,
            network: "ethereum",
            options: {
                infuraId: "bad8cc770bef49dc88683bf2290205c8" // required
            }
        }
    };

    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions
    });

    async function connect() {
        try {
            let provider;
            provider = await web3Modal.connect();
            let web3 = new Web3(provider);
            setWeb3(web3);
            web3.eth.getAccounts().then(async (addr) => {
                setWallet(addr[0].toLocaleLowerCase());
            });
        } catch (e) {
            console.log(e);
            return;
        }
    }

    async function mint() {
        const price = 1.95 * mintAmount;
        const mintable_price = price.toString();

        const tx = {
            from: wallet,
            to: contractAddr,
            value: ethers.utils.parseEther(mintable_price)["_hex"],
            gas: 200000 * mintAmount,
            data: contract.methods.mintAccessPass(mintAmount).encodeABI(),
        };

        const createTransaction = await web3.eth.sendTransaction(tx);
    }

    function handleSlider(event, value) {
        event.preventDefault();
        setMintAmount(value);
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
                {'Copyright ?? '}
                <Link color="inherit" href="https://www.blackboxcollective.io/">
                    Black Box Collective
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    function WalletAddress() {
        const link = etherscanLink.concat(wallet)
        return (
            <Typography align='center'>
                <Link color="inherit" href={link}>
                    {wallet}
                </Link>
            </Typography>
        )
    }

    function ContractAddress() {
        const link = etherscanLink.concat(contractAddr)
        return (
            <Typography>
                <Link color="inherit" href={link}>
                    {contractAddr}
                </Link>
            </Typography>
        )
    }

    const marks = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        }
    ];

    const Web3Button = styled(Button)({
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'white',
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
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundImage: `url(${MintBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <Box
                        sx={{
                            mt: 1,
                            marginTop: 20,
                            mx: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                height: 250,
                                width: 375,
                            }}
                            alt="The house from the offer."
                            src={logo}
                        />
                        <Slider
                            onChangeCommitted={(events, value) => handleSlider(events, value)}
                            aria-label="Mint Amount"
                            defaultValue={1}
                            step={1}
                            marks={marks}
                            min={1}
                            max={2}
                            sx={{
                                color: 'text.primary',
                                mb: 4
                            }}
                        />
                        {wallet &&
                            <Web3Button
                                fullWidth
                                variant="contained"
                                onClick={mint}
                            >
                                Mint
                            </Web3Button>
                        } {!wallet &&
                            <Web3Button
                                fullWidth
                                variant="contained"
                                onClick={() => connect()}
                            >
                                Connect
                            </Web3Button>
                        }
                        <Typography
                            component="h4"
                            variant="Subtitle"
                            color="White"
                            align="center"
                            display='flex'
                            justifyContent='center'
                            sx={{
                                mt: 2
                            }}
                        >
                            Connected Wallet:
                        </Typography>
                        <WalletAddress />
                        <Typography
                            component="h4"
                            variant="Subtitle"
                            color="White"
                            align="center"
                            display='flex'
                            justifyContent='center'
                            sx={{
                                mt: 1
                            }}
                        >
                            Contract Address:
                        </Typography>
                        <ContractAddress />
                        <Copyright sx={{ mt: 1 }} />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SideScreen;