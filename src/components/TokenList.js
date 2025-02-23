import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useTokens from "../utils/useTokens";

//MUI stuff
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

//MUI icons
import CloseIcon from "@material-ui/icons/Close";

const styles = {
  dialog: {
    position: "relative",
  },
  dialogTitle: {
    width: "23rem",
  },
  listItemText: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 3,
  },
  tokenImg: {
    width: 24,
    height: 24,
    borderRadius: 24,
    boxShadow: "rgb(0 0 0 / 8%) 0px 6px 10px",
    backgroundColor: "rgb(255, 255, 255)",
  },
};

const TokenList = ({ classes, open, handleClose, setTokens }) => {
  const tokens = useTokens();
  useEffect(() => {
    if (tokens[0].balance && tokens[0].price) {
      setTokens(tokens);
    }
  }, [tokens, setTokens]);

  const tokensMarkup = tokens.map((token) => (
    <ListItem button key={token.address} onClick={() => handleClose(token)}>
      <ListItemIcon>
        <img
          alt="token_logo"
          src={token.logoURI}
          className={classes.tokenImg}
        />
      </ListItemIcon>
      <div className={classes.listItemText}>
        <Typography variant="h6">
          {token.symbol}{" "}
          {token.balance ? parseFloat(token.balance).toFixed(4) : ""}
        </Typography>
        <Typography variant="h6">
          ${" "}
          {token.balance && token.price
            ? (token.price.usd * token.balance).toFixed(2)
            : ""}
        </Typography>{" "}
      </div>
    </ListItem>
  ));

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      className={classes.dialog}
    >
      <DialogTitle className={classes.dialogTitle}>Select Token </DialogTitle>
      <List>{tokensMarkup}</List>
      <IconButton
        onClick={handleClose}
        aria-label="close"
        className={classes.closeBtn}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
};

TokenList.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setTokens: PropTypes.func.isRequired,
};

export default withStyles(styles)(TokenList);
