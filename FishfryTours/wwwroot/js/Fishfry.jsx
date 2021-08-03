
class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            guides: []
        };
        isClicked: false
        currentId: null;
        currentEntityType: null
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
    };

    sendBoatToDB = (boat) => {
        const xhr = new XMLHttpRequest();
        xhr.open('post', "createBoat?Name=" + boat.Name + "&status=" + boat.Status, true);
        xhr.onreadystatechange = () => {
            switch (xhr.status) {
                case 200:

                    break;
                case 400:
                    console.error(xhr.responseText);
                    break;
            }
        }
        xhr.onload = () => {
            boat.Id = xhr.responseText;
            this.state.data.push(boat);
            this.setState({ ...this.state.data });
        }

        xhr.send();
    };

    loadBoatsFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };
        xhr.send();
    };

    deleteBoat = (id) => {
        this.state.data.pop(this.state.data.filter(t => t.Id === id));
        this.setState({ ...this.state.data });
        const xhr = new XMLHttpRequest();
        xhr.open('post', "DeleteBoat?id=" + id, true);
        xhr.onreadystatechange = () => {
            switch (xhr.status) {
                case 200:

                    break;
                case 400:
                    console.error(xhr.responseText);
                    break;
            }
        }
        xhr.send();
    };

    /*GUIDES */
    loadGuidesFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', "GetGuides", true);
        xhr.onload = () => {
            const guides = JSON.parse(xhr.responseText);
            this.setState({ guides: guides });
        };
        xhr.send();
    };

    componentWillMount() {
        this.loadBoatsFromServer();
        this.loadGuidesFromServer();
    }
    onDragOver = e => {
        e.preventDefault();
    };

    onDragStart = (e, id, entityType) => {
        console.log(entityType)
        e.dataTransfer.setData("id", id);
    };
    onTouchStart = (e, id) => {
        console.log("tocuhStart. Id: " + id);
        e.dataTransfer.setData("id", id);
    }

    onDrop = (e, status) => {
        let entityType = e.dataTransfer.getData("entityType");
        console.log("entityType: " + entityType);
        let id = e.dataTransfer.getData("id");
        if (entityType === "boat") {
            let boats = this.state.data.filter(boat => {
                if (boat.Id == id) {
                    if(boat.Status != status)
                        boat.Status = status;
                    this.updateBoatStatus(boat.Id, status);
               
                }
                let guides = this.state.guides.filter(guide => guide.AssignedBoatId === boat.Id);
                console.log("guides assigned to boats: " + guides.toString());
            
                return boat;
            });
            this.setState({ ...this.state.data, boats });
        }
     
        var deleteButton = document.getElementById("deleteDropButton");
        deleteButton.style.backgroundColor = "blue";
    };

    handleDelete = () => {
        let val = this.state.isClicked ? false : true;
        this.setState({ isClicked: val });
    };

    handleClose = () => {
        this.setState({ isClicked: false });
    };

    handleNewBoat = (name) => {
        const boat = {};
        if (!name || name === "")
            return;
        let boatWithExistingName = this.state.data.filter(t => t.Name === name);
        if (boatWithExistingName.length > 0) {
            console.warn("duplicate boat names not allowed.")
            return;
        }
        boat.Name = name;
        boat.Status = "docked";
        this.sendBoatToDB(boat);
        
       
        document.getElementById("fname").value = "";
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
                        onDragStart={e => this.onDragStart(e, t.Id, "boat")}
                        guides={ this.state.guides}
                        draggable
                    >
                        {t.Name}
                    </div>
                );
            else
                console.warn("a boat is not shown as it has an invalid status type. Name: " + t.Name + " Status: " + t.Status);
        });

        return (
            <div className="mainContent">
                <h1>Fishfry Tours</h1>
                <h4>Fleet and Guide status</h4>
                <div className="topUIElements">
                    <NewBoatPanel handleNewBoat={this.handleNewBoat} />
                    <DeleteDropArea handleDelete={this.handleDelete} isClicked={this.state.isClicked} handleClose={this.handleClose} currentId={this.state.currentId} deleteBoat={this.deleteBoat} />
                </div>
                <p className="header">Drag & drop boats between swimlanes to set their status</p>

                <KanbanBoard data={this.state.data} guides={ this.state.guides} statusLanes={statusLanes} onDragOver={this.onDragOver} onDragStart={this.onDragStart} onDrop={this.onDrop} />
            </div>
                

        );
    }
}


class NewBoatPanel extends React.Component {
    addNew = () => {
        this.props.handleNewBoat(document.getElementById("fname").value);
    }
    render() {
        return (
            <div className="newBoatInput">
                <span>Add new boat?</span><br/>
                <span id="addButtonLabel">Boat's name:</span>
                <input type="text" id="fname" name="fname" />
                <div id="newBoatButton" onClick={this.addNew} > Add </div>
            </div>
        );
    }
}
class DeleteDropArea extends React.Component {
    constructor(props) {
        super(props);
      
    }
    onDrop = (e) => {
        this.currentId = e.dataTransfer.getData("id");
        this.currentEntityType = e.dataTransfer.getData("entityType");
        this.props.handleDelete();
    };
    onDragOver = e => {
        e.preventDefault();
    };
    render() {
        let currentId = null;
        let currentEntityType = null;
        const loader = this.props.isClicked ? (
            <ConfirmDeleteDialog
                handleClose={this.props.handleClose}
                currentId={this.currentId}
                currentEntityType={this.currentEntityType}
                deleteBoat={this.props.deleteBoat}
            />
        ) : null;
        return (
           
            <div className="deleteDropBox">
                {loader}
                <div id="deleteDropButton" 
                    onDragOver={e => this.onDragOver(e)}
                    onDrop={e => this.onDrop(e, "docked")}


                > Delete </div>
            </div>
        );
    }
}

class ConfirmDeleteDialog extends React.Component {
    constructor(props) {
        super(props);

    }
    deleteEntity = () => {
        if (this.props.currentEntityType === "boat") {
            this.props.deleteBoat(this.props.currentId);
        }
        this.props.handleClose();
    }

    render(){
        return (
            <div className="popupOverlay">
                <div className="container-popup">
                    <div className="popupScreen">
                        <h4>Really delete this entity?</h4>
                        <p>This action is permanent, and cannot be undone</p>
                        <div id="deleteConfirmButton" onClick={this.deleteEntity} > Yes </div>
                        <div id="deleteCancelButton" onClick={this.props.handleClose}> Cancel </div>
                    </div>
                </div>
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
                    guides={this.props.guides}
                    boats={this.props.data.filter(t => t.Status == "docked")}
                    
                />

                <OutboundLane
                    onDragOver={this.props.onDragOver}
                    onDragStart={this.props.onDragStart}
                    onDrop={this.props.onDrop}
                    guides={this.props.guides}
                    boats={this.props.data.filter(t => t.Status == "outbound")} />

                <InboundLane
                    onDragOver={this.props.onDragOver}
                    onDragStart={this.props.onDragStart}
                    onDrop={this.props.onDrop}
                    guides={this.props.guides}
                    boats={this.props.data.filter(t => t.Status == "inbound")} />

                <MaintenanceLane
                    onDragOver={this.props.onDragOver}
                    onDragStart={this.props.onDragStart}
                    onDrop={this.props.onDrop}
                    guides={this.props.guides}
                    boats={this.props.data.filter(t => t.Status == "maintenance")} />

             
            </div>
        );
    }
}

class DockedLane extends React.Component {
    render() {
        const boatNodes = this.props.boats.map(boat => (
            <Boat name={boat.Name} key={boat.Id}
                id={boat.Id}
                status={boat.Status}
                guides={this.props.guides}
            >
                
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

class OutboundLane extends React.Component  {
   
    render() {
        const boatNodes = this.props.boats.map(boat => (
            <Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status}
                guides={this.props.guides}
            >
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
class InboundLane extends React.Component  {
    render() {
        const boatNodes = this.props.boats.map(boat => (
            <Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status}
                guides={this.props.guides}
            >
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
class MaintenanceLane extends React.Component  {
    render() {
        const boatNodes = this.props.boats.map(boat => (
            < Boat name={boat.Name} key={boat.Id} id={boat.Id} status={boat.Status}
                guides={this.props.guides}
            >
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
    constructor(props) {
        super(props);

    }
    
    onDragStart = (e, id) => {
        e.dataTransfer.setData("entityType", "boat")
        e.dataTransfer.setData("id", id);

        var deleteButton = document.getElementById("deleteDropButton");
        deleteButton.style.backgroundColor = "#e57373";
    };
    onDragOver = e => {
        var deleteButton = document.getElementById("deleteDropButton");
        deleteButton.style.backgroundColor = "blue";
        e.preventDefault();
    };
    onDragEnd = (e) => {
        var deleteButton = document.getElementById("deleteDropButton");
        deleteButton.style.backgroundColor = "blue";
    };

    render() {
        const guideNodes = [];
        this.props.guides.forEach(guide => {
            if (guide.AssignedBoatId === this.props.id) {

                guideNodes.push(<Guide name={guide.Name} key={guide.Id}
                    id={guide.Id}
                >
                    
                </Guide>);
            }
        });
        
        return (

            <div draggable className="boat"
                onDragStart={e => this.onDragStart(e, this.props.id)}
                onDragEnd={e => this.onDragEnd(e)}
                >
                <div className="boatName">{this.props.name}</div>
                <BoatGuideDropArea boatId={this.props.id}
                    guideNodes={ guideNodes }
                >
                    
                </BoatGuideDropArea>
                {this.props.children}
       
            </div>
        );
    }
}
class BoatGuideDropArea extends React.Component {
    constructor(props) {
        super(props);

    }
  
    render() {
        return (
            <div className="boatGuideDropArea"
                onDrop={this.onDrop}
            >
                Guides: <br/>
                {this.props.guideNodes}
            </div>
        );
    }
}

//guide draggable card 
class Guide extends React.Component {
    render() {
        return (

            <div className="guide"
                onDragStart={e => this.onDragStart(e, this.props.id)}
                onDragEnd={e => this.onDragEnd(e)}

                >
                <span className="guideName">{this.props.name}</span>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(<MainContent url="/GetBoats" />, document.getElementById('content'));
