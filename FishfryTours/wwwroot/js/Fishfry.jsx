
class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        isClicked: false
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
    onDragOver = e => {
        e.preventDefault();
    };

    onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id);
    };
    onTouchStart = (e, id) => {
        console.log("tocuhStart. Id: " + id);
        e.dataTransfer.setData("id", id);
    }

    onDrop = (e, status) => {
        let id = e.dataTransfer.getData("id");
        let boats = this.state.data.filter(boat => {
            if (boat.Id == id) {
                if(boat.Status != status)
                    boat.Status = status;
                this.updateBoatStatus(boat.Id, status);
               
            }
            return boat;
        });

        this.setState({ ...this.state.data, boats });
    };

    handleAddNew = () => {
        let val = this.state.isClicked ? false : true;
        this.setState({ isClicked: val });
    };

    handleClose = obj => {
        this.setState({ isClicked: obj });
    };

    handleNewTask = content => {
        const task = {};
        task.name = content;
        task.bgColor = "#9fa8da";
        task.category = "wip";
        const tasks = [...this.state.data, task];
        this.setState({ tasks });
    };

    render() {
        const statusLanes = {
            docked: [],
            outbound: [],
            inbound: [],
            maintenance: [],
        };

        this.state.data.forEach(t => {
            if (statusLanes[t.Status])
                statusLanes[t.Status].push(
                    <div className="boat"
                        key={t.Id}
                        onDragStart={e => this.onDragStart(e, t.Id)}
                        onTouchStart={e => this.onTouchStart(e, t.Id)}
                        draggable
                    >
                        {t.Name}
                    </div>
                );
            else
                console.warn("a boat is not shown as it has an invalid status type. Name: " + t.Name + " Status: " + t.Status);
        });
        const loader = this.state.isClicked ? (
            <NewTask
                handleNewTask={this.handleNewTask}
                handleClose={this.handleClose}
            />
        ) : null;
        return (
            <div className="mainContent">
                <h1>Fishfry Tours</h1>

                <p className="header">Drag & drop boats between swimlanes to set their status</p>

                <KanbanBoard data={this.state.data} statusLanes={statusLanes} onDragOver={this.onDragOver} onDragStart={this.onDragStart} onDrop={this.onDrop} onTouchStart={this.onTouchStart} />

            </div>
                

        );
    }
}

class KanbanBoard extends React.Component {
    render() {
        const statusLanes = this.props.statusLanes;
  
        return (
            <div className="kanbanBoard">
                <DockedLane
                    onDragOver={this.props.onDragOver}
                    onDragStart={this.props.onDragStart}
                    onDrop={this.props.onDrop}
                    onTouchStart={this.props.onTouchStart}
                    boats={this.props.data.filter(t => t.Status == "docked")} />

                <OutboundLane
                    onDragOver={this.props.onDragOver}
                    onDragStart={this.props.onDragStart}
                    onDrop={this.props.onDrop}
                    boats={this.props.data.filter(t => t.Status == "outbound")} />

                <InboundLane
                    onDragOver={this.props.onDragOver}
                    onDragStart={this.props.onDragStart}
                    onDrop={this.props.onDrop}
                    boats={this.props.data.filter(t => t.Status == "inbound")} />

                <MaintenanceLane
                    onDragOver={this.props.onDragOver}
                    onDragStart={this.props.onDragStart}
                    onDrop={this.props.onDrop}
                    boats={this.props.data.filter(t => t.Status == "maintenance")} />

             
            </div>
        );
    }
}




class Lane extends React.Component {
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
        this.updateBoatStatus(id, status);


    };

    onDragOver = e => {
        e.preventDefault();
    };
    render() {

    }
}

class DockedLane extends Lane {
    render() {

        const boatNodes = this.props.boats.map(boat => (
            <Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status} >
                {boat.boatName}
            </Boat>
        ));
        return (
            <div className="dockedLane"
                onDragOver={e => this.props.onDragOver(e)}
                onDrop={e => this.props.onDrop(e, "docked")}
            >
                <div className="swimlaneHeader">Docked</div>
                { boatNodes}
                <span>

                </span>
            </div>
        );
    }
}

class OutboundLane extends Lane {
   
    render() {
        const boatNodes = this.props.boats.map(boat => (
            <Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status} >
                {boat.boatName}
            </Boat>
        ));
        return (
            <div className="outboundLane"
                onDragOver={e => this.props.onDragOver(e)}
                onDrop={e => this.props.onDrop(e, "outbound")}
            >
                <div className="swimlaneHeader">Outbound</div>
                { boatNodes}
            </div>
        );
    }
}
class InboundLane extends Lane {
    render() {
        const boatNodes = this.props.boats.map(boat => (
            <Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status} >
                {boat.boatName}
            </Boat>
        ));
        return (
            <div className="inboundLane"
                onDragOver={e => this.props.onDragOver(e)}
                onDrop={e => this.props.onDrop(e, "inbound")}
            >
                <div className="swimlaneHeader">Inbound</div>
                { boatNodes}
            </div>
        );
    }
}
class MaintenanceLane extends Lane {
    render() {
        const boatNodes = this.props.boats.map(boat => (
            < Boat name = { boat.Name } key = { boat.Id } id = { boat.Id } status = { boat.Status } >
                { boat.boatName }
            </Boat >
        ));
        return (
            <div className="maintenanceLane"
                onDragOver={e => this.props.onDragOver(e)}
                onDrop={e => this.props.onDrop(e, "maintenance")}
            >
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
    };
    onTouchStart = (e, id) => {
        e.dataTransfer.setData("id", id);
        this.bgColor = "#e57373";
        console.log(id);
    };

    onDragOver = e => {
        e.preventDefault();
    };
    render() {
        return (

            <div draggable className="boat"
                onDragStart={e => this.onDragStart(e, this.props.id)}
                onTouchStart={e => this.onTouchStart(e, this.props.id)}
                style={{ background: this.bgColor }}>
                <span className="boatName">{this.props.name}</span>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(<MainContent url="/GetBoats" />, document.getElementById('content'));
