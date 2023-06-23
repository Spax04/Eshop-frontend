import React from 'react'
import {Form, useNavigate,useState,InputGroup,FormControl, Button} from '../imports'


function SearchBox() {

    const [query,setQuery] = useState('');
    const navigate = useNavigate();
    const submitHandler = (e)=>{
        e.preventDefault();

        navigate(query? `/search?query=${query}` : '/search')
    }
  return (
<Form onSubmit={(e)=> submitHandler(e)} className='d-flex me-auto w-50'>
    <InputGroup>
    <FormControl aria-describedby='button-search' placeholder='Search for products' type='text' name='q' id='q' onChange={(e)=> setQuery(e.target.value)}>
    
    </FormControl>

    <Button variant='outline-primary' type="submit" id="button-search"><i className='fas fa-search'></i></Button>
    </InputGroup>
</Form>
  )
}

export default SearchBox