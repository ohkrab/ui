import './App.css';

import {useQuery} from '@apollo/client';
import {Container, Dimmer, Grid, Label, Loader, Segment, Tab,} from 'semantic-ui-react';

import {QUERY_MIGRATION_SETS} from './graphql/queries';

function App() {
    const {data, loading} = useQuery(QUERY_MIGRATION_SETS);

    if (loading) {
        return (<Segment><Dimmer active inverted><Loader inverted />
                </Dimmer>
            </Segment>);
    }

    const panes = data.migrationSets.map((set) => {
        return {
            menuItem: set.refName, render: () => {
                return (
                    <Tab.Pane as='div'>
                        {set.migrations.map((m) => (
                            <Segment.Group key={m.refName}>
                                <Segment>
                                    <Label color='teal'>{set.schema}.</Label>
                                    <Label color="grey" image>
                                        {m.refName}
                                        <Label.Detail>{m.version}</Label.Detail>
                                    </Label>
                                </Segment>
                                <Segment.Group>
                                    <Segment>
                                        <pre>
                                            <code>{m.up}</code>
                                        </pre>
                                    </Segment>
                                    <Segment>
                                        <pre>
                                            <code>{m.down}</code>
                                        </pre>
                                    </Segment>
                                </Segment.Group>
                            </Segment.Group>
                        ))}
                    </Tab.Pane>
                );
            },
        };
    });

    return (
        <Container>
            <Tab menu={{ secondary: true }} panes={panes} />
        </Container>
    );
}

export default App;
