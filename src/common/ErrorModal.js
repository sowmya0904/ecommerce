import Card from "../common/Card";
import Button from '@mui/material/Button';
import classes from "./ErrorModal.module.css";
import ReactDom from "react-dom";
const Backdrop = (props) => {
  const hideDeleteHandler=()=>{
    props.onConfirm();
  }
  return <div className={classes.backdrop} onClick={hideDeleteHandler} />;
 

};

const Overlay = (props) => {

  const hideDeleteHandler=()=>{
    props.onHideDelete();
  }
  const deleteConfirm=()=>{
    
  }

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>Confirm Deletion Of Product!!</h2>
      </header>
      <div className={classes.content}>
        <h3>Are you sure you want to delete the product ?</h3>
      </div>
      <footer className={classes.actions}>
        <Button  variant="contained" onClick={deleteConfirm}>OK</Button>
        <Button variant="contained" onClick={hideDeleteHandler} >CANCEL</Button>
      </footer>
    </Card>
  );
};
const ErrorModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onHideDelete} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <Overlay
          title={props.title}
          message={props.message}
          onHideDelete={props.onHideDelete}
        />,document.getElementById('overlay-root')
      )}
    </>
  );
};

export default ErrorModal;
