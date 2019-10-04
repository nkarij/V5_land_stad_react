import ReactDOM from 'react-dom';
import React, { Component } from 'react'
// import HomeNav from './components/homeNav'
import CountryNav from './components/countryList'
import CityNav from './components/cityList'
import City from './components/city'
import Visit from './components/visitList'

// import './index.css';
// ReactDOM.render(<ComponentToRender />, targetNode)

export default class Index extends Component {

    constructor(props){
        super(props);

        this.state = { 
            page: 0,
        }

        this.errorMessage = "der er sket en fejl"
    }

    componentDidMount = () => {
        // get key(page) from localstorage, set state(page);
        this.setPage();
    }

    setPage = () => {
        if(localStorage.getItem("storage")){
            console.log("inde i varmen")
            let storage = JSON.parse(localStorage.getItem("storage"));
            // console.log(storage)
            let storedPage = storage.page;
            console.log(storedPage)
            this.setState({
                page: storedPage,
            })
            this.renderView();
        } else {
            this.setState({
                page: 0
            })
            this.renderView();
        }
    }

    
    renderView = () => {
        return (
            ((this.state.page === 0)? <CountryNav /> : (this.state.page === 1)? <CityNav /> : (this.state.page === 2)? <City /> : (this.state.page === 3)? <Visit/> : this.errorMessage)
        )
    }


    render() {
        return (
            <div>
                {this.renderView()}
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
