import { useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MapModule from 'highcharts/modules/map';
import { getAccessToken, fetchData } from '../api/iecApi';

// Initialize the map module
MapModule(Highcharts);

const Dashboard: React.FC = () => {
    const [mapOptions, setMapOptions] = useState<any>({});
    const [chartOptions, setChartOptions] = useState<any>({});
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        const fetchDataAndToken = async () => {
            try {
                const token = await getAccessToken();
                setAccessToken(token);

                // Fetch electoral events
                const electoralEvents = await fetchData('api/v1/ElectoralEvent', token);
                console.log('Electoral Events:', electoralEvents); // Log the electoral events data

                const electoralEventID = electoralEvents[0].id; // Example: use the first event ID

                // Fetch election data
                const electionData = await fetchData(`api/v1/NPEBallotResults?ElectoralEventID=${electoralEventID}`, token);
                console.log('Election Data:', electionData); // Log the election data

                // Fetch map data for South Africa
                const mapDataSA = await fetchMapData('https://code.highcharts.com/mapdata/countries/za/za-all.geo.json');
                console.log('Map Data:', mapDataSA); // Log the map data

                // Process and set the options for the map and charts
                const options = getMapOptions(mapDataSA, electionData);
                console.log('Options:', options); // Log the options

                setMapOptions(options.map);
                setChartOptions(options.chart);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndToken();
    }, []);

    const fetchMapData = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    const getMapOptions = (mapData: any, electionData: any) => {
        return {
            map: {
                chart: {
                    map: mapData,
                    type: 'map',
                },
                title: {
                    text: 'South African Election Results',
                },
                series: [
                    {
                        data: electionData,
                        mapData: mapData,
                        joinBy: 'hc-key',
                        name: 'Election Results',
                        states: {
                            hover: {
                                color: '#BADA55',
                            },
                        },
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                        },
                    },
                ],
            },
            chart: {
                title: {
                    text: 'Election Results by Year',
                },
                xAxis: {
                    categories: electionData.map((item: any) => item.year), // Assuming the data has 'year' property
                },
                series: [
                    {
                        name: 'Votes',
                        data: electionData.map((item: any) => item.votes), // Assuming the data has 'votes' property
                    },
                ],
            },
        };
    }

    return (
        <div>
            <div id="map-container">
                <HighchartsReact highcharts={Highcharts} options={mapOptions} constructorType={'mapChart'} />
            </div>
            <div id="chart-container">
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
        </div>
    )
}

export default Dashboard;