import React from "react"
import { Paper, Stack, Box } from "@mui/material"

import powered from "../../images/powered.png"

export default () =>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center">
            <Box textAlign="center"><a href="GDPR.html" target="_GDPR">Tietosuojaseloste</a></Box>
            <Box textAlign="center"><a href="https://www.valuemotive.com/" target="_valuemotive"><img src={powered} height={50} /></a></Box>
        </Stack>
    </Paper>
