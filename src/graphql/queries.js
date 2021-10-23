import {gql} from '@apollo/client';

export const QUERY_MIGRATION_SETS = gql`
    query {
        migrationSets {
            refName
            schema
            migrations {
                refName
                transaction
                version
                up
                down
            }
        }
    }
`;
