    var destination = document.querySelector("#container");
 

var Note = React.createClass({
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
	   
			<div className="noteDesign container-fluid panel">
			<div className="panel-body">
			  <h4 className="noteContent">{this.props.children}</h4>
			  <span className="pull-right btn-group" role="group">
				<button type="button" className="btn btn-primary glyphicon glyphicon-pencil" onClick={this.editNote} />
				<button type="button" className="btn btn-danger glyphicon glyphicon-trash" onClick={this.deleteNote} />
			  </span>
			</div>
			</div>
        
      );
  }, 
  renderForm: function() {
	   return (
        <div className="noteDesign container-fluid panel">
			<div className="panel-body">
          <textarea ref="noteText" className="form-control" defaultValue={this.props.children}></textarea>
		  <span className="pull-left">
			<button type="button" className="btn btn-success glyphicon glyphicon-floppy-disk" onClick={this.saveNote} />
		  </span>
        </div>
        </div>
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
var Board = React.createClass({
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
			<Note key={i} index={i} 
				onChange={this.update} 
				onRemove={this.remove}>
				{note}
				</Note>
		);
	},
	render: function() {
		return (
				<div className="board container-fluid">
				<nav className="navbar navbar-fixed-top navBar">
				  <div className="container-fluid">
					<div className="navbar-header">
					  <button className="btn btn-success glyphicon glyphicon-plus addBtn" onClick={this.addNote} /><br />
					  <span className="label label-default"> Click Here to Add New Notes </span>
					</div>
				  </div>
				</nav>
				
				{this.state.notes.map(this.eachNote)}
				</div>
		);
	}
});

    ReactDOM.render(
       <Board/>,
      destination
    );