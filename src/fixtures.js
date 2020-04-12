export default {
  getFieldsFixture: () => {
    return {
      "timestamp": 1586540699.3291004,
      "version": 0.1,
      "payload": {
        "VirusSequences": {
          "Index": {
            "type": "other"
          },
          "Accession": {
            "type": "enumeration",
            "unique": 39,
            "values": [
              "NC_001722",
              "NC_001802",
              "NC_004718",
              "NC_006273",
              "NC_006577",
              "NC_007366",
              "NC_007367",
              "NC_007368",
              "NC_007369",
              "NC_007370",
              "NC_007371",
              "NC_007372",
              "NC_007373",
              "NC_007380",
              "NC_007381",
              "NC_007382",
              "NC_007605",
              "NC_009334",
              "NC_019843",
              "NC_026422"
            ]
          },
          "Sequence": {
            "type": "other"
          },
          "Version": {
            "type": "enumeration",
            "unique": 3,
            "values": [
              "1",
              "2",
              "3"
            ]
          },
          "Sub_accession": {
            "type": "enumeration",
            "unique": 39,
            "values": [
              "complement(NC_007605.1:116712..116945)",
              "complement(NC_009334.1:129454..131574)",
              "join(NC_001802.1:5105..5319 |NC_001802.1:5321..5396)",
              "join(NC_006273.2:161917..162673 |NC_006273.2:162831..164128)",
              "join(NC_007367.1:26..51 |NC_007367.1:740..1007)",
              "join(NC_007370.1:27..56 |NC_007370.1:529..864)",
              "join(NC_026424.1:1..570 |NC_026424.1:572..760)",
              "join(NC_026427.1:1..26 |NC_026427.1:715..982)",
              "join(NC_026428.1:1..30 |NC_026428.1:503..838)",
              "join(NC_026431.1:1..26 |NC_026431.1:715..982)",
              "join(NC_026432.1:1..30 |NC_026432.1:503..838)",
              "join(NC_026437.1:1..570 |NC_026437.1:572..700)",
              "NC_001722.1:5423..6070",
              "NC_004718.3:26398..27063",
              "NC_006577.2:21773..22933",
              "NC_007366.1:30..1730",
              "NC_007368.1:20..1429",
              "NC_007369.1:46..1542",
              "NC_007371.1:25..2175",
              "NC_007372.1:119..391"
            ]
          },
          "Protein_accession": {
            "type": "enumeration",
            "unique": 39,
            "values": [
              "NP_042692",
              "NP_056839",
              "NP_057852",
              "NP_828855",
              "YP_001129496",
              "YP_007188580",
              "YP_009047204",
              "YP_009118470",
              "YP_009118472",
              "YP_009118474",
              "YP_009118475",
              "YP_009118476",
              "YP_009118477",
              "YP_009118479",
              "YP_009118481",
              "YP_009118622",
              "YP_009118624",
              "YP_009118626",
              "YP_009118627",
              "YP_009118628"
            ]
          },
          "Release_Date": {
            "type": "enumeration",
            "unique": 14,
            "values": [
              "1993-08-02T00:00:00Z",
              "1998-01-22T00:00:00Z",
              "2003-04-14T00:00:00Z",
              "2004-09-16T00:00:00Z",
              "2004-12-28T00:00:00Z",
              "2005-08-30T00:00:00Z",
              "2005-11-17T00:00:00Z",
              "2007-04-03T00:00:00Z",
              "2012-12-13T00:00:00Z",
              "2015-02-04T00:00:00Z",
              "2015-02-23T00:00:00Z",
              "2016-08-19T00:00:00Z",
              "2018-08-24T00:00:00Z",
              "2020-01-13T00:00:00Z"
            ]
          },
          "Genus": {
            "type": "enumeration",
            "unique": 6,
            "values": [
              "Alphainfluenzavirus",
              "Betacoronavirus",
              "Cytomegalovirus",
              "Hepacivirus",
              "Lentivirus",
              "Lymphocryptovirus"
            ]
          },
          "Family": {
            "type": "enumeration",
            "unique": 5,
            "values": [
              "Coronaviridae",
              "Flaviviridae",
              "Herpesviridae",
              "Orthomyxoviridae",
              "Retroviridae"
            ]
          },
          "Length": {
            "type": "float",
            "range": [
              838,
              235646
            ]
          },
          "Nuc_Completeness": {
            "type": "enumeration",
            "unique": 1,
            "values": [
              "RefSeq"
            ]
          },
          "Genotype": {
            "type": "enumeration",
            "unique": 4,
            "values": [
              "H1N1",
              "H2N2",
              "H3N2",
              "H7N9"
            ]
          },
          "Genome_Region": {
            "type": "other"
          },
          "Segment": {
            "type": "other"
          },
          "Authors": {
            "type": "other"
          },
          "Publications": {
            "type": "other"
          },
          "Geo_Location": {
            "type": "enumeration",
            "unique": 5,
            "values": [
              "Canada",
              "China",
              "Korea",
              "United Kingdom",
              "USA"
            ]
          },
          "Host": {
            "type": "enumeration",
            "unique": 1,
            "values": [
              "Homo sapiens"
            ]
          },
          "Isolation_Source": {
            "type": "enumeration",
            "unique": 3,
            "values": [
              "blood",
              "blood, liver, abdominal cavity",
              "urine"
            ]
          },
          "Collection_Date": {
            "type": "enumeration",
            "unique": 9,
            "values": [
              "1968",
              "1994",
              "1999",
              "2004-12-21",
              "2009-04-09",
              "2012-06-13",
              "2012-09-11",
              "2013-03-05",
              "2019-12"
            ]
          },
          "BioSample": {
            "type": "enumeration",
            "unique": 0,
            "values": []
          },
          "GenBank_Title": {
            "type": "enumeration",
            "unique": 39,
            "values": [
              "Betacoronavirus England 1, complete genome",
              "Hepacivirus B polypeptide gene, complete cds",
              "Hepatitis C virus genotype 7, complete genome",
              "Human coronavirus HKU1, complete genome",
              "Human gammaherpesvirus 4, complete genome",
              "Human herpesvirus 4, complete genome",
              "Human herpesvirus 5 strain Merlin, complete genome",
              "Human immunodeficiency virus 1, complete genome",
              "Human immunodeficiency virus 2, complete genome",
              "Influenza A virus (A/California/07/2009(H1N1)) segment 1 polymerase PB2 (PB2) gene, complete cds",
              "Influenza A virus (A/California/07/2009(H1N1)) segment 2 polymerase PB1 (PB1) gene, complete cds; and nonfunctional PB1-F2 protein (PB1-F2) gene, complete sequence",
              "Influenza A virus (A/California/07/2009(H1N1)) segment 3 polymerase PA (PA) gene, complete cds",
              "Influenza A virus (A/California/07/2009(H1N1)) segment 4 hemagglutinin (HA) gene, complete cds",
              "Influenza A virus (A/California/07/2009(H1N1)) segment 5 nucleocapsid protein (NP) gene, complete cds",
              "Influenza A virus (A/California/07/2009(H1N1)) segment 6 neuraminidase (NA) gene, complete cds",
              "Influenza A virus (A/California/07/2009(H1N1)) segment 7 matrix protein 2 (M2) and matrix protein 1 (M1) genes, complete cds",
              "Influenza A virus (A/California/07/2009(H1N1)) segment 8 nuclear export protein (NEP) and nonstructural protein 1 (NS1) genes, complete cds",
              "Influenza A virus (A/Korea/426/1968(H2N2)) segment 5, complete sequence",
              "Influenza A virus (A/Korea/426/1968(H2N2)) segment 6, complete sequence",
              "Influenza A virus (A/Korea/426/1968(H2N2)) segment 8, complete sequence"
            ]
          }
        },
        "Peptides": {
          "Index": {
            "type": "float",
            "range": [
              0,
              9999
            ]
          },
          "Method": {
            "type": "enumeration",
            "unique": 1,
            "values": [
              "SGD"
            ]
          },
          "Context_size": {
            "type": "enumeration",
            "unique": 1,
            "values": [
              162
            ]
          },
          "Model_run": {
            "type": "enumeration",
            "unique": 1,
            "values": [
              1
            ]
          },
          "Accession": {
            "type": "enumeration",
            "unique": 1,
            "values": [
              "NC_045512"
            ]
          },
          "Sub_accession": {
            "type": "enumeration",
            "unique": 1,
            "values": [
              "NC_045512"
            ]
          },
          "Position": {
            "type": "float",
            "range": [
              -28163,
              29183
            ]
          },
          "Length": {
            "type": "float",
            "range": [
              8,
              9
            ]
          },
          "Sequence": {
            "type": "other"
          },
          "Score": {
            "type": "float",
            "range": [
              0.06240649148821799,
              0.947116315364838
            ]
          }
        }
      },
      "messages": [],
      "errors": [],
      "error": false
    }
  },
  getDataFixture: () => {
    return {
      "payload": {
          "query":{
              "Peptides.Score": {
                  "type": "float",
                  "range": [0.7, 1]
              },
              "Peptides.Length": {
                  "type": "enumeration",
                  "cases": [9]
              },
              "VirusSequences.Family": {
                  "type": "enumeration",
                  "cases": ["Coronaviridae"]
              }
          },
          "join": ["VirusSequences.Accession", "Peptides.Accession"],
          "limit": 3,
          "sort": {
            "field": "Peptides.Score",
                "direction": "DESC"
          },
          "additional_fields":["VirusSequences.Sequence", "Peptides.Sequence"]
      }
    }
  }
}