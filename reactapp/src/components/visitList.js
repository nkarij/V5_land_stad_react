// import ReactDOM from 'react-dom';
import React, { Component } from 'react'

// ------------------ CITY CLASS ------------------------------
// ------------------------------------------------------------

export default class visitList extends Component {

    // constructor with state.
    constructor(props){
        super(props);

        this.state = { 
            isLoading: true,
            dataSource: null,
            // array: null,
            page: null
        }

        this.tempArray = [];

        // This is the approach currently recommended in the React docs:
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

        this.setPage();
        this.setArray();
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
                console.log("Visitlist mounted");
            });
            // console.log(this.state.dataSource);
        })
        .catch((error) =>{
            console.error(error);
        });
    }


    setPage = () => {
        // console.log("arraySetPage ", this.state.array)
        // her kan jeg fx modtage mit localstorage ID og opdatere state?
        if(localStorage.getItem("storage")){
            let storage = JSON.parse(localStorage.getItem("storage"));
            console.log("yes");
            // console.log(storage);
            let storedPage = storage.page;
            this.setState({
                page: storedPage
            })
        } else {
            this.setState({
                page: 0
            })
        }
    }

    setArray = () => {
        if(localStorage.getItem("array")){
            this.tempArray = JSON.parse(localStorage.getItem("array"));
        }
    }
    

    // dette burde nok laves til en class for sig. som modtager super class
    outputVisitList = () => {
        if(this.state.isLoading === false){
            // der må findes en bedre løsning til dette.
            let cities = [];
            this.tempArray.forEach(jussi => {
                cities.push(this.state.dataSource.map((city) =>  {
                    if(jussi == city.id) {
                        return (
                                <button style={styles.button}>{city.stadname}</button>
                            )
                        }
                    })
                )
            });
            return cities;
        } else {
            console.log("Der er sket en fejl i outputVisitList")
            // return <p>"der er sket en fejl"</p>
        }
    }

    render() {
        return (
            <div style={styles.container}>
                <p>Byer</p>
                {this.outputVisitList()}
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