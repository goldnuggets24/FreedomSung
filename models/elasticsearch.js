var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({  
    host: '127.0.0.1:9200',
    log: 'info'
});

var indexName = "randomindex";

/**
* Delete an existing index
*/
function deleteIndex() {  
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {  
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {  
    return elasticClient.indices.exists({
        index: indexName
    });
}

exports.indexExists = indexExists;

function initMapping() {  
    return elasticClient.indices.putMapping({
        index: indexName,
        type: 'document',
        body: {
            properties: {
                title: { type: 'text' },
                content: { type: 'text' },
                content_suggest: { 
                    type: 'completion', 
                    analyzer: 'simple', 
                    search_analyzer: 'simple' 
                }
            }

        }
    });
}

exports.initMapping = initMapping;

function addDocument(document) {  
    return elasticClient.index({
        index: indexName,
        type: "document",
        body: {
            title: document.title,
            content: document.content,
            suggest: {
                input: document.title.split(" "),
                output: document.title
            }
        }
    });
}
exports.addDocument = addDocument;

function getSuggestions(input) {  
    return elasticClient.search({
        index: indexName,
        body: {
    query: {
      match: {
        title: {
            query: input,
            fuzziness: 'AUTO'
        }
      }
    }
  }
    });
}
    
exports.getSuggestions = getSuggestions;

elasticClient.ping({
     requestTimeout: 30000,
 }, function(error) {
     if (error) {
         console.error('elasticsearch cluster is down!');
     } else {
         console.log('i like search');
     }
 });
