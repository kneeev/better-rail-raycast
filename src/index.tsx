import { ActionPanel, Detail, List, Action } from "@raycast/api";
import { RidesList } from "./rides/rides"


export default function Command() {
    // TODO: Show list of routes
    // TODO: For each route, open view showing rides starting now
    // TODO: Add option to add routes

    return (
        <List>
            <List.Item
                icon="search.png"
                title="Hadera -> Tel Aviv - HaShalom"
                actions={
                    <ActionPanel>
                        <Action.Push
                            title="Show Details"
                            target={<RidesList originId="3100" destinationId="4600" time={1691299343000} />}
                        />
                    </ActionPanel>
                }
            />
        </List>
    );
}

