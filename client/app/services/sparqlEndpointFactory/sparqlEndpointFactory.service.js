'use strict';

angular.module('sbApp')
  .factory('sparqlEndpointFactory', function($http, sparqlEndpoint) {

    var _getAllEndpoints, _getSelectedEndpoint, _loadEndpoints;

    var _endpoints = [];

        var _selectedEndpoint = {
     id: 1,
     name: 'DBpedia',
     url: 'http://dbpedia.org/sparql',
     queryParams: []
     };

     _endpoints.push(_selectedEndpoint);

    _getAllEndpoints = function() {
      //TODO: filter just the name
      return _endpoints;
    };

    _getSelectedEndpoint = function() {
      sparqlEndpoint.setEndpointData(_selectedEndpoint);
      return sparqlEndpoint;
    };

    _loadEndpoints = function() {
      _endpoints = [
        {
          'name': 'A Short Biographical Dictionary of English Literature (RKBExplorer)',
          'location': 'http://biolit.rkbexplorer.com/sparql'
        },
        {
          'name': 'AEMET metereological dataset',
          'location': 'http://aemet.linkeddata.es/sparql'
        },
        {
          'name': 'AGRIS',
          'location': 'http://202.45.142.113:10035/repositories/agris'
        },
        {
          'name': 'ASN:US',
          'location': 'http://sparql.jesandco.org:8890/sparql'
        },
        {
          'name': 'Accommodations in Piedmont (LinkedOpenData.it)',
          'location': 'http://sparql.linkedopendata.it/grrp'
        },
        {
          'name': 'Accommodations in Tuscany (LinkedOpenData.it)',
          'location': 'http://sparql.linkedopendata.it/grrt'
        },
        {
          'name': 'Allie Abbreviation And Long Form Database in Life Science',
          'location': 'http://data.allie.dbcls.jp/sparql'
        },
        {
          'name': 'Alpine Ski Racers of Austria',
          'location': 'http://vocabulary.semantic-web.at/PoolParty/sparql/AustrianSkiTeam'
        },
        {
          'name': 'Apps using our data (University of Southampton)',
          'location': 'http://sparql.data.southampton.ac.uk/'
        },
        {
          'name': 'Archives Hub Linked Data',
          'location': 'http://data.archiveshub.ac.uk/sparql'
        },
        {
          'name': 'Association for Computing Machinery (ACM) (RKBExplorer)',
          'location': 'http://acm.rkbexplorer.com/sparql'
        },
        {
          'name': 'B3Kat - Library Union Catalogues of Bavaria, Berlin and Brandenburg',
          'location': 'http://lod.b3kat.de/sparql'
        },
        {
          'name': 'BIO2RDF - HHPID',
          'location': 'http://hhpid.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - Affymetrix',
          'location': 'http://affymetrix.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - BioCYC',
          'location': 'http://biocyc.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - CTD',
          'location': 'http://ctd.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - Drugbank',
          'location': 'http://drugbank.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - GOA',
          'location': 'http://go.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - GenBank',
          'location': 'http://genbank.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - HGNC',
          'location': 'http://hgnc.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - HomoloGene',
          'location': 'http://homologene.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - INOH',
          'location': 'http://inoh.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - IProClass',
          'location': 'http://iproclass.bio2rdf.org/sparql'
        },
        {
          'name': 'Bio2RDF - InterPro',
          'location': 'http://interpro.bio2rdf.org/sparql'
        },
        {
          'name': 'Biographical Directory of the United States Congress',
          'location': 'http://logd.tw.rpi.edu/sparql'
        },
        {
          'name': 'Brazilian Politicians',
          'location': 'http://pt.dbpedia.org/sparql'
        },
        {
          'name': 'British Museum Collection',
          'location': 'http://collection.britishmuseum.org/Sparql'
        },
        {
          'name': 'British National Bibliography (BNB) - Linked Open Data',
          'location': 'http://bnb.data.bl.uk/sparql'
        },
        {
          'name': 'Budapest University of Technology and Economics (RKBExplorer)',
          'location': 'http://budapest.rkbexplorer.com/sparql'
        },
        {
          'name': 'CN  2012',
          'location': 'http://156.35.82.103/sparql'
        },
        {
          'name': 'COLINDA - Conference Linked Data',
          'location': 'http://data.colinda.org/endpoint.php'
        },
        {
          'name': 'CPA 2008',
          'location': 'http://156.35.82.103/sparql'
        },
        {
          'name': 'CPC 2008',
          'location': 'http://156.35.82.103/sparql'
        },
        {
          'name': 'CPV 2008',
          'location': 'http://156.35.82.103/sparql'
        },
        {
          'name': 'CTIC Public Dataset Catalogs',
          'location': 'http://data.fundacionctic.org/sparql'
        },
        {
          'name': 'ChEMBL-RDF (@ Uppsala University)',
          'location': 'http://rdf.farmbio.uu.se/chembl/sparql'
        },
        {
          'name': 'CiteSeer (Research Index) (RKBExplorer)',
          'location': 'http://citeseer.rkbexplorer.com/sparql'
        },
        {
          'name': 'Community R&amp;D Information Service (CORDIS) (RKBExplorer)',
          'location': 'http://cordis.rkbexplorer.com/sparql'
        },
        {
          'name': 'Comprehensive Knowledge Archive Network',
          'location': 'http://semantic.ckan.net/sparql'
        },
        {
          'name': 'CulturaLinkedData',
          'location': 'http://cultura.linkeddata.es/sparql'
        },
        {
          'name': 'DBLP Computer Science Bibliography (RKBExplorer)',
          'location': 'http://dblp.rkbexplorer.com/sparql'
        },
        {
          'name': 'DBLP in RDF (L3S)',
          'location': 'http://dblp.l3s.de/d2r/sparql'
        },
        {
          'name': 'DBTune.org Jamendo RDF Server',
          'location': 'http://dbtune.org/jamendo/sparql'
        },
        {
          'name': 'DBTune.org John Peel sessions RDF server',
          'location': 'http://dbtune.org/bbc/peel/sparql'
        },
        {
          'name': 'DBTune.org Magnatune RDF server',
          'location': 'http://dbtune.org/magnatune/sparql'
        },
        {
          'name': 'DBTune.org Musicbrainz D2R Server',
          'location': 'http://dbtune.org/musicbrainz/sparql'
        },
        {
          'name': 'DBpedia',
          'location': 'http://dbpedia.org/sparql'
        },
        {
          'name': 'DBpedia in French',
          'location': 'http://fr.dbpedia.org/sparql'
        },
        {
          'name': 'DBpedia in German',
          'location': 'http://de.dbpedia.org/sparql'
        },
        {
          'name': 'DBpedia in Greek',
          'location': 'http://el.dbpedia.org/sparql'
        },
        {
          'name': 'DBpedia in Japanese',
          'location': 'http://ja.dbpedia.org/sparql'
        },
        {
          'name': 'DBpedia in Portuguese',
          'location': 'http://pt.dbpedia.org/sparql'
        },
        {
          'name': 'DBpedia-Live',
          'location': 'http://live.dbpedia.org/sparql'
        },
        {
          'name': 'DEPLOY (RKBExplorer)',
          'location': 'http://deploy.rkbexplorer.com/sparql'
        },
        {
          'name': 'Data.gov',
          'location': 'http://services.data.gov/sparql'
        },
        {
          'name': 'Datos Abiertos de Zaragoza',
          'location': 'http://www.zaragoza.es/datosabiertos/sparql'
        },
        {
          'name': 'Datos.bcn.cl',
          'location': 'http://datos.bcn.cl/sparql'
        },
        {
          'name': 'Deep Blue (RKBExplorer)',
          'location': 'http://deepblue.rkbexplorer.com/sparql'
        },
        {
          'name': 'Deutsche Biographie',
          'location': 'http://ndb.publink.lod2.eu/sparql'
        },
        {
          'name': 'Dewey Decimal Classification (DDC)',
          'location': 'http://dewey.info/sparql.php'
        },
        {
          'name': 'Diavgeia',
          'location': 'http://diavgeia.math.auth.gr/sparql'
        },
        {
          'name': 'Diverse Italian ReSIST Partner Institutions (RKBExplorer)',
          'location': 'http://italy.rkbexplorer.com/sparql'
        },
        {
          'name': 'EARTh',
          'location': 'http://linkeddata.ge.imati.cnr.it:2020/sparql'
        },
        {
          'name': 'EEA Reporting Obligations Database',
          'location': 'http://cr.eionet.europa.eu/sparql'
        },
        {
          'name': 'EEA Vocabularies',
          'location': 'http://cr.eionet.europa.eu/sparql'
        },
        {
          'name': 'ERA - Australian Research Council publication ratings (RKBExplorer)',
          'location': 'http://era.rkbexplorer.com/sparql'
        },
        {
          'name': 'EU Agencies and decentralized bodies (Agencies)',
          'location': 'http://agencies.publicdata.eu/sparql'
        },
        {
          'name': 'EU: fintrans.publicdata.eu',
          'location': 'http://fintrans.publicdata.eu/sparql'
        },
        {
          'name': 'EUR-Lex as Linked Data',
          'location': 'http://eur-lex.publicdata.eu/sparql'
        },
        {
          'name': 'Educational programs - SISVU',
          'location': 'http://kent.zpr.fer.hr:8080/educationalProgram/sparql'
        },
        {
          'name': 'El Viajero\'s tourism dataset',
          'location': 'http://webenemasuno.linkeddata.es/sparql'
        },
        {
          'name': 'English Index of Multiple Deprivation Ranking 2010',
          'location': 'http://opendatacommunities.org/sparql'
        },
        {
          'name': 'English Index of Multiple Deprivation Score 2010',
          'location': 'http://opendatacommunities.org/sparql'
        },
        {
          'name': 'English Indices of Multiple Deprivation',
          'location': 'http://opendatacommunities.org/sparql'
        },
        {
          'name': 'Enipedia - Energy Industry Data',
          'location': 'http://enipedia.tudelft.nl/sparql'
        },
        {
          'name': 'Environment Agency Bathing Water Quality',
          'location': 'http://environment.data.gov.uk/sparql/bwq/query'
        },
        {
          'name': 'Estimated mid-year population 2005',
          'location': 'http://opendatacommunities.org/sparql'
        },
        {
          'name': 'European Environment Agency Published Products',
          'location': 'http://semantic.eea.europa.eu/sparql'
        },
        {
          'name': 'European Nature Information System',
          'location': 'http://semantic.eea.europa.eu/sparql'
        },
        {
          'name': 'European Patent Office (EPO)',
          'location': 'http://epo.publicdata.eu/sparql'
        },
        {
          'name': 'Europeana Linked Open Data',
          'location': 'http://semanticweb.cs.vu.nl/europeana/sparql'
        },
        {
          'name': 'Europeana Linked Open Data',
          'location': 'http://europeana-triplestore.isti.cnr.it/sparql'
        },
        {
          'name': 'EventMedia',
          'location': 'http://eventmedia.eurecom.fr/sparql'
        },
        {
          'name': 'Eventseer',
          'location': 'http://eculture2.cs.vu.nl:8890/sparql'
        },
        {
          'name': 'Fact Forge',
          'location': 'http://factforge.net/sparql'
        },
        {
          'name': 'Farmers Markets Geographic Data (United States)',
          'location': 'http://logd.tw.rpi.edu/sparql'
        },
        {
          'name': 'France Telecom Recherche et Développement (RKBExplorer)',
          'location': 'http://ft.rkbexplorer.com/sparql'
        },
        {
          'name': 'Fundação da Faculdade de Ciencas da Universidade de Lisboa (RKBExplorer)',
          'location': 'http://lisbon.rkbexplorer.com/sparql'
        },
        {
          'name': 'GeoLinkedData',
          'location': 'http://geo.linkeddata.es/sparql'
        },
        {
          'name': 'GeoSpecies Knowledge Base',
          'location': 'http://lod.openlinksw.com/sparql'
        },
        {
          'name': 'GeoSpecies Knowledge Base',
          'location': 'http://lsd.taxonconcept.org/sparql'
        },
        {
          'name': 'Geological Survey of Austria (GBA) - Thesaurus',
          'location': 'http://resource.geolba.ac.at/PoolParty/sparql/lithology'
        },
        {
          'name': 'Geological Survey of Austria (GBA) - Thesaurus',
          'location': 'http://resource.geolba.ac.at/PoolParty/sparql/GeologicTimeScale'
        },
        {
          'name': 'Geological Survey of Austria (GBA) - Thesaurus',
          'location': 'http://resource.geolba.ac.at/PoolParty/sparql/tectonicunit'
        },
        {
          'name': 'Geological Survey of Austria (GBA) - Thesaurus',
          'location': 'http://resource.geolba.ac.at/PoolParty/sparql/GeologicUnit'
        },
        {
          'name': 'Germany - Bundesministerium der Finanzen - Budget',
          'location': 'http://data.lod2.eu/sparql'
        },
        {
          'name': 'GovWILD - Government Web Integration for Linked Data',
          'location': 'http://govwild.org/sparql'
        },
        {
          'name': 'Greek Wordnet',
          'location': 'http://wordnet.okfn.gr:8890/sparql'
        },
        {
          'name': 'HeBIS - Bibliographic Resources of the Library Union Catalogues of Hessen and parts of the Rhineland Palatinate',
          'location': 'http://lod.hebis.de/sparql'
        },
        {
          'name': 'HealthData.gov Platform (HDP) on the Semantic Web',
          'location': 'http://healthdata.tw.rpi.edu/sparql'
        },
        {
          'name': 'HealthData.gov Platform (HDP) on the Semantic Web',
          'location': '{http://healthdata.tw.rpi.edu/sparql : http://purl.org/twc/vocab/conversion/ServiceEndpoint}'
        },
        {
          'name': 'HealthData.gov Platform (HDP) on the Semantic Web',
          'location': 'http://{http://healthdata.tw.rpi.edu/sparql : http://purl.org/twc/vocab/conversion/ServiceEndpoint}'
        },
        {
          'name': 'Hedatuz',
          'location': 'http://helheim.deusto.es/hedatuz/sparql'
        },
        {
          'name': 'Hellenic Fire Brigade',
          'location': 'http://greek-lod.auth.gr/fire-brigade/sparql'
        },
        {
          'name': 'Hellenic Police',
          'location': 'http://greek-lod.auth.gr/police/sparql'
        },
        {
          'name': 'IBM Research GmbH (RKBExplorer)',
          'location': 'http://ibm.rkbexplorer.com/sparql'
        },
        {
          'name': 'IEEE Papers (RKBExplorer)',
          'location': 'http://ieee.rkbexplorer.com/sparql'
        },
        {
          'name': 'INSEMTIVES',
          'location': 'http://services.insemtives.eu/forest/sparql'
        },
        {
          'name': 'ISIC V4',
          'location': 'http://156.35.82.103/sparql'
        },
        {
          'name': 'Index of Multiple Deprivation Ranking, 2007',
          'location': 'http://opendatacommunities.org/sparql'
        },
        {
          'name': 'Institut Eurécom (RKBExplorer)',
          'location': 'http://eurecom.rkbexplorer.com/sparql'
        },
        {
          'name': 'Intercontinental Dictionary Series',
          'location': 'http://mlode.nlp2rdf.org/sparql'
        },
        {
          'name': 'Isidore',
          'location': 'http://www.rechercheisidore.fr/sparql'
        },
        {
          'name': 'Italian Museums',
          'location': 'http://sparql.linkedopendata.it/musei'
        },
        {
          'name': 'Italian public schools (LinkedOpenData.it)',
          'location': 'http://sparql.linkedopendata.it/scuole'
        },
        {
          'name': 'JISC Open Bibliography British National Bibliography dataset',
          'location': 'http://bnb.data.bl.uk/sparql'
        },
        {
          'name': 'JRC-Names',
          'location': 'http://mlode.nlp2rdf.org/sparql'
        },
        {
          'name': 'KEGG Pathway',
          'location': 'http://kegg.bio2rdf.org/sparql'
        },
        {
          'name': 'Korean Institute of Science Technology and Information (RKBExplorer)',
          'location': 'http://kisti.rkbexplorer.com/sparql'
        },
        {
          'name': 'LAAS-CNRS (RKBExplorer)',
          'location': 'http://laas.rkbexplorer.com/sparql'
        },
        {
          'name': 'LODAC BDLS',
          'location': 'http://lod.ac/bdls/sparql'
        },
        {
          'name': 'LemonWordNet',
          'location': 'http://monnetproject.deri.ie/lemonsource_query/'
        },
        {
          'name': 'Linked Clean Energy Data (reegle.info)',
          'location': 'http://sparql.reegle.info/'
        },
        {
          'name': 'Linked Life Data',
          'location': 'http://linkedlifedata.com/sparql'
        },
        {
          'name': 'Linked Movie DataBase',
          'location': 'http://data.linkedmdb.org/sparql'
        },
        {
          'name': 'Linked Open Data Camera dei deputati',
          'location': 'http://dati.camera.it/sparql'
        },
        {
          'name': 'Linked Open Data of Ecology',
          'location': 'http://ecowlim.tfri.gov.tw/sparql/query'
        },
        {
          'name': 'Linked Open Senate (linkedopendata.it)',
          'location': 'http://sparql.linkedopendata.it/los'
        },
        {
          'name': 'Linked Open Vocabularies (LOV)',
          'location': 'http://lov.okfn.org/endpoint/lov'
        },
        {
          'name': 'Linked Structured Product Labels',
          'location': 'http://dbmi-icode-01.dbmi.pitt.edu/linkedSPLs/sparql'
        },
        {
          'name': 'Linked User Feedback',
          'location': 'http://soa4all.isoco.net/luf/sparql'
        },
        {
          'name': 'LinkedCT',
          'location': 'http://data.linkedct.org/sparql'
        },
        {
          'name': 'LinkedGeoData',
          'location': 'http://linkedgeodata.org/sparql'
        },
        {
          'name': 'Lista de  Encabezamientos de Materia as Linked Open Data',
          'location': 'http://id.sgcb.mcu.es/sparql'
        },
        {
          'name': 'Lower Layer Super Output Areas',
          'location': 'http://opendatacommunities.org/sparql'
        },
        {
          'name': 'MLSA - A Multi-layered Reference Corpus for German Sentiment Analysis',
          'location': 'http://mlode.nlp2rdf.org/sparql'
        },
        {
          'name': 'Mathematics Subject Classification',
          'location': 'http://sparql.msc2010.org'
        },
        {
          'name': 'MetaLex Document Server',
          'location': 'http://doc.metalex.eu:8000/sparql'
        },
        {
          'name': 'Mouse Genome Database (MGD) from Mouse Genome Informatics (MGI)',
          'location': 'http://mgi.bio2rdf.org/sparql'
        },
        {
          'name': 'Muninn World War I',
          'location': 'http://rdf.muninn-project.org/sparql'
        },
        {
          'name': 'N-Lex as Linked Data',
          'location': 'http://n-lex.publicdata.eu/sparql'
        },
        {
          'name': 'NAICS 2007',
          'location': 'http://156.35.82.103/sparql'
        },
        {
          'name': 'NAICS 2012',
          'location': 'http://156.35.82.103/sparql'
        },
        {
          'name': 'National Diet Library of Japan subject headings',
          'location': 'http://id.ndl.go.jp/auth/ndlsh/'
        },
        {
          'name': 'National Digital Data Archive of Hungary (partial)',
          'location': 'http://lod.sztaki.hu/sparql'
        },
        {
          'name': 'National Radioactivity Stat as Linked Data',
          'location': 'http://www.kanzaki.com/works/2011/stat/'
        },
        {
          'name': 'National Science Foundation (RKBExplorer)',
          'location': 'http://nsf.rkbexplorer.com/sparql'
        },
        {
          'name': 'Nature Publishing Group - ALL',
          'location': 'http://data.nature.com/sparql'
        },
        {
          'name': 'Nomenclator Asturias 2010',
          'location': 'http://156.35.82.103/sparql'
        },
        {
          'name': 'Norwegian geo-divisions',
          'location': 'http://data.lenka.no/sparql'
        },
        {
          'name': 'OBO',
          'location': 'http://obo.bio2rdf.org/sparql'
        },
        {
          'name': 'OMIM',
          'location': 'http://omim.bio2rdf.org/sparql'
        },
        {
          'name': 'Ocean Drilling - Codices',
          'location': 'http://data.oceandrilling.org/sparql'
        },
        {
          'name': 'Ocean Drilling - Forams',
          'location': 'http://data.oceandrilling.org/sparql'
        },
        {
          'name': 'Ocean Drilling - Janus Age Models',
          'location': 'http://data.oceandrilling.org/sparql'
        },
        {
          'name': 'Ocean Drilling - Janus LOD',
          'location': 'http://data.oceandrilling.org/sparql'
        },
        {
          'name': 'Ocean Drilling - LDEO log files as data (TEST leg 218 only)',
          'location': 'http://data.oceandrilling.org/sparql'
        },
        {
          'name': 'Ocean Drilling - dbSEABED',
          'location': 'http://data.oceandrilling.org/sparql'
        },
        {
          'name': 'Open Archive Initiative Harvest over OAI-PMH (RKBExplorer)',
          'location': 'http://oai.rkbexplorer.com/sparql'
        },
        {
          'name': 'Open Data Communities - Lower layer Super Output Areas',
          'location': 'http://opendatacommunities.org/sparql'
        },
        {
          'name': 'Open Data Thesaurus',
          'location': 'http://vocabulary.semantic-web.at/PoolParty/sparql/OpenData'
        },
        {
          'name': 'Open Data from the Italian National Research Council',
          'location': 'http://data.cnr.it/sparql-proxy/'
        },
        {
          'name': 'Open Library data mirror in the Talis Platform',
          'location': 'http://api.talis.com/stores/openlibrary/services/sparql'
        },
        {
          'name': 'OpenEI - Open Energy Info',
          'location': 'http://en.openei.org/sparql'
        },
        {
          'name': 'OpenLink Software LOD Cache',
          'location': 'http://lod.openlinksw.com/sparql'
        },
        {
          'name': 'OpenMobileNetwork',
          'location': 'http://sparql.openmobilenetwork.org'
        },
        {
          'name': 'OpenTox',
          'location': 'http://apps.ideaconsult.net:8080/ontology'
        },
        {
          'name': 'OpenUpLabs COINS',
          'location': 'http://gov.tso.co.uk/coins/sparql'
        },
        {
          'name': 'OpenUpLabs DCLG',
          'location': 'http://gov.tso.co.uk/dclg/sparql'
        },
        {
          'name': 'OpenUpLabs Geographic',
          'location': 'http://os.services.tso.co.uk/geo/sparql'
        },
        {
          'name': 'OpenUpLabs Legislation',
          'location': 'http://gov.tso.co.uk/legislation/sparql'
        },
        {
          'name': 'OpenUpLabs Transport',
          'location': 'http://gov.tso.co.uk/transport/sparql'
        },
        {
          'name': 'Ordnance Survey (RKBExplorer)',
          'location': 'http://os.rkbexplorer.com/sparql'
        },
        {
          'name': 'Organic Edunet Linked Open Data',
          'location': 'http://data.organic-edunet.eu/sparql'
        },
        {
          'name': 'Orthology and Diseases Information - OGO',
          'location': 'http://miuras.inf.um.es/sparql'
        },
        {
          'name': 'OxPoints (University of Oxford)',
          'location': 'http://data.ox.ac.uk/sparql'
        },
        {
          'name': 'OxPoints (University of Oxford)',
          'location': 'http://oxpoints.oucs.ox.ac.uk/sparql'
        },
        {
          'name': 'PDB',
          'location': 'http://pdb.bio2rdf.org/sparql'
        },
        {
          'name': 'Postal codes Italy (LinkedOpenData.it)',
          'location': 'http://sparql.linkedopendata.it/cap'
        },
        {
          'name': 'PreLex',
          'location': 'http://prelex.publicdata.eu/sparql'
        },
        {
          'name': 'Product Scheme Classifications Catalogue',
          'location': 'http://156.35.82.103/sparql'
        },
        {
          'name': 'PubMed',
          'location': 'http://pubmed.bio2rdf.org/sparql'
        },
        {
          'name': 'RISKS Digest (RKBExplorer)',
          'location': 'http://risks.rkbexplorer.com/sparql'
        },
        {
          'name': 'ReSIST MSc in Resilient Computing Curriculum (RKBExplorer)',
          'location': 'http://curriculum.rkbexplorer.com/sparql'
        },
        {
          'name': 'ReSIST Project Wiki (RKBExplorer)',
          'location': 'http://wiki.rkbexplorer.com/sparql'
        },
        {
          'name': 'ReSIST Resilience Mechanisms (RKBExplorer.com)',
          'location': 'http://resex.rkbexplorer.com/sparql'
        },
        {
          'name': 'Reactome',
          'location': 'http://reactome.bio2rdf.org/sparql'
        },
        {
          'name': 'Research Assessment Exercise 2001 (RKBExplorer)',
          'location': 'http://rae2001.rkbexplorer.com/sparql'
        },
        {
          'name': 'Resilient Computing Courseware (RKBExplorer)',
          'location': 'http://courseware.rkbexplorer.com/sparql'
        },
        {
          'name': 'Revyu.com - Review Anything',
          'location': 'http://revyu.com/sparql'
        },
        {
          'name': 'RxNorm',
          'location': 'http://link.informatics.stonybrook.edu/sparql'
        },
        {
          'name': 'SADI Semantic Web Services framework registry',
          'location': 'http://biordf.net/sparql'
        },
        {
          'name': 'SITC-V4',
          'location': 'http://156.35.82.103/sparql'
        },
        {
          'name': 'SPARQL Endpoint Status',
          'location': 'http://labs.mondeca.com/endpoint/ends'
        },
        {
          'name': 'Saccharomyces Genome Database',
          'location': 'http://sgd.bio2rdf.org/sparql'
        },
        {
          'name': 'School of Electronics and Computer Science, University of Southampton (RKBExplorer)',
          'location': 'http://southampton.rkbexplorer.com/sparql'
        },
        {
          'name': 'Semantic Universe Data',
          'location': 'http://data.semanticuniverse.com/sparql'
        },
        {
          'name': 'Semantic Web Dog Food Corpus',
          'location': 'http://data.semanticweb.org/sparql'
        },
        {
          'name': 'SentimentWortschatz',
          'location': 'http://mlode.nlp2rdf.org/sparql'
        },
        {
          'name': 'SmartLink: Linked Services Non-Functional Properties',
          'location': 'http://smartlink.open.ac.uk/smartlink/sparql'
        },
        {
          'name': 'Social Networks and Archival Context Fall 2011',
          'location': 'http://socialarchive.iath.virginia.edu/sparql/snac-viaf'
        },
        {
          'name': 'Social Networks and Archival Context Fall 2011',
          'location': 'http://socialarchive.iath.virginia.edu/sparql/eac'
        },
        {
          'name': 'Social Semantic Web Thesaurus',
          'location': 'http://vocabulary.semantic-web.at/PoolParty/sparql/semweb'
        },
        {
          'name': 'Street level crime reports for England and Wales',
          'location': 'http://crime.rkbexplorer.com/sparql'
        },
        {
          'name': 'Sudoc bibliographic data',
          'location': 'http://sparql.sindice.com/sparql'
        },
        {
          'name': 'TCGA Roadmap',
          'location': 'http://agalpha.mathbiol.org/repositories/tcga'
        },
        {
          'name': 'Taiwan geographic names',
          'location': 'http://pomelo.iis.sinica.edu.tw:2020/sparql'
        },
        {
          'name': 'TaxonConcept Knowledge Base',
          'location': 'http://lsd.taxonconcept.org/sparql'
        },
        {
          'name': 'Technische Universität Darmstadt (RKBExplorer)',
          'location': 'http://darmstadt.rkbexplorer.com/sparql'
        },
        {
          'name': 'The Eurostat Linked Data',
          'location': 'http://eurostat.linked-statistics.org/sparql'
        },
        {
          'name': 'TheSoz Thesaurus for the Social Sciences (GESIS)',
          'location': 'http://lod.gesis.org/thesoz/sparql'
        },
        {
          'name': 'Traditional Korean Medicine Ontology',
          'location': 'http://tkm.kiom.re.kr/ontology/joseki'
        },
        {
          'name': 'Traditional Korean Medicine Ontology',
          'location': 'http://tkm.kiom.re.kr/ontology/sparql'
        },
        {
          'name': 'Transcription profiling of human, chimp and mouse brain',
          'location': 'http://purl.org/twc/arrayexpress/virtuoso/sparql'
        },
        {
          'name': 'Transcription profiling of mouse cell types and tissues (GNF/Novartis)',
          'location': 'http://purl.org/twc/arrayexpress/virtuoso/sparql'
        },
        {
          'name': 'Transcription profiling of rat bladder after inoculation with bladder cancer cells',
          'location': 'http://purl.org/twc/arrayexpress/virtuoso/sparql'
        },
        {
          'name': 'Transparency International Linked Data',
          'location': 'http://transparency.270a.info/sparql'
        },
        {
          'name': 'Turismo de Zaragoza',
          'location': 'http://www.zaragoza.es/turruta/sparql'
        },
        {
          'name': 'UK JISC (RKBExplorer)',
          'location': 'http://jisc.rkbexplorer.com/sparql'
        },
        {
          'name': 'UN/LOCODE (RKBExplorer)',
          'location': 'http://unlocode.rkbexplorer.com/sparql'
        },
        {
          'name': 'UNESCO Nomenclature for fields of science and technology',
          'location': 'http://skos.um.es/sparql'
        },
        {
          'name': 'UNODC - Statistics on criminal justice',
          'location': 'http://unodc.publicdata.eu/sparql'
        },
        {
          'name': 'URIBurner',
          'location': 'http://linkeddata.uriburner.com/sparql'
        },
        {
          'name': 'UniProt UniParc',
          'location': 'http://beta.sparql.uniprot.org'
        },
        {
          'name': 'UniProt UniPathway',
          'location': 'http://beta.sparql.uniprot.org/'
        },
        {
          'name': 'UniProt UniRef',
          'location': 'http://beta.sparql.uniprot.org'
        },
        {
          'name': 'UniProtKB',
          'location': 'http://beta.sparql.uniprot.org'
        },
        {
          'name': 'UniProtKB Taxonomy',
          'location': 'http://beta.sparql.uniprot.org'
        },
        {
          'name': 'University of Newcastle upon Tyne (RKBExplorer)',
          'location': 'http://newcastle.rkbexplorer.com/sparql'
        },
        {
          'name': 'Università degli studi di Roma \'La Sapienza\' (RKBExplorer)',
          'location': 'http://roma.rkbexplorer.com/sparql'
        },
        {
          'name': 'Università di Pisa (RKBExplorer)',
          'location': 'http://pisa.rkbexplorer.com/sparql'
        },
        {
          'name': 'Universität Ulm (RKBExplorer)',
          'location': 'http://ulm.rkbexplorer.com/sparql'
        },
        {
          'name': 'Université Paul Sabatier - Toulouse 3 (RKB Explorer)',
          'location': 'http://irit.rkbexplorer.com/sparql'
        },
        {
          'name': 'Vytautas Magnus University, Kaunas (RKBExplorer)',
          'location': 'http://kaunas.rkbexplorer.com/sparql'
        },
        {
          'name': 'Web NDL Authorities - National Diet Library of Japan',
          'location': 'http://id.ndl.go.jp/auth/ndla/'
        },
        {
          'name': 'Web Science Conference (RKBExplorer)',
          'location': 'http://webscience.rkbexplorer.com/sparql'
        },
        {
          'name': 'WikiPathways',
          'location': 'http://sparql.wikipathways.org/'
        },
        {
          'name': 'WordNet (RKBExplorer)',
          'location': 'http://wordnet.rkbexplorer.com/sparql'
        },
        {
          'name': 'World Atlas of Language Structuctures (WALS) Online',
          'location': 'http://mlode.nlp2rdf.org/sparql'
        },
        {
          'name': 'World Bank Linked Data',
          'location': 'http://worldbank.270a.info/sparql'
        },
        {
          'name': 'World Loanword Database',
          'location': 'http://mlode.nlp2rdf.org/sparql'
        },
        {
          'name': 'Yovisto - academic video search',
          'location': 'http://sparql.yovisto.com/'
        },
        {
          'name': 'aksw.org Research Group dataset',
          'location': 'http://aksw.org/sparql'
        },
        {
          'name': 'crm',
          'location': 'http://crm.rkbexplorer.com/sparql'
        },
        {
          'name': 'data.open.ac.uk, Linked Data from the Open University',
          'location': 'http://data.open.ac.uk/query'
        },
        {
          'name': 'datos.bne.es',
          'location': 'http://datos.bne.es/sparql'
        },
        {
          'name': 'dbnary',
          'location': 'http://kaiko.getalp.org/sparql'
        },
        {
          'name': 'digitaleconomy',
          'location': 'http://digitaleconomy.rkbexplorer.com/sparql'
        },
        {
          'name': 'dimitros.net',
          'location': 'http://dimitros.net/query.sparql'
        },
        {
          'name': 'dotAC (RKBExplorer)',
          'location': 'http://dotac.rkbexplorer.com/sparql'
        },
        {
          'name': 'ePrints3 Institutional Archive Collection (RKBExplorer)',
          'location': 'http://eprints.rkbexplorer.com/sparql'
        },
        {
          'name': 'education.data.gov.uk',
          'location': 'http://services.data.gov.uk/education/sparql'
        },
        {
          'name': 'epsrc',
          'location': 'http://epsrc.rkbexplorer.com/sparql'
        },
        {
          'name': 'iServe: Linked Services Registry',
          'location': 'http://iserve.kmi.open.ac.uk/iserve/sparql'
        },
        {
          'name': 'lobid. Bibliographic Resources',
          'location': 'http://lobid.org/sparql'
        },
        {
          'name': 'lobid. Index of libraries and related organisations',
          'location': 'http://lobid.org/sparql'
        },
        {
          'name': 'morelab',
          'location': 'http://www.morelab.deusto.es/joseki/articles'
        },
        {
          'name': 'myExperiment',
          'location': 'http://rdf.myexperiment.org/sparql'
        },
        {
          'name': 'reference.data.gov.uk',
          'location': 'http://services.data.gov.uk/reference/sparql'
        },
        {
          'name': 'rkb-explorer-foreign',
          'location': 'http://foreign.rkbexplorer.com/sparql'
        },
        {
          'name': 'statistics.data.gov.uk',
          'location': 'http://services.data.gov.uk/statistics/sparql'
        },
        {
          'name': 'transport.data.gov.uk',
          'location': 'http://services.data.gov.uk/transport/sparql'
        },
        {
          'name': 'webconf',
          'location': 'http://webconf.rkbexplorer.com/sparql'
        },
        {
          'name': 'wiktionary.dbpedia.org',
          'location': 'http://wiktionary.dbpedia.org/sparql'
        },
        {
          'name': 'xxxxx',
          'location': 'http://diwis.imis.athena-innovation.gr:8181/sparql'
        }
      ];
    };

    _loadEndpoints();
    return {
      getEndpoints: _getAllEndpoints,
      getSelectedEndpoint: _getSelectedEndpoint
    };
  });
