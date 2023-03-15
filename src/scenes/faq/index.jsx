import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How often do the apps that gather my
            financial account information access my bank
            accounts?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If they have your bank username and password,
            then they can access your data whenever they
            want. Some apps access your account multiple
            times a day, even if you aren’t using the app
            anymore
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I know how my financial information is being used?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            While they are long and often challenging to
            understand, reading the financial app’s terms
            and conditions and privacy policy may be the
            best way to get this information. (See our terms
            and conditions explainer for some terms that are
            common in financial app user agreements and
            what they mean in plain language.)
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What do I need to know about financial
            apps?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            1. Financial apps often log in to your account
            and pull your information through a process
            called “screen scraping.” Depending on the
            permission it requires users to grant
            (“terms”), the app and/or a “middleman”
            (aggregator) might be able to sell or share
            what it gleans from the accounts you provide
            access to, including your balances, transaction
            history, personal loan information, date of
            birth and contact information. (This is particularly likely with free apps.)

            2. Even after you stop using an app and delete
            it, it might continue to access your bank
            account information. To cut off any future
            access, change your usernames and passwords at financial services providers you
            linked to the app
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What happens if my financial app has a
            security breach?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Many financial apps assume only limited responsibility, if any, for security breaches where customer information is compromised, money
            stolen or fraud committed. Therefore, consumers may not be able to recoup their losses.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I prevent an app from accessing certain types of financial information?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            In most cases, consumers have very little control
            over the data accessed by financial apps. Most
            financial apps’ terms and conditions don’t allow
            you to specify how your financial information is
            used, sold or stored. However, some banks offer
            tools that allow their customers to see which
            apps are accessing their data, and what data
            they are receiving.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
