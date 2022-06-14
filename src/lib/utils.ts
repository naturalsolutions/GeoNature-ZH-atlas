import Pbf from 'pbf';
import geobuf from 'geobuf';

export const pbfToGeojson = (pbfData) => {
    const pbf = new Pbf(pbfData);
    const geojson = geobuf.decode(pbf);

    return geojson
}
