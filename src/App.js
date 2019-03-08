import React from 'react'
import { Table, Icon, Grid } from 'semantic-ui-react'
import Header from './Header.js';
import Footer from './Footer.js';

class App extends React.PureComponent {
  constructor () {
    super();
    // initial state
    this.state = {
      issues: [],
    };

    // Get data from BE
    fetch('https://api.github.com/repos/facebook/react/issues')
    .then(response => response.json())
    .then(data => {
      this.setState({issues: data})
    })
  };

  render() {
    const headerRow = ['Issue	Number', 'Title', 'Created At', 'Updated At', 'Labels', 'State'];

    const renderBodyRow = ({ id, number, title, created_at, updated_at, labels, state }) => 
    {
      const labelsList = labels.map(label => <ul key={label.id}><Icon name='tag' /> {label.name}</ul>);
      return ({
        key: id,
        cells: [
          number || '-',
          title || '-',
          created_at || '-',
          updated_at || '-',
          labels.length ? { key: 'labels', content: labelsList} : '-',
          state || '-',
        ],
      });
    };
    
    return (
      <Grid>
        <Grid.Column width={16}>
          <Header />
            <Table
              id='issuesTable'
              celled
              color='violet'
              textAlign='center'
              headerRow={headerRow}
              renderBodyRow={renderBodyRow}
              tableData={this.state.issues}
            />
          <Footer />
        </Grid.Column>
      </Grid>
    );
  };
};

export default App;
