    var destination = document.querySelector("#container");
 

var Note = React.createClass({displayName: "Note",
	getInitialState: function(){
		return {editing: false}
	},
  editNote: function() {
	this.setState({editing: true}); 
  },
  deleteNote: function() {
	  this.setState({editing: false}); 
  },
  saveNote: function() {
	 var val = this.refs.noteText.value;
		if(val == "") {
			alert('Please Enter some text to continue');
		}
		else{
			alert(val);
	 this.setState({editing: false});
		}
	 
	 
  },
  renderDisplay: function() {
	   return (
	   
			React.createElement("div", {className: "noteDesign container-fluid panel"}, 
			React.createElement("div", {className: "panel-body"}, 
			  React.createElement("h4", {className: "noteContent"}, this.props.children), 
			  React.createElement("span", {className: "pull-right btn-group", role: "group"}, 
				React.createElement("button", {type: "button", className: "btn btn-primary glyphicon glyphicon-pencil", onClick: this.editNote}), 
				React.createElement("button", {type: "button", className: "btn btn-danger glyphicon glyphicon-trash", onClick: this.deleteNote})
			  )
			)
			)
        
      );
  }, 
  renderForm: function() {
	   return (
        React.createElement("div", {className: "noteDesign container-fluid panel"}, 
			React.createElement("div", {className: "panel-body"}, 
          React.createElement("textarea", {ref: "noteText", className: "form-control", defaultValue: this.props.children}), 
		  React.createElement("span", {className: "pull-right"}, 
			React.createElement("button", {type: "button", className: "btn btn-success glyphicon glyphicon-floppy-disk", onClick: this.saveNote})
		  )
        )
        )
      );
  },
  render: function() {
     	if (this.state.editing) {
			return this.renderForm();
		}
		else{
			return this.renderDisplay();
		}
    }
});
var Board = React.createClass({displayName: "Board",
	propTypes: {
		count: function(props, propName) {
			if (typeof props[propName] !== "number") {
				return new Error('The count property must be a Number');
			}
			if (props[propName] > 100) {
				return new Error('Creating ' + props[propName] + ' notes is ridiculous');
			}
			
		}
	},
	getInitialState: function() {
		return {
			notes: [
					'Call Amit',
					'Email Anita',
					'Meet Ram',
					'Call up mom',
					'Learn Zumba'
						]
		};
	},
	render: function() {
		return (
				React.createElement("div", {className: "board container-fluid"}, 
				this.state.notes.map(function(note, i){
					return (
							React.createElement(Note, {key: i}, note)
					);
				})
				)
		);
	}
});

    ReactDOM.render(
       React.createElement(Board, null),
      destination
    );