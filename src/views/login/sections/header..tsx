import type {FC} from "react";
import {Typography, type TypographyProps} from "@mui/material";


type HeaderSectionProps = TypographyProps

const HeaderSection:FC<HeaderSectionProps> = ({children,...props}) => {
    return <>
        <Typography {...props}>
            {children}
        </Typography>
    </>
}

export default HeaderSection;