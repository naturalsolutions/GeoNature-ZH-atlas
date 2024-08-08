import Pbf from 'pbf';
import geobuf from 'geobuf';

export const pbfToGeojson = (pbfData) => {
    const pbf = new Pbf(pbfData);
    const geojson = geobuf.decode(pbf);

   geojson.features.forEach(element => {
        element.properties.bassin_versant = JSON.parse(element.properties.json_arrays)["bassin_versant"];
        element.properties.communes = JSON.parse(element.properties.json_arrays)["communes"];
        element.properties.criteres_delim= JSON.parse(element.properties.json_arrays)["criteres_delim"];
    });

    geojson.features.forEach(element => {
        if (element.properties.bassin_versant.includes(null)) {
            element.properties.bassin_versant = 'Pas de bassin versant attribué';
        }
    })
    
    return geojson
}
