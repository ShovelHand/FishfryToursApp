

const statusLanes = {
    Docked: [],
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


    onDragOver = e => {
        e.preventDefault();
    };

    onDragStart = (e, id) => {
        e.dataTransfer.setData("id", id);
        console.log(id);
    };

    onDrop = (e, status) => {
        let id = e.dataTransfer.getData("id");
        let boats = this.state.data.filter(boat => {
            if (boat.id == id) {
                boat.category = status;
                if (status == "indock") {
                    boat.bgColor = "#e57373";
                } else {
                    boat.bgColor = "#9fa8da";
                }
            }
            return boat;
        });

    //    this.setState({ ...this.state.data, data });
    };

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
        this.state.data.forEach(t => {
            console.log(t);
            if (statusLanes[t.Status])
                statusLanes[t.Status].push(
                    <div key={t.Id} onDragStart={e => this.onDragStart(e, t.Name)} draggable className="draggable" style={{ background: t.bgColor }}>
                        {t.Name}
                    </div>
                );
            else
                statusLanes["Docked"].push(
                    <div key={t.Id} onDragStart={e => this.onDragStart(e, t.Name)} draggable className="draggable" style={{ background: t.bgColor }}>
                        {t.Name}
                    </div>
                );
        });
 
        return (

            /* main content here */
            <div className="mainContent">
                <h1>Fishfry Tours</h1>
                <BoatList data={this.state.data} />

                <p className="header">Drag & Drop</p>

                <DockedLane />

                <div className="outboundLane" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, "outbound")} >
                    <span className="task-header">Outbound</span>
                    {statusLanes.outbound}
                        </div>
                        <div className="inboundLane" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, "inbound")} >
                            <span className="task-header">Inbound</span>
                            {statusLanes.inbound}
                        </div>
                        <div className="maintenanceLane" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, "maintenance")} >
                            <span className="task-header">Maintenance</span>
                            {statusLanes.maintenance}
                        </div>



            </div>

      

        );
    }
}

class DockedLane extends React.Component {
    render() {
        return (
            <div className="dockedLane" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, "indock")}>
                <span className="task-header">Docked</span>
                {statusLanes.Docked}
                <span>
                    <a className="btn-floating btn">
                        <i className="material-icons" onClick={this.handleAddNew}>
                            add
                      </i>
                    </a>
                </span>
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