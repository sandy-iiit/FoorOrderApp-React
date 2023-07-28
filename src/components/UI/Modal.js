
import classes from './Modal.module.css'
import ReactDOM from "react-dom";

const BackDrop=(props)=>{
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

const ModelOverlay=(props)=>{

    return <div className={classes.modal}>
        <div >{props.children}</div>
    </div>
}

const overlay=document.getElementById('overlays')
console.log(overlay)

const Modal=(props)=>{

  return  <>
        {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, overlay)}

      {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay>,overlay)}
      {/*{ ReactDOM.createPortal(<div>hyyyy{props.children}</div>,overlay)}*/}
    </>

}

export default Modal