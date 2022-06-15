import React from "react";

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          starts: '',
          ends: '',
          description: '',
          maxAttendees: '',
          maxPresentations: '',
          locations: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartsChange = this.handleStartsChange.bind(this);
        this.handleEndsChange = this.handleEndsChange.bind(this);
        this.handleDescriptionChange= this.handleDescriptionChange.bind(this);
        this.handleMaxAttendeesChange= this.handleMaxAttendeesChange.bind(this);
        this.handleMaxPresentationsChange= this.handleMaxPresentationsChange.bind(this);
        this.handleLocationsChange= this.handleLocationsChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.max_presentations = data.maxPresentations;
        data.max_attendees = data.maxAttendees;
        delete data.maxPresentations;
        delete data.maxAttendees;
        delete data.locations;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const conferenceResponse = await fetch(conferenceUrl, fetchConfig);
        if (conferenceResponse.ok) {
            const newLocation = await conferenceResponse.json();
            console.log(newLocation);

            const cleared = {
              name: '',
              starts: '',
              ends: '',
              description: '',
              maxAttendees: '',
              maxPresentations: '',
              location: '',
            };
            this.setState(cleared)
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }

    handleStartsChange(event) {
        const value = event.target.value;
        this.setState({starts: value})
    }

    handleEndsChange(event) {
        const value = event.target.value;
        this.setState({ends: value})
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description: value})
    }

    handleMaxAttendeesChange(event) {
        const value = event.target.value;
        this.setState({maxAttendees: value})
    }

    handleMaxPresentationsChange(event) {
        const value = event.target.value;
        this.setState({maxPresentations: value})
    }

    handleLocationsChange(event) {
        const value = event.target.value;
        this.setState({location: value})
    }

    async componentDidMount() {
    const url = "http://localhost:8000/api/locations/";
    const response = await fetch(url);
    

    if (response.ok) {
        const data = await response.json();
        
        this.setState({locations: data.locations});
        }
    }
    

    render(){
        return (
            <div className="container">
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a new conference</h1>
                  <form onSubmit={this.handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleNameChange}
                        value={this.state.name}
                        placeholder="Name"
                        required
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"/>
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleStartsChange}
                        value={this.state.starts}
                        required
                        type="date"
                        id="starts"
                        name="starts"
                        className="form-control"/>
                      <label htmlFor="starts">Starts</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleEndsChange}
                        value={this.state.ends}
                        required
                        type="date"
                        id="ends"
                        name="ends"
                        className="form-control"/>
                      <label htmlFor="ends">Ends</label>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label"
                        >Description</label>
                      <textarea onChange={this.handleDescriptionChange}
                        value={this.state.description}
                        id="description"
                        name="description"
                        rows="3"
                        className="form-control">
                        </textarea>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleMaxPresentationsChange}
                        value={this.state.maxPresentations}
                        placeholder="Maximum presentations"
                        required
                        type="number"
                        id="max_presentations"
                        name="max_presentations"
                        className="form-control"
                      />
                      <label htmlFor="max_presentations">Maximum presentations</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleMaxAttendeesChange}
                        value={this.state.maxAttendees}
                        placeholder="Maximum attendees"
                        required
                        type="number"
                        id="max_attendees"
                        name="max_attendees"
                        className="form-control"
                      />
                      <label htmlFor="max_attendees">Maximum attendees</label>
                    </div>
                    <div className="mb-3">
                      <select onChange={this.handleLocationsChange}
                        value={this.state.location}
                        required
                        id="location"
                        name="location"
                        className="form-select"
                        >
                        <option value="">Choose a location</option>
                        {this.state.locations.map(location => {
                            return (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            );
                        })}
                      </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ); 
    };

};

export default ConferenceForm;
