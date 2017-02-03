
import classnames from 'classnames';

class GimForm extends Component {
	constructor(props) {
	    super(props);
	 
	    this.state = {
	      	errors: {},
			data: {}
	    };
	}

  	isValid() {
		var fields = ['name', 'description']
		var errors = {}
		fields.forEach(function(field) {
			var value = trim(this.refs[field].value)
			if (!value) {
				errors[field] = 'Este campo es necesario';
	 		}
		}.bind(this));
		this.setState({errors: errors})

		var isValid = true;
		for (var error in errors) {
	 		isValid = false;
	  		break;
		}
		return isValid;
  	}

  	handleSubmit(event) {
	  	event.preventDefault();
	  	let gim = this.getFormData();
	  	if(this.isValid()){
	  		Meteor.call('gims.insert', gim, function (error, result) {});
	  	}
  	}

  	changeType(){
  		var data = this.getFormData();
  		this.setState({
  			data: data
  		});
  	}

  	getFormData() {
		return {
			  	name: this.refs.name.value,
			  	description: this.refs.description.value
			};
  	}

  	render() {
		return  (<div className="form-horizontal">
					<form onSubmit={this.handleSubmit} ref="gimForm">
						{this.renderTextInput('name', 'Nombre')}
						{this.renderTextarea('description', 'Descripción')}
						<button type="submit">Guardar</button>
					</form>
				</div>);
  	}

  	renderTextInput(id, label) {
		return this.renderField(id,
								label,
								<input type="text" className="form-control" id={id} ref={id}/>
								);
  	}

   	renderTextarea(id, label) {
		return this.renderField(id, label,
								  <textarea className="form-control" id={id} ref={id}/>
								);
  	}

  	renderField(id, label, field) {
		return <div className={classnames('form-group', {'has-error': id in this.state.errors})}>
					<label htmlFor={id} className="col-sm-4 control-label">{label}</label>
					<div className="col-sm-6">
						{field}
					</div>
				</div>;
	}
})

