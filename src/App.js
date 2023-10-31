import React, { useState,useRef,useEffect } from "react";


function Button({ onClick, ...props }) {
  return (
     <button
     {...props}
     onClick={(e) => {
       e.stopPropagation();
       onClick();
     }}
   ></button>
  );
    
}

const App = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  


  const increaseCount = () => {
    const newCount = count + 1;

    setCount(newCount);
  };

  const decreaseCount = () => {
    if (count === 0) return;
    const newCount = count - 1;

    setCount(newCount);
  };
  
     const buttonRef = useRef();
     
     useEffect(()=>{
        const applyContainerProperties = () =>{
          buttonRef.current.classList.add("effect-container");
        };

         const onClick = ()=> {

           buttonRef.current.classList.remove("active")
           setTimeout(()=>{
           buttonRef.current.classList.add("active")
           },100)

         };
        
        applyContainerProperties();
        
        buttonRef.current.addEventListener("mouseup",onClick);

        const cleanupRef = buttonRef.current;

        return () =>{
          cleanupRef.removeEventListener("mouseup",onClick);
        };
     });

  return (
    <div className="ripple-effect" ref={buttonRef}>
    <div className="app-container" onClick={() =>{ setShow(true); increaseCount();}}  >
      {show ? (
        <div>
          <Button
          className={show ? 'fade-in' : ''}
          onClick={() => {
             decreaseCount();
             if (count===0) 
              setShow(false);
             
    
            }}
           >
            -
          </Button>
          <Button className={'fade-in ' + (show ? 'plus' : '')} onClick={() => increaseCount()}>
            {count}
          </Button>
        </div>
      ) : null}
      <div className="temperature-display-container">
        <div className={`temperature-display`} >
          {count}
        </div>
      </div>
      </div>
      </div>
  );
};

export default App;





