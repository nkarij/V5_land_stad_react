// import ReactDOM from 'react-dom';
import React, { Component } from 'react'

// ------------------ CITY CLASS ------------------------------
// ------------------------------------------------------------

export default class City extends Component {

    // constructor with state.
    constructor(props){
        super(props);

        this.state = { 
            isLoading: true,
            dataSource: null,
            id: null,
            name: null,
            page: null,
        }

        // This is the approach currently recommended in the React docs:
        // this.handleClick = this.handleClick.bind(this);
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
            console.log("yes");
            console.log(storage);
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
    outputCity = () => {
        if(this.state.isLoading === false){
            let cities = this.state.dataSource.map((city) => {
                if(city.id == this.state.id) {
                    // console.log(city);
                    return (
                    <p>{city.population}</p>
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

    clearLocalStorage = () => {
        localStorage.clear();
        window.location.reload(true);
    }

    renderToStartButton = () => {
        return (
            <div>
                <br></br>
                <button onClick={
                    (e) => {this.clearLocalStorage()}
                }>Til Start</button>
            </div>
        )
    }

    render() {
        return (
            <div style={styles.container}>
                <h2>{this.state.name}</h2>
                {this.outputCity()}
                {this.renderToStartButton()}
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