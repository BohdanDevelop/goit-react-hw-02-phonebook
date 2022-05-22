import {Component} from "react";
import Contacts from "./Components/Contacts"
import ContactsForm from "./Components/ContactsForm"
import Filter from "./Components/Filter";

class Form extends Component {
    static  INITIAL_STATE = {
        
        name: '',
        number:'',
        filter: '',
      };
   
    state = {
        contacts: [
        {name: 'Rosie Simpson', number: '459-12-56'},
        {name: 'Hermione Kline', number: '443-89-12'},
        {name: 'Eden Clements', number: '645-17-79'},
        {name: 'Annie Copeland', number: '227-91-26'},],
        
        filter: '',
}

handleFilter = evt => {
    const {value} = evt.target;
    this.setState({filter: value})
  
}



handleSubmit = (evt, name, number, reset) =>{
    console.log(name);
    console.log(number);
   evt.preventDefault()
   const allTheName = this.state.contacts.map(elem => elem.name.toUpperCase());
    if(allTheName.includes(name.toUpperCase())){
        alert(`${this.state.name} is already in contacts`)
       
    }else{
        const newContacts = [...this.state.contacts,{
            name,
            number
        }]
        this.setState({contacts : newContacts})
    
    }    
reset()
}

onDeleteClick = evt=>{
    
    if(evt.target.nodeName === "BUTTON"){
        const deleteName = evt.target.name.toLowerCase();
        const newContacts = this.state.contacts.filter(element => element.name.toLowerCase()!==deleteName)
        this.setState({
            contacts : newContacts,
        })

    }
}
    render() {
        const {contacts, filter} = this.state;
        return (<>
       
<ContactsForm  handleSubmit={this.handleSubmit}/>
<Filter onClick={this.onDeleteClick} filter={filter} handleFilter={this.handleFilter} />
<Contacts names={contacts} onClick={this.onDeleteClick} filter={filter} />



        </>)
    }
}

export default Form;