// import ReactDOM from 'react-dom';
import React, { Component } from 'react'

// ------------------ CITY CLASS ------------------------------
// ------------------------------------------------------------

export default class CountryList extends Component {

    // constructor with state.
    constructor(props){
        super(props);

        this.state = { 
            isLoading: true,
            dataSource: null,
            id: null,
        }

        // This is the approach currently recommended in the React docs:
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log("countrylist mounted");  
        // NB DATA FOLDER MUST BE INSIDE PUBLIC FOLDER, FOR FETCH TO WORK.
        // STILL, AND PATH MUST START FROM PUBLIC
        return fetch('./data/land.json')
        .then((response) => response.json())
        .then((data) => {
            // console.log("inside CDM");
            this.setState({
                isLoading: false,
                dataSource: data,
            }, function(){
                console.log(this.state.dataSource);
            });
            // console.log(this.state.dataSource);
        })
        .catch((error) =>{
            console.error(error);
        });
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
        // console.log("page" + page);
        storage.id = e.target.id;
        storage.name = e.target.name;
        storage.page = page;
        localStorage.setItem("storage", JSON.stringify(storage));
    }

    refreshPage = () => {
        window.location.reload(true);
    }

    // dette burde nok laves til en class for sig. som modtager super class
    outputCountryList = () => {
        if(this.state.isLoading === false){
            let countries = this.state.dataSource.map((country) =>  {
                // console.log(country);
                return (
                <button
                id={country.id}
                onClick={
                    (e) => {
                        this.handleClick(e, 1);
                        // this.saveToLocalStorage(e);
                        this.refreshPage();
                    }
                }
                key={country.id}
                name={country.countryname}
                style={styles.button}>
                {country.countryname}</button>
                )
            });
            // denne return er også vigtig:
            console.log(countries);
            return countries;
        } else {
            console.log("Der er sket en fejl i outputcountry")
            // return <p>"der er sket en fejl"</p>
            }
        }

    render() {
        return (
            <div style={styles.container}>
                {this.outputCountryList()}
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
        width: 70,
        backgroundColor: 'red',
    }
}