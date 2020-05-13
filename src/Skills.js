import {
	toggleButton,
	stateFromBackend
} from './actions/actions'


export class Skills extends Component {
	static defaultProps = { primary_skills: []};

  callApi = async () => {
    const response = await fetch('/api/skills');
	console.log(`callApi: returned from fetch`);
    const body = await response.json();
	console.log(`callApi: got response.json() ; response.status = ${response.status}`);
    if (response.status !== 200) {
		throw Error(body.message);
	}
    return body;
  };	
  
  componentDidMount() {
    this.callApi()
	  .then(res => {
		console.log(`componentDidMount: res.primary_skills = ${res.primary_skills}`);
		this.props.setStateFromBackend(res.primary_skills);
		console.log(`componentDidMount: this.props.primary_skills = ${this.props.primary_skills}`);
	  })
      .catch(err => console.log(err));
  }  

  render() {
	      return (
      <div className="Skills">
        <header>
          <h1 className="Skills-title">Welcome to SkillClusters!</h1>
        </header>
        {
          this.props.primary_skills.map((primarySkill, ind) => { 
            return (
            <div key={primarySkill.primary_term}>
            <button key={primarySkill.primary_term} className={'btn btn-info btn-md button-with-margin ' + this.props.class_name} href="none"
            onClick={() => this.props.toggleSecondarySkills(ind)}>
             {primarySkill.primary_term}
            </button>
          <div>
          { 
            primarySkill.showResult ? 
            <span> {
            primarySkill.associated_terms.map((secondarySkill) => {
				console.log(`${primarySkill.primary_term}: showResult should be true`);
              return <button key={secondarySkill.secondary_term} className="btn btn-outline-dark button-with-margin">{ secondarySkill.secondary_term }</button>
            }
            )
            }
            </span>
            : console.log(`${primarySkill.primary_term}: No showResult for you`)
          }
        </div>
        </div>
		  )
          }
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
	primary_skills: state.primary_skills
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSecondarySkills: (ind) => dispatch(toggleButton(ind)),
	setStateFromBackend: (primary_skills) => dispatch(stateFromBackend(primary_skills))
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(Skills);
