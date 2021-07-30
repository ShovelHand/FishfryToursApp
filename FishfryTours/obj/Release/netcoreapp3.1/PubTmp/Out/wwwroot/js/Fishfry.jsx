
class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentWillMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            this.setState({ data: data });
        };
        xhr.send();
    }
    render() {
        return (
            <div className="mainContent">
                <h1>Fishfry Tours</h1>
                <BoatList data={this.state.data}/>
            </div>
        );
    }
}

class BoatList extends React.Component {
    render() {
        const boatNodes = this.props.data.map(boat => (
            <Boat name={boat.Name} key={boat.Id}>
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

ReactDOM.render(<MainContent url="/GetBoats"/>, document.getElementById('content'));