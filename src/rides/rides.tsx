import { List } from "@raycast/api";
import { useEffect, useState } from "react";
import { RouteApi } from "../../app/services/api/route-api";
import { RouteItem } from "../../app/services/api";
import { formatDateForAPI } from "../../app/utils/helpers/date-helpers";

const routeApi = new RouteApi();

export const RidesList = ({ originId, destinationId, time }: { originId: string, destinationId: string, time: number }) => {
    const [routes, setRoutes] = useState<RouteItem[] | null>(null);

    // Fetch routes in the background
    useEffect(() => {
        const [date, hour] = formatDateForAPI(time);
        let ignore = false;
        setRoutes(null);

        routeApi.getRoutes(originId, destinationId, date, hour).then(routes => {
            if (!ignore) {
                setRoutes(routes);
            }
        });

        return () => {
            ignore = true;
        }
    }, [originId, destinationId, time])

    return (
        <List>
            {
                routes ? routes.filter(route => {
                    // Filter out past departures
                    return route.departureTime >= time
                }).map(route => (
                    // TODO: Convert to a prettier list item (with more information)
                    <List.Item title={route.departureTimeString.toString()} />
                ))
                    : <List.EmptyView />
            }
        </List>
    );
}
