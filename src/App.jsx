import { useState } from 'react'

function Field({labelName, componentType}){
  let input = null
  switch(componentType){
    case "offset":  
      input = <OffsetPicker/>
      break;
    case "thickness": 
      input = <ThicknessPicker />
    case "color":  
      input = <ColorPicker/>
      break;
    case "style":  
      input = <StylePicker/>
      break;
    case "button":  
      input = <Button/>
      break;
  }

  return(
    <div>
      <label htmlFor="">
        {input}
        : {labelName}
      </label>
    </div>
    )
}

function ThicknessPicker(){

}

function OffsetPicker(){

}

function ColorPicker(){

}

function StylePicker(){

}

function Button(){
  
} 


function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Field labelName="color" componentType="color" onChange=""/>
      <Field labelName="style" componentType="style" onChange=""/>
      <Field labelName="thickness" componentType="thickness" onChange=""/>
      <Field labelName="offset" componentType="offset" onChange=""/>
      <Field labelName="button" componentType="button" onChange=""/>
    </main>
  )
}

export default App
