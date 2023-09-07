import React, {useEffect, useState} from 'react';
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/'

const Vebinar = () => {
    const [locations, setLocations] = useState([])
    const [loca, setLoca] = useState(null)
    const [items, setItems] = useState([])
    const [newLocation, setNewLocation] = useState('')
    const [newItem, setNewItem] = useState('')
    const [select, setSelect] = useState('')


    useEffect(() => {
        let url =`${API_URL}api/v2/locations/?format=json`
        axios(url)
            .then(res => setLocations([{'id': null, 'name': 'All locations'}].concat(res.data)))

    }, [])


    useEffect(() => {
        let url = `${API_URL}api/v2/items/?format=json`
        if (loca){
            url += '&location=' + loca
        }
        axios(url)
            .then(res => setItems(res.data))

    }, [loca])


    const saveNew = (e, fn) => {
        fn(e.target.value)
    }


    const handleSubmit = (e, urlPart, fnDisplay, fnClearInput, infoForRequest, info, select=null) => {
        e.preventDefault()
        let url = `${API_URL}api/v2/${urlPart}/?format=json`

        if (urlPart === 'items'){
            infoForRequest = {...infoForRequest, "location": +select}
        }

        console.log(infoForRequest)

        axios.post(url, infoForRequest)
            .then(res => res.data)
            .then(data => {
                fnDisplay([...info, data])
                fnClearInput('')
            })
    }

    // use fetch
    const addItem = async (name, location) => {
        let url = `${API_URL}api/v2/items/?format=json`
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                location: location,
            }),
            headers: {
                "Content-type": 'application/json; charset=utf-8'
            },
        })
            .then(response => response.json())
    }

    const handleSelect = (e) => {
        setSelect(e.target.value)
    }


    return (
        <div>

            <h1>Add Locations</h1>
            <form onSubmit={(e) =>
                handleSubmit(e,
                    'locations',
                    setLocations,
                    setNewLocation,
                    {"name": newLocation},
                    locations)
            }>
                <input
                    onChange={(e) => saveNew(e, setNewLocation)}
                    value={newLocation}
                    type="text"
                    placeholder="Write new loaction"
                />
                <button type="submit">Add location</button>
            </form>

            <h1>Add Items</h1>
            <form onSubmit={(e) =>
                handleSubmit(e,
                    'items',
                    setItems,
                    setNewItem,
                    {"name": newItem},
                    items,
                    select
                    )
            }>
                <input
                    onChange={(e) => saveNew(e, setNewItem)}
                    value={newItem}
                    type="text"
                    placeholder="Write new item"
                />
                <select name="locations" onChange={handleSelect}>
                    {locations ? locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>) : 'Empty'}
                </select>
                <button type="submit">Add item</button>
            </form>
            <h1>Locations</h1>
            <p>{loca}</p>
            <ul>
                {locations.map(loc =>
                    <li key={loc.id} onClick={()=>{setLoca(loc.id)}}>
                        <p>{loc.name}</p>
                    </li>
                )}
            </ul>
            <h1>Items</h1>
            <ul>
                {items.map(it =>
                    <li key={it.id}>
                        <p>{it.name}</p>

                        {it.image ?
                            <div><img style={{height: "300px"}} src={it.image} alt="img"/> </div>
                            : ''
                        }
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Vebinar;