

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

    handleAddNew = () => {
        let val = this.state.isClicked ? false : true;
  //      this.setState({ isClicked: val });
    };

    handleClose = obj => {
  //      this.setState({ isClicked: obj });
    };

    handleNewTask = content => {
        //const task = {};
        //task.name = content;
        //task.bgColor = "#9fa8da";
        //task.category = "wip";
        //const tasks = [...this.state.tasks, task];
        //this.setState({ tasks });
    };

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
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        this.setState({ data: data });
    }
    xhr.onerror = () => {
        console.error("an error occurred");
    }
    xhr.send();
}


class Lane extends React.Component {
    onDrop = (e, status) => {
        let id = e.dataTransfer.getData("id");
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
                <span className="swimlaneHeader">Docked</span>
                 
                <span>
                    <a className="btn-floating btn">
                        <i className="material-icons" onClick={this.handleAddNew}>
                            add
                      </i>
                      
                    </a>
                    { boatNodes}
                </span>
            </div>
        );
    }
}

class OutboundLane extends Lane {
   
    render() {
        const boatNodes = this.props.data.map(boat => (
            <Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status} >
                {boat.boatName}
            </Boat>
        ));
        return (
            <div className="outboundLane" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, "outbound")}>
                <span className="swimlaneHeader">Outbound</span>
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
                <span className="swimlaneHeader">Inbound</span>
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
                <span className="swimlaneHeader">Maintenance</span>
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
 
            <div className="boat" onDragStart={e => this.onDragStart(e, this.props.id)} draggable className="draggable" style={{ background: this.bgColor }}>
                <h3 className="boatName">{this.props.name}</h3>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(<MainContent url="/GetBoats"/>, document.getElementById('content'));