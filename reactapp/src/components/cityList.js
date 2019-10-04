// import ReactDOM from 'react-dom';
import React, { Component } from 'react'

// ------------------ CITY CLASS ------------------------------
// ------------------------------------------------------------

export default class CityList extends Component {

    // constructor with state.
    constructor(props){
        super(props);

        this.state = { 
            isLoading: true,
            dataSource: null,
            id: null,
            name: null,
            page: null,
            array: null
        }

        this.tempArray = [];

        // This is the approach currently recommended in the React docs:
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount = () => {
        // console.log("citylist mounted");  
        
        this.setPage();
        // NB DATA FOLDER MUST BE INSIDE PUBLIC FOLDER, FOR FETCH TO WORK.
        // STILL, AND PATH MUST START FROM PUBLIC
        return fetch('./data/stad.json')
        .then((response) => response.json())
        .then((data) => {
            // console.log("inside CDM");
            this.setState({
                isLoading: false,
                dataSource: data,
            }, function(){
                // console.log(this.state.dataSource);
            });
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    setPage = () => {
        // her kan jeg fx modtage mit localstorage ID og opdatere state?
        if(localStorage.getItem("storage")){
            let storage = JSON.parse(localStorage.getItem("storage"));
            // console.log("yes");
            // console.log(storage);
            let storedID = storage.id;
            let storedName = storage.name;
            this.setState({
                id: storedID,
                name: storedName
            })
        } else {
            this.setState({
                page: 0
            })
        }
    }

    refreshPage = () => {
        window.location.reload(true);
    }

    handleClick = (e, page) => {
        e.preventDefault();
        let storage = {};

        if(localStorage.getItem("storage")) {
            localStorage.removeItem("storage")
        }
        this.setState({
            id: e.target.id,
            page: page,
            name: e.target.name
        });
        // console.log("event.target " + e.target.id);
        // denne remse kan laves om til 1 objekt, hvis jeg gemmer hele this.state?
        storage.id = e.target.id;
        storage.page = page;
        storage.name = e.target.name;
        localStorage.setItem("storage", JSON.stringify(storage));
    }
    
    // dette burde nok laves til en class for sig. som modtager super class
    outputCityList = () => {
        if(this.state.isLoading === false){
            let cities = this.state.dataSource.map((city) => {
                if(city.countryid == this.state.id) {
                    // console.log(city);
                    return (
                        <div>
                            <button
                            id={city.id}
                            onClick={
                                (e) => {
                                    this.handleClick(e, 2);
                                    this.refreshPage();
                                }
                            }
                            name={city.stadname}
                            key={city.id} 
                            style={styles.button}>
                            {city.stadname}</button>
                            {this.renderCheckBox(city.id)}
                        </div>
                    )
                }
            });
            // denne return er også vigtig:
            return cities;
        } else {
            // console.log("Der er sket en fejl i outputcity")
            // return <p>"der er sket en fejl"</p>
        }
    }

    renderCheckBox = (cityID) => {
        return (
            <label>
            <input 
            type="checkbox"
            onChange={ (e) => {
                this.handleCheckBoxChange(e, cityID);
                }             
            }
            ></input>
            </label>
        )
    }

    handleCheckBoxChange = (e, cityID) => {
        if(e.target.checked) {
            this.tempArray.push(cityID);
            this.setState({
                array: this.tempArray
            })
        }
    }

    clearLocalStorage = () => {
        localStorage.clear();
        window.location.reload(true);
    }

    renderToStartButton = () => {
        return (
            <div>
                <br></br>
                <button 
                onClick={
                    () => {this.clearLocalStorage()}
                }>Til Start</button>
            </div>
        )
    }

    handleCityListEvent = (page) => {
        let storage = {};
        if(localStorage.getItem("storage")) {
            localStorage.removeItem("storage")
        }
        this.setState({
            page: page
        });
        // console.log("event.target " + e.target.id);
        // denne remse kan laves om til 1 objekt, hvis jeg gemmer hele this.state?
        storage.page = page;
        localStorage.setItem("storage", JSON.stringify(storage));
        localStorage.setItem("array", JSON.stringify(this.state.array));
        this.refreshPage();
    }

    renderToCityListButton = () => {
        return (
            <div>
                <br></br>
                <button 
                onClick={
                    (e) => {
                        this.handleCityListEvent(3);    
                    }
                }>Til Besøgte Byer</button>
            </div>
        )
    }

    render() {
        return (
            <div style={styles.container}>
                <h2>{this.state.name}</h2>
                {this.outputCityList()}
                {this.renderToStartButton()}
                {this.renderToCityListButton()}
            </div>
        )
    }
}


const styles = {
    container: {
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        width: 90,
        backgroundColor: 'red',
    }
}