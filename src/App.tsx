import React, {useState, useEffect, useCallback} from 'react'
import {api} from './services/api'
import { uuid } from 'uuidv4'

interface IData{
  id: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  const  [data , setData] = useState<IData[]>([]);
  const [ fruta, setFruta ] = useState<string>('')
  const [ frutaValue, setFrutaValue ] = useState<any>()
  const [name, setName] = useState<string>('');

  useEffect( () => {
    api.get ('data').then(
      response =>{ setData (response.data)}
    )
  },[data]);

  const convertToCurrency = useCallback(
    (value:number) => {
     return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value);
    },
    [],
  );
  
  const addToApi = useCallback(
    () => { 
      api.post('data', {
        id: uuid,
        name: fruta,
        price: frutaValue
      }).then(
        response => alert('Tudo certo')
      ).catch( e => alert('error'))
    }, [uuid, fruta, frutaValue]
  )

  return(
    <div>
      <h1>Hello Afya</h1>
      <ul>
        { data.map( fruta =>(
           <li key={fruta.id}>
             {fruta.name} | {convertToCurrency(fruta.price)}
           </li>
        ))}      
        </ul> 

        <div>
        {name}   
        </div>
      
        <input type="text" 
          onChange={ e => setFruta(e.target.value) } 
          placeholder="Qual fruta" 
        />
        <input type="number" 
          onChange={ e => setFrutaValue(parseFloat(e.target.value)) } 
          placeholder="qual valor" 
        />

        <button onClick={ addToApi } >Adicionar</button>
    </div>
  )
}

export default App;