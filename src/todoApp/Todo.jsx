import React,{useState , useEffect} from 'react'
import '../index.css'


// to get the data from LS

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plzz fill data');
        } else if(inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
                 setToggleSubmit(true);

                 setInputData('');

                 setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }

    
    // delete the items
    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }

// edit the item
//     When user clikc on edit button 

// 1: get the id and name of the data which user clicked to edit
// 2: set the toggle mode to change the submit button into edit button
// 3: Now update the value of the setInput with the new updated value to edit. 
// 4: To pass the current element Id to new state variable for reference 
    
    
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);

    }
    

    // remove all 
    const removeAll = () => {
         setItems([]);
    }

    // add data to localStorage
    useEffect(() => {
       localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src='https://raw.githubusercontent.com/thapatechnical/reacttodo/30bbf0f3648eff1cafa4c2da5546cf8b9a2e95ad/public/images/todo.svg' alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Items..."
                           value={inputData} 
                           onChange={(e) => setInputData(e.target.value) }
                        />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                 <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }
                       
                    </div>

                    <div className="showItems">
                        
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                  </div>
                                )
                            })

                        }
                       
                    </div>
                
                    {/* clear all button  */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span> </button>
                    </div>
                </div>
          </div>  
        </>
    )
}

export default Todo






// // to get local data 
// const getLocalData = () => {
//     const lists = localStorage.getItem("mytodolist");
//     if(lists) {
//         return JSON.parse(lists);
//     }else {
//         return [];
//     }
// }
// const Todo = () => {
//     const [inputData,setInputData] = useState("");
//     const [items, setItems] = useState(getLocalData());
//     const [isEditItem, setIsEditItem] = useState(null);
//     const [toggleButton,setToggleButton] = useState(false)

//     // add items function
//     const addItem = () => {
//         if(!inputData) {
//             alert('pls enter the list data');
//         } else if(!inputData && toggleButton) {
//             setItems(
//                 items.map((curElm) => {
//                     if(curElm.id === isEditItem) {
//                         return {...curElm,name:inputData}
//                     }
//                     return curElm;
//                 })
//             );
//             setInputData([]);
//             setIsEditItem(null);
//             setToggleButton(true);
//         }
//         else {
//             const myNewInputData = {
//                 id: new Date().getTime().toString(),
//                 name: inputData
//             };
//             setItems([...items,myNewInputData]);
//             setInputData("");
//         }
//     }  

//     // delete items function
//     const deleteItem = (Id) => {
//         const updatedItems = items.filter((curElm) => {
//             return curElm.id !== Id;
//         })
//         setItems(updatedItems)
//     }

//     // to remove all todo list
//     const removeAll = () => {
//         setItems([])
//     }

//     // edit items function
//     const editItem = (Id) => {
//         const item_todo_edited = items.find((curElm) => {
//             return curElm.id === Id;
//         });
//         setInputData(item_todo_edited.name);
//         setIsEditItem(Id); 
//         setToggleButton(true);
//     }

//     // adding local storage
//     useEffect(() => {
//         localStorage.setItem("mytodolist",JSON.stringify(items))
//     },[items])

//   return (
//     <>
//         <div className='main-div'>
//             <div className='child-div'>
//                 <figure>
//                     <img src='https://raw.githubusercontent.com/thapatechnical/reacttodo/30bbf0f3648eff1cafa4c2da5546cf8b9a2e95ad/public/images/todo.svg' alt='todo-logo' />
//                     <figcaption>Add Your List Here</figcaption>
//                 </figure>
//                 <div className='addItems'>
//                     <input type='text' 
//                         placeholder='✍ Add Item' 
//                         className='form-control'
//                         value={inputData}
//                         onChange={(event) => setInputData(event.target.value)}
//                      />
//                      {toggleButton 
//                       ? <i className='fa fa-edit add-btn' onClick={addItem}></i>
//                       : <i className='fa fa-plus add-btn' onClick={addItem}></i>
//                       }
                    
//                 </div>

//                 {/* show our items */}
//                 <div className='showItems'>
//                     {
//                         items.map((curElm) => {
//                             return (
//                                     <div className='eachItem' key={curElm.id}>
//                                     <h3>{curElm.name}</h3>
//                                     <div>
//                                         <i 
//                                             className='far fa-edit add-btn'
//                                             onClick={() => editItem(curElm.id)}
//                                             ></i>
//                                         <i 
//                                             className='far fa-trash-alt add-btn'
//                                             onClick={() => deleteItem(curElm.id)} ></i>
//                                     </div>
//                                     </div>
//                             )
//                         })
//                     }
//                 </div>

//                 <div className='showItems'>
//                     <button 
//                         className='btn effect04' 
//                         data-sm-link-text='Remove All'
//                         onClick={removeAll}
//                         >
//                         <span>CHECK LIST</span>
//                         </button>
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default Todo

