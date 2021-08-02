
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

    deleteGuide = (id) => {
        this.state.guides.pop(this.state.guides.filter(t => t.Id === id));
        this.setState({ ...this.state.guides });
        const xhr = new XMLHttpRequest();
        xhr.open('post', "DeleteGuide?id=" + id, true);
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

    updateGuide = (id, boatId) => {
        const xhr = new XMLHttpRequest();
        xhr.open('post', "UpdateGuide?id=" + id + "&boatId=" + boatId, true);
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



    render() {

        return (
            <div className="mainContent">
                Guides
                </div>
        );
    }

}



ReactDOM.render(<MainContent url="/GetBoats" />, document.getElementById('content'));