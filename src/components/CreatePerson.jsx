import React, { useContext, useState } from "react";
import TaskManager from "../TaskManager";
import { NewButton, HeaderH2, NewInput, NameHeader } from "./styled/StyledElement";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

const CreatePerson = () => {
  const [newPersonName, setNewPersonName] = useState("");
  const [persons, setPersons] = useState([]);
  const [task, setTask] = useState("boş");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleCreatePerson = () => {
    if (newPersonName.trim() !== "") {
      const newPerson = { id: persons.length + 1, name: newPersonName, tasks: task };
      setPersons([...persons, newPerson]);
      setTask([...task, `Task for ${newPersonName}`]);

      setNewPersonName("");
    }  
  };



  return (
    <div className="container">
      <HeaderH2>Kişi Oluştur</HeaderH2>
      <NewInput
        type="text"
        value={newPersonName}
        onChange={(e) => setNewPersonName(e.target.value)}
        placeholder="Enter person's name"
      />
      <NewButton onClick={handleCreatePerson}><FaPersonCirclePlus /></NewButton>
      
      {persons.map((person, index) => (
        <li key={index} className="personLi">
          
           <NameHeader> <IoMdPerson /> {person.name} </NameHeader>
          
          <TaskManager person={person}/>
        </li>
      ))}
      {selectedPerson && (
        
        <div>
          <HeaderH2>{selectedPerson.name}</HeaderH2>
          <div>            
            
          </div>
        </div>
      )}

    </div>
  );
};

export default CreatePerson;
