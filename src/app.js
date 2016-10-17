    var destination = document.querySelector("#container");
 

var Note = React.createClass({
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
		  <span className="pull-right">
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
				<div className="board container-fluid">
				{this.state.notes.map(function(note, i){
					return (
							<Note key={i}>{note}</Note>
					);
				})}
				</div>
		);
	}
});

    ReactDOM.render(
       <Board/>,
      destination
    );