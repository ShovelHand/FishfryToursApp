

const statusLanes = {
    docked: [],
    outbound: [],
    inbound: [],
    maintenance: [],
};

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        isClicked: false
    }
    loadBoatsFromServer() {
        console.log("boats loading");
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();
    }
    componentWillMount() {
        this.loadBoatsFromServer();
    }

    handleAddNew = () => {
        let val = this.state.isClicked ? false : true;
  //      this.setState({ isClicked: val });
    };

    handleClose = obj => {
  //      this.setState({ isClicked: obj });
    };

    //handleNewBoat = content => {
    //    const boat = {};
    //    boat.Id = this.state.data.length + 1;
    //    boatName = content;
    //    boat.Status = "docked";
    //    const boats = [...this.state.data, data];
    //    this.setState({ tass });
    //};

    render() {
        //status swim lanes for boats     
        //assign boats to swim lanes based on satus
      
 
        return (

            /* main content here */
            <div className="mainContent">
                <h1>Fishfry Tours</h1>

                <p className="header">Drag & drop boats between swimlanes to set their status</p>

                <KanbanBoard data={this.state.data}/>
               
            </div>

      

        );
    }
}
class KanbanBoard extends React.Component {
    render() {
        this.props.data.forEach(t => {
            if (statusLanes[t.Status])
                statusLanes[t.Status].push(t);
            else
                statusLanes["docked"].push(t);
        });
        console.log(statusLanes);
        return (
            <div className="kanbanBoard">
                <DockedLane data={statusLanes["docked"]} />
                <OutboundLane data={statusLanes["outbound"]}/>
                <InboundLane data={statusLanes["inbound"]}/>
                <MaintenanceLane data={statusLanes["maintenance"]}/>
            </div>
        );
    }
}

updateBoatStatus = (id, status) => {
    
        const xhr = new XMLHttpRequest();
        xhr.open('post', "UpdateBoat?id=" + id + "&status=" + status, true);
        xhr.onreadystatechange = () => {
            switch (xhr.status) {
                case 200:

                    // handle success, like stop a loading spinner, give feedbak toast
                    break;
                case 400:
                    console.error("an error occurred");
                    break;
            }

        }

        xhr.send();
    
}


class Lane extends React.Component {
    onDrop = (e, status) => {
        let id = e.dataTransfer.getData("id");
        let boats = this.props.data.filter(boat => {
            if (boat.id == id) {
                boat.Status = status;
            }
            

                statusLanes[status].push(boat);
           // this.setState({ data: data });
            return boat;
        });
            
                console.log(statusLanes);
            updateBoatStatus(id, status);

        
    };

    onDragOver = e => {
        e.preventDefault();
    };
    render() {
        
    }
}

class DockedLane extends Lane {
    render() {
        const boatNodes = this.props.data.map(boat => (
            <Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status} >
                {boat.boatName}
            </Boat>
        ));
        return (
            <div className="dockedLane" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, "indock")}>
                <div className="swimlaneHeader">Docked</div>
                 
                <span>
                    
                    { boatNodes}
                </span>
            </div>
        );
    }
}

class OutboundLane extends Lane {
    componentDidUpdate() {
        console.log("updated");
    }
    render() {
        const boatNodes = this.props.data.map(boat => (
            <Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status} >
                {boat.boatName}
            </Boat>
        ));
        return (
            <div className="outboundLane" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, "outbound")}>
                <div className="swimlaneHeader">Outbound</div>
                { boatNodes}
            </div>
        );
    }
}
class InboundLane extends Lane {
    render() {
        const boatNodes = this.props.data.map(boat => (
            <Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status}>
                {boat.boatName}
            </Boat>
        ));
        return (
            <div className="inboundLane" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, "inbound")}>
                <div className="swimlaneHeader">Inbound</div>
                { boatNodes}
            </div>
        );
    }
}
class MaintenanceLane extends Lane {
    render() {
        const boatNodes = this.props.data.map(boat => (
            <Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status}>
                {boat.boatName}
            </Boat>
        ));
        return (
            <div className="maintenanceLane" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, "maintenance")}>
                <div className="swimlaneHeader">Maintenance</div>
                { boatNodes}
            </div>
        );
    }
}

/*boat draggable card */
class Boat extends React.Component {
    onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id);
        console.log(id);
    };
    onDragOver = e => {
        e.preventDefault();
    };
    render() {
        console.log(this.props.name);
        console.log(this.props.id);
        console.log(this.props.status);
       
        return (
 
            <div draggable className="boat" onDragStart={e => this.onDragStart(e, this.props.id)}  style={{ background: this.bgColor }}>
                <span className="boatName">{this.props.name}</span>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(<MainContent url="/GetBoats"/>, document.getElementById('content'));