import React, { useLayoutEffect, useRef } from "react";
import { Card, CardContent, Typography } from '@mui/material';
import { Map, Marker, NavigationControl } from 'mapbox-gl';
import Navbar from '../home/Navbar.js';

import fondo from "../../image/fondo.jpg"; // Importa la imagen de fondo

import '../../css/Informacion.css';

const Informacion = () => {
    const mapDiv = useRef(null);

    useLayoutEffect(() => {
        const map = new Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-89.9843, 14.6297],
            zoom: 17,
        });

        new Marker()
            .setLngLat([-89.9843, 14.6297])
            .addTo(map);

        map.on('load', () => {
            map.addLayer({
                id: 'example',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: [-89.9843, 14.6297]
                            }
                        }]
                    }
                },
                paint: {
                    'circle-radius': 4,
                    'circle-color': '#007cbf'
                }
            });
        });

        map.addControl(new NavigationControl());
    }, []);

    return (
        <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <Navbar/>
            <h1 style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px', fontWeight: 'bold' }}>Informacion</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '50%'}}>
                    <Card style={{ borderRadius: 10 }}> 
                        <CardContent>
                            <div
                                ref={mapDiv}
                                style={{
                                    height: '400px',
                                    width: 'auto',
                                    position: 'sticky',
                                    top: 0,
                                    left: 0,
                                    borderRadius: 15,
                                }}
                            />
                            <Typography variant="h5" component="h2" style={{ marginTop: 15 }}>
                                Ubicación
                            </Typography>
                            <Typography color="textSecondary">
                                Chipilapa 2-66 Zona 6 Jalapa, 2da. Avenida<br />
                                Jalapa, Jalapa
                            </Typography>
                            <Typography variant="h5" component="h2" style={{ marginTop: '20px' }}>
                                Correo
                            </Typography>
                            <Typography color="textSecondary">
                                info@hotelvilladelrio.com
                            </Typography>
                            <Typography variant="h5" component="h2" style={{ marginTop: '20px' }}>
                                Teléfono
                            </Typography>
                            <Typography color="textSecondary">
                                +502 7922 3001
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Informacion;
