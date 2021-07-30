const data = [
    { id: 1, boatName: 'Daniel Lo Nigro' },
    { id: 2, boatName: 'Pete Hunt' },
    { id: 3, boatName: 'Jordan Walke' },
];

class MainContent extends React.Component {
    render() {
        return (
            <div className="mainContent">
                <h1>Fishfry Tours</h1>
                <BoatList data={this.props.data}/>
            </div>
        );
    }
}

class BoatList extends React.Component {
    render() {
        const boatNodes = this.props.data.map(boat => (
            <Boat name={boat.boatName} key={boat.id}>
                {boat.boatName}
            </Boat>
        ));
        return <div className="boatList">{boatNodes}</div>;
        //return (
        //    <div className="commentList">
        //        <h2>Boats in the Fishfry Tours fleet</h2>
        //        <Boat name="Daniel Lo Nigro">
                    
        //        </Boat>
        //    </div>
        //);
    }

}

class Boat extends React.Component {
    render() {
        return (
            <div className="boat">
                <h3 className="boatName">{this.props.name}</h3>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(<MainContent data={data}/>, document.getElementById('content'));