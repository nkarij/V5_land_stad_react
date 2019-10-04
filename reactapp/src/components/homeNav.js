// import ReactDOM from 'react-dom';
import React, { Component } from 'react'



class Buttons extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}



export default class list extends Component {

    // constructor with state.
    constructor(props){
        super(props);

        this.state = { 
            isLoading: true,
            page: 0,
            dataSource: null,
        }
        // This is the approach currently recommended in the React docs:
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        
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
                // console.log(this.state.dataSource);
            });
            // console.log(this.state.dataSource);
        })
        .catch((error) =>{
            console.error(error);
        });
    }

    
    handleClick = (e) => {
        e.preventDefault();
        console.log('The link was clicked.');
    }
    
    // dette burde nok laves til en class for sig. som modtager super class
    outputCountry = () => {
        if(this.state.isLoading === false){
            let countries = this.state.dataSource.map((country) =>  {
                // console.log(country);
                return (
                <button
                onClick={this.handleClick}
                key={country.id} 
                style={styles.button}>
                {country.countryname}</button>
                )
            });
            // denne return er også vigtig:
            return countries;
        } else {
            console.log("Der er sket en fejl i outputElements")
            // return <p>"der er sket en fejl"</p>
        }
    }

    // outputCity = () => {

    // }


    render() {
        return (
            <div style={styles.container}>
                {(this.state.page === 0)? this.outputCountry() : this.state.page}     
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