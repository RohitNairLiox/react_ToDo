    var destination = document.querySelector("#container");
 

var Note = React.createClass({displayName: "Note",
	getInitialState: function(){
		return {editing: false}
	},
  editNote: function() {
	this.setState({editing: true}); 
  },
  deleteNote: function() {
	  this.props.onRemove(this.props.index);
	  this.setState({editing: false}); 
  },
  saveNote: function() {
	 var val = this.refs.noteText.value;
		if(val == "") {
			alert('Please Enter some text to continue');
		}
		else{
		 this.props.onChange(this.refs.noteText.value, this.props.index);
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
		  React.createElement("span", {className: "pull-left"}, 
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
			notes: []
		};
	},
	addNote: function() {
		var arr = this.state.notes;
		var text = "New Note";
		arr.push(text);
		this.setState({notes: arr});
	},
	update: function(noteText, i) {
		var arr = this.state.notes;
		arr[i] = noteText;
		this.setState({notes: arr});
	},
	remove: function(i) {
		var arr = this.state.notes;
		arr.splice(i, 1);
		this.setState({notes: arr});
	},
	eachNote: function(note, i){
		return (
			React.createElement(Note, {key: i, index: i, 
				onChange: this.update, 
				onRemove: this.remove}, 
				note
				)
		);
	},
	render: function() {
		return (
				React.createElement("div", {className: "board container-fluid"}, 
				React.createElement("nav", {className: "navbar navbar-fixed-top navBar"}, 
				  React.createElement("div", {className: "container-fluid"}, 
					React.createElement("div", {className: "navbar-header"}, 
					  React.createElement("button", {className: "btn btn-success glyphicon glyphicon-plus addBtn", onClick: this.addNote}), React.createElement("br", null), 
					  React.createElement("span", {className: "label label-default"}, " Click Here to Add New Notes ")
					)
				  )
				), 
				
				this.state.notes.map(this.eachNote)
				)
		);
	}
});

    ReactDOM.render(
       React.createElement(Board, null),
      destination
    );