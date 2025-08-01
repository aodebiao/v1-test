import type {FC} from "react";
import {Box, Paper, styled} from "@mui/material";
import HeaderSection from "@views/login/sections/header.";
import Footer from "@views/login/sections/footer";
import BodySection from "@views/login/sections/body";

const LoginPaper = styled(Paper)(({theme}) => ({
    width: 400,
    height: 400,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));


const Login: FC = () => {
    return <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    }}>
        <LoginPaper elevation={3}>
            <HeaderSection variant={"h6"} component={"div"} children={"hello"}/>
            <BodySection />
            <Footer/>
        </LoginPaper>
    </Box>
}

export default Login